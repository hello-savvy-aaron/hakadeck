import type { LocationResource } from "./locations";

// Directory lines that are the same on every location page. Kept out of the
// content files so a number change is one edit, not 121, and in a module of
// its own (no filesystem imports) so the client-side hub view can render them
// directly instead of receiving them as props on every page.
export const STATEWIDE_LINES: Omit<LocationResource, "category">[] = [
  {
    label: "Emergency",
    name: "Police, fire, or medical emergency",
    phone: "911",
    note: "Text-to-911 works in most Front Range counties when you can't safely make a call.",
  },
  {
    label: "Before you dig",
    name: "Colorado 811",
    phone: "811",
    url: "https://colorado811.org/",
    note: "Free utility locates, required by state law before any post hole or footing goes in.",
  },
  {
    label: "Road conditions",
    name: "COtrip (CDOT)",
    phone: "511",
    url: "https://www.cotrip.org/",
    note: "Statewide closures, chain laws, and plow cameras; 1-800-288-1047 from out of state.",
  },
  {
    label: "Mental health crisis",
    name: "988 Colorado",
    phone: "988",
    url: "https://www.988colorado.com/",
    note: "Call or text 988 any time — the state mental health line is always open.",
  },
  {
    label: "Poison control",
    name: "Rocky Mountain Poison & Drug Safety",
    phone: "1-800-222-1222",
    url: "https://rmpds.org/",
    note: "24-hour poison and drug information line.",
  },
];
