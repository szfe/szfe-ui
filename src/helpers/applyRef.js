import { run, isExist, isFunction } from 'szfe-tools'

export default function applyRef(ref, value) {
  // 继承 ref
  if (isExist(ref)) {
    if (isFunction(ref)) {
      run(ref, undefined, value)
    }

    if ('current' in ref) {
      ref.current = value
    }
  }
}
