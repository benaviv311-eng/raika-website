import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const page = readFileSync(join(root, 'index.html'), 'utf8');
const approvedVariants = [
  ['Rope Dart Throw', 'hikari-rope-dart-throw.webp'],
  ['Overhead Rope Spin', 'hikari-overhead-rope-spin.webp'],
  ['Dual Daggers', 'hikari-dual-daggers-transparent-20261109.webp'],
  ['Crossed Dagger Defense', 'hikari-crossed-dagger-defense-transparent-20261109.webp'],
];

function profileSection(key, nextKey) {
  const start = page.indexOf(`    ${key}: {`);
  const end = page.indexOf(`    ${nextKey}: {`, start);
  assert.ok(start !== -1 && end > start, `Missing or incomplete profile ${key}`);
  return page.slice(start, end);
}

test('both Hikari profiles expose the same four approved combat poses in order', () => {
  for (const [profileKey, nextKey] of [['hikari', 'raigo'], ['hikariGuard', 'yumiGuard']]) {
    const profile = profileSection(profileKey, nextKey);
    assert.match(profile, /variants:\s*\[/, `Missing gallery for ${profileKey}`);
    assert.equal((profile.match(/label:/g) || []).length, 4, `Must show four images for ${profileKey}`);
    let previous = -1;
    for (const [label, filename] of approvedVariants) {
      const entry = `{label: "${label}", image: "character-variants/${filename}"`;
      const index = profile.indexOf(entry);
      assert.ok(index > previous, `Missing or out of order pose ${label} in ${profileKey}`);
      previous = index;
    }
  }
});

test('all Hikari variant image assets are available and valid WebP files', () => {
  for (const [, filename] of approvedVariants) {
    const file = join(root, 'character-variants', filename);
    assert.ok(statSync(file).size > 20_000, `Missing or empty file: ${filename}`);
    assert.equal(readFileSync(file).toString('ascii', 0, 4), 'RIFF', `Not WebP: ${filename}`);
  }
});
