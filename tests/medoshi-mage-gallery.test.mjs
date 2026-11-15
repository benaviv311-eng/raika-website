import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const page = readFileSync(join(root, 'index.html'), 'utf8');
const variants = [
  ['Airborne Orb', 'medoshi-airborne-orb-approved.webp'],
  ['Staff Strike', 'medoshi-staff-strike-approved.webp'],
  ['Earth Bind', 'medoshi-earth-bind-approved.webp'],
  ['Tree of Life Defense', 'medoshi-tree-of-life-defense-approved.webp'],
  ['Mage Form', 'medoshi-mage-form.webp']
];

test('Medoshi keeps his approved wanderer portrait and canonical profile', () => {
  const start = page.indexOf('    medoshi: {');
  const end = page.indexOf('    raika: {', start);
  assert.ok(start > 0 && end > start);
  const profile = page.slice(start, end);
  assert.match(profile, /turtle-elder-approved-20261113.webp/);
  assert.match(profile, /The time has come/);
  const entries = [...profile.matchAll(/label: "([^"]+)", image: "world-characters\/([^"?]+)(?:\?[^"]+)?"/g)];
  assert.deepEqual(entries.map(([, label, filename]) => [label, filename]), variants);
});

test('Medoshi’s five gallery images are complete WebP files', () => {
  for (const [, filename] of variants) {
    const file = join(root, 'world-characters', filename);
    const buf = readFileSync(file);
    assert.equal(buf.toString('ascii', 0, 4), 'RIFF');
    assert.equal(buf.toString('ascii', 8, 12), 'WEBP');
    assert.equal(buf.readUInt32LE(4) + 8, buf.length);
  }
});
