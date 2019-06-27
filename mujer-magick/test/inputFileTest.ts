import test from 'ava'
import fetch from 'node-fetch'
import { InputFile } from '../src/file'
import { main } from '../src/main/main'

test('from url request', async t => {
  const url = 'https://cancerberosgx.github.io/demos/geometrizejs-cli/bridge.jpg'
  const r = await fetch(url)
  const result = await main({
    command: ['identify', 'bridge.jpg'],
    inputFiles: [{ name: 'bridge.jpg', content: await r.buffer() }]
  })
  t.deepEqual(result.stdout.join(''), 'bridge.jpg JPEG 500x333 500x333+0+0 8-bit sRGB 35527B 0.000u 0:00.000')
  t.deepEqual(result.stderr, [])
  t.falsy(result.error)
})

test('InputFile.fromUrl', async t => {
  const url = 'https://cancerberosgx.github.io/demos/geometrizejs-cli/bridge.jpg'
  const result = await main({
    command: ['identify', 'bridge.jpg'],
    inputFiles: [await InputFile.fromUrl(url)]
  })
  t.deepEqual(result.stdout.join(''), 'bridge.jpg JPEG 500x333 500x333+0+0 8-bit sRGB 35527B 0.000u 0:00.000')
  t.deepEqual(result.stderr, [])
  t.falsy(result.error)
})
