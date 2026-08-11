import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('const pages=') + 'const pages='.length;
const end = source.indexOf(';const escapedCloseTag', start);
const regional = JSON.parse(source.slice(start, end)).regional;

assert.match(regional, /<aside class="side right-focus">/);
assert.match(regional, /<h2>学校对话次数<\/h2>/);
assert.match(regional, /<h2>学校生成任务数<\/h2>/);
assert.match(regional, /id="school-dialogue-list" class="cap-list"/);
assert.match(regional, /id="school-task-list" class="cap-list"/);
assert.match(regional, /id="school-dialogue-list-pager" class="pager"/);
assert.match(regional, /id="school-task-list-pager" class="pager"/);
assert.match(regional, /\.right-focus > article:not\(\.school-metric\)\{display:none\}/);
assert.match(regional, /renderSchoolMetric\('school-dialogue-list'/);
assert.match(regional, /renderSchoolMetric\('school-task-list'/);
assert.doesNotMatch(regional, /id="school-cap-period"/);

console.log('Regional school capability panel verification passed.');
