# Dashboard Visual Diversity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the regional and school dashboards distinct, presentation-oriented chart languages while preserving their current data and interactions.

**Architecture:** Keep each dashboard as a standalone HTML document and enhance the existing final-layout DOM with scoped CSS classes. Use semantic HTML data attributes for visual variants and keep the existing date update functions as the single source of truth for values.

**Tech Stack:** HTML, CSS, vanilla JavaScript, ECharts, Node.js static verification scripts.

---

### Task 1: Add visual-diversity contract tests

**Files:**
- Create: `tests/verify-dashboard-visual-diversity.mjs`

- [ ] **Step 1: Write assertions for the new visual language**

Assert that the regional document contains the classes `capability-matrix`, `conversation-constellation`, `task-energy-list`, and `outcome-feed`, and that the school document contains `capability-cloud`, `teacher-orbit-list`, `task-card-stack`, and `outcome-feed`.

- [ ] **Step 2: Run the test and verify it fails**

Run: `node tests/verify-dashboard-visual-diversity.mjs`
Expected: FAIL because the new classes do not yet exist.

- [ ] **Step 3: Commit the failing contract test with the implementation task**

The test remains unstaged until both dashboards satisfy the contract.

### Task 2: Diversify the regional dashboard

**Files:**
- Modify: `index.html`
- Test: `tests/verify-dashboard-visual-diversity.mjs`

- [ ] **Step 1: Add scoped semantic classes**

Add `capability-matrix` to the AI capability panel, `conversation-constellation` to the school dialogue panel, `task-energy-list` to the school task panel, and `outcome-feed` to the live query feed.

- [ ] **Step 2: Implement distinct CSS treatments**

Render capabilities as a stepped matrix with luminous cells, dialogue rows as constellation nodes with short trails, task rows as segmented energy bars, and the bottom feed as a labeled live outcome ribbon. Keep the current numeric text accessible and unchanged.

- [ ] **Step 3: Run regional regression checks**

Run: `node tests/verify-dashboard-visual-diversity.mjs && node tests/verify-regional-final-dashboard.mjs && node tests/verify-regional-viewport-fill.mjs`
Expected: all tests PASS.

### Task 3: Diversify the school dashboard

**Files:**
- Modify: `school-dashboard/index.html`
- Test: `tests/verify-dashboard-visual-diversity.mjs`

- [ ] **Step 1: Add scoped semantic classes**

Add `capability-cloud` to the AI capability panel, `teacher-orbit-list` to the teacher dialogue panel, `task-card-stack` to the teacher task panel, and `outcome-feed` to the flywheel query feed.

- [ ] **Step 2: Implement distinct CSS treatments**

Use varied capability name scale and glow while retaining exact counts, turn dialogue rows into orbit-node tracks, show task production as compact layered cards, and style the feed as a teaching-outcome story ribbon.

- [ ] **Step 3: Preserve the flywheel hierarchy**

Keep the four flywheel metrics as the dominant school-dashboard visual and constrain new side-panel effects to lower contrast than the center cards.

- [ ] **Step 4: Run school regression checks**

Run: `node tests/verify-dashboard-visual-diversity.mjs && node tests/verify-school-flywheel-focus.mjs && node tests/verify-school-final-dashboard.mjs && node tests/verify-school-viewport-fill.mjs`
Expected: all tests PASS.

### Task 4: Verify consistency and delivery

**Files:**
- Modify: `tests/verify-dashboard-visual-diversity.mjs` only if a selector needs correction

- [ ] **Step 1: Run the complete focused suite**

Run all regional, school, viewport, flywheel, date-filter, and design-consistency verification scripts plus `git diff --check`.
Expected: every script exits zero and `git diff --check` prints no output.

- [ ] **Step 2: Inspect the changed file list**

Run: `git status --short`
Expected: only the two dashboard HTML files and the new test are part of the implementation; existing untracked backup files remain untouched.

- [ ] **Step 3: Commit the implementation**

Run: `git add index.html school-dashboard/index.html tests/verify-dashboard-visual-diversity.mjs && git commit -m "style: diversify dashboard data storytelling"`
Expected: one implementation commit is created.
