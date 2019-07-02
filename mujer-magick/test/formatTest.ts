import test from 'ava'
import { execSync } from 'child_process'
import fileType from 'file-type'
import { existsSync, unlinkSync, readFileSync } from 'fs'

test('identify', async t => {
  let r : Buffer
  t.notThrows(()=>r=execSync('npx ts-node -T test/assets/formatConvertIdentifyScript.ts'))
  t.true(r!.toString().includes('total time:'))
})
