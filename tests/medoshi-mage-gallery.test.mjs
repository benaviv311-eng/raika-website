import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const page = readFileSync(join(root, 'index.html'), 'utf8');
const variants = [
  ['Airborne Orb', 'medoshi-airborne-orb-approved.webp'],
  ['Staff Strike', 'medoshi-staff-strike-approved.webp'],
  ['Earth Bind', 'medoshi-earth-bind-approved.webp'],
  ['Tree of Life Defense', 'medoshi-tree-of-life-defense-approved.webp']
];

test('Medoshi keeps his approved wanderer portrait and canonical profile', () => {
  const start = page.indexOf('    medoshi: {');
  const end = page.indexOf('    raika: {', start);
  assert.ok(start > 0 && end > start);
  const profile = page.slice(start, end);
  assert.match(profile, /turtle-elder-approved-20261113.webp/);
  assert.match(profile, /The time has come/);
  assert.equal((profile.match(/label:/g) || []).length, 4);
  let previous = -1;
  for (const [label, filename] of variants) {
    const token = 'label: "' + label + '", image: "world-characters/' + filename + '"';
    const pos = profile.indexOf(token);
    assert.ok(pos > previous, label + ' missing or out of order');
    previous = pos;
  }
});

test('Four approved Medoshi poses are real images', () => {
  for (const [, filename] of variants) {
    const file = join(root, 'world-characters', filename);
    const buf = readFileSync(file);
    assert.ok(statSync(file).size > 200_000);
    assert.equal(buf.toString('ascii', 0, 4), 'RIFF');
    assert.equal(buf.toString('ascii', 8, 12), 'WEBP');
  }
});
