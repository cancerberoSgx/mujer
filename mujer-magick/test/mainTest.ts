import test from 'ava'
import { readFileSync } from 'fs'
import { main } from '../src/main/main'
import { basename } from 'misc-utils-of-mine-generic';

test('stdout', async t => {
  const result = await main({
    commands: ['identify', 'foo.png'],
    inputFiles: [{ name: 'foo.png', content: readFileSync('test/assets/n.png') }]
  })
  t.deepEqual(result.stdout.join(''), 'foo.png PNG 109x145 109x145+0+0 8-bit sRGB 39796B 0.000u 0:00.000')
  t.deepEqual(result.stderr, [])
  t.falsy(result.error)
})

test.only('output file names', async t => {
  const result = await main({
    debug: true,
    commands: 'convert foo.png -scale 50% foo2.png'.split(/\s+/),
    inputFiles: [{ name: 'foo.png', content: readFileSync('test/assets/n.png') }]
  })
  t.deepEqual(result.outputFiles.map(f=>basename(f.name)), ['foo2.png'])
  t.falsy(result.error)
  t.deepEqual(result.stderr, [])
})

test.todo('incorrect IM command')
test.todo('paths with folders convert foo/bar/p.png')
