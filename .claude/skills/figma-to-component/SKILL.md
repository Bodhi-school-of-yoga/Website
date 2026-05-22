---
name: figma-to-component
description: Generates production React/Tailwind components from a Figma URL by understanding the design, decomposing it into sections, checking the codebase for reusable primitives, planning motion + interactions, and building only what's missing. Trigger when the user says "build this Figma page", "implement this design", "make components from Figma URL", "convert Figma to code", "build sections from <figma url>", "design to code", or shares a figma.com/design URL with intent to implement. Also triggers on motion/interaction phrases like "with animations", "make it interactive", "add hover states", "use the navigation and actions from Figma", "include the prototype interactions", "animate this", "make the buttons clickable". Also triggers on refresh/rebuild/extend requests like "rebuild the hero section from Figma", "regenerate the modules section", "redo just the interactions on the cards", or "the build plan needs to skip Card extension".
---

# figma-to-component — Design-to-Code Orchestrator

Convert a Figma frame into working React components in `apps/web/`. Reuse existing primitives where possible; build what's missing against DESIGN.md tokens; verify visually against the Figma reference.

This is **design-to-code implementation**. For raw extraction → JSON, use `figma-extract`. For design system documentation, use `figma-to-design-md`.

## Pipeline (hybrid execution)

```
Phase 1   — figma-fetcher                     [sub-agent]
   ↓ raw context + screenshot in _workspace/01_*
Phase 2   — section-decomposer                [sub-agent]
   ↓ _workspace/02_decomposition.json
Phase 2.5 — interaction-designer              [sub-agent]
   ↓ _workspace/02_interactions.json
Phase 3   — codebase-scout                    [sub-agent]
   ↓ _workspace/02_codebase_scout.json
Phase 4   — build-planner                     [sub-agent]
   ↓ _workspace/03_build_plan.json (interaction spec inlined into each task)
Phase 5   — component-builder × N             [PARALLEL sub-agents, one per task]
   ↓ .tsx files + _workspace/04_build_log.md
Phase 6   — visual-qa                         [sub-agent]
   ↓ _workspace/05_qa_report.json (audits both visual + interaction)
Phase 7   — orchestrator decides:
   - pass → report success, stop
   - pass-with-minor → report, ask user
   - fail → loop a targeted component-builder re-run for the failed tasks (max 2 retry rounds)
```

**Mode:** sub-agent dispatch throughout; Phase 5 uses `run_in_background: true` for parallel builders. No team needed — each phase has clear file-based handoff and no inter-agent chatter required.

**Model:** every Agent call sets `model: "opus"`.

## Phase 0 — Context check (before Phase 1)

Decide the run mode by inspecting `_workspace/`:

| Condition | Mode | Action |
|---|---|---|
| `_workspace/` empty or missing | **Initial** | Run all phases. |
| `_workspace/01_figma_*.json` exists + same nodeId requested | **Resume** | Skip Phase 1, start at Phase 2. |
| `_workspace/02_decomposition.json` exists + user asks to revise plan | **Partial** | Re-run from the affected phase (e.g., decomposer → planner → builder). |
| `_workspace/02_interactions.json` exists + user asks to redo motion/actions only | **Interaction-only** | Re-run interaction-designer → build-planner → component-builder (motion-relevant tasks only). |
| `_workspace/05_qa_report.json` exists + user asks "fix the issues" | **Fix loop** | Re-dispatch component-builder for the failed tasks only. |
| New Figma URL provided | **Reset** | Move existing `_workspace/` to `_workspace_prev/`, start fresh. |

Always confirm the mode with one short line back to the user before kicking off, unless the user already explicitly stated it.

## Workflow

### Phase 1 — Fetch
- Write `_workspace/00_input.json` with `{ figma_url, file_key, node_id }`.
- Dispatch the existing `figma-fetcher` agent (model: opus). It writes `01_figma_metadata.json`, `01_figma_context.json`, `01_figma_variables.json`, `01_figma_screenshot.png`.
- On auth failure, surface the error and stop — the user must reconnect Figma.

### Phase 2 — Decompose
- Dispatch `section-decomposer` (model: opus) with the workspace path.
- It reads `01_*` files and writes `02_decomposition.json` + `02_decomposition.md`.
- Show the decomposition summary to the user. **Pause here** if the user asked to review before building (e.g., they said "decompose it first").

