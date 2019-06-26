
export interface Options {
  localNodeFsRoot: string
  debug: false,
  emscriptenNodeFsRoot: string
}

let options:Options = {
  localNodeFsRoot: 'working_tmp',
  emscriptenNodeFsRoot: '/w2',
  debug: false,
}
export function getOptions() {
  return options
}
export function setOptions(o: Partial<Options>) {
  options = {...options, ...o}
}