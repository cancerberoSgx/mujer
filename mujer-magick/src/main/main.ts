import { getOptions, Options, setOptions, getOption } from '../options';
import { magickLoaded } from '../imageMagick/magickLoaded';
import { getFileDir } from './util';
import { NativeResult } from '../imageMagick/createMain';
import {mkdirp} from './mkdirp'
import { pathJoin, objectMap, objectKeys, notUndefined } from 'misc-utils-of-mine-generic';

interface MainOptions extends Partial<Options> {
  commands: string[]
  inputFiles: File[]
}

interface File {
  name: string
  content: Buffer
  
}

interface MainResult extends NativeResult {
  outputFiles: File[]
}

export async function main(o: MainOptions): Promise<MainResult> {
  // set options that user might given
    objectKeys(getOptions())
    .map(k=>o[k])
    .filter<any>(notUndefined)
    .forEach((k:keyof Options)=>setOptions({[k]: o[k]}))
  
    const {localNodeFsRoot, emscriptenNodeFsRoot} = getOptions()
  
    const {FS, main} = await magickLoaded

  o.inputFiles.forEach(f=>{
    const name = pathJoin(emscriptenNodeFsRoot, f.name)    
    const dirName = getFileDir(name);
    // console.log('mkdir -p', dirName);
    if(dirName.trim()){
      mkdirp(dirName,( p: string)=>FS.analyzePath(p).exists, FS.mkdir)
    }
    // console.log('Writing file ', name);
    FS.writeFile(name, f.content)
  })
    FS.chdir(emscriptenNodeFsRoot)
  
  // console.log('Executing',o.commands);
  let returnValue = main(o.commands)
  // console.log('returnvalue', returnValue);
  
  //TODO: clean up generated files
  // TODO: outputFiles
  return {
    ...returnValue,
    outputFiles: []
  }
  // } catch (ex) {
    // error = ex
  // }
}

