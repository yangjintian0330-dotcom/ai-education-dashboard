import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('const pages=') + 'const pages='.length;
const end = source.indexOf(';const escapedCloseTag', start);
const regional = JSON.parse(source.slice(start, end)).regional;
const metrics = regional.match(/<section class="metrics">([\s\S]*?)<\/section>/)?.[1] ?? '';

assert.match(regional, /\.metrics\{[^}]*grid-template-columns:repeat\(4,1fr\)/);
assert.equal((metrics.match(/class="metric"/g) ?? []).length, 4);
assert.deepEqual(
  [...metrics.matchAll(/<span>([^<]+)/g)].map(match => match[1]),
  ['使用学校数', '活跃老师数', 'AI 生成任务数量', 'AI 对话次数'],
);
assert.doesNotMatch(metrics, /id="students"/);
assert.doesNotMatch(metrics, /<i>|↑|%/);
assert.doesNotMatch(regional, /animateNumber\('students'/);

for (const id of ['schools', 'teachers', 'tasks', 'services']) {
  assert.match(regional, new RegExp(`animateNumber\\('${id}'`));
}

console.log('Regional metrics verification passed.');
