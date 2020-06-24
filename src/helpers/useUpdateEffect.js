import { useEffect } from 'react'
import { run } from 'szfe-tools'

import useFirstMountState from './useFirstMountState'

const useUpdateEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState()

  useEffect(() => {
    if (!isFirstMount) {
      return run(effect)
    }
  }, deps)
}

export default useUpdateEffect
