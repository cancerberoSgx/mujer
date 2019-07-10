import { SvgOptions, optimizeSvg } from '../optimizeSvg';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import  {sync as glob} from 'glob'
import { serial, basename, pathJoin } from 'misc-utils-of-mine-generic';

interface OptimizeSvgCliOptions extends SvgOptions{
  help?: boolean
  output?: string
}

export async function optimizeSvgCli(options: OptimizeSvgCliOptions) {
  preconditions(options)
  options.debug && console.log(`CLI Options: ${JSON.stringify({ ...options, input: null })}`)
  const input = (typeof options.input === 'string' ? glob(options.input).filter(existsSync) : [])
  if (!input.length) {
    fail(`No input files found for ${input}. Aborting. `)
  }
  if (options.output && !existsSync(options.output)) {
    mkdirSync(options.output, { recursive: true })
  }
  await serial(input.map(input => async () => {
    try {
      options.debug && console.log('Rendering ' + input)
      const content = await optimizeSvg({ ...options, input: readFileSync(input).toString() })
      if (options.output) {
        const outputFilePath = pathJoin(options.output, basename(input))
        writeFileSync(outputFilePath, content)
      }
      else {
        process.stdout.write(content)
      }
    } catch (error) {
      console.error('ERROR while rendering file ' + input)
      console.error(error, error.stack)
    }
  }))
}



function preconditions(options: OptimizeSvgCliOptions) {
  if (!options.input) {
    fail('--input argument is mandatory but not given. Aborting.')
  }
  if (options.help) {
    printHelp()
    process.exit(0)
  }
}

function fail(msg: string) {
  console.error(msg)
  process.exit(1)
}

function printHelp() {
  console.log(`
Usage: 

optimize-svg --input "foo/**/*.svg" --output output/dir

Options:

* --input: string | Buffer: Path or glob file pattern to .png files, relative to current dir.
* --output: string: Folder for output files. If it doesn't exists it will be created. If none, output files will be written in current folder.
* --help: boolean:  Print usage information, then exit.
* --debug: boolean:  Prints debug messages. 

`)
}
