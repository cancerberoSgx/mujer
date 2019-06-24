import test from 'ava'
import { readFileSync } from 'fs'
import { optimizeSvg } from '../src/optimizeSvg'

test('should generate pdf', async t => {
  var output = await optimizeSvg({
    input: readFileSync('./test/assets/test2.svg').toString()
  })
  t.true(readFileSync('./test/assets/test2.svg').length > output.length)
})

test.todo('options')
