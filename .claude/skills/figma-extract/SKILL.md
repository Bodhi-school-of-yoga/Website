---
name: figma-extract
description: Extract structured design component data from a Figma file/node using the Figma MCP, with a built-in validation layer. Orchestrates a 4-agent team (figma-fetcher → component-extractor ∥ token-extractor → design-validator) to produce a normalized design-system.json plus a validation report. Use this skill when the user shares a figma.com URL and asks to "extract components", "pull design tokens", "get component specs from Figma", "build design system from Figma", "scrape Figma to JSON", or any data-extraction-from-Figma request — NOT for design-to-code or code-to-design tasks. Also use for follow-up requests: "re-extract only tokens", "validate the extraction", "refresh from Figma", "update component schema", "fix the validation warnings", or "regenerate the report".
---

# figma-extract (Orchestrator)

Orchestrator that extracts **component + token data** from a Figma design into structured JSON, with a **validation layer** to guarantee output quality.

## What This Is Not

- **Not design-to-code**: It does not convert a Figma design into a React component. → Use `/figma-generate-design`.
- **Not code-to-design**: It does not push code into Figma. → Use the `use_figma` tool.
- **Not just a screenshot**: It does not merely fetch a design image. → Use the MCP's `get_screenshot` directly.

This skill is for **data extraction + validation**. Use it for design-system construction, token export, or component-spec documentation.

## Execution Mode: Agent Team

Build a 4-member team with `TeamCreate`. component-extractor and token-extractor run in parallel after fetcher completes. The validator runs after both extractions complete.

## Team Composition

| Agent | Role | Input | Output |
|-------|------|-------|--------|
| `figma-fetcher` | Fetch raw data via Figma MCP | URL/nodeId | `_workspace/01_figma_*.json` |
| `component-extractor` | Extract component schema | `01_figma_context.json` | `_workspace/02_components.json` |
| `token-extractor` | Extract design tokens | `01_figma_variables.json` | `_workspace/02_tokens.json` |
| `design-validator` | Validation layer (5 categories) | 02_components + 02_tokens + 01_context | `_workspace/03_validation_report.{json,md}` |

Pass `model: "opus"` to every Agent call.

## Workflow

### Phase 0: Context Check

Determine the execution mode based on `_workspace/` state and user intent.

| Condition | Mode |
|-----------|------|
| `_workspace/` does not exist | **Initial run** — start from Phase 1 |
| `_workspace/` exists + user asks to "redo", "refresh", "rerun from latest Figma" | **New run** — move existing `_workspace/` to `_workspace_prev_<timestamp>/`, then Phase 1 |
| `_workspace/` exists + user asks for a partial change like "tokens only" or "re-extract Button" | **Partial re-run** — call only the relevant agent |
| `_workspace/` exists + user asks a simple question ("which components were extracted?") | **Direct answer** — read existing artifacts, no agent calls |
| User asks "redo validation" / "regenerate report only" | **Validation-only re-run** — call only design-validator |

### Phase 1: Input Collection

1. Extract the Figma URL from the user message. If missing, ask once.
2. Parse fileKey and nodeId (if present) from the URL.
3. Create `_workspace/` (or archive and recreate).
4. Write `_workspace/00_input.json`:
   ```json
   {
     "figma_url": "...",
     "file_key": "...",
     "node_id": "..." | null,
     "options": { "include_screenshot": false }
   }
   ```

### Phase 2: Team Creation and Task Registration

```
TeamCreate(
  team_name: "figma-extract-team",
  members: [
    { name: "fetcher", agent_type: "figma-fetcher", model: "opus",
      prompt: "Read _workspace/00_input.json, fetch from Figma MCP, save raw outputs to _workspace/01_*.json" },
    { name: "components", agent_type: "component-extractor", model: "opus",
      prompt: "After fetcher signals done, parse 01_figma_context.json into _workspace/02_components.json" },
    { name: "tokens", agent_type: "token-extractor", model: "opus",
      prompt: "After fetcher signals done, parse 01_figma_variables.json into _workspace/02_tokens.json" },
    { name: "validator", agent_type: "design-validator", model: "opus",
      prompt: "After both extractors signal done, run /figma-validation skill against 02_components.json + 02_tokens.json, write _workspace/03_validation_report.{json,md}" }
  ]
)
```

TaskCreate:
- T1: Fetch from Figma MCP → assignee: fetcher
- T2: Extract components → assignee: components, depends_on: [T1]
- T3: Extract tokens → assignee: tokens, depends_on: [T1]
- T4: Validate extraction → assignee: validator, depends_on: [T2, T3]

### Phase 3: Execution

The orchestrator (leader) just monitors progress. Team members self-coordinate via SendMessage.

