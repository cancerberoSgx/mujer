# Magica

Easy to setup and use, ImageMagick Node.js and Browser API and Command Line Interface. 

## Contents

<!-- toc -->

- [Summary](#summary)
- [Why](#why)
- [Install](#install)
  * [Browser setup](#browser-setup)
- [Command line](#command-line)
- [JavaScript API](#javascript-api)
- [Options](#options)
- [TODO](#todo)

<!-- tocstop -->

## Summary

 * Easy/Quickly setup of WASM-ImageMagick on node.js
 * JavaScript API and command line interface.
 * Based on [wasm-imagemagick](https://github.com/KnicKnic/WASM-ImageMagick) from which includes binaries so no setup is needed further than `npm install`.

##  Why

I really need a node.js command line interface quickly so That's is why I'm doing this. 

magick files can be generated from that project executing npm run test-node

## Install

```sh
npm install magica
```

If you only will use the Command Line Interface perhaps a better option is installing it globally:

```sh
npm install -g magica
```
### Browser setup

 * **IMPORTANT**: make sure `dist/src/imageMagick/compiled/magick.wasm` is located at the same folder of your .js bundle file.
 * the rest of the files you can bundle with any technology like browserify, parcel, webpack etc.
 * See npm script "browser-sample". Run "npm run browser-sample" and look samples at `test-browser/` file

## Command line

The command line interface will let you use the same Image Magick commands. The only difference is that you will need to explicitly list the input files paths. 

In the following example we execute `identify n.png`:

```sh
$ magica --command "identify n.png" --input test/assets/n.png 
n.png PNG 109x145 109x145+0+0 8-bit sRGB 39796B 0.000u 0:00.000
```

Notice that besides passing the ImageMagick command with `--command` we also passed the image files using `--input`. It is important that the basename of given input files match the file names referenced in the command (`n.png`): 

Some other examples: 

```sh
magica --input test/assets/n.png --command "convert n.png -scale 44% tmp.gif"
```

`--input` can be a glob of files, useful for batch multiple images or to build gifs from several images. 

TODO example with globs and gifs

## JavaScript API

The JavaScript API is equivalent to the Command Line Interface. The command references files that are passed separately. Since this library supports both Node.js and the browser, users are responsible of providing the input file contents. 

In the following example we convert an image in Node.js

```ts
import {main} from 'magica'
import { readFileSync, writeFileSync } from 'fs'

(async ()=>{
 const result = await main({
    debug: true,
    command: 'convert foo.png -scale 50% foo2.png',
    inputFiles: [{ name: 'foo.png', content: readFileSync('test/assets/n.png') }]
  })
  result.outputFiles.forEach(f=>writeFileSync(f.name, f.content, {encoding: 'binary'}))
})()
```

The following example is analog to the previous one but in the browser: 

TODO

## Options

Options are the same for the command line and the API:

 * `--input: string[]`: (command line only) Input file paths. It can also be glob patterns. For passing more than one use `--input` multiple times. It's important that the base name of these paths match the file names given in the command.
 * `--command: string | string[]`: An ImageMagick command, for example: `"convert foo.png -scale 50% bar.gif"`.
 * `--inputFiles?: File[]`: (API only) The list of input files referenced in given command. It's important that the name of this files match the file names given in the command.
 * `--localNodeFsRoot?: string`:
 * `--emscriptenNodeFsRoot?: string`:
 * `--help?: boolean`: (command line only)
 * `--debug?: boolean`:

## TODO

- [ ] npm run test-js is failing
- [ ] browser tests
- [ ] format tests
- [ ] support multiple line string commands like in src/main/command.ts
  - [ ] support IM command quoted arguments
- [ ] node.js : work directly in user's filesystem without copying to emc FS: 
    * Option to never remove files.
    * Option for Node.js users to work/mount current directory - the tool should not write input files - they should be already there
- [ ] scripts/generateImEnumd.ts we should execute our CLI to extract 
- [ ] Performance tests (can we measure also memory consumption?)
- [x] support input images from URLS both in node and browser.
- [x] browser
- [x] CLI
- [x] CLI tests
- [x] Input file from url