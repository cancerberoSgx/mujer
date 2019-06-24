import test from 'ava'
import { readFileSync } from 'fs'
import { simplifyPaths } from '../src/simplifyPaths'

test('should generate pdf', async t => {
  var output = await simplifyPaths({
    input: './test/assets/test2.svg',
    width: 1000,
    height: 1000,
    tolerance: 5
  })
  t.true(readFileSync('./test/assets/test2.svg').toString().length > output.length)
  t.deepEqual(readFileSync('./test/assets/test2_simplifyPaths.svg').toString(), output)
})

test.todo('from input code ')
