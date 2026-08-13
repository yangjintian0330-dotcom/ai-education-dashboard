import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('const pages=') + 'const pages='.length;
const end = source.indexOf(';const escapedCloseTag', start);
const regional = JSON.parse(source.slice(start, end)).regional;
const metrics = regional.match(/<section class="metrics">([\s\S]*?)<\/section>/)?.[1] ?? '';

assert.match(source, /\.metric-definitions\{[^}]*grid-template-columns:repeat\(4,1fr\)/);
assert.equal((metrics.match(/class="metric"/g) ?? []).length, 5);
for (const label of ['应用学校数', '赋能老师数', '辅助工作数', '执行任务数']) {
  assert.match(source, new RegExp(label));
}
assert.doesNotMatch(metrics, /id="students"/);
assert.match(source, /<small id="school-coverage">[^<]*覆盖率[^<]*%<\/small>/);
assert.match(source, /<small>登录校园版的去重老师<\/small>/);
assert.match(source, /<small>按对话 ID 去重统计<\/small>/);
assert.match(source, /<small>已完成的课件 · 资源 · 题单等任务<\/small>/);
assert.doesNotMatch(source.match(/<section class="metrics metric-definitions">[\s\S]*?<\/section>/)?.[0] ?? '', /资源沉淀数|资源复用数/);
assert.doesNotMatch(regional, /animateNumber\('students'/);

for (const id of ['schools', 'teachers', 'services', 'tasks', 'resources']) {
  assert.match(regional, new RegExp(`animateNumber\\('${id}'`));
}
assert.match(source, /coveredSchools\/180\*100/);
assert.match(source, /pages\.regional = pages\.regional\.replace\(\s*"animateNumber\('resources'/);

console.log('Regional metrics verification passed.');
