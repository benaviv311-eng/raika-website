import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const raiGuard = html.match(/\braiGuard:\s*\{([\s\S]*?)\n\s*\},\s*\n\s*hikariGuard:/)?.[1];
const approved = [
  ['Forward Spear Thrust', 'rai-guard-forward-thrust.webp'],
  ['Horizontal Spear Sweep', 'rai-guard-horizontal-sweep.webp'],
  ['Rising Spear Strike', 'rai-guard-rising-strike.webp'],
  ['Diagonal Spear Defense', 'rai-guard-diagonal-defense.webp'],
];

test('Guard Commander Rai has four selectable, approved action poses in order', () => {
  assert.ok(raiGuard, 'Guard Commander Rai profile must exist');
  assert.match(raiGuard, /variants:\s*\[/, 'Profile must expose action gallery');
  let previous = -1;
  for (const [label, file] of approved) {
    const match = raiGuard.match(new RegExp(`label: "${label}", image: "character-variants/${file}"`));
    assert.ok(match, `Missing approved pose: ${label}`);
    const index = raiGuard.indexOf(match[0]);
    assert.ok(index > previous, `Wrong action order for ${label}`);
    previous = index;
    assert.ok(existsSync(path.join(root, 'character-variants', file)), `${file} is not on disk`);
  }
  assert.equal((raiGuard.match(/label: /g) || []).length, 4, 'Exactly four approved poses');
});
