import React, { forwardRef } from 'react'
import { isFunction, classnames, run } from 'szfe-tools'

import Icon from '../../Icon'

import './style.less'

const { Arrow } = Icon

const Item = forwardRef(function Item(
  {
    children,
    border,
    className,
    onClick,
    extra = isFunction(onClick) ? <Arrow /> : undefined,
    ...props
  },
  forwardedRef
) {
  const clickable = isFunction(onClick)

  return (
    <div
      {...props}
      className={classnames('szfe-list-item__item', className, {
        'szfe-list-item__item--clickable': clickable,
        'szfe-list-item__item--borderless': !border,
      })}
      onClick={onClick}
      ref={forwardedRef}
    >
      <div className="szfe-list-item__label">{run(children)}</div>
      <div className="szfe-list-item__value">{run(extra)}</div>
    </div>
  )
})

Item.defaultProps = {
  border: true,
}

export default Item
