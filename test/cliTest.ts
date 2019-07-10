import test from 'ava'
import { readFileSync, existsSync } from 'fs'
import { execSync } from 'child_process';

test('svg-optimize command should optimize given input files and write on given output folder', async t => {
  t.notThrows(()=>execSync('rm -rf tmp_cli2'))
  t.false(existsSync('tmp_cli2/test2.svg'))
  t.notThrows(()=>execSync('node bin/optimize-svg.js --input test/assets/test2.svg --output tmp_cli2'))
  t.true(existsSync('tmp_cli2/test2.svg'))
  t.true(readFileSync('tmp_cli2/test2.svg').toString().length<readFileSync('test/assets/test2.svg').toString().length)
})

