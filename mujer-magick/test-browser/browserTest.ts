import test from 'ava'
import { execSync } from 'child_process';
import puppeteer from 'puppeteer'
import { tryTo, sleep } from 'misc-utils-of-mine-generic';
import { staticServer } from './staticServer';
import { resolve } from 'path';

test('browser tests', async t => {
  t.notThrows(() => execSync('npm run build', { stdio: 'inherit' }), 'npm run build')
  t.notThrows(() => execSync('rm -rf  test-browser-outdir && mkdir -p test-browser-outdir ; cp dist/src/imageMagick/compiled/*.wasm test-browser-outdir', { stdio: 'inherit' }), 'copy dist/src/imageMagick/compiled/*.wasm')
  t.notThrows(() => execSync("npx parcel build test-browser/testBrowser.html --public-url './' -d test-browser-outdir --no-source-maps --no-minify", { stdio: 'inherit' }), 'npx parcel build')

  const server = await staticServer(resolve('test-browser-outdir'), 8080)
  // server.on('listening', async () => {
    // console.log('  server runnning');
    await sleep(2000)
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url = `http://localhost:8080/testBrowser.html`

    await page.goto(url)
    await sleep(2000)
    // page.screenshot()
    if(await page.evaluate(() => document.getElementById('assert')!.innerHTML.trim()))
    t.true(await page.evaluate(() => !!document.getElementById('assert')), 'assert container not found')
    const asserts = await page.evaluate(() => document.getElementById('assert')!.innerHTML.trim())
    t.deepEqual(asserts, '')
    // const expected = [
    //   `"type": "scoped_identifier"`,
    //   `"type": "compilationUnit"`]
    // const content = await page.evaluate(() => document.body.innerHTML)
    // console.log(content, 'JHSJKHSJKHJKHSJHKS', content);
    // await sleep(2000)

    // expected.forEach(e => t.true(content.includes(e)))
    server.close()
    await browser.close()
  // })

})

