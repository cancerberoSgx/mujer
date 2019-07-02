import { existsSync } from 'fs'
import { isNode, notUndefined, objectKeys, serial } from 'misc-utils-of-mine-generic'
import { InputFile } from '../file'
import { magickLoaded } from '../imageMagick/magickLoaded'
import { getOptions, setOptions } from '../options'
import { MainOptions, MainResult, NativeOptions } from '../types'
import { listFilesRecursively, ls } from '../util/lsR'
import { mkdirp } from '../util/mkdirp'
import { rmRf } from '../util/rmRf'
import { getFileDir } from '../util/util'
import { processCommand } from './command'

export async function main(o: Partial<MainOptions>): Promise<MainResult> {
  // set options that user might given
  objectKeys(getOptions())
    .map(k => o[k])
    .filter<any>(notUndefined)
    .forEach((k: keyof NativeOptions) => setOptions({ [k]: o[k] }))

  const { emscriptenNodeFsRoot } = getOptions()
  const { FS, main } = await magickLoaded

  FS.chdir(emscriptenNodeFsRoot)
  const files = await resolveInputFiles(o)
  files.forEach(f => {
    const dirName = getFileDir(f.name)
    if (dirName.trim()) {
      mkdirp(dirName, p => FS.analyzePath(p).exists, FS.mkdir)
    }
    FS.writeFile(f.name, f.content)
  })

  const beforeTree = listFilesRecursively(emscriptenNodeFsRoot, FS)

  let returnValue = main(processCommand(o.command!))

  const afterTree = listFilesRecursively(emscriptenNodeFsRoot, FS)

  const diffTree = afterTree.filter(f => !beforeTree.find(b => b.path === f.path))
  const outputFiles = diffTree.map(f => ({
    name: f.path,
    content: FS.readFile(f.path)
  }))
  !o.noRemove && ls(emscriptenNodeFsRoot, FS).forEach(f => rmRf(f, FS))

  return {
    ...returnValue,
    outputFiles
  }
}

async function resolveInputFiles(o: Partial<MainOptions>) {
  return await serial((o.inputFiles || []).map(f => async () => typeof f === 'string' ? (isNode() && existsSync(f) ? await InputFile.fromFile(f) : await InputFile.fromUrl(f)) : f))
}

