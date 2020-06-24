import React, { forwardRef } from 'react'
import { classnames, run } from 'szfe-tools'

import './style.less'

const Header = forwardRef(function Header(
  { renderLeft, renderRight, children, className, ...props },
  forwardedRef
) {
  return (
    <div
      {...props}
      className={classnames('szfe-header__wrapper', className)}
      ref={forwardedRef}
    >
      {renderLeft && <div className="szfe-header__left">{run(renderLeft)}</div>}
      <div className="szfe-header__content">{run(children)}</div>
      {renderRight && (
        <div className="szfe-header__right">{run(renderRight)}</div>
      )}
    </div>
  )
})

Header.defaultProps = {}

export default Header
