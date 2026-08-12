# School AI Teaching Flywheel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the decorative school-dashboard center graphic with a readable four-stage AI teaching flywheel whose values match the selected-period top metrics.

**Architecture:** Keep the existing single-file school dashboard and replace only the flywheel markup, scoped CSS, and flywheel-specific JavaScript. Store the four stage definitions in one array, render the cards and tooltips from it, and update both top metrics and flywheel values through the existing `setRange(days)` path.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js assertion tests.

---

### Task 1: Lock the four-stage structure with a failing test

**Files:**
- Create: `tests/verify-school-flywheel.mjs`
- Read: `docs/superpowers/specs/2026-08-12-school-ai-flywheel-design.md`

- [ ] **Step 1: Write the failing structural test**

```js
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

assert.match(html, /<h2>校本 AI 教学飞轮<\/h2>/);
assert.match(html, /class="flywheel-loop"/);
assert.equal((html.match(/class="flywheel-stage-card /g) ?? []).length, 4);
for (const label of ['使用老师数', 'AI 对话次数', 'AI 生成任务数', '内容沉淀数']) {
  assert.match(html, new RegExp(`data-stage-label="${label}"`));
}
assert.match(html, /使用驱动沉淀 · 沉淀促进复用/);
assert.doesNotMatch(html, /class="wheel-tag t5"/);

console.log('school flywheel structure verified');
```

- [ ] **Step 2: Run the test and verify failure**

Run: `node tests/verify-school-flywheel.mjs`

Expected: FAIL because `.flywheel-loop` and the four stage cards do not exist.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/verify-school-flywheel.mjs
git commit -m "test: define school flywheel structure"
```

### Task 2: Replace the old five-node graphic with a four-stage loop

**Files:**
- Modify: `school-dashboard/index.html`
- Test: `tests/verify-school-flywheel.mjs`

- [ ] **Step 1: Replace the center panel heading and flywheel markup**

Use this structure inside `.flywheel-panel`:

```html
<div class="phead"><h2>校本 AI 教学飞轮</h2></div>
<div class="flywheel-stage">
  <div class="flywheel-loop" aria-label="校本 AI 教学飞轮">
    <div class="flywheel-core-copy">
      <b>校本 AI 教学飞轮</b>
      <span>使用驱动沉淀 · 沉淀促进复用</span>
    </div>
    <article class="flywheel-stage-card stage-teacher" data-stage-label="使用老师数" data-stage-note="当前时间范围内至少使用一次 AI 的去重老师数">
      <i>01</i><span>使用老师数</span><strong data-flywheel-value="teachers">36</strong><em>人</em>
    </article>
    <article class="flywheel-stage-card stage-dialogue" data-stage-label="AI 对话次数" data-stage-note="老师围绕教学需求发起的 AI 对话总量">
      <i>02</i><span>AI 对话次数</span><strong data-flywheel-value="dialogues">2,214</strong><em>次</em>
    </article>
    <article class="flywheel-stage-card stage-task" data-stage-label="AI 生成任务数" data-stage-note="AI 成功生成的题目、课件与互动任务总量">
      <i>03</i><span>AI 生成任务数</span><strong data-flywheel-value="tasks">8,840</strong><em>个</em>
    </article>
    <article class="flywheel-stage-card stage-resource" data-stage-label="内容沉淀数" data-stage-note="进入学校资源库并可持续复用的内容数量">
      <i>04</i><span>内容沉淀数</span><strong data-flywheel-value="resources">948</strong><em>份</em>
    </article>
  </div>
