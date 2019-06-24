import { PaperScope } from 'paper'
import * as paper_ from 'paper'
import {isNode} from 'misc-utils-of-mine-generic'
import { resolveInput } from './util';
import { BaseOptions } from './types';

var paper = require('paper-jsdom-canvas') as PaperScope & { createCanvas: any } & (typeof paper_)

interface Svg2PdfOptions extends BaseOptions{
  width: number
  height: number
}
/**
 * Only node.js. build a  PDF canvas, imports SVG document at given path and returns a Buffer containing a PDF document with the result 
 */
export function svg2pdf(o: Svg2PdfOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    var canvas = paper.createCanvas(o.width, o.height, 'pdf')
    paper.setup(canvas)
    const path = resolveInput(o)
    paper.project!.importSVG(path, {
      onLoad: (e: any, d: any) => {
        (paper.view as any).draw()
        resolve(canvas.toBuffer())
      },
      onError: (e: any) => {
        reject(e)
      }
    })
  })
}
