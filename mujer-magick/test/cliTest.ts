import test from 'ava'
import { execSync } from 'child_process'

test('simple', async t => {
  t.notThrows(() => execSync('npm run build'))
  const r = execSync('node bin/magica --input test/assets/n.png --command "identify n.png"')
  t.deepEqual(r.toString().trim(), 'n.png PNG 109x145 109x145+0+0 8-bit sRGB 39796B 0.000u 0:00.000')
})

