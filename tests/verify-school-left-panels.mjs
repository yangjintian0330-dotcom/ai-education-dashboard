import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

assert.match(html, /<h2>高频 AI 能力<\/h2>/);
assert.match(html, /id="school-cap-list" class="cap-list"/);
assert.match(html, /id="school-cap-pager" class="pager"/);
assert.match(html, /<h2>AI 教学覆盖学科<\/h2>/);
assert.match(html, /id="subject-coverage-list" class="cap-list"/);
assert.match(html, /id="subject-coverage-pager" class="pager"/);
assert.match(html, /语文 · 12 位老师/);
assert.match(html, /数学 · 9 位老师/);
assert.match(html, /renderPager\('school-cap-list','school-cap-pager',schoolCapabilities\)/);
assert.match(html, /renderPager\('subject-coverage-list','subject-coverage-pager',subjectCoverage\)/);
assert.doesNotMatch(html, /<h2>区域使用趋势<\/h2>/);

console.log('school left panels verified');
