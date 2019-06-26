import { NativeResult } from './imageMagick/createMain';

export interface File {
  name: string;
  content: Buffer;
}

export interface NativeOptions extends BaseOptions {
  localNodeFsRoot?: string
  emscriptenNodeFsRoot?: string
}

interface BaseOptions {
  debug?: boolean
}

export interface MainOptions extends NativeOptions {
  /**
   * An ImageMagick command, for example: `['convert', 'foo/bar.png', '-scale', '50%', 'out.gif']`
   */
  command: string|string[]
  /**
   * The list of input files referenced in given [[command]]. It's important that the name of this files match the file names given in the command.
   */
  inputFiles?: File[]
  // /**
  //  * Because input files are copied to the working folder, By default, they are removed after command ends. If this option is true they won't. 
  //  */
  // noRemoveInputFiles?: boolean
  // /**
  //  * By default, generated output files are removed after the command ends. If this option is true, they won't. 
  //  */
  // noRemoveOutputFiles?: boolean
}

export interface MainResult extends NativeResult {
  outputFiles: File[]
}

export interface CliOptions extends MainOptions {
  help?: boolean
  input: string[]
}