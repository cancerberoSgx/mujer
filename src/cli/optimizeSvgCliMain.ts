import { optimizeSvgCli } from './optimizeSvgCli';

const options = require('minimist')(process.argv.slice(2))
optimizeSvgCli(options)