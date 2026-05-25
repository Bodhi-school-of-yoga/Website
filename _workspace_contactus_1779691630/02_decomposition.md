# Contact Us — Section Decomposition

**Figma node:** `1:4470` ("Contact us")
**Frame:** 1920 × 1854
**Route:** `/contact` (`apps/web/src/app/contact/page.tsx`)

The page is a thin composition of 4 top-level blocks. Only the middle block (`ContactSection` + children) needs code changes. Header, final CTA, and footer reuse as-is.

## Sections (top → bottom)

### 1. Site Header — `reuse-as-is`
- Figma: `353:13765` at (228, 20), 1464×56
- File: `apps/web/src/components/site-header.tsx`
- Existing instance already matches. Nav items + "Enquire Now" pill confirmed.

### 2. Contact Section — `extend` (3 files)
- Figma: `1:4599` at (261, 168), 1399×681
- Outer layout: `flex flex-col gap-[41px] items-start`
- Hero block on top (892w), two-column row below: left 620w / right 710w, gap 59px

#### 2a. `ContactSection` — `extend` (`contact-section.tsx`)
Hero copy block currently nests inside the left column ABOVE the info cards. Figma puts the hero on its own row, full 892px wide, with the two-column grid (info cards | form) BELOW it. Restructure required.

Other deltas:
- Hero paragraph max-width 892px (not `max-w-xl`)
- Title is the page `h1` (Host Grotesk Bold 60px, leading 58px)
- Info-card list gap 13px (not 20px)
- Grid column gap 59px on lg+ (not 80/120px)
- Office address: drop the `\n` line break — single string in Figma

Content props (verbatim):
- `eyebrow`: `23 courses`
- `title`: `Contact us`
- `subhead`: `Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga.`

#### 2b. `ContactInfoCard` — `extend` (`contact-info-card.tsx`) × 3
- Radius 23px (not `rounded-2xl`), bg `#fff` + backdrop-blur 30.1px, border `rgba(178,178,178,0.32)`
- Label color mint `#00af88` (uppercase, tracking 2.42px, Manrope 12px)
- Value `#000`, DM Sans Medium 20px
- Mobile/email cards are 84px tall, office card is 117px (two-line value) — drive via padding

Cards:
1. `phone` · `MOBILE NUMBER` · `+ 91 98703 47348` · `tel:+919870347348`
2. `mail` · `EMAIL` · `info@bodhischoolofyoga.com` · `mailto:info@bodhischoolofyoga.com`
3. `map-pin` · `OFFICE LOCATION` · `6-3-571/1 2, 1st Floor, Rockvista, Rockdale, 6-3-571/1 2, Hyderabad, Telangana-500082` · `null`

#### 2c. `ContactForm` — `extend` (`contact-form.tsx`)
**Structural change:** remove `lastName` and the `message` textarea. Figma has 4 single-line fields:

| Name | Label | Placeholder | Type | Required |
|---|---|---|---|---|
| firstName | First name | Your name | text | yes |
| mobile | Mobile number | + 91  8123456789 | tel | no |
| email | Email | you@example.com | email | yes |
| helpWith | What can we help with? | Course details, partnerships, scheduling… | text | no |

- Labels are VISIBLE above inputs (drop `sr-only`). DM Sans Light 16px, color `#122e29`, 9px gap to input.
- Field gap: 21px. Form-to-submit gap: 26px.
- Input: h-16, radius **18px** (not 16), bg `rgba(247,247,247,0.82)` + backdrop-blur 30.1px, border `#e4e4e4`.
- Placeholder: DM Sans 18px, color `#738080`.
- Submit: full-width, h-16, radius 18px, bg `#8ee0ce` (brand-shade), text `#243a42` (brand-dark), DM Sans SemiBold 16px, label `Send Message`.

### 3. Final CTA — `reuse-as-is`
- Figma: `339:9058` at (292, 1047), 1337×306
- File: `apps/web/src/components/sections/footer-brand-cta.tsx`
- Headline: `Begin where ` + italic mint accent `you are.` (Host Grotesk 90px, accent `#8ee0ce`)
- Paragraph: `Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that.`
- CTA pill: `Try a class, free` (bg `#8ee0ce`, text `#00282c`, radius 999, 197×51.7)
- If existing copy doesn't match, downgrade to `extend`.

### 4. Footer — `reuse-as-is`
- Figma: `339:9003` at (0, 948), 1920×906
- File: `apps/web/src/components/site-footer-block.tsx`
- 4 columns (Brand / School / Visit / Stay close) + copyright row. Existing component matches.

## Page Assembly (`apps/web/src/app/contact/page.tsx`)

```tsx
<SiteHeader />
<ContactSection
  eyebrow="23 courses"
  title="Contact us"
  subhead="Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga."
  infoCards={DEFAULT_CONTACT_CARDS}
/>
<FooterBrandCta />
<SiteFooterBlock />
```

## Token Mapping Reminders (from `01_figma_variables.json`)

| Raw | Token |
|---|---|
| `#000000` headlines/values | `text-text-primary` |
| `#00af88` info-card label / `#8ee0ce` brand mint | `text-text-brand` / `bg-brand-shade` |
| `rgba(21,21,21,0.67)` hero paragraph | `text-text-tertiary` |
| `#738080` placeholder | `text-text-tertiary` (verify) |
| `#122e29` form label | `text-text-primary` (verify a dark teal token) |
| `rgba(247,247,247,0.82)` input bg | `bg-surface-1` (verify) |
| `#e4e4e4` input border | `border-border-3` |
| `rgba(178,178,178,0.32)` card border | `border-border-2` (verify) |
| `#00282c` footer / pill text | `bg-surface-dark` / `text-brand-dark` |

## Uncertainties
1. `What can we help with?` field — Figma height 64px (single-line) but copy implies longer-form. Decision: single-line input (per user spec).
2. `footer-brand-cta.tsx` reuse — assumes existing copy matches. Builder should verify before classifying as `reuse-as-is`.
3. Hero subhead reads like a teacher-training tagline, not a contact-page subhead — verbatim from Figma; flag for content review.

## Summary

| Section | Kind | Files |
|---|---|---|
| Site Header | reuse-as-is | 0 |
| Contact Section | extend | 3 (contact-section / contact-info-card / contact-form) |
| Final CTA | reuse-as-is | 0 |
| Footer | reuse-as-is | 0 |

**Total files to edit: 3.** No new components needed.
