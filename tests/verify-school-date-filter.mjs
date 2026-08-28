import assert from 'node:assert/strict';
import fs from 'node:fs';

const school = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');
const regional = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(school, /class="date-controls"/);
assert.match(school, /id="date-start" class="date-input" type="date"/);
assert.match(school, /id="date-end" class="date-input" type="date"/);
assert.match(school, /class="date-arrow"[^>]*>→<\/span>/);
assert.match(school, /dateStart\.addEventListener\('change', updateDateRange\)/);
assert.match(school, /dateEnd\.addEventListener\('change', updateDateRange\)/);
assert.doesNotMatch(school, /<button class="range on"/);
assert.match(regional, /name === 'school'[\s\S]*url\.searchParams\.set\('view', 'school'\)/);
assert.match(regional, /url\.searchParams\.set\('school', window\.currentSchool\)/);
assert.match(regional, /initialParams\.get\('view'\) === 'school'/);

console.log('school date filter verified');
