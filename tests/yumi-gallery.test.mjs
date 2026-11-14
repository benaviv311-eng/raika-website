import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const page = readFileSync(join(root, 'index.html'), 'utf8');
const approvedVariants = [
  ['Precision Shot', 'yumi-precision-shot-transparent-20261109.webp'],
  ['Kneeling Shot', 'yumi-kneeling-shot-transparent-20261109.webp'],
  ['Spinning Bow Strike', 'yumi-spinning-bow-strike-transparent-20261109.webp'],
  ['Bow Defense', 'yumi-bow-defense-transparent-20261109.webp'],
];

test('Yumi profile presents four approved poses in the intended sequence', () => {
  const start = page.indexOf('    yumiGuard: {');
  const end = page.indexOf('    goGuard: {', start);
  assert.ok(start !== -1 && end > start, 'Yumi profile must exist');
  const profile = page.slice(start, end);
  assert.match(profile, /variants:\s*\[/, 'Yumi must have a selectable pose gallery');
  assert.equal((profile.match(/label:/g) || []).length, 4, 'Exactly four approved poses must appear');
  let previous = -1;
  for (const [label, filename] of approvedVariants) {
    const position = profile.indexOf(`{label: "${label}", image: "character-variants/${filename}"`);
    assert.ok(position > previous, `Pose ${label} missing or out of sequence`);
    previous = position;
  }
  assert.doesNotMatch(profile, /pending|\.png/i, 'Unapproved drafts must not appear in the gallery');
});

test('Yumi approved pose assets are actual WebP images', () => {
  for (const [, filename] of approvedVariants) {
    const file = join(root, 'character-variants', filename);
    const buffer = readFileSync(file);
    assert.ok(statSync(file).size > 20_000, `${filename} must not be empty`);
    assert.equal(buffer.toString('ascii', 0, 4), 'RIFF', `${filename} must have a WebP container`);
    assert.equal(buffer.toString('ascii', 8, 12), 'WEBP', `${filename} must be WebP encoded`);
  }
});
