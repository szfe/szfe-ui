import React, { forwardRef } from 'react'
import { classnames } from 'szfe-tools'



const Skeleton = forwardRef(function Skeleton(
  { className, type, ...props },
  forwardedRef
) {
  return (
    <div
      {...props}
      className={classnames('szfe-skeleton', className, {
        'szfe-skeleton--round': type === 'round',
      })}
      ref={forwardedRef}
    />
  )
})

Skeleton.defaultProps = {}

export default Skeleton
