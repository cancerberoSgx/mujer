import test from 'ava';
import { readFileSync } from 'fs';
import { svg2pdf } from '../src';

test('should generate pdf', async t => {
  var output = await svg2pdf({
    input: './test/assets/test2.svg', 
    width: 1000, 
    height: 1000
  })
  // writeFileSync('tmp111.pdf', output)
  var expected = readFileSync('./test/assets/test2.pdf')
  t.deepEqual(output.toString('base64').length, expected.toString('base64').length)
})

test.todo('from input code ')