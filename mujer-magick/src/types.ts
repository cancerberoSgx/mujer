import { NativeResult } from './imageMagick/createMain'

export interface File {
  name: string;
  content: ArrayBufferView
}

export interface NativeOptions extends BaseOptions {
  /**
   * (Node.js and CLI only). In Node.js the local file system will be used to read/write files instead of memory (like in the browser). This folder will be used for that, by default, ./working_tmp. IMPORTANT: the content of this folder will be removed each time the tool is executed.
   */
  nodeFsLocalRoot: string
  /**
   * Internal root FS directed path. This should rarely be configured by users.
   */
  emscriptenNodeFsRoot: string
  /**
   * (CLI only). Output files will be written in this folder. By default is current directory.
   */
  outputDir: string

  disableNodeFs?:boolean
}

interface BaseOptions {
  debug?: boolean
}

export interface MainOptions extends NativeOptions {
  noRemove?: boolean
  /**
   * An ImageMagick command, for example: `['convert', 'foo/bar.png', '-scale', '50%', 'out.gif']`
   */
  command: string | string[]
  /**
   * The list of input files referenced in given [[command]]. It's important that the name of this files match the file names given in the command.
   */
  inputFiles?: (string|File)[]
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
