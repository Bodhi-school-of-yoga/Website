# Figma Fetch Log — node 1:9562

- File: `eqaofBeNUhOUISevtRfOpT` (Bodhi-landing-page-web-handoff)
- Node: `1:9562` — **"Our Centers"**
- Dimensions: **1920 x 2684** (x=16800, y=5169)
- Fetched: 2026-05-22

## MCP calls

| Tool | Status | Notes |
|------|--------|-------|
| `get_metadata` | OK | Full node tree captured |
| `get_design_context` | OK | Returned expanded React+Tailwind tree (~very large); saved to `01_figma_context_node-1-9562.tsx` (verbatim sketch) and structural JSON to `01_figma_context_node-1-9562.json` |
| `get_variable_defs` | OK | Only 3 generic variables: `opacity/100`, `letterSpacing/0`, `radius/16` |
| `get_libraries` | OK | 4 community libraries subscribed (Material 3, Simple Design System, iOS 18, iOS/iPadOS 26) — none are project-specific design tokens |
| `get_screenshot` | OK | 1466x2048 PNG saved to `01_figma_screenshot_node-1-9562.png` (674 KB) |

## Top-level children (3)

1. **`1:9563` — Our Centers section** (1531x1039 @ 195,150)
   - Heading "Our Centers" (45px Instrument Sans Bold) + subtitle "Every woman holds the power to heal, rise, and lead..."
   - Pincode bar (1531x72, rounded-18, glass `rgba(255,255,255,0.82)` + backdrop-blur 30.1px) with placeholder "Enter your pincode to find nearby centers"
   - Locations + Map panel (1531x910, rounded-36, glass)
     - Left list of 11 location labels (Alwal Hills, Bachupally, Bandlaguda, Beeramguda, ESI erragadda, HSR Layout, Indiranagar, Khairatabad Hyderabad, Raghavendra Nagar Kondapur, KPHB Hyderabad) under header "Alwal, Secunderabad, Hyderabad"
     - Vertical divider `#d9d9d9`
     - Right map image (1123x910) using asset `imgRectangle161124062`

2. **`1:9587` — Site header instance** (1416x56 @ centered, top 20)
   - Logo "Bodhi" Fraunces Italic 32 + "School of yoga" uppercase mini-tag
   - Nav: Teacher Courses, Advanced Certifications, Yoga Courses, Workshops, Our Centers, About Us
   - Avatar/icon 44px (`imgGroup1171281692`)
   - CTA "Enquire Now" bg `#8ee0ce` text `#1d3e59` rounded-36

3. **`1:9588` — Footer area** (1920x1302 @ bottom)
   - Mint background `#e5fff9`
   - "Begin where **you are.**" hero (Host Grotesk 108px, "you are." italic in `#10aa88`)
   - Subcopy + primary CTA "Try a class, free" (bg `#27af91`, white text, fully rounded)
   - 3 contact cards (431x220, white, border `rgba(126,126,126,0.18)`, rounded-34):
     - **Free Trial Session** — "50 Mins Session..." → CTA "Join now"
     - **Speak to us** — "Talk to counsellor..." → CTA "Contact us"
     - **Take a Guided Path** — "Our assessment will guide you..." → CTA "Start now"
     - Card CTA tokens: bg `#c7fef2`, text `#004b3b`, rounded-42
   - Site footer 4 columns: **Bodhi** (brand + tagline + URL), **School** (Teacher Training, Workshops, Classes, Faculty, Lineage), **Visit** (address + Get directions), **Stay close** (Newsletter, Instagram, YouTube, Email us)
   - Bottom row: "© Bodhi School of Yoga · Yoga Alliance Registered School (RYS-200, RYS-300)" | "Designed quietly. Practised daily."

## Variable / token references

From `get_variable_defs` (only 3, all generic):
- `opacity/100` = 1
- `letterSpacing/0` = 0
- `radius/16` = 16

No project design-token system is bound at the node level — all colors and typography are inline hex / font-family strings. Token mapping must be inferred by component-extractor.

## Color tokens observed (raw)

- Page bg gradient: `#fafafa` → `#ffffff`
- Glass panels: `rgba(255,255,255,0.82)` + `backdrop-blur-[30.1px]` + border `#e4e4e4`
- Footer bg: `#e5fff9`
- Card bg: `#ffffff`, border `rgba(126,126,126,0.18)`
- Card CTA bg: `#c7fef2`, text `#004b3b`
- Primary CTA bg: `#27af91`, text `white`
- Header CTA bg: `#8ee0ce`, text `#1d3e59`
- Brand italic accent: `#10aa88`
- Body text neutrals: black, `rgba(0,0,0,0.76)`, `rgba(90,90,90,0.72)`, `#4f4f4f`, `#4c4c4c`, `#7b7b7b`, `rgba(24,24,24,0.63)`
- Divider: `#d9d9d9`, footer divider `rgba(47,74,62,0.14)`

## Type tokens observed (raw)

- Families: Fraunces (Italic/Light/Light Italic), Host Grotesk (Regular/Italic), Instrument Sans (Bold/Medium/Regular/SemiBold), Manrope (Regular/Medium/SemiBold/Bold), DM Sans (Regular/Medium/SemiBold)
- Sizes: 11, 12, 12.5, 14, 14.5, 15, 17, 18, 19, 24, 32, 45, 108

## Errors / warnings

None. All five MCP calls succeeded on first attempt.

## Output files

- `_workspace/01_figma_metadata_node-1-9562.json`
- `_workspace/01_figma_context_node-1-9562.json` (structural breakdown)
- `_workspace/01_figma_context_node-1-9562.tsx` (sketch of verbatim MCP code)
- `_workspace/01_figma_variables_node-1-9562.json`
- `_workspace/01_figma_libraries_node-1-9562.json`
- `_workspace/01_figma_screenshot_node-1-9562.png` (1466x2048, 674 KB)
