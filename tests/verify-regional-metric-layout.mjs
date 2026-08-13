import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(source, /\.metric-definitions\{[^}]*grid-template-columns:repeat\(3,1fr\)/);
assert.match(source, /class="panel operations-panel"/);
for (const label of ['执行任务数', '词元消耗量', '对话轮数', '资源沉淀数', '资源复用数']) {
  assert.match(source, new RegExp(label));
}
for (const visual of ['task-stack-chart', 'token-spark-area', 'turn-ring-chart', 'asset-ring-chart', 'reuse-segments']) {
  assert.match(source, new RegExp(visual));
}
assert.match(source, /学校使用老师数排名/);
assert.match(source, /学校使用对话数排名/);
assert.match(source, /AI 能力使用排名/);
assert.match(source, /class="rank-visual lollipop-ranking"/);
assert.match(source, /class="rank-visual energy-ranking"/);
assert.match(source, /class="capability-treemap"/);
assert.match(source, /function renderRegionalMetricLayout/);
assert.match(source, /function updateRegionalMetricLayout/);
assert.match(source, /schoolTeacherBase\.map\(item=>\(\{name:item\[0\],value:/);
assert.match(source, /capabilityBase\.map\(item=>\(\{name:item\[0\],value:/);
assert.match(source, /grid-template-columns:260px minmax\(0,1fr\) 310px/);

console.log('regional metric layout verified');
