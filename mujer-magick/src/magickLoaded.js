const {Deferred} = require('./deferred')

module.exports.magickLoaded = new Deferred()

const stdout = []
module.exports.pushStdout = function(s){
  stdout.push(s)
}
module.exports.resetStdout = function(s){
  stdout.length = 0
}
module.exports.getStdout = function(){
  return stdout.slice()
}

const stderr = []
module.exports.pushStderr = function(s){
  stderr.push(s)
}
module.exports.resetStderr = function(s){
  stderr.length = 0
}
module.exports.getStderr = function(){
  return stderr.slice()
}

setTimeout(function(){
  require('../rotate/node_magick')
}, 0);
