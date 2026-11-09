import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const affected = [
  'hikari-dual-daggers',
  'hikari-crossed-dagger-defense',
  'yumi-precision-shot',
  'yumi-kneeling-shot',
  'yumi-spinning-bow-strike',
  'yumi-bow-defense',
];

test('approved Hikari and Yumi actions use the new transparent-background assets', () => {
  for (const stem of affected) {
    const file = `character-variants/${stem}-transparent-20261109.webp`;
    assert.ok(html.includes(`image: "${file}"`), `${stem} still points to the opaque original`);
    const fullPath = path.join(root, file);
    assert.ok(existsSync(fullPath), `${stem} transparent asset is missing`);
    const isOpaque = execFileSync('identify', ['-format', '%[opaque]', fullPath], { encoding: 'utf8' });
    assert.equal(isOpaque, 'false', `${stem} is not really transparent`);
    const topLeft = execFileSync('convert', [fullPath, '-crop', '1x1+0+0', '-format', '%[fx:mean.a]', 'info:'], { encoding: 'utf8' });
    assert.ok(Number(topLeft) < 0.01, `${stem} still includes its studio background`);
  }
});
