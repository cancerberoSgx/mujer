import { svg2pdfCli } from './svg2pdfCli'

svg2pdfCli(require('minimist')(process.argv.slice(2)))
