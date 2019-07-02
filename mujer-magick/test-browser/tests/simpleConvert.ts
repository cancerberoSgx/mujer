import { basename } from 'misc-utils-of-mine-generic';
import { main } from '../../src';
import { InputFile } from '../../src/file';
import { assertEquals, assertIncludes } from '../testUtil';

export default async function f(){
 let result = await main({
    command: 'convert chala.tiff -rotate 45 output.bmp',
    inputFiles: [await InputFile.fromUrl('chala.tiff')]
  })
//  log(inspect(result));  
  assertIncludes(result.outputFiles[0].name, 'output.bmp')
  assertEquals(result.outputFiles.map(f=>basename(f.name)), ['output.bmp'])
  assertEquals(result.error, undefined)
  assertEquals(result.stderr, [])
  
}

