import { readFileSync } from 'fs'
import { ls } from '../../src/main/aux'
import { main } from '../../src/main/main'

testLs()
testDebug()

async function testLs() {
  const result = await ls('.')
  console.log(result)
}

async function testDebug() {
  const result = await main({
    debug: true,
    command: ['convert', '-debug', 'User', 'foo.png', '-scale', '55', 'foo2.png'],
    inputFiles: [{ name: 'foo.png', content: readFileSync('test/assets/n.png') }]
  })
  console.log(result)
}
