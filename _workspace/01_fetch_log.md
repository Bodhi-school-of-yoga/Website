# Figma Fetch Log

**Date:** 2026-05-21
**Agent:** figma-fetcher
**Input:** `_workspace/00_input.json` — file `eqaofBeNUhOUISevtRfOpT`, node `1:246`
**Source URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-246&m=dev

## Status: SUCCESS — all calls returned, files written

Auth confirmed via `whoami`: `tech@wokay.com` (Wokay Design Lab, Pro tier). The previous BLOCKED run is superseded by this fetch.

## Calls executed (sequential, no parallel — per spec)

| # | MCP call | Status | Output file | Bytes |
|---|---|---|---|---|
| 1 | `whoami` | OK | (inline; not saved) | — |
| 2 | `get_metadata` (1:246) | OK | `/Users/anukul/Desktop/bodhi/_workspace/01_figma_metadata.json` | ~2.5 KB |
| 3 | `get_design_context` (1:246) | OK | `/Users/anukul/Desktop/bodhi/_workspace/01_figma_context.json` | ~6.4 KB |
| 4 | `get_variable_defs` (1:246) | OK — empty `{}` | `/Users/anukul/Desktop/bodhi/_workspace/01_figma_variables.json` | 3 B |
| 5 | `get_libraries` | OK | `/Users/anukul/Desktop/bodhi/_workspace/01_figma_libraries.json` | ~1.9 KB |
| 6 | `get_screenshot` (1:246, maxDimension=1024) | OK | `/Users/anukul/Desktop/bodhi/_workspace/01_figma_screenshot.png` | ~162 KB (510×472 PNG) |

No retries were required. No failures recorded.

## Notes for downstream agents

- **Variables empty (`{}`):** `get_variable_defs` returned an empty object. This node uses **raw hex colors and pixel values inline** — no bound Figma variables. The `token-extractor` must derive tokens from literal values in `01_figma_context.json` (e.g. `#2f4a3e`, `#7a6e65`, `#c8a96e`, `#009877`, `rgba(47,74,62,0.22)`, `rgba(0,0,0,0.08)`, shadow `rgba(226,226,226,0.25)`). The `{}` (vs `null`) signals "successfully fetched, no data" per spec.
- **Libraries:** Only generic community libraries are subscribed (Material 3, Simple Design System, iOS 18, iOS 26). None contribute components/tokens to this Article node — the Bodhi system is bespoke and inlined.
- **Asset URLs (7-day expiry):** Gradient image + 3 inline SVGs + the screenshot are hosted at `https://www.figma.com/api/mcp/asset/...`. If the downstream pipeline runs past **2026-05-28**, re-fetch via `get_design_context`.

## Card node structure (from get_design_context + screenshot)

- **Root frame** `Article` (1:246): 413×375. White background, border `1.098px rgba(0,0,0,0.08)`, radius `24.151px`, shadow `0 4px 48.3px rgba(226,226,226,0.25)`, `overflow-clip`. Vertical flex; padding `pt-[22.098px] pb-[24.098px] px-[31.836px]`.
- **Top media slot** `Gradient` (1:247): Full-width image positioned absolutely (`inset-[-88.33px_-1.1px_180.14px_-1.1px]`) — effectively a ~281px-tall media area filling the upper portion of the card. Screenshot shows a photo of a woman in tree pose against a misty forest. The name "Gradient" + clipped overflow suggests an image-over-gradient pattern.
- **Content block** `Frame 1171281042` (1:248): Lower ~140px. Contains heading + meta + CTA divider.
  - **Title** (1:251): `Pranayama & the nervous system` — Instrument Sans SemiBold, 23px, color `#2f4a3e` (deep forest green), wraps to two lines.
  - **Meta row** (1:252): Three icon+label pills separated by 3×3 gold bullets `#c8a96e @ 50% opacity`. Pills: `4 weeks`, `Online`, `English`. Each = 13×13 SVG icon + DM Sans Medium 14px label in `#7a6e65` (warm brown), gap 5px, row gap 14px, wraps if needed.
  - **Divider + CTA** (1:270): Dashed top border `1.098px rgba(47,74,62,0.22)`, `pt-[16.467px]`. Left: `View Program →` link — Manrope Medium 14.271px, color `#009877` (teal). Right: empty 117×23 container (a reserved slot, likely for a secondary action / badge / price).

## Layout summary for component-extractor

- **Variant:** image-top card (NOT side-by-side). Media occupies top ~55% of card; content stacks below.
- **Slots:** (1) media/gradient, (2) heading, (3) meta-list (repeatable icon+label item w/ separator), (4) footer row with primary text link + right-side empty slot.
- **Tokens to derive:** colors `forest-green #2f4a3e`, `warm-grey #7a6e65`, `gold #c8a96e`, `teal/cta #009877`, `divider rgba(47,74,62,0.22)`, `border rgba(0,0,0,0.08)`, `shadow rgba(226,226,226,0.25)`; radius `24px`; shadow `0 4px 48.3px ...`; type families Instrument Sans (display), DM Sans (meta), Manrope (CTA).

## Cache / re-run

No prior populated payloads existed (previous run had written `null` placeholders). This run overwrites those with real data. A subsequent run on the same nodeId should reuse `_workspace/01_figma_context.json` unless an explicit refresh is requested.
