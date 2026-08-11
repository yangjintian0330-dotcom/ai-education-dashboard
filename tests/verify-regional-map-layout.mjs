import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('const pages=') + 'const pages='.length;
const end = source.indexOf(';const escapedCloseTag', start);
const regional = JSON.parse(source.slice(start, end)).regional;

assert.match(regional, /\.map-shell\{height:auto;flex:1;/);
assert.match(regional, /\.ledger\{display:none\}/);
assert.match(regional, /\.command\{display:flex;flex-direction:column;min-height:0\}/);

console.log('Regional map layout verification passed.');
