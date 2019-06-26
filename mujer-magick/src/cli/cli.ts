
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { sync as glob } from 'glob'
import { asArray, basename } from 'misc-utils-of-mine-generic'
import { main } from '../main/main'
import { processCommand } from '../main/processCommand'
import { CliOptions } from '../types'
export async function cli(options: CliOptions) {
  preconditions(options as any)

  options.debug && console.log(`CLI Options: ${JSON.stringify({ ...options, input: null })}`)

  const inputPaths = asArray(options.input).map(f => glob(f)).flat().filter(existsSync)
  const result = await main({
    debug: true,
    command: processCommand(options.command),
    inputFiles: inputPaths.map(name => ({ name: basename(name), content: readFileSync(name) }))
  })

  process.stdout.write((result.stdout || []).join('\n') + '\n')

  if (result.error || result.stderr) {
    process.stderr.write((result.stderr || []).join('\n') + '\n')
  }

  (result.outputFiles || []).forEach(f => {
    options.debug && console.log('Writing output file', f.name)
    writeFileSync(f.name, f.content, { encoding: 'binary' })
  })

}

function preconditions(options: CliOptions & { _: any }) {
  if (options.help) {
    printHelp()
    process.exit(0)
  }
  // if(!['convert', 'identify'].includes(options._[0])) {
  //   fail('The first argument must be a valid ImageMagick command like "convert" or "identify" but it was '+options._[0]+'. Aborting', true)
  // }
  if (!options.command || !options.input) {
    fail('--command and --input are both mandatory. Aborting.')
  }
  // if (!options.input) {
  //   fail('--input argument is mandatory but not given. Aborting.')
  // }
}

function fail(msg: string, help = false) {
  console.error(msg)
  help && printHelp()
  process.exit(1)
}

function printHelp() {
  console.log(`
Usage: 

mujer-magick convert folder/foo.png -scale 30% out.gif
Options:



`)
}
