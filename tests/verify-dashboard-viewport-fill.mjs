import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(html, /const scale=Math\.min\(innerWidth\/1600,innerHeight\/900\)/);
assert.match(html, /screen\.style\.transform='scale\('\+scale\+'\)'/);
assert.doesNotMatch(html, /const scaleX=innerWidth\/1600,scaleY=innerHeight\/900/);
assert.match(html, /document\.documentElement\.style\.overflow='hidden'/);
assert.match(html, /document\.body\.style\.overflow='hidden'/);

console.log('dashboard viewport fill verified');
