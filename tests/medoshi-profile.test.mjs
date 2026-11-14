import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const page = readFileSync(join(root, 'index.html'), 'utf8');
const asset = 'world-characters/turtle-elder-approved-20261113.webp';

test('Medoshi is identified canonically exactly once and opens his profile', () => {
  assert.ok(page.includes('id="world-characters"'));
  assert.equal(page.split('data-character="medoshi"').length - 1, 1);
  assert.ok(page.includes('medoshi: {'));
  assert.match(page, /Medoshi/);
  assert.match(page, /Dokoran is growing stronger/);
  assert.match(page, /The time has come/);
  assert.doesNotMatch(page, /Turtle Elder|turtleElder|Canonical name pending/);
  assert.ok(page.includes('id="sakura-guard"'));
  assert.ok(page.includes('id="family-carousel"'));
});

test('Medoshi keeps the approved transparent WebP portrait unaltered', () => {
  const path = join(root, asset);
  const bytes = readFileSync(path);
  assert.ok(statSync(path).size > 300_000);
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
});
