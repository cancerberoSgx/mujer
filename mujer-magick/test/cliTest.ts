import test from 'ava'
import { execSync } from 'child_process'
import fileType from 'file-type'
import { existsSync, unlinkSync, readFileSync } from 'fs'

test('identify', async t => {
  const r = execSync('node bin/magica --input test/assets/n.png --command "identify n.png"')
  t.deepEqual(r.toString().trim(), 'n.png PNG 109x145 109x145+0+0 8-bit sRGB 39796B 0.000u 0:00.000')
})

test('convert should generate files in local dir by default', async t => {
  if (existsSync('tmp_cli_2.gif')) {
    unlinkSync('tmp_cli_2.gif')
  }
  execSync('node bin/magica --input test/assets/n.png --command "convert n.png -scale 144% tmp_cli_2.gif" --debug')
  t.deepEqual(fileType(readFileSync('tmp_cli_2.gif')), { ext: 'gif', mime: 'image/gif' })
  t.true(true)
})

test.todo('should mkdir-p if output dir doesnt exists')