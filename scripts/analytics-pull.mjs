#!/usr/bin/env node
/**
 * Pull the weekly Haka analytics readout straight from the GA4 Data API.
 *
 * Zero npm dependencies — signs the service-account JWT with node:crypto and
 * talks REST. The GA4 Data API is free (quota-based); this script makes four
 * small report calls per run.
 *
 * Run: npm run analytics            (last 28 days, with a last-7 comparison)
 *      npm run analytics -- --days 60
 *
 * One-time setup (owner's Google account — the one that owns the GA4 property):
 *   1. console.cloud.google.com → select (or create) a project →
 *      "APIs & Services" → enable **Google Analytics Data API**.
 *   2. "IAM & Admin" → Service Accounts → create one (no project roles needed)
 *      → Keys → Add key → JSON → download.
 *   3. Save the file to ~/.config/haka/ga4-key.json  (chmod 600).
 *   4. In GA4: Admin → Property access management → add the service account's
 *      email (…@…iam.gserviceaccount.com) as **Viewer**.
 *   5. In GA4: Admin → Property details → copy the numeric **Property ID** →
 *      echo it into ~/.config/haka/ga4-property
 * Env vars GA4_KEY_FILE / GA4_PROPERTY_ID override those file locations.
 */
import { readFileSync, existsSync } from "node:fs";
import { createSign } from "node:crypto";
import { homedir } from "node:os";
import { join } from "node:path";

const KEY_FILE = process.env.GA4_KEY_FILE || join(homedir(), ".config", "haka", "ga4-key.json");
const PROPERTY_FILE = join(homedir(), ".config", "haka", "ga4-property");
const DAYS = Number(process.argv[process.argv.indexOf("--days") + 1]) || 28;

function fail(msg) {
  console.error(`\n${msg}\n`);
  console.error("Setup steps are at the top of scripts/analytics-pull.mjs.");
  process.exit(1);
}

function propertyId() {
  if (process.env.GA4_PROPERTY_ID) return process.env.GA4_PROPERTY_ID.trim();
  if (existsSync(PROPERTY_FILE)) return readFileSync(PROPERTY_FILE, "utf8").trim();
  fail(`Missing GA4 property ID. Put the numeric ID in ${PROPERTY_FILE}\n(GA4 → Admin → Property details), or set GA4_PROPERTY_ID.`);
}

function keyFile() {
  if (!existsSync(KEY_FILE)) {
    fail(`Missing service-account key at ${KEY_FILE}.\nDownload the JSON key (setup step 2-3) or set GA4_KEY_FILE.`);
  }
  try {
    const key = JSON.parse(readFileSync(KEY_FILE, "utf8"));
    if (!key.client_email || !key.private_key) throw new Error("not a service-account key");
    return key;
  } catch (e) {
    fail(`${KEY_FILE} doesn't look like a service-account JSON key (${e.message}).`);
  }
}

const b64url = (buf) => Buffer.from(buf).toString("base64url");

async function accessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: key.client_email,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const jwt = `${header}.${claims}.${b64url(signer.sign(key.private_key))}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!res.ok) fail(`Google rejected the service-account credentials: ${data.error_description || data.error}`);
  return data.access_token;
}

async function runReport(token, property, body) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  const data = await res.json();
  if (!res.ok) {
    const msg = data.error?.message || JSON.stringify(data);
    if (res.status === 403) {
      fail(`GA4 said "permission denied". Usually means the service account\n(${keyFile().client_email}) isn't added as Viewer on the property (setup step 4),\nor the property ID is wrong.\n\nAPI message: ${msg}`);
    }
    fail(`GA4 API error (${res.status}): ${msg}`);
  }
  return data;
}

const rows = (report) =>
  (report.rows || []).map((r) => ({
    dims: (r.dimensionValues || []).map((d) => d.value),
    metrics: (r.metricValues || []).map((m) => Number(m.value)),
  }));

const num = (n, d = 0) => n.toLocaleString("en-US", { maximumFractionDigits: d });
const pct = (n) => `${(n * 100).toFixed(0)}%`;

function table(headers, dataRows) {
  const widths = headers.map((h, i) =>
    Math.max(h.length, ...dataRows.map((r) => String(r[i]).length)),
  );
  const line = (cells, pad = " ") =>
    cells.map((c, i) => String(c)[i === 0 ? "padEnd" : "padStart"](widths[i], pad)).join("  ");
  console.log(line(headers));
  console.log(line(widths.map(() => ""), "-"));
  for (const r of dataRows) console.log(line(r));
  console.log("");
}

async function main() {
  const property = propertyId();
  const key = keyFile();
  const token = await accessToken(key);
  const range = [{ startDate: `${DAYS}daysAgo`, endDate: "yesterday" }];

  const [daily, channels, events, pages] = await Promise.all([
    runReport(token, property, {
      dateRanges: range,
      dimensions: [{ name: "date" }],
      metrics: [{ name: "totalUsers" }, { name: "sessions" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
      limit: 400,
    }),
    runReport(token, property, {
      dateRanges: range,
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [
        { name: "sessions" },
        { name: "totalUsers" },
        { name: "engagementRate" },
        { name: "keyEvents" },
      ],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 20,
    }),
    runReport(token, property, {
      dateRanges: range,
      dimensions: [{ name: "eventName" }, { name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          inListFilter: {
            values: ["call_click", "quote_click", "email_click", "generate_lead", "form_start"],
          },
        },
      },
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 100,
    }),
    runReport(token, property, {
      dateRanges: range,
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 15,
    }),
  ]);

  console.log(`\nHAKA DECKS — GA4, last ${DAYS} days (through yesterday)\n${"=".repeat(56)}\n`);

  // Daily trend: last-7 average vs the period before it.
  const d = rows(daily);
  if (d.length) {
    const users = d.map((r) => r.metrics[0]);
    const last7 = users.slice(-7);
    const prior = users.slice(0, -7);
    const avg = (a) => (a.length ? a.reduce((s, n) => s + n, 0) / a.length : 0);
    console.log(
      `Visitors/day: ${num(avg(last7), 1)} (last 7 days)` +
        (prior.length ? ` vs ${num(avg(prior), 1)} (prior ${prior.length} days)` : ""),
    );
    console.log(`Total users: ${num(users.reduce((s, n) => s + n, 0))}\n`);
  }

  console.log("BY CHANNEL");
  table(
    ["Channel", "Sessions", "Users", "Engaged", "Key events"],
    rows(channels).map((r) => [r.dims[0], num(r.metrics[0]), num(r.metrics[1]), pct(r.metrics[2]), num(r.metrics[3])]),
  );

  console.log("LEAD EVENTS BY CHANNEL");
  table(
    ["Event", "Channel", "Count"],
    rows(events).map((r) => [r.dims[0], r.dims[1], num(r.metrics[0])]),
  );

  console.log("TOP PAGES");
  table(
    ["Page", "Views", "Users"],
    rows(pages).map((r) => [r.dims[0].slice(0, 48), num(r.metrics[0]), num(r.metrics[1])]),
  );
}

main().catch((e) => fail(`Unexpected error: ${e.message}`));
