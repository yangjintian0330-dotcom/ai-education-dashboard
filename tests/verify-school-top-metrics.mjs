import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');
assert.match(html, /metric\.className='metrics school-task-metric'/);
assert.match(html, /id="school-top-tasks"/);
assert.match(html, /<label>执行任务数<\/label>/);
assert.match(html, /school-top-tasks'\)\.textContent=fmt\(15241\*rangeScale\(days\)\)/);
for (const label of ['使用老师数', 'AI 对话次数', 'AI 生成任务数', '内容沉淀数']) {
  assert.match(html, new RegExp(`data-stage-label="${label}"`));
}
assert.match(html, /const metricValues=\[62,15241,3817,1634\]/);
assert.doesNotMatch(html, /飞象老师校园版 · 学校实时画像/);
assert.doesNotMatch(html, />实时在线</);

console.log('school flywheel metrics verified');
