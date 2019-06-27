import test from 'ava'
import { readFileSync } from 'fs'
import { main } from '../src/main/main'

test.skip('should be able to generate a gif animation', async t => {
  const result = await main({
    command: ['identify', 'foo.png'],
    inputFiles: [{ name: 'foo.png', content: readFileSync('test/assets/n.png') }]
  })
  t.deepEqual(result.stdout.join(''), 'foo.png PNG 109x145 109x145+0+0 8-bit sRGB 39796B 0.000u 0:00.000')
  t.deepEqual(result.stderr, [])
  t.falsy(result.error)
})
