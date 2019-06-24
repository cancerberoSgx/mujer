import { isNode } from 'misc-utils-of-mine-generic'
import { BaseOptions } from './types'

export function resolveInput(o: BaseOptions) {
  if (isNode()) {
    const f = require('path').resolve(o.input)
    if (require('fs').existsSync(f)) {
      return f
    }
  }
  return o.input
}