Communication patterns:
- fetcher → components: "context ready"
- fetcher → tokens: "variables ready"
- tokens → components: share the token-naming convention (so `token_refs` stays consistent)
- components → validator: extraction complete notification
- tokens → validator: extraction complete notification
- validator → leader: final result + recommendations

Special cases:
- If the validator returns FAIL with items requiring re-extraction → SendMessage the relevant extractor to redo the work. **Maximum one retry**.

### Phase 4: Final Output Integration

If the validator returns PASS or WARN, proceed with integration. If FAIL, report to the user and stop integration (partial artifacts are preserved).

The orchestrator integrates directly:
1. Read `_workspace/02_components.json` + `_workspace/02_tokens.json`
2. Generate the combined output: `docs/design-system.json`
   ```json
   {
     "source": { "figma_url": "...", "extracted_at": "ISO8601" },
     "components": [...],
     "tokens": {...},
     "validation": { "overall": "PASS|WARN", "report_path": "_workspace/03_validation_report.md" }
   }
   ```
3. Human-readable report: `docs/design-system.md`
   - Extraction stats (N components, per-category token counts)
   - Validation summary (PASS/WARN items)
   - Token catalog (per-category lists)
   - Component list (name + props + tokens used)

### Phase 5: Cleanup and Report

1. Terminate team members (TeamDelete)
2. Preserve `_workspace/` (for audit)
3. Report to the user:
   - Generated files: `docs/design-system.{json,md}`, `_workspace/03_validation_report.md`
   - One-line extraction stats summary
   - Top 3 WARN/FAIL recommendations max
4. One feedback question: "Anything you want to fix in the validation results?"

## Data Flow

```
[User Figma URL]
        │
        ▼
_workspace/00_input.json
        │
        ▼
[figma-fetcher] ── Figma MCP ──→ _workspace/01_figma_{metadata,context,variables,libraries}.json
        │
        ├──→ [component-extractor] ──→ _workspace/02_components.json
        │                                     │
        ├──→ [token-extractor] ──→ _workspace/02_tokens.json
        │                                     │
        └─────────────────────────────────────┤
                                              ▼
                                    [design-validator]
                                    (uses /figma-validation skill)
                                              │
                                              ▼
                                _workspace/03_validation_report.{json,md}
                                              │
                                              ▼
                              [Orchestrator: integration]
                                              │
                                              ▼
                              docs/design-system.{json,md}
```

## Error Handling

| Situation | Response |
|-----------|----------|
| Figma auth failure | Stop immediately; instruct user on Figma auth (see `/figma-use` skill) |
| Fetcher partially succeeded on MCP calls | Continue extraction with what is available + note gaps in the report |
| One extractor fails | Retry once. On second failure, proceed to validator without that artifact (validator flags as FAIL) |
| Validator FAIL + 1 retry attempted | If still FAIL, stop integration and report to user. Partial artifacts (_workspace/) preserved |
| Wrong node ID | Detected at metadata call → fetcher reports immediately |
| Zero components and zero tokens | Validator reports FAIL. Tell the user "no extractable data in the selected node" |

## Test Scenarios

### Normal Flow
1. User: "Extract components from https://figma.com/file/ABC123/Bodhi-Design?node-id=1-2"
2. Phase 0: `_workspace/` missing → initial run
3. Phase 1: parse URL → create `00_input.json`
4. Phase 2–3: build team, run fetcher → components ∥ tokens → validator
5. Validator overall = PASS
6. Phase 4: generate `docs/design-system.json` + `docs/design-system.md`
7. Phase 5: report ("18 components, 76 tokens, validation PASS")

### Partial Re-run
1. User: "Re-extract just the tokens"
2. Phase 0: `_workspace/` exists + partial request → partial re-run
3. Call only token-extractor, reuse the cached variables.json
4. Validator re-validates only token-related items
5. Update only the tokens field in `docs/design-system.json`

### Validation-only Re-run
1. User: "Regenerate the validation report"
2. Phase 0: validation-only re-run mode
3. Call only design-validator, use existing 02_components / 02_tokens
4. Update `03_validation_report.{json,md}`

### Error Flow — Validator FAIL
1. User: "Re-analyze this Figma"
2. Start from scratch (new run)
3. Validator reports FAIL: "Card component children[2].ref unresolved"
4. Orchestrator asks component-extractor to retry (once)
5. After retry, same FAIL → stop integration
6. Report to user: "Card component extraction failed. See `_workspace/03_validation_report.md` and verify that node in Figma."

## References

- Agent definitions: `.claude/agents/{figma-fetcher,component-extractor,token-extractor,design-validator}.md`
- Validation rules: `.claude/skills/figma-validation/SKILL.md`
- Intermediate artifacts: `_workspace/`
- Final artifacts: `docs/design-system.{json,md}`
- Figma MCP usage: `/figma-use` skill or Figma plugin documentation
