# Mujer

Practical tools for vector graphics:
 * High level - easy to use
 * APIs for Node.js and Browser
 * Command line tools
 * Optimization
 * Transformations
 * Format conversion
 * more to come

<!-- toc -->

- [Install](#install)
- [Tools](#tools)
  * [optimizeSvg](#optimizesvg)
    + [Command line](#command-line)
    + [API](#api)
  * [svg2pdf](#svg2pdf)
    + [Command line](#command-line-1)
    + [API](#api-1)
  * [simplifyPaths](#simplifypaths)
    + [Command line](#command-line-2)
    + [API](#api-2)

<!-- tocstop -->

# Install

```sh
npm install mujer
```
# Tools

## optimizeSvg

Minimizes SVG code size using [svgo](TODO) and optionally simplifyPaths utility.

### Command line

TODO

### API

```ts
import {optimizeSvg} from 'mujer'

// We must pass the SVG code as input, in this case we read a file in node
// In the browser we could obtain the SVG code with a request or from a DOM Element
var output = await optimizeSvg({
  input: readFileSync('foo/bar.svg').toString()
})

// In node we could write the output to a file:
writeFileSync('foo/bar_optimized.svg', output)

// in the browser I could render in the document:
document.getElementById('svg-container').innerHTML = output
```

## svg2pdf  

### Command line

TODO

### API

```ts
import {svg2pdf} from 'mujer'

const pdf = await svg2pdf({
  input: './test/assets/test2.svg', 
  width: 1000, 
  height: 1000
})

// in node.js I could save it to a file
writeFileSync('output.pdf', pdf)

// in the browser I could make the user to download
// TODO: example
```

## simplifyPaths

### Command line

TODO

### API

```ts
import {svg2pdf} from 'mujer'

var output = await simplifyPaths({
  input: 'test2.svg', 
  width: 1000, 
  height: 1000,
  tolerance: 5
})

// in node.js I could save it to a file
writeFileSync('test2_simplified.svg', output)

// in the browser I could render in the document:
document.getElementById('svg-container').innerHTML = output
```

