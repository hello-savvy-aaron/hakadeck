// Every lucide icon the sprite carries. Add a name here, run `npm run icons`
// to regenerate public/icons.svg, then use it as <Icon name="…" />.
export const ICON_NAMES = [
  "arrow-left",
  "arrow-right",
  "arrow-up-right",
  "award",
  "calendar-days",
  "check",
  "chevron-down",
  "chevron-up",
  "clock",
  "external-link",
  "hammer",
  "handshake",
  "landmark",
  "mail",
  "map-pin",
  "mountain",
  "phone",
  "play",
  "plug",
  "shield-check",
  "siren",
  "sparkles",
  "star",
  "users",
] as const;

export type IconName = (typeof ICON_NAMES)[number];
