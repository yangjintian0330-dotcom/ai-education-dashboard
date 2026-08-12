import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

assert.match(html, /const scale=Math\.min\(innerHeight\/900,innerWidth\/1440\),designWidth=innerWidth\/scale/);
assert.match(html, /screen\.style\.width=designWidth\+'px'/);
assert.match(html, /screen\.style\.transform='scale\('\+scale\+'\)'/);
assert.match(html, /document\.documentElement\.style\.overflow='hidden'/);
assert.match(html, /document\.body\.style\.overflow='hidden'/);
assert.doesNotMatch(html, /innerWidth\/1600,innerHeight\/900/);

console.log('school viewport fill verified');
