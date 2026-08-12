import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('const pages=') + 'const pages='.length;
const end = source.indexOf(';const escapedCloseTag', start);
const regional = JSON.parse(source.slice(start, end)).regional;

assert.match(regional, /\.trend\{display:none\}/);
assert.match(regional, /\.cap-list\{[^}]*grid-template-rows:repeat\(3,1fr\)/);
assert.match(regional, /\.cap-list\{[^}]*overflow:hidden/);
assert.doesNotMatch(regional, /overflow-y:auto|overscroll-behavior:contain/);
assert.match(regional, /\.cap-row\{[^}]*grid-template-rows:28px 12px/);
assert.match(regional, /\.pager\{[^}]*display:flex/);
assert.match(regional, /\.grid > aside:first-child > \.capability\{[^}]*border-color:/);
assert.match(regional, /\.right-focus > \.school-metric\{[^}]*border-color:/);
assert.match(regional, /\.side > \.capability \.phead\{[^}]*border-bottom-color:/);
assert.match(regional, /function renderPagedMetric\(/);
assert.match(regional, /<h2>学校使用老师数<\/h2>/);
assert.match(regional, /id="school-teacher-list" class="cap-list"/);
assert.match(regional, /id="school-teacher-list-pager" class="pager"/);
assert.match(regional, /<article class="panel capability">/);
assert.match(regional, /\.grid > aside:first-child > \.school-metric\{order:2\}/);
assert.doesNotMatch(regional, /id="cap-period"/);

console.log('Regional left panel verification passed.');
