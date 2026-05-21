---
name: figma-to-design-md
description: Generates a single design.md file (Google's AI-coding-tool design spec) by collecting local design tokens from CSS/Tailwind/JSON/theme files and optionally enriching with Figma MCP data. Orchestrates a 4-agent team — token-collector ∥ figma-token-enhancer → design-md-composer → design-md-reviewer — and writes ./design.md (or a user-specified path). Use this skill when the user asks to "generate design.md", "create design.md from Figma", "build the design system doc", "make design.md from our tokens", "summarize the design system into one file", "create a design context doc for Claude/Cursor", or "convert Figma design system to design.md". Also use for follow-ups: "regenerate design.md", "update the colors section", "refresh design.md from Figma", "re-run the design.md audit", "rebuild the design.md after token changes". NOT for data extraction (use figma-extract), design-to-code (use /figma-generate-design), or codebase architecture (use codebase-graphify).
---

# figma-to-design-md (Orchestrator)

Build a single `design.md` that an AI coding agent (Claude Code, Cursor, Copilot) can read to make visually-consistent decisions. Source of truth = local token files + optional Figma MCP data, fused into the canonical design.md schema with section-by-section traceability.

## What This Is Not

- **Not raw extraction**: It does not dump Figma into JSON. → Use `figma-extract`.
- **Not design-to-code**: It does not produce React components. → Use `/figma-generate-design`.
- **Not codebase analysis**: It does not map dependencies. → Use `codebase-graphify`.

This skill is for **AI-coding-tool context documentation**. The output is a single markdown file that lives at the project root and is read by downstream coding agents.

## Execution Mode: Agent Team

Build a 4-member team with `TeamCreate`. `token-collector` and `figma-token-enhancer` run in parallel after the team is constructed. `design-md-composer` waits for both. `design-md-reviewer` audits the composer's draft.

Pass `model: "opus"` to every Agent call.

## Team Composition

| Agent | Role | Input | Output |
|-------|------|-------|--------|
| `token-collector` | Scan + parse local token sources | project root, scan-scope hint | `_workspace/01_tokens_*.json`, `01_collection_log.md` |
| `figma-token-enhancer` | Optional Figma MCP enrichment | `figmaUrl` (optional) | `_workspace/01_figma_*.json`, `01_figma_log.md` |
| `design-md-composer` | Compose the design.md draft | both inventories | `_workspace/02_design_draft.md`, `02_compose_log.md` |
| `design-md-reviewer` | Audit the draft (5 dimensions) | draft + inventories | `_workspace/03_review_report.{json,md}` + verdict |

## Workflow

### Phase 0: Context Check

Decide the execution mode based on `_workspace/` state and user intent.

| Condition | Mode |
|-----------|------|
| `_workspace/` missing | **Initial run** — build everything from scratch |
| `_workspace/` exists + user requests "regenerate" / "refresh from Figma" / new Figma URL | **Fresh run** — move `_workspace/` → `_workspace_prev/`, then initial run |
| `_workspace/` exists + user requests partial edit ("just update colors", "re-check Typography") | **Partial re-run** — invoke only the relevant agent(s); reuse cached artifacts |
| `_workspace/` exists + user just says "run it again" | Ask: full refresh or partial? Default to partial if no Figma URL changed. |

Print one-line status: `mode=<initial|fresh|partial>`.

### Phase 1: Input Capture

1. Collect inputs from the user message:
   - `figmaUrl` (optional) — any URL on `figma.com`
   - `outputPath` (optional) — defaults to `./design.md`
   - `components` flag (optional) — `true` if the user mentioned components/variants explicitly
   - `scanScope` (optional) — explicit path hint like "only apps/web"
2. If anything ambiguous is missing (e.g., the user said "use our Figma" but didn't paste a URL), ask **one** clarifying question. Otherwise proceed.
3. Write `_workspace/00_input.json`:
   ```json
   {
     "figmaUrl": "<or null>",
     "outputPath": "./design.md",
     "components": false,
     "scanScope": null,
     "timestamp": "<ISO>"
   }
   ```

### Phase 2: Team Construction + Parallel Collection

1. Create the team with `TeamCreate` containing all 4 agents (all `model: "opus"`).
2. Dispatch in parallel:
   - `token-collector` — scan local token sources, write `01_tokens_*.json`.
   - `figma-token-enhancer` — if `figmaUrl` is present, fetch via Figma MCP; otherwise emit empty outputs and exit cleanly.
3. Wait for both to signal completion (the figma agent emits an explicit "skipped" signal even when there's no URL).

### Phase 3: Composition

1. Dispatch `design-md-composer` with both inventories now on disk.
2. The composer merges, selects, writes `_workspace/02_design_draft.md` + `02_compose_log.md`, and signals the reviewer.

### Phase 4: Review

1. Dispatch `design-md-reviewer` against the draft + inventories.
2. The reviewer returns a verdict: `APPROVED`, `EDITS_REQUESTED`, or `BLOCKED`.

### Phase 5: Iteration or Promotion

| Verdict | Action |
|---------|--------|
| `APPROVED` | Composer copies the draft to `outputPath`. Skip to Phase 6. |
| `EDITS_REQUESTED` | Composer applies suggested fixes for `major` findings, then re-submits the draft. Re-run Phase 4. Max 2 iterations. |
| `BLOCKED` | Stop. Show the reviewer's critical findings to the user. Ask whether to (a) fix and retry, (b) promote with TODO markers, or (c) abort. |

After 2 iteration rounds with unresolved `major` findings, escalate to the user — do not loop infinitely.

### Phase 6: Promotion + Summary

1. Confirm the file exists at `outputPath` (default `./design.md`).
2. Print a one-paragraph summary to the user:
   - Sources scanned (count + paths)
   - Figma file used (or "none")
   - Tokens by category (counts)
   - Conflicts surfaced (count + names)
   - Review verdict
   - Output path
3. Offer next steps: regenerate a specific section, add Figma, refine Overview.

### Phase 7: Cleanup

Keep `_workspace/` intact for audit / partial re-runs. Do not delete it.

## Data Flow

```
00_input.json
   ├─→ token-collector ─→ 01_tokens_normalized.json
   │                       01_tokens_grouped.json
   │                       01_token_sources.json
   │                       01_collection_log.md
   │
   └─→ figma-token-enhancer ─→ 01_figma_tokens_normalized.json
                                 01_figma_raw.json
                                 01_figma_components.json (optional)
                                 01_figma_log.md

      [merge]──→ design-md-composer ─→ 02_design_draft.md
                                        02_compose_log.md

                  └─→ design-md-reviewer ─→ 03_review_report.json
                                              03_review_report.md
                                              verdict

                     [APPROVED]──→ promote draft to ./design.md
```

## Error Handling

| Error | Strategy |
|-------|----------|
| No local token sources detected AND no Figma URL | Abort with a clear message: "No design tokens found. Provide a Figma URL or point me at a token file." |
| No local tokens but Figma URL present | Proceed with Figma-only; note in the Sources section that no local tokens were found. |
| Local tokens present, Figma fetch fails (auth/404) | Proceed local-only. Log the Figma failure in `00_input.json` and surface it in the final summary so the user can re-auth and re-run. |
| Composer produces an empty draft (both inventories empty) | Skip the reviewer; show the user the empty result and ask whether to abort. |
| Reviewer returns `BLOCKED` twice in a row on the same findings | Stop; surface the findings to the user and ask for guidance. |
| `_workspace/` write fails | Hard error. Most likely a permissions issue — surface immediately. |

**Conflict policy**: Never silently resolve. If two sources disagree on a token's value, both rows surface in the composed file with a `⚠ Conflicts` callout. The reviewer verifies this. The human resolves it.

## Test Scenarios

### Happy path: local-only project
- Input: `apps/web/styles/globals.css` with 30 CSS variables, `tailwind.config.ts` with theme.extend.colors and theme.extend.spacing. No Figma URL.
- Expected: `./design.md` with Colors (palette + semantic if names match), Typography (whatever was in Tailwind), Spacing, Border Radius, Border Width. Components section says "_No data_". Sources section lists the 2 files. Review verdict: APPROVED.

### Happy path: Figma + local
- Input: Figma URL with 12 color variables across light/dark modes + local Tailwind with spacing. Components flag NOT set.
- Expected: Colors section has multi-mode rows (Light / Dark columns), Sources section lists Figma file + local Tailwind file, Components section says "_No data_" (flag not set).

### Conflict surfacing
- Input: `globals.css` defines `--color-primary: #ff6600`, Figma defines `color-primary = #f97316`.
- Expected: Colors section table contains both rows, the section opens with a `⚠ Conflicts` callout, reviewer flags this as `major` if not surfaced.

### Empty state
- Input: project with no token files and no Figma URL.
- Expected: Skill stops at Phase 1 with a clear message, asks the user to provide a source. Does not write design.md.

### Partial re-run
- Input: existing `_workspace/`, user says "just update the Colors section".
- Expected: Only token-collector + composer + reviewer re-run; figma-token-enhancer reuses cache; only the Colors section in `./design.md` is rewritten.

### Auth failure on Figma
- Input: valid local tokens + a Figma URL the user is not authenticated for.
- Expected: token-collector succeeds, figma-token-enhancer signals "skipped (auth)", composer proceeds local-only, final summary surfaces the auth issue with a re-run hint.

## Re-run Hints

- "regenerate design.md" → fresh run
- "update the colors section" → partial: token-collector → composer (colors-only) → reviewer (dimension 1,2,3 only)
- "refresh from Figma" → fresh run, force figma-token-enhancer to bypass cache
- "include components" → partial: figma-token-enhancer with `--components` → composer (components section only) → reviewer
- "re-audit only" → partial: reviewer-only against existing draft

## See Also

- `design-md-spec` skill — canonical design.md format reference (loaded by composer + reviewer).
- `figma-extract` skill — pure Figma → JSON extraction; complementary, not a replacement.
- `codebase-graphify` skill — codebase architecture / dependency mapping; orthogonal.
