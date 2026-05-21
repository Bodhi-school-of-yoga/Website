# Bodhi — Project Instructions

Bodhi is a yoga-brand site built on Next.js (`apps/web`) + Strapi CMS (`apps/cms`) + PostgreSQL.

## Harness: Codebase Understanding & Graph Generation

**Goal:** Pack the codebase with repomix and have a team of specialist agents produce a module/dependency graph + narrative documentation.

**Trigger:** When the user wants to understand the codebase structure, map dependencies, visualize architecture, or run any repomix-based analysis, use the `codebase-graphify` skill. Simple file-location questions can be answered directly.

**Output locations:**
- Intermediate artifacts: `_workspace/`
- Final docs: `docs/codebase-graph.md`, `docs/codebase-graph.json`

**Change log:**
| Date | Change | Target | Reason |
|------|--------|--------|--------|
| 2026-05-21 | Initial setup — repomix-runner, structure-mapper, dependency-analyzer, graph-synthesizer + codebase-graphify orchestrator | Whole harness | Codebase-understanding / graphify request |

## Harness: Figma Design Component Extraction & Validation

**Goal:** Extract design component / token data from Figma via the Figma MCP, with a validation layer to guarantee output quality.

**Trigger:** When the user shares a Figma URL and asks to extract components/tokens, export a design system, generate component-spec JSON, or run the validation report, use the `figma-extract` skill. To re-run validation only, the `figma-validation` skill can be invoked directly. For design-to-code work, use `/figma-generate-design` instead.

**Output locations:**
- Intermediate artifacts: `_workspace/` (00_input, 01_figma_*, 02_components/tokens, 03_validation_report)
- Final docs: `docs/design-system.md`, `docs/design-system.json`

**Change log:**
| Date | Change | Target | Reason |
|------|--------|--------|--------|
| 2026-05-21 | Initial setup — figma-fetcher, component-extractor, token-extractor, design-validator + figma-extract orchestrator + figma-validation skill | Whole harness | Figma design data extraction + validation layer request |

## Harness: Figma → design.md Generation (AI Coding Context Doc)

**Goal:** Produce a single `design.md` file (Google's AI-coding-tool design spec) by fusing local design tokens (CSS / Tailwind / JSON / theme files) with optional Figma MCP enrichment. The output is a context document that Claude Code / Cursor / Copilot read to make visually-consistent decisions.

**Trigger:** When the user asks to "generate design.md", "create design.md from Figma", "build the design system doc", "refresh design.md", "make a design context doc", or "convert Figma design system to design.md", use the `figma-to-design-md` skill. For raw Figma → JSON extraction use `figma-extract` instead; for design-to-code use `/figma-generate-design`.

**Output locations:**
- Intermediate artifacts: `_workspace/` (00_input, 01_tokens_*, 01_figma_*, 02_design_draft, 03_review_report)
- Final doc: `./design.md` (or user-specified path)

**Change log:**
| Date | Change | Target | Reason |
|------|--------|--------|--------|
| 2026-05-21 | Initial setup — token-collector, figma-token-enhancer, design-md-composer, design-md-reviewer + figma-to-design-md orchestrator + design-md-spec reference skill | Whole harness | design.md generation harness based on albertzhangz10/figma-design-system-to-design-md |
