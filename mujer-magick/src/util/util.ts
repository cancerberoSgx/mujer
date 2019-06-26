import { basename } from 'misc-utils-of-mine-generic'

export function getFileDir(f: string) {
  const baseName = basename(f)
  let folderName = f.substring(0, f.length - baseName.length)
  if (folderName.endsWith('/')) {
    folderName = folderName.substring(0, folderName.length - 1)
  }
  return folderName
}
