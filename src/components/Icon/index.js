import React, { forwardRef } from 'react'
import { classnames, source } from 'szfe-tools'

import Arrow from './Arrow'



source.css('https://at.alicdn.com/t/font_622014_wkh62u19ggs.css')

const Icon = forwardRef(function Icon(
  {
    type,
    prefix = type.split('-').shift(),
    svg: isSvg = type.startsWith('#'),
    className,
    ...props
  },
  forwardedRef
) {
  return isSvg ? (
    <svg
      aria-hidden="true"
      {...props}
      className={classnames('szfe-icon', className)}
      ref={forwardedRef}
    >
      <use xlinkHref={type} />
    </svg>
  ) : (
    <i
      {...props}
      className={classnames('szfe-icon icon', type, className, prefix, {
        iconfont: prefix === 'icon',
      })}
      ref={forwardedRef}
    />
  )
})

Icon.Arrow = Arrow

Icon.defaultProps = {
  name: '',
  prefix: undefined,
}

export default Icon
