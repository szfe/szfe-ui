import { run, nextTick } from 'szfe-tools'

import useUpdateEffect from '../../helpers/useUpdateEffect'

export default function None({ in: animatedIn, onExited, children }) {
  useUpdateEffect(() => {
    if (!animatedIn) {
      nextTick(() => {
        run(onExited)
      })
    }
  }, [animatedIn])

  return animatedIn ? children : null
}
