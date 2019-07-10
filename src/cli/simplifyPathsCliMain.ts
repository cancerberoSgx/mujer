import { simplifyPathsCli } from './simplifyPathsCli'

const options = require('minimist')(process.argv.slice(2))
simplifyPathsCli(options)
