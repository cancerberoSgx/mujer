import { pathJoin, basename } from 'misc-utils-of-mine-generic';

interface Options {
  path: string
  /**
   * list files in given folder. Returns children files and folders base names.
   */
  ls: (f: string) => string[]
  /**
   * return true if given file is a directory.
   */
  isDir: (f: string) => boolean
  /**
   * If true is returned the visit will stop.
   */
  visitor: (f: LsRVisitorFile) => boolean
}
export interface LsRVisitorFile{ path: string, isDir: boolean }
export function lsR(o: Options) {
  function recurse(f: string) {
    o.ls(f).map(c =>  pathJoin(f, basename(c))).forEach(path => {
      const isDir = o.isDir(path)
      if (!o.visitor({ path, isDir }) && isDir) {
        recurse(path)
      }
    })
  }
  recurse(o.path)
}
