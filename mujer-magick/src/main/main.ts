import { notUndefined, objectKeys, pathJoin } from 'misc-utils-of-mine-generic'
import { NativeResult } from '../imageMagick/createMain'
import { magickLoaded } from '../imageMagick/magickLoaded'
import { getOptions, Options, setOptions } from '../options'
import { mkdirp } from '../util/mkdirp'
import { getFileDir } from '../util/util'

interface MainOptions extends Partial<Options> {
  /**
   * An ImageMagick command, for example: `['convert', 'foo/bar.png', '-scale', '50%', 'out.gif']`
   */
  commands: string[]
  /**
   * The list of input files referenced in given [[command]]. It's important that the name of this files match the file names given in the command.
   */
  inputFiles: File[]
  /**
   * Because input files are copied to the working folder, By default, they are removed after command ends. If this option is true they won't. 
   */
  noRemoveInputFiles?: boolean
  /**
   * By default, generated output files are removed after the command ends. If this option is true, they won't. 
   */
  noRemoveOutputFiles?: boolean
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
    .map(k => o[k])
    .filter<any>(notUndefined)
    .forEach((k: keyof Options) => setOptions({ [k]: o[k] }))

  const { localNodeFsRoot, emscriptenNodeFsRoot } = getOptions()

  const { FS, main } = await magickLoaded

  FS.chdir(emscriptenNodeFsRoot)
  o.inputFiles.forEach(f => {
    // const name = pathJoin(emscriptenNodeFsRoot, f.name)
    const dirName = getFileDir(f.name)
    // console.log('mkdir -p', dirName);
    if (dirName.trim()) {
      mkdirp(dirName, (p: string) => FS.analyzePath(p).exists, FS.mkdir)
    }
    // console.log('Writing file ', name);
    FS.writeFile(f.name, f.content)
  })
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

