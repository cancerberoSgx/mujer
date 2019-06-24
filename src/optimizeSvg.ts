import { BaseOptions } from './types';

const SVGO = require('svgo')

export async function optimizeSvg(o: SvgOptions) {
  const svgo = new SVGO(getOptions(o))
  const before = o.input.length
  const result = await svgo.optimize(o.input, { path: 'foo.svg' })
  if (result.data) {
    o.debug && console.log('SVG data SHRINK IN ' + ((before) / result.data.length) + '%')
    return result.data
  }
  else {
    o.debug && console.error(`Error while optimizing svg `, result)
    return o.input
  }
}

interface SvgOptions extends BaseOptions {
  multipass?: boolean
  precision?: number
  moveElemsAttrsToGroup?: boolean
  moveGroupAttrsToElems?: boolean
  collapseGroups?: boolean
  mergePaths?: boolean
  sortAttrs?: boolean
  cleanupEnableBackground?: boolean
  cleanupIDs?: boolean
  cleanupNumericValues?: boolean
  convertStyleToAttrs?: boolean
  removeDesc?: boolean
  removeEmptyAttrs?: boolean
  removeEmptyText?: boolean
  removeEmptyContainers?: boolean
  removeUnknownsAndDefaults?: boolean
  convertColors?: boolean
  removeHiddenElems?: boolean
  removeUselessStrokeAndFill?: boolean
  convertPathData?: boolean
  removeAttrs?: boolean
  removeMetadata?: boolean
  removeViewBox?: boolean
  convertShapeToPath?: boolean
  removeComments?: boolean
  removeNonInheritableGroupAttrs?: boolean
  removeOffCanvasPaths?: boolean
  removeXMLProcInst?: boolean
  convertTransform?: boolean
  removeDimensions?: boolean
  removeRasterImages?: boolean
  reusePaths?: boolean
  cleanupAttrs?: boolean
  inlineStyles?: boolean
  removeDoctype?: boolean
  removeScriptElement?: boolean
  removeEditorsNSData?: boolean
  removeStyleElement?: boolean
  sortDefsChildren?: boolean
  minifyStyles?: boolean
  removeElementsByAttr?: boolean
  removeTitle?: boolean
  cleanupListOfValues?: boolean
  removeUnusedNS?: boolean
  prefixIds?: boolean
  removeUselessDefs?: boolean

}

function getOptions(o: SvgOptions) {
  return {
    full: true,
    multipass: typeof o.multipass === 'undefined' ? true : o.multipass,
    precision: o.precision || 1,
    plugins: [
      { moveElemsAttrsToGroup: typeof o.moveElemsAttrsToGroup === 'undefined' ? true : o.moveElemsAttrsToGroup },
      { moveGroupAttrsToElems: typeof o.moveGroupAttrsToElems === 'undefined' ? true : o.moveGroupAttrsToElems },
      { collapseGroups: typeof o.collapseGroups === 'undefined' ? true : o.collapseGroups },
      { mergePaths: typeof o.mergePaths === 'undefined' ? true : o.mergePaths },
      { sortAttrs: typeof o.sortAttrs === 'undefined' ? true : o.sortAttrs },
      { cleanupEnableBackground: typeof o.cleanupEnableBackground === 'undefined' ? true : o.cleanupEnableBackground },
      { cleanupIDs: typeof o.cleanupIDs === 'undefined' ? true : o.cleanupIDs },
      { cleanupNumericValues: typeof o.cleanupNumericValues === 'undefined' ? true : o.cleanupNumericValues },
      { convertStyleToAttrs: typeof o.convertStyleToAttrs === 'undefined' ? true : o.convertStyleToAttrs },
      { removeDesc: typeof o.removeDesc === 'undefined' ? true : o.removeDesc },
      { removeEmptyAttrs: typeof o.removeEmptyAttrs === 'undefined' ? true : o.removeEmptyAttrs },
      { removeEmptyText: typeof o.removeEmptyText === 'undefined' ? true : o.removeEmptyText },
      { removeEmptyContainers: typeof o.removeEmptyContainers === 'undefined' ? true : o.removeEmptyContainers },
      { removeUnknownsAndDefaults: typeof o.removeUnknownsAndDefaults === 'undefined' ? true : o.removeUnknownsAndDefaults },
      { convertColors: typeof o.convertColors === 'undefined' ? true : o.convertColors },
      { removeHiddenElems: typeof o.removeHiddenElems === 'undefined' ? true : o.removeHiddenElems },
      { removeUselessStrokeAndFill: typeof o.removeUselessStrokeAndFill === 'undefined' ? true : o.removeUselessStrokeAndFill },
      { convertPathData: typeof o.convertPathData === 'undefined' ? true : o.convertPathData },
      { removeAttrs: typeof o.removeAttrs === 'undefined' ? true : o.removeAttrs },
      { removeMetadata: typeof o.removeMetadata === 'undefined' ? true : o.removeMetadata },
      { removeViewBox: typeof o.removeViewBox === 'undefined' ? true : o.removeViewBox },
      { convertShapeToPath: typeof o.convertShapeToPath === 'undefined' ? true : o.convertShapeToPath },
      { removeComments: typeof o.removeComments === 'undefined' ? true : o.removeComments },
      { removeNonInheritableGroupAttrs: typeof o.removeNonInheritableGroupAttrs === 'undefined' ? true : o.removeNonInheritableGroupAttrs },
      { removeOffCanvasPaths: typeof o.removeOffCanvasPaths === 'undefined' ? true : o.removeOffCanvasPaths },
      { removeXMLProcInst: typeof o.removeXMLProcInst === 'undefined' ? true : o.removeXMLProcInst },
      { convertTransform: typeof o.convertTransform === 'undefined' ? true : o.convertTransform },
      { removeDimensions: typeof o.removeDimensions === 'undefined' ? true : o.removeDimensions },
      { removeRasterImages: typeof o.removeRasterImages === 'undefined' ? true : o.removeRasterImages },
      { reusePaths: typeof o.reusePaths === 'undefined' ? true : o.reusePaths },
      { cleanupAttrs: typeof o.cleanupAttrs === 'undefined' ? true : o.cleanupAttrs },
      { inlineStyles: typeof o.inlineStyles === 'undefined' ? true : o.inlineStyles },
      { removeDoctype: typeof o.removeDoctype === 'undefined' ? true : o.removeDoctype },
      { removeScriptElement: typeof o.removeScriptElement === 'undefined' ? true : o.removeScriptElement },
      { removeEditorsNSData: typeof o.removeEditorsNSData === 'undefined' ? true : o.removeEditorsNSData },
      { removeStyleElement: typeof o.removeStyleElement === 'undefined' ? true : o.removeStyleElement },
      { sortDefsChildren: typeof o.sortDefsChildren === 'undefined' ? true : o.sortDefsChildren },
      { minifyStyles: typeof o.minifyStyles === 'undefined' ? true : o.minifyStyles },
      { removeElementsByAttr: typeof o.removeElementsByAttr === 'undefined' ? true : o.removeElementsByAttr },
      { removeTitle: typeof o.removeTitle === 'undefined' ? true : o.removeTitle },
      { cleanupListOfValues: typeof o.cleanupListOfValues === 'undefined' ? true : o.cleanupListOfValues },
      { removeUnusedNS: typeof o.removeUnusedNS === 'undefined' ? true : o.removeUnusedNS },
      { prefixIds: typeof o.prefixIds === 'undefined' ? true : o.prefixIds },
      { removeUselessDefs: typeof o.removeUselessDefs === 'undefined' ? true : o.removeUselessDefs },
    ]
  }
}
