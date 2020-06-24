import React, { forwardRef, useState, useEffect, useRef } from 'react'
import { classnames, isNumber, get } from 'szfe-tools'

import './style.less'

const MaterialLabel = forwardRef(function MaterialLabel(
  {
    className,
    placeholder,
    autoHeight = false,
    placeholderCapitalize = false,
    prefix,
    extra,
    helpers,
    active,
    type,
    children,
    onClick,
    ...props
  },
  ref
) {
  const prefixRef = useRef()
  const [prefixWidth, setPrefixWidth] = useState(0)

  useEffect(() => {
    if (prefix) {
      setTimeout(() => {
        setPrefixWidth(get(prefixRef, 'current.offsetWidth', 0))
      })
    }
  }, [prefix])

  return (
    <label
      {...props}
      className={classnames('szfe-material-label__material-label', className, {
        'szfe-material-label__warn': type === 'warn',
        'szfe-material-label__error': type === 'error',
        'szfe-material-label__info': type === 'info',
        'szfe-material-label__material-label--auto-height': autoHeight,
      })}
      ref={ref}
      onClick={onClick}
    >
      <div className="szfe-material-label__bar">
        {prefix && (
          <div className="szfe-material-label__prefix" ref={prefixRef}>
            {prefix}
          </div>
        )}
        <div
          className={classnames('szfe-material-label__placeholder', {
            'szfe-material-label__placeholder--active': active,
            'szfe-material-label__placeholder--capitalize': placeholderCapitalize,
          })}
          style={
            isNumber(prefixWidth) && prefixWidth > 0
              ? {
                  left: active ? 0 : prefixWidth,
                }
              : {}
          }
        >
          {placeholder}
        </div>
        <div className="szfe-material-label__content">{children}</div>
        <div className="szfe-material-label__extra">{extra}</div>
      </div>
      <div className="szfe-material-label__helpers">{helpers}</div>
    </label>
  )
})

MaterialLabel.defaultProps = {
  className: '',
  placeholder: '',
  extra: null,
  helpers: null,
  active: false,
  onClick: () => null,
}

export default MaterialLabel
