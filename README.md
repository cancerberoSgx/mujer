# Mujer

Practical tools for vector graphics

## optimizeSvg

Minimizes SVG code size using [svgo](TODO) and optionally simplifyPaths utility.

## svg2pdf  

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

```
```