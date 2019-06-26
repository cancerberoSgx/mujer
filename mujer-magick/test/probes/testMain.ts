import test from 'ava'
import { readFileSync } from 'fs'
import { main } from '../../src/main/main'
import { ls } from '../../src/main/aux';

testLs()
testDebug()

async function testLs() {
  const result = await ls('.');
  console.log(result);
}


async function testDebug() {
  const result = await main({
    debug: true,
    commands: ['convert', '-debug', 'User', 'foo.png', '-scale', '55', 'foo2.png'],
    inputFiles: [{ name: 'foo.png', content: readFileSync('test/assets/n.png') }]
  });
  console.log(result);
}
