import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const routeStart = source.indexOf('const initialParams = new URLSearchParams(window.location.search);');
const routeSource = source.slice(routeStart);

assert.ok(routeStart > source.lastIndexOf('pages.school = pages.school.replace'), 'initial route must run after dashboard assembly');
assert.doesNotMatch(source.slice(0, routeStart), /document\.getElementById\('view'\)\.srcdoc = pages\.regional;/, 'regional dashboard must not render before route selection');
assert.match(routeSource, /if \(initialParams\.get\('view'\) === 'school'\)[\s\S]*srcdoc = pages\.school;[\s\S]*else[\s\S]*srcdoc = pages\.regional;/, 'initial route must choose exactly one dashboard');

console.log('initial route renders exactly once');
