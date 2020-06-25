import React, { forwardRef } from 'react'
import { classnames } from 'szfe-tools'

import FoldArrow from './FoldArrow'
import Icon from '../index'



const Arrow = forwardRef(function Arrow({ className, ...props }, forwardedRef) {
  return (
    <span
      {...props}
      className={classnames('szfe-arrow-icon-wrapper', className)}
      ref={forwardedRef}
    >
      <Icon type="amicon-right" className="szfe-arrow-icon" />
    </span>
  )
})

Arrow.Fold = FoldArrow
Arrow.defaultProps = {}

export default Arrow
