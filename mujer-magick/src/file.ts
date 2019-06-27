import { basename, getFileNameFromUrl } from 'misc-utils-of-mine-generic'
import fetch, { RequestInit } from 'node-fetch'
import { isNode } from './imageMagick/magickLoaded'
import { File } from './types'

export class InputFile implements File {

  private constructor(public name: string, public content: Buffer) {
    //TODO: getters
  }

  static async fromUrl(u: string, o: RequestInit & O = {}) {
    const r = await fetch(u, o)
    const data = await r.buffer()
    return new InputFile(o.name || getFileNameFromUrl(u),
      data
      // Buffer.from(data) // HEADS UP: for some reason we need recreate the Buffer instance in order to work, may be consuming it before givin it to IM
    )
  }
  static async fromFile(f: string, o: O = {}) {
    return new InputFile(o.name || basename(f), readFileSync(f))
  }
}
interface O {
  name?: string
}

export function readFileSync(f: string) {
  if (isNode()) {
    return require('f' + 's').readFileSync(f) as Buffer
  } else {
    throw new Error('Attemped to readFile in the browser.')
  }
}
