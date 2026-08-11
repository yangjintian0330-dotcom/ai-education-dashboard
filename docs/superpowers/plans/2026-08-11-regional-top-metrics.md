# Regional Top Metrics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the regional dashboard's four top metrics with three equal-width metrics: 使用学校数、活跃老师数、AI 对话次数。

**Architecture:** Keep the existing single-file embedded-page architecture. Update only the `regional` page string inside `index.html`: its metrics CSS grid, metrics markup, and `updateDashboard()` bindings.

**Tech Stack:** Static HTML, CSS Grid, vanilla JavaScript, Node.js verification script

---

### Task 1: Add a focused regression check

**Files:**
- Create: `tests/verify-regional-metrics.mjs`
- Test: `tests/verify-regional-metrics.mjs`

- [ ] **Step 1: Write the failing verification script**

Create a Node.js script that reads `index.html`, parses the embedded `pages` object, and asserts that the regional page uses `repeat(3,1fr)`, contains exactly three `.metric` cards with the required labels, omits `id="students"`, and updates only `schools`, `teachers`, and `services` in `updateDashboard()`.

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('const pages=') + 'const pages='.length;
const end = source.indexOf(';const escapedCloseTag', start);
const regional = JSON.parse(source.slice(start, end)).regional;
const metrics = regional.match(/<section class="metrics">([\s\S]*?)<\/section>/)?.[1] ?? '';

assert.match(regional, /\.metrics\{[^}]*grid-template-columns:repeat\(3,1fr\)/);
assert.equal((metrics.match(/class="metric"/g) ?? []).length, 3);
assert.deepEqual([...metrics.matchAll(/<span>([^<]+)/g)].map(match => match[1]), ['使用学校数', '活跃老师数', 'AI 对话次数']);
assert.doesNotMatch(metrics, /id="students"/);
assert.doesNotMatch(regional, /animateNumber\('students'/);
for (const id of ['schools', 'teachers', 'services']) assert.match(regional, new RegExp(`animateNumber\\('${id}'`));

console.log('Regional metrics verification passed.');
```

- [ ] **Step 2: Run the check and confirm the current page fails**

Run: `node tests/verify-regional-metrics.mjs`

Expected: non-zero exit because the current regional dashboard uses four columns and still contains the student metric.

### Task 2: Update the regional metrics

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Change the metrics grid**

Change `.metrics` from `grid-template-columns:repeat(4,1fr)` to `grid-template-columns:repeat(3,1fr)` inside the embedded regional page.

```css
.metrics{height:110px;display:grid;grid-template-columns:repeat(3,1fr);padding:19px 0 11px}
```

- [ ] **Step 2: Change the metrics markup**

Keep the current `schools`, `teachers`, and `services` cards, remove the `students` card, and rename their labels to `使用学校数`, `活跃老师数`, and `AI 对话次数`.

```html
<section class="metrics">
  <div class="metric"><strong id="schools">153</strong><em>所</em><span>使用学校数<i>↑ 8.5%</i></span></div>
  <div class="metric"><strong id="teachers">752</strong><em>人</em><span>活跃老师数<i>↑ 12.3%</i></span></div>
  <div class="metric"><strong id="services">104,752</strong><em>次</em><span>AI 对话次数<i>↑ 23.4%</i></span></div>
</section>
```

- [ ] **Step 3: Remove the obsolete update**

Delete `animateNumber('students', ...)` from regional `updateDashboard()` while preserving the existing school, teacher, and service calculations.

```js
animateNumber('schools', 153 * Math.max(.35, Math.min(1, days / 30)));
animateNumber('teachers', 752 * Math.max(.35, Math.min(1, days / 30)));
animateNumber('services', rows.reduce((sum, row) => sum + row.services, 0));
```

- [ ] **Step 4: Run the focused check**

Run: `node tests/verify-regional-metrics.mjs`

Expected: `Regional metrics verification passed.`

### Task 3: Visual verification

**Files:**
- Verify: `index.html`

- [ ] **Step 1: Render at the target viewport**

Serve the workspace and open the regional dashboard at 1600×900.

- [ ] **Step 2: Check visual acceptance criteria**

Confirm that the top row shows three equal-width cards in the specified order, separators are aligned, labels and units are correct, and the dashboard below is unchanged.

- [ ] **Step 3: Check range interaction**

Click 7 天、30 天、90 天 and confirm all three metric values update without console errors.

- [ ] **Step 4: Commit the implementation**

Stage only `index.html` and `tests/verify-regional-metrics.mjs`, then commit with `feat: simplify regional dashboard metrics`.
