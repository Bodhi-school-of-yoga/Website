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

## Harness: Figma → Component (Design-to-Code Implementation)

**Goal:** Turn a Figma frame URL into working React/Tailwind components in `apps/web/`, reusing existing primitives where possible and building only what's missing — verified against the Figma reference.

**Trigger:** When the user shares a Figma URL with intent to implement ("build this", "make components from this Figma", "convert this design to code", "implement this page"), or asks to rebuild/extend a section from Figma, use the `figma-to-component` skill. For raw extraction-only use `figma-extract`; for design-system docs use `figma-to-design-md`.

**Output locations:**
- Intermediate artifacts: `_workspace/` (00_input, 01_figma_*, 02_decomposition + scout, 03_build_plan, 04_build_log, 05_qa_report)
- Final code: `apps/web/src/components/sections/*.tsx`, `apps/web/src/components/ui/*.tsx`, `apps/web/src/app/demo/<section>/page.tsx`

**Change log:**
| Date | Change | Target | Reason |
|------|--------|--------|--------|
| 2026-05-22 | Initial setup — section-decomposer, codebase-scout, build-planner, component-builder, visual-qa + figma-to-component orchestrator (reuses figma-fetcher) | Whole harness | Design-to-code implementation pipeline request |
| 2026-05-22 | Added interaction-designer agent (Phase 2.5); extended build-planner / component-builder / visual-qa / orchestrator to plan, apply, and verify motion + actions | agents/interaction-designer.md, agents/build-planner.md, agents/component-builder.md, agents/visual-qa.md, skills/figma-to-component/SKILL.md | User requested animations + actions as first-class step |

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
