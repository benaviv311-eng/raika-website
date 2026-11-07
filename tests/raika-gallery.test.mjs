import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const page = readFileSync(join(root, 'index.html'), 'utf8');

const variants = [
  ['Dual Blades', 'raika-dual-blades.webp'],
  ['Bō Staff', 'raika-bo-staff.webp'],
  ['Spinning Kick', 'raika-spinning-kick.webp'],
  ['Nunchaku', 'raika-nunchaku.webp'],
];

test('Raika has four distinct gallery variants and valid image assets', () => {
  for (const [label, filename] of variants) {
    assert.ok(page.includes(label), `Missing label: ${label}`);
    assert.ok(page.includes(`character-variants/${filename}`), `Missing variant path: ${filename}`);
    const image = join(root, 'character-variants', filename);
    assert.ok(statSync(image).size > 10_000, `Image must not be empty: ${filename}`);
    assert.equal(readFileSync(image).toString('ascii', 0, 4), 'RIFF', `Expected WebP: ${filename}`);
  }
});

test('gallery is contained in the existing profile dialog and remains conditional', () => {
  assert.match(page, /id="character-profile"[\s\S]*id="profile-gallery"/);
  assert.match(page, /id="profile-gallery"[^>]*hidden/);
  assert.match(page, /id="profile-gallery-options"/);
  assert.match(page, /info\.variants/);
  assert.match(page, /gallery\.hidden = activeVariants\.length === 0/);
});

test('gallery provides accessible selection and navigation controls', () => {
  assert.match(page, /id="profile-variant-prev"[^>]*aria-label="Previous character variant"/);
  assert.match(page, /id="profile-variant-next"[^>]*aria-label="Next character variant"/);
  assert.match(page, /aria-pressed/);
  assert.match(page, /profile-variant-counter"[^>]*aria-live="polite"/);
});
