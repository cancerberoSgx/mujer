import { notUndefined, objectKeys } from 'misc-utils-of-mine-generic'
import { magickLoaded } from '../imageMagick/magickLoaded'
import { getOptions, setOptions } from '../options'
import { listFilesRecursively } from '../util/lsR'
import { mkdirp } from '../util/mkdirp'
import { rmRf } from '../util/rmRf'
import { getFileDir } from '../util/util'
import { File, MainOptions, MainResult, NativeOptions } from '../types'
import { processCommand } from './processCommand';

export async function main(o: MainOptions): Promise<MainResult> {
  // set options that user might given
  objectKeys(getOptions())
    .map(k => o[k])
    .filter<any>(notUndefined)
    .forEach((k: keyof NativeOptions) => setOptions({ [k]: o[k] }))

  const { localNodeFsRoot, emscriptenNodeFsRoot } = getOptions()
  const { FS, main } = await magickLoaded

  FS.chdir(emscriptenNodeFsRoot)

 ; (o.inputFiles||[]).forEach(f => {
    const dirName = getFileDir(f.name)
    if (dirName.trim()) {
      mkdirp(dirName, (p: string) => FS.analyzePath(p).exists, FS.mkdir)
    }
    FS.writeFile(f.name, f.content)
  })

  const beforeTree = listFilesRecursively('.', FS)

  let returnValue = main(processCommand(o.command))

  const afterTree = listFilesRecursively('.', FS)

  const diffTree = afterTree.filter(f => !beforeTree.find(b => b.path === f.path))
  const outputFiles = diffTree.map(f => ({
    name: f.path,
    content: FS.readFile(f.path)
  }));
  (FS.readdir(emscriptenNodeFsRoot) as string[]).forEach(f => rmRf(f, FS))

  return {
    ...returnValue,
    outputFiles
  }
}