</div>
<div class="wheel-feed" id="events"></div>
```

- [ ] **Step 2: Add scoped four-stage flywheel styling**

Add CSS that:

```css
.flywheel-loop{position:relative;width:min(590px,78%);aspect-ratio:1;margin:auto;border-radius:50%}
.flywheel-loop:before{content:"";position:absolute;inset:15%;border-radius:50%;background:conic-gradient(from -45deg,#2fd5b6 0 22%,transparent 22% 25%,#35c8f6 25% 47%,transparent 47% 50%,#9d82ff 50% 72%,transparent 72% 75%,#f0c45d 75% 97%,transparent 97%);filter:drop-shadow(0 0 18px rgba(109,113,255,.35))}
.flywheel-loop:after{content:"";position:absolute;inset:27%;border:1px solid rgba(180,213,255,.35);border-radius:50%;background:radial-gradient(circle,#dbe9ff 0,#a8a5ec 40%,#313c79 100%);box-shadow:0 0 34px rgba(145,126,255,.46)}
.flywheel-core-copy{position:absolute;z-index:3;inset:34%;display:grid;place-content:center;text-align:center;color:#172451}
.flywheel-core-copy b{font-size:20px}.flywheel-core-copy span{margin-top:7px;font-size:9px}
.flywheel-stage-card{position:absolute;z-index:5;width:142px;padding:10px 12px;border:1px solid rgba(128,184,255,.4);background:rgba(9,16,39,.94);box-shadow:0 10px 24px rgba(0,0,0,.3)}
.stage-teacher{left:50%;top:2%;transform:translateX(-50%)}
.stage-dialogue{right:0;top:50%;transform:translateY(-50%)}
.stage-task{left:50%;bottom:2%;transform:translateX(-50%)}
.stage-resource{left:0;top:50%;transform:translateY(-50%)}
```

Include four visible clockwise arrowheads between stages. Keep the cards stationary; animate only a subtle light stream on the ring. Under `prefers-reduced-motion: reduce`, stop the stream animation.

- [ ] **Step 3: Remove obsolete flywheel elements and selectors**

Remove the old `.wheel-ring`, `.wheel-card`, `.wheel-tag`, `.wheel-line`, `.wheel-stream`, `.wheel-arrow`, `.data-dot`, `.flow-arcs` markup and flywheel-specific initialization. Do not remove `.wheel-feed` or its event animation.

- [ ] **Step 4: Run the structural test**

Run: `node tests/verify-school-flywheel.mjs`

Expected: PASS with `school flywheel structure verified`.

- [ ] **Step 5: Commit the four-stage structure**

```bash
git add school-dashboard/index.html tests/verify-school-flywheel.mjs
git commit -m "feat: rebuild school AI teaching flywheel"
```

### Task 3: Synchronize flywheel values with the selected period

**Files:**
- Modify: `school-dashboard/index.html`
- Modify: `tests/verify-school-flywheel.mjs`

- [ ] **Step 1: Extend the test with data synchronization assertions**

```js
assert.match(html, /const metricValues=\[62,15241,3817,1634\]/);
assert.match(html, /const flywheelValues=\[metricValues\[0\],metricValues\[2\],metricValues\[1\],metricValues\[3\]\]/);
assert.match(html, /querySelectorAll\('\[data-flywheel-value\]'\)/);
```

- [ ] **Step 2: Run the test and verify failure**

Run: `node tests/verify-school-flywheel.mjs`

Expected: FAIL because `flywheelValues` is not defined.

- [ ] **Step 3: Update flywheel values inside `setRange(days)`**

Immediately after updating `.metrics strong`, add:

```js
const flywheelValues = [metricValues[0], metricValues[2], metricValues[1], metricValues[3]];
document.querySelectorAll('[data-flywheel-value]').forEach((element, index) => {
  element.textContent = fmt(flywheelValues[index]);
});
```

The order deliberately maps top metrics to the flywheel sequence: teachers, dialogues, tasks, resources.

- [ ] **Step 4: Add readable stage tooltips**

Bind `mouseenter`, `mousemove`, and `mouseleave` on `.flywheel-stage-card`. Reuse the existing tooltip element and placement function, with the card's `data-stage-label`, current rendered value, unit, and `data-stage-note`.

- [ ] **Step 5: Run focused and regression tests**

Run:

```bash
node tests/verify-school-flywheel.mjs
node tests/verify-school-top-metrics.mjs
node tests/verify-school-date-filter.mjs
node tests/verify-school-final-dashboard.mjs
node tests/verify-school-viewport-fill.mjs
```

Expected: every command exits successfully.

- [ ] **Step 6: Commit synchronization and interactions**

```bash
git add school-dashboard/index.html tests/verify-school-flywheel.mjs
git commit -m "feat: sync school flywheel with date range"
```

### Task 4: Visual QA and final verification

**Files:**
- Modify if needed: `school-dashboard/index.html`

- [ ] **Step 1: Open the school dashboard at the local URL**

Open: `http://127.0.0.1:4173/school-dashboard/?school=虹口区实验学校`

- [ ] **Step 2: Verify the visual hierarchy**

Confirm all of the following:

- The four stages are readable in clockwise order without explanation.
- Arrowheads clearly connect 01 → 02 → 03 → 04 → 01.
- Cards do not overlap the ring, center copy, event feed, or side panels.
- Values match the four top metrics.
- Resizing retains full-width layout without global scrolling.

- [ ] **Step 3: Verify date interaction**

Change the start or end date and confirm all four top metrics and all four flywheel stage values update together.

- [ ] **Step 4: Run the full dashboard regression suite**

Run:

```bash
node tests/verify-school-flywheel.mjs
node tests/verify-school-top-metrics.mjs
node tests/verify-school-left-panels.mjs
node tests/verify-school-date-filter.mjs
node tests/verify-school-final-dashboard.mjs
node tests/verify-school-viewport-fill.mjs
node tests/verify-regional-metrics.mjs
git diff --check
```

Expected: all tests pass and `git diff --check` prints no errors.

- [ ] **Step 5: Commit final visual refinements**

```bash
git add school-dashboard/index.html tests/verify-school-flywheel.mjs
git commit -m "style: refine school AI flywheel"
```
