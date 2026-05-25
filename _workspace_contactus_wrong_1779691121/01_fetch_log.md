# Figma fetch log — Contact Us page

- **Date**: 2026-05-25
- **File key**: `eqaofBeNUhOUISevtRfOpT`
- **Requested node**: `1-4470` (per `_workspace/00_input.json`)
- **Frame name**: `Contact us` — 1920 x 1854 desktop frame
- **URL**: https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-4470&m=dev

## Results

| Step | Tool | Status | Output |
| --- | --- | --- | --- |
| 1 | `get_metadata` | OK | `01_figma_metadata.json` — full node tree (header, contact section, footer, final CTA) |
| 2 | `get_design_context` | OK | `01_figma_context.json` — structured spec + raw Tailwind/React reference, image asset URLs |
| 3 | `get_variable_defs` | OK (empty) | `01_figma_variables.json` — `{}` returned. No design variables bound. Raw literal styles only — map to Bodhi tokens at implementation. |
| 4 | `get_libraries` | OK | `01_figma_libraries.json` — file has Material 3, Simple Design System, iOS 18, iOS 26 attached; none used in this frame. |
| 5 | `get_screenshot` (maxDimension 4096) | OK | `01_figma_screenshot.png` — 1920 x 1854 PNG, 152 KB (Figma capped at natural canvas size of 1920px). |

## Frame structure summary

Top-level children of `1:4470`:

1. **Site header instance** (`353:13765`) — reused from existing pages, no work needed. Nav: Teacher Courses, Advanced Certifications, Yoga Courses, Workshops, Our Centers, About Bodhi. Right cluster: search icon + `Enquire Now` mint pill (#8ee0ce).
2. **Contact us section** (`1:4599`) at `(261, 168)` — two-column layout (1399px wide):
   - **Hero block** (`1:4600`, width 892): `23 courses` eyebrow + `Contact us` 60px headline + 16px supporting paragraph.
   - **Two-column row** (`1:4609`, gap 59px):
     - **Left column** (width 620): three white info cards (radius 23, backdrop-blur 30.1px, border `rgba(178,178,178,0.32)`) — mobile (1:4611), email (1:4622), office (1:4630). Each has a mint eyebrow label `#00af88` + DM Sans Medium 20px value. Office card is 117px tall (two-line value); the other two are 84px.
     - **Right column** (width 710): contact form with four fields (First name, Mobile number, Email, What can we help with?) — each 64px-tall pill input (radius 18, bg `rgba(247,247,247,0.82)`, border `#e4e4e4`, backdrop-blur 30.1px, DM Sans Light 16px label `#122e29`, placeholder `#738080` DM Sans 18px). Submit button `Send Message`: full-width 64px, bg `#8ee0ce`, text `#243a42` DM Sans SemiBold 16px, radius 18. Field gap 21px, form→button gap 26px.
3. **Final CTA block** (`339:9058`) at `top:1047` inside footer — centered: italic `Bodhi` wordmark (Fraunces 32px) + huge `Begin where you are.` headline (Host Grotesk 90px, italic accent `you are.` in `#8ee0ce`) + supporting paragraph (Manrope 18px, white 63% opacity) + `Try a class, free` mint pill (197x52, radius 999).
4. **Footer** (`339:9003`) — full-width `#00282c` block, brand + 3 link columns (School / Visit / Stay close) + horizontal divider row (copyright + tagline). Identical to existing site footer block — reuse without edits.

## Image assets referenced

- Phone icon (`imgPhoneCallRingingIconlyPro`)
- Email icon (`imgEmailIconlyPro`)
- Location icon (`imgLocation`)
- Arrow-Up 2 icon (`imgArrowUp2`, used in header dropdown chevrons — already in codebase)
- Header avatar/search (`imgGroup1171281692`)

Asset URLs (7-day TTL) are captured in `01_figma_context.json#image_assets`.

## Notes for downstream agents

- `get_variable_defs` returned `{}` — the frame uses raw hex/rgba values throughout. The token mapping table in `01_figma_variables.json#note` lists every raw value the implementation must convert to Bodhi tokens.
- The `First name` label is the only first-name field present in the design — the input spec said "first name / last name" but Figma shows only **First name, Mobile number, Email, What can we help with?**. There is no Last Name field, and there is no separate Phone vs Mobile field. Implementer should confirm with product before adding extras.
- The `What can we help with?` field renders at the same 64px input height in Figma (visually a single-line input with a long placeholder); a multi-line textarea would deviate from Figma. Consider clarifying with design.
- Final CTA + footer match existing `footer-brand-cta.tsx` + `site-footer-block.tsx`. Reuse rather than rebuild.
- No issues encountered. All MCP calls succeeded on the first attempt.
