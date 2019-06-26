
export interface Options {
  localNodeFsRoot: string
  debug: boolean,
  emscriptenNodeFsRoot: string
}

let options:Options = {
  localNodeFsRoot: './working_tmp',
  emscriptenNodeFsRoot: '/w2',
  debug: true,
}
export function getOptions() {
  return options
}
export function getOption(k:keyof Options) {
  return options[k]||undefined
}
export function setOptions(o: Partial<Options>) {
  options = {...options, ...o}
}