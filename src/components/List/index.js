import React, { forwardRef } from 'react'
import { isFunction, classnames } from 'szfe-tools'

import Item from './Item'
import './style.less'

const List = forwardRef(function List(
  { headerBorder, renderHeader, className, children, borderless, ...props },
  forwardedRef
) {
  const hasHeader = isFunction(renderHeader)

  return (
    <div
      {...props}
      className={classnames('szfe-list', className, {
        'szfe-list--borderless': borderless,
      })}
      ref={forwardedRef}
    >
      {hasHeader && (
        <Item border={headerBorder}>
          <div className="szfe-list__header">{renderHeader()}</div>
        </Item>
      )}
      {children}
    </div>
  )
})

List.Item = Item
List.defaultProps = {
  headerBorder: true,
}

export default List
