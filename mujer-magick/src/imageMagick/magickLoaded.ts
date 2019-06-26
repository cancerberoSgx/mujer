import {Deferred} from 'misc-utils-of-mine-generic'

export const magickLoaded = new Deferred()

const stdout: string[] = []
export function pushStdout(s: string){
  stdout.push(s)
}
export function resetStdout(){
  stdout.length = 0
}
export function getStdout(){
  return stdout.slice()
}

const stderr: string[] = []
export function pushStderr(s: string){
  stderr.push(s)
}
export function resetStderr(){
  stderr.length = 0
}
export function getStderr(){
  return stderr.slice()
}

setTimeout(function(){
  require('./compiled/nodeMagick')
}, 0);
