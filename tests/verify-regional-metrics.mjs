import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('const pages=') + 'const pages='.length;
const end = source.indexOf(';const escapedCloseTag', start);
const regional = JSON.parse(source.slice(start, end)).regional;
const metrics = regional.match(/<section class="metrics">([\s\S]*?)<\/section>/)?.[1] ?? '';

assert.match(regional, /\.metrics\{[^}]*grid-template-columns:repeat\(5,1fr\)/);
assert.equal((metrics.match(/class="metric"/g) ?? []).length, 5);
for (const label of ['AI 应用学校数', 'AI 赋能老师数', 'AI 辅助工作数', 'AI 执行任务数', 'AI 资源沉淀数']) {
  assert.match(source, new RegExp(label));
}
assert.doesNotMatch(metrics, /id="students"/);
assert.match(source, /<small id="school-coverage">[^<]*覆盖率[^<]*%<\/small>/);
assert.match(source, /<small>发生 AI 对话的去重老师<\/small>/);
assert.match(source, /<small>累计 AI 对话次数<\/small>/);
assert.match(source, /<small>课件 · 资源 · 题单等<\/small>/);
assert.match(source, /<small>知识库 · 资源中心 · 应用中心 · 题库<\/small>/);
assert.doesNotMatch(regional, /animateNumber\('students'/);

for (const id of ['schools', 'teachers', 'services', 'tasks', 'resources']) {
  assert.match(regional, new RegExp(`animateNumber\\('${id}'`));
}
assert.match(source, /coveredSchools\/180\*100/);

console.log('Regional metrics verification passed.');
