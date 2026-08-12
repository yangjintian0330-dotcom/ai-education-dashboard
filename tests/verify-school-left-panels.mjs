import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

assert.match(html, /<h2>高频 AI 能力<\/h2>/);
assert.match(html, /id="school-cap-list" class="cap-list"/);
assert.match(html, /class="panel capability capability-full"/);
assert.match(html, /const renderFullCapabilities=/);
assert.doesNotMatch(html, /年级 \/ 学科使用次数|grade-subject-usage|school-cap-pager/);
assert.doesNotMatch(html, /<h2>区域使用趋势<\/h2>/);

console.log('school left panels verified');
