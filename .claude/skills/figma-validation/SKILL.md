---
name: figma-validation
description: Validation rules for Figma-extracted design data — schema integrity, cross-references between components and tokens, completeness vs source, internal consistency. Use this skill when validating outputs of component-extractor or token-extractor, when running the design-validator agent, or when the user asks to "validate the extracted design data", "check the design extraction", "verify the design tokens", or "audit the component schema". Produces a structured PASS/WARN/FAIL report.
---

# figma-validation

The rule set that the design-validator agent follows when validating Figma extraction outputs (`02_components.json`, `02_tokens.json`). It **goes beyond simple schema validation to perform boundary-crossing checks**.

## Why Boundary-Crossing Checks

Existence-only validation just confirms that "component B has a props array". But real bugs happen at boundaries — a component references a token name that does not exist in the token catalog, or a child's `ref` points to a node that was never registered. These boundary bugs can only be caught by reading both files at the same time and comparing them.

## Validation Categories — 5 Types

### 1. Schema Validation (file-local)

Verify that each file conforms to its own format rules.

#### 1-1. components.json
- Every component must have `id`, `name`, `type`, `props`, `extraction_notes` fields (required)
- `type` ∈ {`component`, `component-set`, `inferred`}
- `props[].type` ∈ {`variant`, `boolean`, `instance-swap`, `text`}
- If `variants` is non-empty, `props` must be non-empty (variants imply a variant prop)
- Each value in `layout.padding` is a number (top/right/bottom/left)
- `extraction_metadata.extracted + skipped == total_candidates`

#### 1-2. tokens.json
- The `tokens` object has exactly 7 keys: `color`, `typography`, `spacing`, `radius`, `effect`, `breakpoint`, `other`
- Every token has `name`, `values`, `references`, `extraction_notes` fields
- `name` uses lowercase ASCII + `/` + digits only (e.g. `brand/primary/500`)
- `color` token `values[mode]` is hex (`#RRGGBB` or `#RRGGBBAA`) or `null`
- `typography` token `values[mode]` has `fontFamily`, `fontSize`, `lineHeight` fields

| Violation Result |
|------------------|
| Required field missing → **FAIL** |
| Enum value violation → **FAIL** |
| Arithmetic mismatch (extracted + skipped ≠ total) → **WARN** |
| Format violation (color is not hex) → **WARN** |

### 2. Cross-reference Validation (file-crossing)

**This is the most important category.** It reads both files at once and compares them.

#### 2-1. token_refs ↔ tokens
Every name in each component's `token_refs[]` must actually exist as a `name` under `tokens.<category>[]`.

Procedure:
1. Collect all `token_refs` from `components.json` → set A
2. Collect all token `name` values from `tokens.json` → set B
3. `A - B` (missing): components reference tokens that don't exist → **FAIL** (re-extraction needed)
4. `B - A` (unused): tokens exist but nothing references them → **WARN** (informational)

Evidence format:
```
Component 'Button' references 'color/brand-500' but tokens.color does not contain this name.
Closest match in tokens: 'brand/primary/500' (Levenshtein distance: 3)
```

If there is a candidate within Levenshtein distance ≤ 3, indicate the "naming mismatch" possibility in the evidence.

#### 2-2. children.ref ↔ components
Each non-null `children[].ref` must actually exist as a `components[].id`.

| Result |
|--------|
| All refs resolved → **PASS** |
| 1–3 refs unresolved → **WARN** + name affected components |
| 4 or more unresolved → **FAIL** |

### 3. Completeness Validation (source vs extracted)

Compare component candidates in the original `01_figma_context.json` against the extracted results.

Procedure:
1. Collect node ids in the context with `type == "COMPONENT"` or `type == "COMPONENT_SET"` → set S
2. Collect all `id` values from `components.json` → set E
3. `S - E` (skipped Figma components): explicit Figma components that the extraction missed
   - 0 missing → **PASS**
   - 1–10% → **WARN**
   - >10% → **FAIL**
4. Inferred ratio: if the share of `components[].type == "inferred"` exceeds 40% → **WARN**
   - Reason: if extraction leans on inference instead of explicit Figma components, accuracy is suspect

Cross-check skip reasons against `extraction_metadata.skip_reasons`. If reasons are recorded, include them in the evidence.

### 4. Consistency Validation (within-file)

Consistency among items within the same file.

#### 4-1. Variant Consistency
All `variants[]` of a component must share the same set of property keys.

```
Button variants:
  - { intent: "primary", size: "lg" }
  - { intent: "secondary" }   ← size missing → WARN
```

#### 4-2. Token Mode Consistency
If one token has multiple modes, other tokens in the same category should share the same mode set.

Example: `color.brand/primary/500` has both light/dark, but `color.brand/primary/600` has only default → **WARN**.

#### 4-3. Name Collisions
Token names must not collide across categories (e.g. `color.button/primary` and `spacing.button/primary`).
On collision → **FAIL**.

### 5. Usability Validation

Heuristics for whether the extraction is actually usable.

| Item | Criterion | Result |
|------|-----------|--------|
| Zero components | components array is empty | **FAIL** |
| Zero tokens (no variables, no styles) | all token categories empty | **WARN** |
| Extracted components < 3 + skipped > 20 | suspected meaningful extraction failure | **WARN** |
| All components inferred | Figma has no explicit components, or recognition failed | **WARN** |

## Report Generation

### JSON Report (`03_validation_report.json`)

```json
{
  "summary": {
    "overall": "PASS | WARN | FAIL",
    "passed": 12,
    "warned": 3,
    "failed": 0,
    "total": 15
  },
  "checks": [
    {
      "id": "schema.components.required-fields",
      "category": "schema",
      "result": "PASS",
      "evidence": "..."
    }
  ],
  "recommendations": ["..."]
}
```

`overall` determination rules:
- One or more FAIL → `FAIL`
- No FAIL + one or more WARN → `WARN`
- All PASS → `PASS`

### Markdown Report (`03_validation_report.md`)

Structure:

```markdown
# Design Extraction Validation Report

## Summary
- **Overall:** PASS | WARN | FAIL
- Passed: N | Warned: N | Failed: N

## Failures
(If none, write "None" — list FAIL items only with detail)

## Warnings
(WARN items with detail)

## Recommendations
1. ...
2. ...

## All checks (collapsed)
| Check ID | Category | Result |
|----------|----------|--------|
| ... | ... | ... |
```

## Generalization Principle

The validation rules in this skill are **generalized at the category level**. When adding a new check, first classify it into one of the five categories. Do not add one-off rules outside these categories — they cannot be reused in other projects.

## Check ID Convention

Format `<category>.<scope>.<rule>`:
- `schema.components.required-fields`
- `cross-ref.token-exists`
- `completeness.figma-components-extracted`
- `consistency.variant-props`
- `usability.inferred-ratio`
