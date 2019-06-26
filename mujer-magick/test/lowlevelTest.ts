import test from 'ava'
import { execSync } from 'child_process'

test('low level identify', async t => {
  t.notThrows(() => execSync('npm run build'))
  const s = execSync('node test/assets/lowlevelTestScript')
  t.true(s.toString().includes('The format is: png'))
})
