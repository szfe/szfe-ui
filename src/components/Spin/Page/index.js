import React, { forwardRef } from 'react'
import { classnames } from 'szfe-tools'

import Spin from '../index'


const SpinPage = forwardRef(function SpinPage(
  { displayDelay, className, ...props },
  forwardedRef
) {
  return (
    <div
      {...props}
      className={classnames('szfe-spin-page__loading', className)}
      ref={forwardedRef}
    >
      <Spin displayDelay={displayDelay} />
    </div>
  )
})

SpinPage.defaultProps = {}

export default SpinPage
