import React, { forwardRef } from 'react'
import { classnames } from 'szfe-tools'

import Icon from '../Icon'
import View from '../View'

import './style.less'

const NotFount = forwardRef(function NotFount(
  { className, ...props },
  forwardedRef
) {
  return (
    <View
      {...props}
      className={classnames('szfe-404__wrapper', className)}
      ref={forwardedRef}
    >
      <Icon type="amicon-warn_light" />
      404 Not Found
    </View>
  )
})

NotFount.defaultProps = {}

export default NotFount
