import test from 'ava'
import { readFileSync } from 'fs'
import { main } from '../src/main/main'

test('main basic', async t => {
  const result = await main({
    commands: ['identify', 'foo.png'],
    inputFiles: [{ name: 'foo.png', content: readFileSync('test/assets/n.png') }]
  })
  console.log(result)
  t.deepEqual(result.stdout.join(''), 'foo.png PNG 109x145 109x145+0+0 8-bit sRGB 39796B 0.000u 0:00.000')
  t.falsy(result.error)
})

test.todo('incorrect IM command')

// ;
// (async t => {
//   const result = await main({
//     commands: ['identify', 'foo.png'],
//     inputFiles: [{ name: 'foo.png', content: readFileSync('test/assets/n.png')}]
//   })
//   console.log(result);
//   // t.true(false)
// })()
