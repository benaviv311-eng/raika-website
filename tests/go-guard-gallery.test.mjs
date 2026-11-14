import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const page = readFileSync(join(root, 'index.html'), 'utf8');
const approvedVariants = [
  ['Thunder Strike', 'go-thunder-strike-approved-20261109.webp'],
  ['Iron Storm', 'go-iron-storm-approved-20261109.webp'],
  ['Steel Interception', 'go-steel-interception-approved-20261109.webp'],
  ['Rising Cleave', 'go-rising-cleave-approved-20261110.webp'],
];

test('Gō profile lets visitors select exactly the four approved axe poses in order', () => {
  const start = page.indexOf('    goGuard: {');
  const end = page.indexOf('    mamoruGuard: {', start);
  assert.ok(start !== -1 && end > start, 'Gō must have a character profile');
  const profile = page.slice(start, end);
  assert.match(profile, /variants:\s*\[/, 'Gō needs a selectable gallery');
  assert.equal((profile.match(/label:/g) || []).length, 4, 'Visitors should see exactly four approved poses');
  let previous = -1;
  for (const [label, filename] of approvedVariants) {
    const position = profile.indexOf(`{label: "${label}", image: "guard-characters/${filename}"`);
    assert.ok(position > previous, `Approved pose ${label} is missing or out of order`);
    previous = position;
  }
  assert.doesNotMatch(profile, /pending|\.png/i, 'Rejected and pending poses must not be published');
});

test('Every approved Gō image is present as a real WebP asset', () => {
  for (const [, filename] of approvedVariants) {
    const file = join(root, 'guard-characters', filename);
    const buffer = readFileSync(file);
    assert.ok(statSync(file).size > 20_000, `${filename} is missing or empty`);
    assert.equal(buffer.toString('ascii', 0, 4), 'RIFF', `${filename} lacks a WebP container`);
    assert.equal(buffer.toString('ascii', 8, 12), 'WEBP', `${filename} lacks a WebP signature`);
  }
});
