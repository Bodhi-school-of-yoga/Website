# Figma Fetch Log — Footer (node 1:619)

**Fetched:** 2026-05-22
**File:** `eqaofBeNUhOUISevtRfOpT` (Bodhi landing-page web handoff)
**Node:** `1:619` — "Group 1171281878"

## MCP calls — all succeeded on first attempt

| MCP call | Status | Output file |
|---|---|---|
| `get_metadata` | OK | `01_figma_metadata_footer.json` |
| `get_design_context` | OK (large, ~25KB JSX) | `01_figma_context_footer.json` |
| `get_variable_defs` | OK (sparse — 2 vars) | `01_figma_variables_footer.json` |
| `get_libraries` | OK | `01_figma_libraries_footer.json` |
| `get_screenshot` (1600px) | OK | `01_figma_screenshot_footer.png` (91KB) |

No failures, no retries needed.

## Important scope note

Node `1:619` ("Group 1171281878") is **larger than just the footer link strip**. It is a 1920×1302 dark-teal block containing TWO logical sections stacked vertically:

1. **Closing CTA section** (top, frame `1:675`) — big italic "Begin where you are." headline + sub + "Try a class, free" pill button + a row of 3 dark-glass cards (Free Trial Session / Speak to us / Take a Guided Path). This looks like a **separate ClosingCTA section** that the designer grouped together with the footer because they share the dark background.
2. **Footer proper** (bottom, frame `1:622`) — brand column + 3 link columns + legal bar.

Implementer choice: split into `<ClosingCTASection />` and `<SiteFooter />` components, both rendered against the same `bg-[#00282c]` parent, OR render `1:619` as one big `<Footer />`. The dark cards (`1:687`) are explicitly white@10% opacity boxes — they only look right over the dark background.

## Footer block (the actual footer) — quick facts

- **Background:** `#00282c` (dark teal — Bodhi's "ink" brand color)
- **Container:** `max-w-[1240px]`, `px-[32px]`
- **Grid:** 4 columns, ratio `1.5fr | 1fr | 1fr | 1fr`, `gap-[40px]`
- **Column 1 — Brand:** Wordmark "Bodhi" (Fraunces Light Italic 32px) + 2-line tagline (Manrope 14.5px @ 76% opacity white) + URL line `bodhischoolofyoga.com` (Manrope 14.5px white)
- **Column 2 — School:** heading + 5 links → `Teacher Training`, `Workshops`, `Classes`, `Faculty`, `Lineage`
- **Column 3 — Visit:** heading + 4 lines → `The Practice Room,` / `2nd floor, Quiet Lane` / `City  · India` / `Get directions →`
- **Column 4 — Stay close:** heading + 4 links → `Newsletter`, `Instagram`, `YouTube`, `Email us`
- **Section headings:** Manrope Medium 11px, uppercase, letter-spacing 2.42px, white
- **Links/body:** Manrope Regular 14.5px, `rgba(255,255,255,0.76)`
- **Divider:** 1px top border `rgba(47,74,62,0.14)`, `pt-[25px]`
- **Legal-bar left:** `© Bodhi School of Yoga  ·  Yoga Alliance Registered School (RYS-200, RYS-300)`
- **Legal-bar right:** `Designed quietly. Practised daily.`
- **Legal font:** Manrope Regular 12.5px, white

## Things the footer does NOT have

- ❌ No logo image asset — wordmark is text-only (`Bodhi` set in Fraunces Light Italic)
- ❌ No social-media SVG icons — Instagram/YouTube/Email appear as plain text links under "Stay close"
- ❌ No newsletter email-input form — "Newsletter" is just a text link to (presumably) a newsletter signup page
- ❌ No bottom Terms / Privacy / Cookies row — legal bar carries only copyright + Yoga Alliance accreditation + designer tagline. If we need Privacy/Terms, they are not in this Figma node.

## Variables / tokens used by this node

Only two variables resolved:
- `letterSpacing/0` → `0`
- `radius/16` → `16`

Everything else (colors, font sizes) is hard-coded in the Figma layer styles — no semantic color tokens. The design system tokens for this footer must be inferred from raw hex values:
- `#00282c` (footer bg / ink)
- `#8ee0ce` (CTA pill bg + italic accent in "you are.")
- `#004b3b` (card-button text color — Bodhi secondary green)
- `#9d9d9d` (card body description text)
- `rgba(255,255,255,0.76)` (footer link/body text)
- `rgba(47,74,62,0.14)` (legal divider hairline)

## Closing-CTA section (above footer) — quick facts

- Headline: "Begin where you are." — `Begin where ` in Host Grotesk + `you are.` in Fraunces Italic colored `#8ee0ce` — 108px
- Sub: "Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that."
- Primary CTA: pill button `Try a class, free` — `bg-#8ee0ce text-#00282c`, `rounded-[999px]`, 197×60.89
- 3 dark-glass cards (white@10% bg, `rounded-[34px]`, 431×220, white border @18%):
  1. **Free Trial Session** — "50 Mins Session with the option of choosing from 10 slots in a day." — button: `Join now`
  2. **Speak to us** — "Talk to counsellor who can assess and offer recommendations" — button: `Contact us`
  3. **Take a Guided Path** — "Our assessment will guide you take direction best suited based on your experience" — button: `Start now`
- Card title font: Instrument Sans Bold 24px (white)
- Card body font: Instrument Sans Regular 16px, color `#9d9d9d`
- Card button: white bg, DM Sans SemiBold 15px, text `#004b3b`, `rounded-[42px]`

## Libraries

File is subscribed to Material 3, Simple Design System, iOS 18, iOS 26 — none used by this footer node. Footer is pure custom typography + colors.
