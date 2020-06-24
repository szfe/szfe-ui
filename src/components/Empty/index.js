import React, { forwardRef } from 'react'
import { classnames, run } from 'szfe-tools'

import View from '../View'
import Icon from '../Icon'

import './style.less'

const Empty = forwardRef(function Empty(
  { children, className, renderIcon, ...props },
  forwardedRef
) {
  return (
    <View
      {...props}
      className={classnames('szfe-empty__wrapper', className)}
      ref={forwardedRef}
    >
      {run(renderIcon)}
      <div className="szfe-empty__tips">{children}</div>
    </View>
  )
})

Empty.defaultProps = {
  children: 'No Data',
  renderIcon: () => <Icon className="szfe-empty__icon" type="amicon-question" />,
}

export default Empty
