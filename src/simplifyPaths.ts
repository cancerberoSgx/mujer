import paper, { Item, Project } from 'paper'
import { visit } from './paper'
import { BaseOptions } from './types'
import { resolveInput } from './util'

interface SimplifyPathsOptions extends BaseOptions {
  tolerance: number
  width: number
  height: number
}
export async function simplifyPaths(o: SimplifyPathsOptions) {
  paper.setup(new paper.Size(o.width, o.height))
  const svg = await importSvgAndSimplifyPaths({
    ...o,
    project: paper.project!,
  })
  return svg
}

function importSvgAndSimplifyPaths(o: SimplifyPathsOptions & { project: Project }): Promise<string> {
  return new Promise((resolve, reject) => {
    o.project.importSVG(resolveInput(o), {
      onLoad: async function(item: Item) {
        const svg = simplifyProjectDescendants(o)
        resolve(svg)
      },
      onError: function(message: any) {
        reject(message)
      }
    })
  })
}

async function simplifyProjectDescendants({ project, tolerance }: { project: Project, tolerance: number }) {
  (project.getItems(() => true) || []).forEach(e => {
    visit(e, i => {
      if (i instanceof paper.Path) {
        i.simplify(tolerance)
      }
    })
  })
  const svg = paper.project!.exportSVG({ asString: true })
  return svg as any as string
}
// module.exports.simplifyProjectDescendants = simplifyProjectDescendants
