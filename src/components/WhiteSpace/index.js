import React, { forwardRef } from 'react'
import { classnames } from 'szfe-tools'



const WhiteSpace = forwardRef(function WhiteSpace(
  { className, ...props },
  forwardedRef
) {
  return (
    <div
      {...props}
      className={classnames('szfe-white-space', className)}
      ref={forwardedRef}
    />
  )
})

WhiteSpace.defaultProps = {}

export default WhiteSpace
