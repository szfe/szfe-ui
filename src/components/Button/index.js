import React, { forwardRef } from 'react'
import { classnames } from 'szfe-tools'



const Button = forwardRef(function Button(
  {
    className,
    type,
    inline,
    size,
    disabled,
    onClick,
    children,
    as: Component = 'button',
    ...props
  },
  forwardedRef
) {
  return (
    <Component
      {...props}
      onClick={disabled ? null : onClick}
      className={classnames('szfe-button', className, {
        'szfe-button--default': type === 'default',
        'szfe-button--primary': type === 'primary',
        'szfe-button--warn': type === 'warn',
        'szfe-button--error': type === 'error',
        'szfe-button--inline': inline,
        'szfe-button--block': !inline,
        'szfe-button--large': size === 'large',
        'szfe-button--normal': size === 'normal',
        'szfe-button--small': size === 'small',
        'szfe-button--disabled': disabled,
      })}
      ref={forwardedRef}
    >
      {children}
    </Component>
  )
})

Button.defaultProps = {
  type: 'default',
  inline: false,
  size: 'normal',
  disabled: false,
}

export default Button
