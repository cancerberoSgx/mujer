
var {magickLoaded} = require('../src/node_magick_load_listener')

magickLoaded.then(({FS, main})=>{
  const format = getImageFormat({FS, main, fileName: 'n.png', fileContent: readFileSync('test/assets/n.png')})
  process.stdout.write('The format is: '+ format);
})

const {readFileSync} = require('fs')
function getImageFormat({FS, main, fileName, fileContent})
{
    var fileNameEmscripten = '/' + fileName;
    // var sourceFile = ;
    FS.writeFile(fileNameEmscripten, fileContent);
    
    var command =  ["identify", fileNameEmscripten];
    try{
        const {stdout, stderr} =  main(command)
        var format = stdout.join('').split(/\s+/g)[1]
        return format.toLowerCase()
    }
    catch(e)
    {
      console.error('ERROR', e);
      throw e
    }
}


