import { BaseOptions } from './types';
import { isNode } from 'misc-utils-of-mine-generic';

export function resolveInput(o: BaseOptions){
  if(isNode()){
    const f =  require('path').resolve(o.input)
    if(require('fs').existsSync(f)){
      return f
    }
  }
  return o.input
}