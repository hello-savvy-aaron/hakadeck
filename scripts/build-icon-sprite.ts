/**
 * Builds public/icons.svg — one <symbol> per name in components/icons/icon-names.ts,
 * with the path data taken from the installed lucide-react — so <Icon name="…" />
 * (components/icons/icon.tsx) can draw it with a single <use>.
 *
 *   npm run icons
 *
 * Re-run after adding a name to ICON_NAMES or upgrading lucide-react.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as lucide from "lucide-react";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ICON_NAMES } from "../components/icons/icon-names";

const pascal = (name: string) => name.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());

function symbolFor(name: string): string {
  const component = (lucide as unknown as Record<string, lucide.LucideIcon>)[pascal(name)];
  if (!component) throw new Error(`lucide-react has no icon "${name}" (${pascal(name)})`);
  const markup = renderToStaticMarkup(createElement(component));
  const inner = markup.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  if (!inner) throw new Error(`no paths rendered for "${name}"`);
  return `<symbol id="${name}" viewBox="0 0 24 24">${inner}</symbol>`;
}

async function main() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg">${ICON_NAMES.map(symbolFor).join("")}</svg>\n`;
  const out = join(process.cwd(), "public", "icons.svg");
  await writeFile(out, svg);
  console.log(`wrote ${out}: ${ICON_NAMES.length} icons, ${Buffer.byteLength(svg)} bytes`);
}

main();
