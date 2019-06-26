import test from 'ava'
import { execSync } from 'child_process'
import { mkdirSync, existsSync } from 'fs';
import { mkdirp } from '../src/main/mkdirp';

test('works', async t => {
  t.notThrows(() => execSync('rm -rf tmp/foo/bar'))
  t.false(existsSync('tmp/foo/bar'))
  mkdirp('tmp/foo/bar', existsSync, mkdirSync)
  t.true(existsSync('tmp/foo/bar'))
})
