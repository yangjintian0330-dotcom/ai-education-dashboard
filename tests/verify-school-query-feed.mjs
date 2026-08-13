import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

assert.match(html, /class="query-school"/);
assert.match(html, /class="query-teacher"/);
assert.match(html, /class="query-content"/);
assert.match(html, /你帮我生成一个八年级语文教学课件/);
assert.match(html, /\.wheel-feed \.query-school\{/);
assert.match(html, /\.wheel-feed \.query-teacher\{/);
assert.match(html, /\.wheel-feed \.query-content\{/);
assert.match(html, /school-region-feed/);
assert.match(html, /school-feed-stack/);
assert.match(html, /\.school-region-feed>\.link-item\{display:none!important\}/);
assert.match(html, /\.school-feed-stack \.link-item\{position:relative!important/);
assert.match(html, /animation:none!important/);
assert.match(html, /const renderSchoolFeed=/);
assert.match(html, /renderSchoolFeed\(\)},2200\)/);
assert.match(html, /height:132px;flex:0 0 132px/);

console.log('school query feed verified');
