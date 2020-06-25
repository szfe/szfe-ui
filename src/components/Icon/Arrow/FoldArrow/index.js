import React, { forwardRef } from 'react'
import { classnames } from 'szfe-tools'

import Icon from '../../index'



const FoldArrow = forwardRef(function FoldArrow(
  { className, ...props },
  forwardedRef
) {
  return (
    <span
      {...props}
      className={classnames('szfe-arrow-icon-wrapper', className)}
      ref={forwardedRef}
    >
      <Icon.Arrow className="szfe-arrow-icon" />
    </span>
  )
})

FoldArrow.defaultProps = {}

export default FoldArrow
