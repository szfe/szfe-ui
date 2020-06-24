import { useMemo, useEffect, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { globalThis as root, get, run } from 'szfe-tools'

import applyRef from '../../helpers/applyRef'

const Portal = forwardRef(function Portal(
  { children, className, to: appendTo },
  forwardedRef
) {
  const container = useMemo(() => {
    const div = document.createElement('div')

    return div
  }, [])

  useEffect(() => {
    if (className) {
      container.className = className
    }
  }, [className])

  useEffect(() => {
    run(appendTo, 'appendChild', container)

    applyRef(forwardedRef, container)

    return () => run(appendTo, 'removeChild', container)
  }, [])

  return createPortal(children, container)
})

Portal.defaultProps = {
  to: get(root, 'document.body'),
}

export default Portal
