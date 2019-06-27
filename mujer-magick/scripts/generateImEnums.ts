import { writeFileSync, rmdir, rmdirSync, mkdirSync } from 'fs'
import { sep } from 'path'
// import { config, exec, mkdir, rm } from 'shelljs'
import {Project,  EnumDeclarationStructure, IndentationText, QuoteKind, SyntaxKind, StructureKind } from 'ts-morph'
import { execFile, execSync } from 'child_process';
import { doesNotThrow } from 'assert';

// config.silent = true

// automatically generates TS enums from all convert -list list with few exceptions that are not usable/parsable
// Output folder - warning, it will be cleared
const FOLDER = `src${sep}list`
const EXCLUDE_FROM_LIST = ['Configure', 'Delegate', 'Magic', 'Mime', 'Threshold', 'Format', 'Coder', 'Color', 'Policy', 'Resource', 'Font', 'Locale', 'CLI', 'IMLog', 'IMLog']

let project: Project
function getProject(): Project {
  if (!project) {
    project = new Project({
      useVirtualFileSystem: true,
      manipulationSettings: {
        indentationText: IndentationText.TwoSpaces,
        quoteKind: QuoteKind.Single,
      },
    })
  }
  return project
}
export function generateListEnum(listed: string) {
  const enumName = 'IM' + listed
  const enumDeclaration: EnumDeclarationStructure = {
    kind: StructureKind.Enum,
    name: enumName,
    members: list(listed)
      .filter((v, i, a) => a.indexOf(v) === i) // deduplicate
      .map(n => ({
        name: `'${isNaN(parseInt(n, 10)) ? n : (n + '_')}'`,
        initializer: `'${n}'`,
      })),
    isExported: true,
  }
  const sourceFile = getProject().createSourceFile(`${enumName}.ts`)
  sourceFile.addEnum(enumDeclaration)
  return sourceFile
}

export function list(listed: string): string[] {
  //TODO: we should execute our CLI to extract these !!!!
  const result = execSync(`convert -list ${listed}`)
  // ok(result.code === 0, 'result.code: ' + result.code) // commented because of https://github.com/ImageMagick/ImageMagick/issues/1333
  const names = result.toString().split('\n').filter(s => s.trim())
  return names
}

export function generateEnumsForAllLists() {
  // rm('-rf', FOLDER)
  // rmdirSync(FOLDER)
  doesNotThrow(()=>execSync(`rm -rf  ${FOLDER}`))
  mkdirSync(FOLDER, {recursive: true})
  // mkdir('-p', FOLDER)
  let indexContent = ''
  list('list')
    .filter(name => EXCLUDE_FROM_LIST.indexOf(name) === -1)
    .forEach(name => {
      const sourceFile = generateListEnum(name)
      const fileName = `IM${name}`
      indexContent += `export * from './${fileName}'\n`
      writeFileSync(`${FOLDER}${sep}${fileName}.ts`, `/* auto-generated file using command \`npx ts-node scripts/generateImEnums.ts\` */\n${sourceFile.getText()}`)
    })
  writeFileSync(`${FOLDER}${sep}index.ts`, indexContent)

}

generateEnumsForAllLists()
