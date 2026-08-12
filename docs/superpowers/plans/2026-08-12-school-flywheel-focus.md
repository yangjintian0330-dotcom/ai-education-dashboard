# School Flywheel Focus Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the duplicated school KPI strip and turn the center flywheel into the primary, visually dominant metric display.

**Architecture:** Keep the existing single-file dashboard and change only school markup, scoped CSS, and the `setRange(days)` update path. The flywheel receives period values directly, so no deleted DOM is used as state.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js assertion tests.

---

### Task 1: Lock the focused layout

**Files:**
- Create: `tests/verify-school-flywheel-focus.mjs`
- Modify: `school-dashboard/index.html`

- [ ] **Step 1: Write a failing structural test**

Assert that the school markup has no `<section class="metrics">`, contains `flywheel-focus`, keeps four stage cards, uses `const metricValues=[62,15241,3817,1634]`, and updates `[data-flywheel-value]` directly.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node tests/verify-school-flywheel-focus.mjs`

Expected: failure because the KPI strip and mutation-observer synchronization still exist.

- [ ] **Step 3: Remove the KPI strip and direct the data flow**

Delete the `.metrics` markup. Inside `setRange(days)`, map `[teachers, dialogues, tasks, resources]` from `metricValues` and update the four flywheel values. Delete `syncFlywheel` and its `MutationObserver`.

- [ ] **Step 4: Run the focused test**

Run: `node tests/verify-school-flywheel-focus.mjs`

Expected: `school flywheel focus verified`.

### Task 2: Expand and polish the flywheel

**Files:**
- Modify: `school-dashboard/index.html`
- Test: `tests/verify-school-flywheel-focus.mjs`

- [ ] **Step 1: Expand the content grid**

Increase the grid and flywheel-panel height to 756px so it fills the space below the 76px header within the 900px design canvas.

- [ ] **Step 2: Strengthen the flywheel hierarchy**

Add the `flywheel-focus` class, enlarge the ring and core, make each card wider and taller, increase number size to at least 34px, assign per-stage accent variables, and thicken the four ring segments and arrows.

- [ ] **Step 3: Preserve the query feed**

Keep the feed at the bottom with a fixed 118px height and ensure the enlarged ring does not overlap it.

- [ ] **Step 4: Run school regressions**

Run the school flywheel, date filter, left panels, final dashboard, query feed, and viewport tests, followed by `git diff --check`.

Expected: all commands pass.

### Task 3: Visual verification

**Files:**
- Modify if needed: `school-dashboard/index.html`

- [ ] **Step 1: Open the local school dashboard**

Open `http://127.0.0.1:4173/school-dashboard/?school=虹口区实验学校`.

- [ ] **Step 2: Verify hierarchy and interaction**

Confirm the four values dominate the center, the clockwise sequence remains clear, no card overlaps the core or feed, date changes update all four values, and there is no global scrollbar.

- [ ] **Step 3: Commit the completed redesign**

Commit `school-dashboard/index.html`, focused tests, and updated regression expectations with message `style: focus school dashboard on flywheel metrics`.
