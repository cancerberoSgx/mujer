import { Deferred } from 'misc-utils-of-mine-generic'
import { FS } from '../emscriptenFs'
import { getOptions } from '../options'
import { NativeMain } from './createMain'

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