### Phase 2.5 — Design interactions
- Dispatch `interaction-designer` (model: opus) with the workspace path.
- It reads `01_figma_metadata.json` (for any prototype/reaction data), `01_figma_context.json`, and `02_decomposition.json`, then writes `02_interactions.json` + `02_interactions.md`.
- If the user explicitly said "no animations" or "static only", skip this phase and proceed.
- Show the interaction summary briefly (motion library chosen + count of actions/motions). If the `unresolved[]` list is non-empty (guessed hrefs/targets), surface it and ask the user to confirm or correct before Phase 4.

### Phase 3 — Scout the codebase
- Dispatch `codebase-scout` (model: opus).
- It writes `02_codebase_scout.json` — for each proposed component, action = `reuse-as-is` | `extend` | `new`.

### Phase 4 — Plan the build
- Dispatch `build-planner` (model: opus).
- It reads `02_decomposition.json`, `02_codebase_scout.json`, AND `02_interactions.json` (if present) — inlining the interaction block into each task.
- It writes `03_build_plan.json` + `03_build_plan.md`.
- Show the plan summary. Confirm with the user if the plan has >5 tasks, otherwise proceed.

### Phase 5 — Build (parallel)
- Read `03_build_plan.json`.
- Group tasks by `parallel_group`. For each group, dispatch one `component-builder` per task with `run_in_background: true`, passing the task spec in the prompt and `model: "opus"`.
- Wait for the group to complete before dispatching the next group (dependencies are encoded in `depends_on`).
- After each group, read `_workspace/04_build_log.md` — if any line says `BLOCKED:`, stop and report to the user.

### Phase 6 — Visual QA
- Start the dev server (`yarn dev` or `pnpm dev` in `apps/web`) in the background, capture the URL, save the PID.
- Dispatch `visual-qa` (model: opus). It screenshots the demo pages, compares to Figma, writes `05_qa_report.json`.
- Stop the dev server after QA completes.

### Phase 7 — Verdict & loop
- Verdict `pass` → final report to user.
- Verdict `pass-with-minor` → final report + list of minor findings; ask user whether to fix.
- Verdict `fail` → re-dispatch component-builder for failed tasks (each with the QA finding inlined into the spec). Re-run visual-qa. Max 2 rounds before reporting unresolved issues to the user.

## Data flow

All inter-agent communication is **file-based** through `_workspace/`. Naming: `{phase}_{artifact}.{ext}`. Final code goes to `apps/web/src/components/` and `apps/web/src/app/demo/`.

## Error handling

| Failure | Strategy |
|---|---|
| figma-fetcher auth | Stop. User must reconnect. |
| section-decomposer produces empty sections[] | Re-fetch with deeper context; if still empty, ask user to confirm nodeId. |
| interaction-designer produces all-unresolved actions | Continue, but surface the unresolved list before Phase 4 so user can supply hrefs/state names. |
| codebase-scout finds nothing for an "extend" candidate | Demote to "new" in the build plan, continue. |
| component-builder reports BLOCKED on a token | Add the token to DESIGN.md only with explicit user approval; otherwise use the closest existing token and flag in the QA report. |
| component-builder reports BLOCKED on motion library install | Stop. Ask user whether to install manually or proceed without motion (all `framer-motion` motions demote to CSS transitions). |
| Dev server fails to start | Skip Phase 6, write a partial QA report flagging server-not-started, report to user. |
| visual-qa critical findings persist after 2 retry rounds | Stop the loop, surface the unresolved findings, ask the user. |

## Test scenarios

**Happy path:** User provides a Figma URL with a recognizable layout (hero + cards + footer). Decomposer finds 4 sections. Scout finds Button and Card reusable. Planner creates 6 tasks. Builders complete in 2 parallel groups. QA passes-with-minor (one spacing issue). User accepts.

**Error path:** Figma URL has an unsupported node type (Make file). figma-fetcher fails. Orchestrator stops at Phase 1 with a message: "Figma file type not supported — design files only."

## Trigger keywords (for description match)

- "build this Figma", "implement this design", "make components from Figma", "convert Figma to code", "design to code"
- "build the <section> from Figma", "regenerate <section>", "rebuild the hero"
- "with animations", "with the navigation and actions", "include the prototype interactions", "add hover states", "make it interactive", "animate this", "motion from Figma"
- "the build plan needs to skip", "extend Card instead", "don't reuse Button" (revision triggers)
- "redo just the interactions", "update only the animations" (Interaction-only re-run)
- Bare figma.com/design URLs accompanied by intent words: build / make / implement / create / generate / animate / interact

## Outputs

- Intermediate: `_workspace/00_*` through `_workspace/05_*`
- Final: `apps/web/src/components/**/*.tsx`, `apps/web/src/app/demo/<section>/page.tsx`
- QA report: `_workspace/05_qa_report.md`
