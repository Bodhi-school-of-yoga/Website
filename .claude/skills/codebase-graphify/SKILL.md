---
name: codebase-graphify
description: Use whenever the user wants to understand the codebase structure, generate a module/dependency graph, visualize architecture, map imports, or refresh the codebase overview. Triggers on "graphify the codebase", "understand this repo", "show me the architecture", "map dependencies", "draw the module graph", "refresh codebase docs", "re-run graph", "update the graph", "what's the structure", or any request involving repomix-based analysis. Produces Mermaid diagrams + JSON graph + narrative summary in `docs/codebase-graph.{md,json}`. Reuses `_workspace/` artifacts on re-runs unless the user asks for a fresh pass.
---

# codebase-graphify (Orchestrator)

코드베이스를 repomix로 패킹하고, 전문 에이전트 팀이 협업해 **모듈/의존성 그래프 + 내러티브 문서**를 생성하는 오케스트레이터.

## 팀 구성

| 에이전트 | 역할 | 모델 |
|---------|------|------|
| `repomix-runner` | repomix output 생성/갱신 + 인덱스 | opus |
| `structure-mapper` | 모듈/패키지/계층 매핑 → 노드 집합 | opus |
| `dependency-analyzer` | import/fetch/reference 추출 → 엣지 집합 | opus |
| `graph-synthesizer` | Mermaid + JSON + 내러티브 최종 산출 | opus |

**실행 모드:** 에이전트 팀 (TeamCreate + SendMessage + TaskCreate). 4명이 의존성 순서대로 협업.

## 워크플로우

### Phase 0: 컨텍스트 확인

워크플로우 시작 전 `_workspace/` 상태와 사용자 의도를 확인하여 실행 모드를 결정한다.

| 조건 | 실행 모드 |
|------|----------|
| `_workspace/` 없음 | **초기 실행** — 4 에이전트 전체 순차 실행 |
| `_workspace/` 있음 + 사용자가 부분 수정 요청 ("그래프 다이어그램만 다시", "노드 라벨 바꿔") | **부분 재실행** — 해당 에이전트만 호출 |
| `_workspace/` 있음 + 사용자가 "최신 코드 기준으로 다시" | **새 실행** — 기존 `_workspace/`를 `_workspace_prev/`로 이동 후 처음부터 |
| `_workspace/` 있음 + 사용자가 단순 질문 ("이 모듈 뭐 하는 거야") | **즉답** — 기존 산출물 읽고 답변, 에이전트 호출 안 함 |

### Phase 1: 초기화

1. 프로젝트 루트 확인 (`package.json` 존재).
2. `_workspace/` 디렉토리 생성 (없으면).
3. `TeamCreate`로 4명 팀 구성 — 리더는 오케스트레이터(나).
4. `TaskCreate`로 의존성 그래프 작업 등록:
   - T1: repomix-runner — repomix output 준비 + 인덱스
   - T2 (depends: T1): structure-mapper — 노드 추출
   - T3 (depends: T1): dependency-analyzer — 엣지 추출 (T2 결과도 참고)
   - T4 (depends: T2, T3): graph-synthesizer — 최종 합성

### Phase 2: 실행

각 에이전트를 의존성 순서로 호출한다. 모든 `Agent` 호출에 `model: "opus"` 명시.

1. **repomix-runner 호출** — `force_refresh` 결정 (기본: 1시간 이상 오래되거나 사용자가 명시 요청 시 true).
2. **structure-mapper 호출** — 인덱스 받아 노드 매핑.
3. **dependency-analyzer 호출** — 노드 받아 엣지 추출.
4. **graph-synthesizer 호출** — 통합 산출물 생성.

병렬화 기회: T2와 T3는 동일한 인덱스를 입력으로 받으므로 일부 병렬 가능. 하지만 T3가 T2의 노드 id를 필요로 하므로 T2가 노드 골격을 먼저 내놓은 후 T3 시작이 안전. **순차 실행 권장**.

### Phase 3: 보고

graph-synthesizer가 완료되면 오케스트레이터가 사용자에게 보고:
- 생성/갱신된 파일 목록 (`docs/codebase-graph.md`, `docs/codebase-graph.json`)
- 발견된 주요 패턴 (순환 의존, 강한 결합 모듈, 외부 의존성 상위 N개)
- 알려진 한계 / unresolved imports

### Phase 4: 피드백 루프

보고 후 사용자에게 "개선할 부분이 있나요?" 한 번 질문. 응답에 따라 부분 재실행으로 분기.

## 데이터 흐름

```
repomix-output.xml
        │
        ▼
_workspace/01_repomix_index.md   (repomix-runner)
        │
        ▼
_workspace/02_nodes.json          (structure-mapper)
_workspace/02_nodes_notes.md
        │
        ▼
_workspace/03_edges.json          (dependency-analyzer)
_workspace/03_edges_notes.md
        │
        ▼
docs/codebase-graph.md            (graph-synthesizer)
docs/codebase-graph.json
```

## 에러 핸들링

| 실패 | 대응 |
|------|------|
| repomix-runner 실패 | 기존 `repomix-output.xml`로 fallback, 인덱스에 "stale" 표시 |
| structure-mapper가 노드 0개 반환 | 1회 재시도. 재실패 시 사용자에게 에러 보고 후 중단 |
| dependency-analyzer의 unresolved imports 다수 (>30%) | 진행은 하되 graph에 "low confidence" 플래그, `_workspace/03_unresolved.md` 사용자에게 안내 |
| graph-synthesizer가 노드/엣지 불일치 발견 | 1회 보정 요청 → 재실패 시 불일치 엣지 제외하고 진행, 보고서에 명시 |

## 테스트 시나리오

**정상 흐름:**
1. 사용자: "Graphify the codebase using repomix"
2. 오케스트레이터: `_workspace/` 없음 확인 → 초기 실행
3. 4 에이전트 순차 실행
4. `docs/codebase-graph.md` 생성 — `apps/web` + `apps/cms` 워크스페이스, 각 모듈 노드, import 엣지 시각화
5. 보고 + 피드백 질문

**에러 흐름:**
1. 사용자: "Refresh the graph"
2. repomix MCP 실패 → bash fallback도 실패
3. 기존 `repomix-output.xml` 사용 + 인덱스에 stale 표시
4. 나머지 워크플로우 진행 + 보고서에 "repomix 갱신 실패 — 출력은 이전 스냅샷 기준" 명시

**부분 재실행:**
1. 사용자: "Mermaid 다이어그램만 다시 만들어"
2. 오케스트레이터: `_workspace/02_nodes.json`, `03_edges.json` 존재 확인
3. graph-synthesizer만 호출 — 기존 nodes/edges 재사용
4. `docs/codebase-graph.md`만 갱신

## 참고

- 에이전트 정의: `.claude/agents/{repomix-runner,structure-mapper,dependency-analyzer,graph-synthesizer}.md`
- 모든 중간 산출물: `_workspace/`
- 최종 산출물: `docs/codebase-graph.{md,json}`
