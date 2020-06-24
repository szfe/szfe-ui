import React, { forwardRef } from 'react'
import { classnames } from 'szfe-tools'

import './style.less'

const View = forwardRef(function View(
  { className, children, ...props },
  forwardedRef
) {
  return (
    <div
      {...props}
      className={classnames('szfe-view', className)}
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})

View.defaultProps = {}

export default View
