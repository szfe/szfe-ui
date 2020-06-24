import React, { forwardRef } from 'react'
import { run, classnames } from 'szfe-tools'

import './style.less'

const Card = forwardRef(function Card(
  {
    className,
    title,
    titleExtra,
    children,
    footer,
    footerExtra,
    renderAfter,
    ...props
  },
  forwardedRef
) {
  return (
    <div
      {...props}
      className={classnames('szfe-card__card', className)}
      ref={forwardedRef}
    >
      <div className="szfe-card__wrapper">
        <div
          className={classnames('szfe-card__main', {
            'szfe-card__main--no-title': !title,
          })}
        >
          {title && (
            <div className="szfe-card__title">
              <span className="szfe-card__value">{title}</span>
              <span className="szfe-card__extra">{titleExtra}</span>
            </div>
          )}
          <div className="szfe-card__content">{children}</div>
        </div>
        {footer && (
          <div className="szfe-card__footer">
            <span className="szfe-card__value">{footer}</span>
            <span className="szfe-card__extra">{footerExtra}</span>
          </div>
        )}
      </div>
      {run(renderAfter)}
    </div>
  )
})

Card.defaultProps = {}

export default Card
