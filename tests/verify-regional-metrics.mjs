import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('const pages=') + 'const pages='.length;
const end = source.indexOf(';const escapedCloseTag', start);
const regional = JSON.parse(source.slice(start, end)).regional;
const metrics = regional.match(/<section class="metrics">([\s\S]*?)<\/section>/)?.[1] ?? '';

assert.match(source, /\.metric-definitions\{[^}]*grid-template-columns:repeat\(3,1fr\)/);
assert.equal((metrics.match(/class="metric"/g) ?? []).length, 5);
for (const label of ['应用学校数', '赋能老师数', '辅助工作数']) {
  assert.match(source, new RegExp(label));
}
assert.doesNotMatch(metrics, /id="students"/);
const finalMetrics = source.match(/<section class="metrics metric-definitions">[\s\S]*?<\/section>/)?.[0] ?? '';
assert.doesNotMatch(finalMetrics, /<small|覆盖率|去重老师|去重统计/);
assert.doesNotMatch(finalMetrics, /执行任务数|资源沉淀数|资源复用数/);
assert.doesNotMatch(regional, /animateNumber\('students'/);

for (const id of ['schools', 'teachers', 'services', 'tasks', 'resources']) {
  assert.match(regional, new RegExp(`animateNumber\\('${id}'`));
}
assert.doesNotMatch(source, /coveredSchools\/180\*100/);
assert.match(source, /pages\.regional = pages\.regional\.replace\(\s*"animateNumber\('resources'/);
assert.match(source, /pages\.regional = pages\.regional\.replace\(\s*"animateNumber\('tasks'/);

console.log('Regional metrics verification passed.');
