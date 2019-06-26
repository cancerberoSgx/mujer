import { FS } from '../emscriptenFs';

export function rmRf(f:string, FS:FS){
  if(FS.isDir(FS.stat(f).mode)){
    (FS.readdir(f) as string[]).forEach(f=>rmRf(f, FS))
    FS.rmdir(f)
  } 
  else {
    FS.unlink(f)
  }
}