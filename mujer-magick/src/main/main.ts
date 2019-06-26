// import { getOptions } from '../options';
// import { magickLoaded } from '../imageMagick/magickLoaded';
// import { slash, basename } from 'misc-utils-of-mine-generic';
// import { dirname } from 'path';

// interface Command {
//   cmd: string[]
//   inputFiles: InputFile[]
// }

// interface InputFile {
//   name: string
//   content: Buffer
// }

// export async function execute(o: Command){
//   const {localNodeFsRoot, emscriptenNodeFsRoot} = getOptions()
//   const {FS, main} = await magickLoaded
//   o.inputFiles.forEach(f=>{
//     // const name = normalizePathToBaseName(f)
//     const dirName = getFileDir(f.name);
//     if(dirName.trim()){
//       mkdirp(dirName, FS.isDir, FS.mkdir)
//     }
//     FS.chdir(emscriptenNodeFsRoot)
//     FS.writeFile(f.name, f.content)

//   })
// }

// function getFileDir(f: string) {
//   const baseName = basename(f);
//   let folderName = f.substring(0, f.length - baseName.length);
//   if (folderName.endsWith('/')) {
//     folderName = folderName.substring(0, folderName.length - 1);
//   }
//   return folderName
// }

// function normalizePathToBaseName(f: InputFile) {
//   return slash(f.name).replace(/\//g, '_');
// }

//   // const main = (options = {command: [], inputFiles: [], outputFileNames: []}) =>{
//   //   const {command, inputFiles, outputFileNames} = {command: [], inputFiles: [],outputFileNames: [] , ...options}
//   //   stdout = []
//   //   stderr = []
//   //   inputFiles.map(f=>({...f, name: `/${basename(f.name)}`})).forEach(f=>{
//   //     FS.writeFile(f.name, f.content);
//   //   })
//   //   let returnValue, error
//   //   try {
//   //     returnValue =  Module.callMain(command)
//   //   } catch (ex) {
//   //     error = ex
//   //   }
//   //   const outputFiles = outputFileNames.map(f=>{
//   //     return {
//   //       name: f,
//   //       content: FS.readFile(f)
//   //     }
//   //   })
//   //   inputFiles.concat(outputFileNames).forEach(f=>{
//   //     FS.unlink(f.name);
//   //   })
//   //   return {stdout, stderr, returnValue, outputFiles, error}
//   // }



// // //@ts-nocheck

// // var { magickLoaded } = require('../../')
// // const { readFileSync } = require('fs')

// // magickLoaded.then(({ FS, main }) => {
// //   const format = getImageFormat({ FS, main, fileName: 'n.png', fileContent: readFileSync('test/assets/n.png') })
// //   process.stdout.write('The format is: ' + format);
// // })

// // function getImageFormat({ FS, main, fileName, fileContent }) {
// //   var internalName = '/' + fileName;
// //   FS.writeFile(internalName, fileContent);

// //   var command = ["identify", internalName];
// //   try {
// //     const { stdout, stderr } = main(command)
// //     var format = stdout.join('').split(/\s+/g)[1]
// //     return format.toLowerCase()
// //   }
// //   catch (e) {
// //     console.error('ERROR', e);
// //     throw e
// //   }
// // }


