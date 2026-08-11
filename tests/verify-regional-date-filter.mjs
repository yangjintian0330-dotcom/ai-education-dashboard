import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('const pages=') + 'const pages='.length;
const end = source.indexOf(';const escapedCloseTag', start);
const regional = JSON.parse(source.slice(start, end)).regional;

assert.match(regional, /id="date-start"[^>]*type="date"/);
assert.match(regional, /id="date-end"[^>]*type="date"/);
assert.match(regional, /class="date-arrow"/);
assert.doesNotMatch(regional, /<button class="range/);
assert.match(regional, /function applyDateRange\(\)/);

console.log('Regional date filter verification passed.');
