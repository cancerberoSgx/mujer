import { Item } from 'paper'

export function visit(i: Item, v: (i: Item) => void) {
  function f(i: Item) {
    v(i);
    (i.children || []).forEach(f)
  }
  f(i)
}
