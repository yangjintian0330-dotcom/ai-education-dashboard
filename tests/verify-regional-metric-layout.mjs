import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(source, /\.metric-definitions\{[^}]*grid-template-columns:repeat\(3,1fr\)/);
assert.match(source, /class="panel operations-panel"/);
assert.match(source, /<h2>AI 赋能成果<\/h2>/);
assert.match(source, /class="panel operations-panel asset-panel"><div class="phead"><h2>资产沉淀<\/h2>/);
assert.match(source, /regional-operation-side\{display:grid!important;grid-template-rows:3fr 2fr/);
for (const label of ['执行任务数', '词元消耗量', '对话轮数', '资源沉淀数', '资源复用数']) {
  assert.match(source, new RegExp(label));
}
assert.match(source, /学校使用老师数排名/);
assert.match(source, /学校使用对话数排名/);
assert.match(source, /class="rank-visual lollipop-ranking"/);
assert.match(source, /class="rank-visual energy-ranking"/);
assert.match(source, /function renderRegionalMetricLayout/);
assert.match(source, /function updateRegionalMetricLayout/);
assert.match(source, /schoolTeacherBase\.map\(item=>\(\{name:item\[0\],value:/);
assert.match(source, /grid-template-columns:260px minmax\(0,1fr\) 310px/);
assert.match(source, /regional-rank-side\{display:grid;grid-template-rows:repeat\(2,minmax\(0,1fr\)\)/);

const finalLayout = source.slice(source.lastIndexOf('function renderRegionalMetricLayout'), source.lastIndexOf('function rankRowsMarkup'));
assert.doesNotMatch(finalLayout, /AI 能力使用排名|capability-treemap|task-stack-chart|token-spark-area|turn-ring-chart|asset-ring-chart|reuse-segments/);
assert.doesNotMatch(finalLayout, /operation-note|<small/);

console.log('regional metric layout verified');
