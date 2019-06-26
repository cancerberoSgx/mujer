import { getStderr, getStdout, resetStderr, resetStdout } from './magickLoaded'


module.exports.createMain = function(Module: any): (...args: any[])=>any {
  return function main(...args: any[]) {
    resetStdout()
    resetStderr()
    const returnValue = Module.callMain(...args)
    return {
      returnValue,
      stdout: getStdout(),
      stderr: getStderr()
    }
  }
}
