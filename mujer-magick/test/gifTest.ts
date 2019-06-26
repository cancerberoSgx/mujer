import test from 'ava'
import { readFileSync } from 'fs'
import { basename } from 'misc-utils-of-mine-generic'
import { main } from '../src/main/main'

test('stdout', async t => {
  const result = await main({
    command: ['identify', 'foo.png'],
    inputFiles: [{ name: 'foo.png', content: readFileSync('test/assets/n.png') }]
  })
  t.deepEqual(result.stdout.join(''), 'foo.png PNG 109x145 109x145+0+0 8-bit sRGB 39796B 0.000u 0:00.000')
  t.deepEqual(result.stderr, [])
  t.falsy(result.error)
})

test.only('output file names', async t => {
  const result = await main({
    debug: true,
    command: 'convert foo.png -scale 50% foo2.png',
    inputFiles: [{ name: 'foo.png', content: readFileSync('test/assets/n.png') }]
  })
  t.deepEqual(result.outputFiles.map(f => basename(f.name)), ['foo2.png'])
  t.falsy(result.error)
  t.deepEqual(result.stderr, [])
})

test.todo('incorrect IM command')
test.todo('should support input file names with folders: convert input/in/nested/folder/foo.png -scale 100 bar.png')
test.todo('non existing dest folder should be created: convert n.png -scale in/non/existing/folder.gif')
