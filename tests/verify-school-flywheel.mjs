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
assert.match(html, /const metricValues=\[62,15241,3817,1634\]/);
assert.match(html, /const flywheelValues=\[metricValues\[0\],metricValues\[2\],metricValues\[1\],metricValues\[3\]\]/);
assert.match(html, /querySelectorAll\('\[data-flywheel-value\]'\)/);

console.log('school flywheel structure verified');
