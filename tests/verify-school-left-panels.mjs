import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

assert.match(html, /<h2>高频 AI 能力<\/h2>/);
assert.match(html, /id="school-cap-list" class="cap-list"/);
assert.match(html, /id="school-cap-pager" class="pager"/);
assert.match(html, /<h2>老师使用次数<\/h2>/);
assert.match(html, /id="teacher-usage-list" class="cap-list count-only"/);
assert.match(html, /id="teacher-usage-pager" class="pager"/);
assert.match(html, /王红敏老师/);
assert.match(html, /刘国顺老师/);
assert.match(html, /renderPager\('school-cap-list','school-cap-pager',schoolCapabilities\)/);
assert.match(html, /renderPager\('teacher-usage-list','teacher-usage-pager',teacherUsage\)/);
assert.doesNotMatch(html, /<h2>区域使用趋势<\/h2>/);

console.log('school left panels verified');
