import test from 'ava'
import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'

test('svg-optimize command should optimize given input files and write on given output folder', async t => {
  t.notThrows(() => execSync('rm -rf tmp_cli2'))
  t.false(existsSync('tmp_cli2/test2.svg'))
  t.notThrows(() => execSync('node bin/svg-optimize.js --input test/assets/test2.svg --output tmp_cli2'))
  t.true(existsSync('tmp_cli2/test2.svg'))
  t.true(readFileSync('tmp_cli2/test2.svg').toString().length < readFileSync('test/assets/test2.svg').toString().length)
})

test('svg-simplify-paths command should simplify paths of given input files and write on given output folder', async t => {
  t.notThrows(() => execSync('rm -rf tmp_cli3'))
  t.false(existsSync('tmp_cli3/test2.svg'))
  t.notThrows(() => execSync('node bin/svg-simplify-paths.js --input test/assets/test2.svg --output tmp_cli3 --tolerance 3'))
  t.true(existsSync('tmp_cli3/test2.svg'))
  t.true(readFileSync('tmp_cli3/test2.svg').toString().length < readFileSync('test/assets/test2.svg').toString().length)
})
