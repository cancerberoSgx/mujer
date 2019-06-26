import test from 'ava'
import { existsSync, mkdirSync, statSync, readdirSync,  } from 'fs'
import { lsR, LsRVisitorFile } from '../src/util/lsR';

test('simple', async t => {
  const r: LsRVisitorFile[] = []
  lsR({
    path: __dirname,
    isDir: f=>statSync(f).isDirectory(),
    ls: readdirSync,
    visitor: o=>{r.push(o); return true}
  })
  t.false(r.find(f=>__filename.includes(f.path))!.isDir)
})
