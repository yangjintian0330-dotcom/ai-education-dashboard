import fs from 'node:fs';
import assert from 'node:assert/strict';

const regional = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const school = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

for (const className of ['capability-matrix', 'conversation-constellation', 'task-energy-list', 'outcome-feed']) {
  assert.match(regional, new RegExp(className), `regional dashboard should include ${className}`);
}

for (const className of ['capability-cloud', 'teacher-orbit-list', 'task-card-stack', 'outcome-feed']) {
  assert.match(school, new RegExp(className), `school dashboard should include ${className}`);
}

assert.match(regional, /prefers-reduced-motion/, 'regional effects should support reduced motion');
assert.match(school, /prefers-reduced-motion/, 'school effects should support reduced motion');

console.log('dashboard visual diversity verified');
