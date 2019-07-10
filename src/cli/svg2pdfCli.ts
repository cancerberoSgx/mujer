import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { sync as glob } from 'glob'
import { basename, pathJoin, serial, withoutExtension } from 'misc-utils-of-mine-generic'
import { svg2pdf, Svg2PdfOptions } from '../svg2pdf'

interface Svg2pdfCliOptions extends Svg2PdfOptions {
  help?: boolean
  output?: string
}

export async function svg2pdfCli(options: Svg2pdfCliOptions) {
  options.width = options.width || 3000
  options.height = options.height || 3000
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
      const content = await svg2pdf({ ...options })
      if (options.output) {
        const outputFilePath = pathJoin(options.output, withoutExtension(basename(input)) + '.pdf')
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

function preconditions(options: Svg2pdfCliOptions) {
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

svg2pdf --input "foo/**/*.svg" --output output/dir 

Options:

* --input: string | Buffer: Path or glob file pattern to .png files, relative to current dir.
* --output: string: Folder for output files. If it doesn't exists it will be created. If none, output files will be written in current folder.
* --width: number : optional output image width in the pdf
* --height: number : optional output image height in the pdf
* --help: boolean:  Print usage information, then exit.
* --debug: boolean:  Prints debug messages. 

`)
}



// import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
// import { sync as glob } from 'glob'
// import { serial } from 'misc-utils-of-mine-generic'
// import { basename, join } from 'path'
// import { png2svg } from '../png2svg'
// import { PNG2SVGOptions } from '../types'

// export async function png2svgCli(o: PNG2SVGOptions) {
//   try {

//     preconditions(o)
//     o.debug && console.log(`CLI Options: ${JSON.stringify({ ...o, input: null })}`)

//     const input = (typeof o.input === 'string' ? glob(o.input).filter(existsSync) : [])
//       .map(f => ({
//         name: f,
//         content: readFileSync(f)
//       }))

//     if (o.output && !existsSync(o.output)) {
//       mkdirSync(o.output, { recursive: true })
//     }

//     await serial(input.map(input => async () => {
//       try {
//         o.debug && console.log('Rendering ' + input.name)
//         const result = ({ name: input.name + '.svg', content: await png2svg({ ...o, input: input.content }) })
//         if (o.output) {
//           const file = join(o.output, basename(result.name))
//           o.debug && console.log('Writing ' + file)
//           writeFileSync(file, result.content)
//         }
//         else {
//           process.stdout.write(result.content && result.content.toString() || '')
//         }
//       } catch (error) {
//         console.error('ERROR while rendering file ' + input.name)
//         console.error(error)
//       }
//     }))
//   } catch (error) {
//     fail(error)
//   }
// }

// function preconditions(options: PNG2SVGOptions) {
//   if (options.help) {
//     printHelp()
//     process.exit(0)
//   }
//   if (!options.input) {
//     fail(`--input is mandatory but one was not given. Aborting.`)
//   }
// }

// function fail(s: string | Error) {
//   console.error(s)
//   process.exit(1)
// }

// function printHelp() {
//   console.log(`
// Usage: 

// png2svg --input "**/*pics*/*.png" --output ../svgs
// png2svg --input graph1.png > graph1.svg
// `)
// }
