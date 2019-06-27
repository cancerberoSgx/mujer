import { NativeOptions } from './types'

let options: Required<NativeOptions> = {
  localNodeFsRoot: './working_tmp',
  emscriptenNodeFsRoot: '/w2',
  debug: true,
}
export function getOptions() {
  return options
}
export function getOption(k: keyof NativeOptions) {
  return options[k] || undefined
}
export function setOptions(o: Partial<NativeOptions>) {
  options = { ...options, ...o }
}
