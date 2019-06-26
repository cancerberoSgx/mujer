import { notUndefined, objectKeys, notSameNotFalsy, sleep } from 'misc-utils-of-mine-generic'
import { NativeResult } from '../imageMagick/createMain'
import { magickLoaded } from '../imageMagick/magickLoaded'
import { getOptions, Options, setOptions } from '../options'
import { mkdirp } from '../util/mkdirp'
import { getFileDir } from '../util/util'
import { lsR, listFilesRecursively } from '../util/lsR';
import { rmRf } from '../util/rmRf';
import { File } from './types';

interface MainOptions extends Partial<Options> {
  /**
   * An ImageMagick command, for example: `['convert', 'foo/bar.png', '-scale', '50%', 'out.gif']`
   */
  commands: string[]
  /**
   * The list of input files referenced in given [[command]]. It's important that the name of this files match the file names given in the command.
   */
  inputFiles: File[]
  // /**
  //  * Because input files are copied to the working folder, By default, they are removed after command ends. If this option is true they won't. 
  //  */
  // noRemoveInputFiles?: boolean
  // /**
  //  * By default, generated output files are removed after the command ends. If this option is true, they won't. 
  //  */
  // noRemoveOutputFiles?: boolean
}

interface MainResult extends NativeResult {
  outputFiles: File[]
}

export async function main(o: MainOptions): Promise<MainResult> {
  // set options that user might given
  objectKeys(getOptions())
    .map(k => o[k])
    .filter<any>(notUndefined)
    .forEach((k: keyof Options) => setOptions({ [k]: o[k] }))

  const { localNodeFsRoot, emscriptenNodeFsRoot } = getOptions()
  const { FS, main } = await magickLoaded

  FS.chdir(emscriptenNodeFsRoot)
  
  o.inputFiles.forEach(f => {
    const dirName = getFileDir(f.name)
    if (dirName.trim()) {
      mkdirp(dirName, (p: string) => FS.analyzePath(p).exists, FS.mkdir)
    }
    FS.writeFile(f.name, f.content)
  })
  
  const beforeTree = listFilesRecursively('.',FS)
  // console.log(beforeTree);
  
  
  let returnValue = main(o.commands)
  
  // await sleep(100)
  const afterTree = listFilesRecursively('.',FS)
  // console.log(returnValue, afterTree,FS.readdir(emscriptenNodeFsRoot));

  const diffTree = afterTree.filter(f=>!beforeTree.find(b=>b.path===f.path))
  const outputFiles = diffTree.map(f=>({
    name: f.path,
    content: FS.readFile(f.path )
  }));
  (FS.readdir(emscriptenNodeFsRoot) as string[]).forEach(f=>rmRf(f, FS))

  return {
    ...returnValue,
    outputFiles 
  }
}



// /**
//  * debug output that prints output file names generated with -debug User 
//   we want to match something like this: 
//   Domain: Path; rights=Write; pattern="tmp.png"
//   */
// function matchWrittenFilesFromDebug(s: string){
//   const r = /Domain: Path; rights=Write; pattern="([^"]+)"/g
//   let result
//   const match = []
//   while((result=r.exec(s))) {
//     match.push(result[1])
//   }
//   return match.filter(notSameNotFalsy)
// }

// console.log(matchWrittenFilesFromDebug(readFileSync('./tmp.txt').toString()))