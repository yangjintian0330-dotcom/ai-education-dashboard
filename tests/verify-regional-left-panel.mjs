import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('const pages=') + 'const pages='.length;
const end = source.indexOf(';const escapedCloseTag', start);
const regional = JSON.parse(source.slice(start, end)).regional;

assert.match(regional, /\.trend\{display:none\}/);
assert.match(regional, /\.cap-list\{[^}]*grid-template-rows:repeat\(6,1fr\)/);
assert.match(regional, /\.cap-row\{[^}]*grid-template-rows:28px 12px/);
assert.match(regional, /<article class="panel capability">/);

console.log('Regional left panel verification passed.');
