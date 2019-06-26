import { getStderr, getStdout, resetStderr, resetStdout } from './magickLoaded';


module.exports.createMain = function(Module: any){
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



  // const main = (options = {command: [], inputFiles: [],outputFileNames: []}) =>{
  //   const {command, inputFiles, outputFileNames} = {command: [], inputFiles: [],outputFileNames: [] , ...options}
  //   stdout = []
  //   stderr = []
  //   inputFiles.map(f=>({...f, name: `/${basename(f.name)}`})).forEach(f=>{
  //     FS.writeFile(f.name, f.content);
  //   })
  //   let returnValue, error
  //   try {
  //     returnValue =  Module.callMain(command)
  //   } catch (ex) {
  //     error = ex
  //   }
  //   const outputFiles = outputFileNames.map(f=>{
  //     return {
  //       name: f,
  //       content: FS.readFile(f)
  //     }
  //   })
  //   inputFiles.concat(outputFileNames).forEach(f=>{
  //     FS.unlink(f.name);
  //   })
  //   return {stdout, stderr, returnValue, outputFiles, error}
  // }