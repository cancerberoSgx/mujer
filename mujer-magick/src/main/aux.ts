import { pathJoin } from 'misc-utils-of-mine-generic'
import { magickLoaded } from '../imageMagick/magickLoaded'
import { getOptions } from '../options'
import { listFilesRecursively } from '../util/lsR'

/**
 * list files in given path. This utility is helpful for debugging
 */
export async function ls(path: string, prependEmscriptenNodeFsRoot = true) {
  const { emscriptenNodeFsRoot } = getOptions()
  const { FS, main } = await magickLoaded
  path = prependEmscriptenNodeFsRoot ? pathJoin(emscriptenNodeFsRoot, path) : path
  return listFilesRecursively('.', FS)
}
