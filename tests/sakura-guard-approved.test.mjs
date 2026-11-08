import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const page = readFileSync(join(root, 'index.html'), 'utf8');

const approvedPortraits = [
  ['raiGuard', 'rai-guard-commander-20261108.webp'],
  ['mamoruGuard', 'mamoru-guard-20261108.webp'],
  ['yumiGuard', 'yumi-guard-20261108.webp'],
  ['goGuard', 'go-guard-20261108.webp']
];

test('approved Sakura Guard portraits are used in cards and profiles', () => {
  for (const [profileKey, filename] of approvedPortraits) {
    const assetPath = `guard-characters/${filename}`;
    assert.ok(page.includes(`data-character="${profileKey}"`), `Missing guard profile trigger ${profileKey}`);
    assert.ok(page.includes(`image: "${assetPath}"`), `Missing profile image ${assetPath}`);
    assert.ok(page.includes(`src="${assetPath}"`), `Missing card image ${assetPath}`);
    const localPath = join(root, 'guard-characters', filename);
    assert.ok(statSync(localPath).size > 10_000, `Missing or empty image ${filename}`);
    assert.equal(readFileSync(localPath).toString('ascii', 0, 4), 'RIFF', `Not WebP: ${filename}`);
  }
});

test('Rai leads guard carousel without replacing his family portrait', () => {
  const guard = page.split('id="sakura-guard"')[1].split('id="character-profile"')[0];
  assert.ok(guard.indexOf('data-character="raiGuard"') < guard.indexOf('data-character="hikariGuard"'));
  assert.match(guard, /Guard Commander/);
  assert.match(page, /data-character="rai"/);
  assert.match(page, /image: "rai-from-reference-transparent-gold-20261107\.webp"/);
});
