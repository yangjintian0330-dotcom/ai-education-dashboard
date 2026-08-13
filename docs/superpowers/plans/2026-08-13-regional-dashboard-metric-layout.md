# Regional Dashboard Metric Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the regional dashboard around three top KPIs, a five-part AI operations and asset panel, three differentiated ranking panels, and a dominant center map.

**Architecture:** Keep `index.html` as the standalone source and use the existing outer-page transformation layer to replace the regional iframe layout after its legacy widgets initialize. Use scoped semantic classes and inline SVG/CSS microcharts; reuse current date data and ranking bases without adding dependencies.

**Tech Stack:** HTML, CSS, vanilla JavaScript, inline SVG, ECharts, Node.js assertion scripts.

---

### Task 1: Define the layout contract

**Files:**
- Create: `tests/verify-regional-metric-layout.mjs`
- Modify: `tests/verify-regional-metrics.mjs`
- Modify: `tests/verify-regional-map-focus.mjs`

- [ ] Assert exactly three final top KPI labels: 应用学校数、赋能老师数、辅助工作数.
- [ ] Assert the left panel contains the five required metric labels and semantic chart classes for stacked bar, spark area, ring and reuse segments.
- [ ] Assert the right panel contains the three required ranking titles and semantic classes for lollipop, energy bars and treemap.
- [ ] Assert the final grid reserves the largest column for the map.
- [ ] Run the three focused tests and confirm they fail before implementation.

### Task 2: Implement top KPIs and left operations panel

**Files:**
- Modify: `index.html`
- Test: `tests/verify-regional-metric-layout.mjs`

- [ ] Replace the final KPI markup with three cards and set the grid to three equal columns.
- [ ] Build one left `operations-panel` containing task composition, token spark area, conversation-turn ring, asset composition ring and reuse source segments.
- [ ] Add `updateOperationsPanel()` using `selectedData()` so totals and microcharts update after date changes.
- [ ] Run the focused layout and date-filter tests and confirm they pass.

### Task 3: Implement differentiated ranking panels

**Files:**
- Modify: `index.html`
- Test: `tests/verify-regional-metric-layout.mjs`

- [ ] Render teacher-school ranking as lollipop rows with rank, school, node position and value.
- [ ] Render dialogue-school ranking as energy-bar rows with rank, school and value.
- [ ] Render AI capability ranking as a six-cell treemap sized by usage count.
- [ ] Preserve pager controls for both school rankings and update values using the active date scale.
- [ ] Run focused regional ranking, layout and viewport tests.

### Task 4: Verify and commit

**Files:**
- Modify: `index.html`
- Modify: regional verification scripts only where the intentionally replaced layout changes prior expectations.

- [ ] Run every `tests/*.mjs` script.
- [ ] Compile-check both outer scripts and run `git diff --check`.
- [ ] Confirm only intended dashboard, tests and plan/spec files are tracked; preserve local backups.
- [ ] Commit with `feat: redesign regional dashboard metric layout`.
