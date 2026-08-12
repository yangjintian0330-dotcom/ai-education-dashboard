import assert from 'node:assert/strict';
import fs from 'node:fs';

const shell = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const school = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');
const start = shell.indexOf('const pages=') + 'const pages='.length;
const end = shell.indexOf(';const escapedCloseTag', start);
const regional = JSON.parse(shell.slice(start, end)).regional;

for (const html of [regional, school]) {
  assert.match(html, /\.top\{[^}]*height:76px/);
  assert.match(html, /\.phead\{[^}]*height:45px/);
  assert.match(html, /\.phead h2\{[^}]*font-size:16px/);
  assert.match(html, /\.pager\{[^}]*height:34px/);
}
assert.match(regional, /\.metrics\{[^}]*height:110px/);
assert.match(regional, /\.metric strong\{[^}]*45px/);
assert.doesNotMatch(school, /<section class="metrics">/);

assert.match(shell, /pages\.regional = pages\.regional\.replace/);
assert.match(shell, /\.metric strong\{color:#ad91ff;text-shadow:0 0 16px rgba\(158,130,255,\.3\)\}/);
assert.match(school, /class="dashboard-shared-spec"/);
assert.match(school, /\.panel\{border:1px solid var\(--line\);background:[^}]*;clip-path:none\}/);

console.log('dashboard design consistency verified');
