import { Deferred } from 'misc-utils-of-mine-generic'
import { FS } from '../emscriptenFs'
import { getOptions } from '../options'
import { NativeMain } from './createMain'
import { mkdirp, makeDirRecursive } from '../util/mkdirp';
import { isDir } from '../util/util';

export interface Main {
  main: NativeMain,
  FS: FS
}

export const magickLoaded = new Deferred<Main>()

const stdout: string[] = []
export function pushStdout(s: string) {
  stdout.push(s)
}
export function resetStdout() {
  stdout.length = 0
}
export function getStdout() {
  return stdout.slice()
}

const stderr: string[] = []
export function pushStderr(s: string) {
  stderr.push(s)
}
export function resetStderr() {
  stderr.length = 0
}
export function getStderr() {
  return stderr.slice()
}

setTimeout(function() {
  (global as any).nodeMagickOptions = getOptions()
  require('./compiled/nodeMagick')
}, 0)

export function isNode() {
  return typeof process !== 'undefined' && typeof module !== 'undefined' && typeof module.exports !== 'undefined'&&(typeof document!=='undefined'? document.nodeType!==9 : false)
}

export function preRunHandler(FS:FS){
  // const {localNodeFsRoot,emscriptenNodeFsRoot,debug } = getOptions()
  // if(!isDir(emscriptenNodeFsRoot,FS)){
  //   makeDirRecursive(emscriptenNodeFsRoot, FS)
  // }
  //  // if we are on node, mount NODEFS to use system's filesystem instead memory
  //  if (isNode()) {
  //   if (!require('f'+'s').existsSync(localNodeFsRoot)) {
  //     require('f'+'s').mkdirSync(localNodeFsRoot, { recursive: true })
  //   }
  //   FS.mkdir(emscriptenNodeFsRoot);
  //   debug && console.log(`Mounting local folder ${localNodeFsRoot} as emscripten root folder ${emscriptenNodeFsRoot}.`)
  //   FS.mount(NODEFS, { root: localNodeFsRoot }, emscriptenNodeFsRoot);
  // }
}


// function testFile(f:string, FS:FS){
//   FS.
//   FS.analyzePath(f)

// }