import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('const pages=') + 'const pages='.length;
const end = source.indexOf(';const escapedCloseTag', start);
const regional = JSON.parse(source.slice(start, end)).regional;

assert.match(regional, /<aside class="side right-focus">/);
assert.match(regional, /<h2>高频 AI 能力学校<\/h2>/);
assert.match(regional, /id="school-cap-list" class="cap-list"/);
assert.match(regional, /\.right-focus > article:not\(\.school-capability\)\{display:none\}/);
assert.match(regional, /function renderSchoolCapabilities\(period, scale\)/);
assert.match(regional, /renderSchoolCapabilities\(period, scale\);/);

console.log('Regional school capability panel verification passed.');
