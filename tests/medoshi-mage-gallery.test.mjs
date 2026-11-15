import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const page = readFileSync(join(root, 'index.html'), 'utf8');
const variants = [
  ['Airborne Orb', 'portraits/medoshi-airborne-orb-clean.webp'],
  ['Staff Strike', 'portraits/medoshi-staff-strike-cutout.webp'],
  ['Earth Bind', 'portraits/medoshi-earth-bind-cutout.webp'],
  ['Tree of Life Defense', 'portraits/medoshi-tree-of-life-defense-cutout.webp'],
  ['Mage Form', 'portraits/medoshi-mage-form-cutout.webp']
];

test('Medoshi keeps his approved wanderer portrait and canonical profile', () => {
  const start = page.indexOf('    medoshi: {');
  const end = page.indexOf('    raika: {', start);
  assert.ok(start > 0 && end > start);
  const profile = page.slice(start, end);
  assert.match(profile, /world-characters\/portraits\/medoshi-cutout\.webp/);
  // The approved wanderer master file is retained untouched; only its display cutout is used.
  assert.ok(readFileSync(join(root, 'world-characters/turtle-elder-approved-20261113.webp')).length > 300_000);
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

test('The original Medoshi airborne action art remains preserved', () => {
  const original = readFileSync(join(root, 'world-characters/medoshi-airborne-orb-approved.webp'));
  assert.equal(original.toString('ascii', 0, 4), 'RIFF');
  assert.ok(original.length > 200_000);
});

test('Every original approved Medoshi pose is preserved in the canonical asset folder', () => {
  const originalFiles = [
    'medoshi-airborne-orb-approved.webp',
    'medoshi-staff-strike-approved.webp',
    'medoshi-earth-bind-approved.webp',
    'medoshi-tree-of-life-defense-approved.webp',
    'medoshi-mage-form.webp'
  ];
  for (const filename of originalFiles) {
    const bytes = readFileSync(join(root, 'world-characters', filename));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', filename);
    assert.ok(bytes.length > 100_000, filename);
  }
});
