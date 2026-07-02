# Haka Decks — Design System

Framework-agnostic preview cards mirroring the live Next.js components, structured for
[Claude Design](https://claude.ai/design). Each `.html` file is a self-contained card: its first
line carries a `<!-- @dsCard group="…" -->` marker that the Design System pane reads to build its
index.

## Layout

| Path                            | Group        | Mirrors                                            |
| ------------------------------- | ------------ | -------------------------------------------------- |
| `tokens/colors.html`            | Foundations  | `app/globals.css` brand + semantic palette         |
| `tokens/type.html`              | Foundations  | Bricolage Grotesque display + Inter body scale     |
| `components/call-cta.html`      | Components   | The `tel:` call button (primary/secondary/ghost)   |
| `patterns/lead-form.html`       | Patterns     | `/contact` — call-first, single-field lead capture |

## Keeping it in sync

These are the source of truth for Claude Design, not for the app. Push component-by-component with
the `/design-sync` skill — never a wholesale replace. When a React component's look changes, update
the matching card here and re-sync just that file.

## Tokens (from `app/globals.css`)

- **Teal** `#729b79` (primary) · **Pine** `#4f6e56` · **Ink** `#22302a` (text) · **Charcoal**
  `#586860` (muted) · **Smoke** `#f3f0f0` (bg) · **Sky** `#85c7f2` · **Almond** `#ffd4ca` · **Gold**
  `#f5b301`
- Display: Bricolage Grotesque 500, `-0.02em`. Body: Inter. Base radius `0.625rem`.
