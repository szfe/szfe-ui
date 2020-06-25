import React, { Fragment, forwardRef } from 'react'
import { run, classnames } from 'szfe-tools'

import Icon from '../Icon'


const Breadcrumb = forwardRef(function Breadcrumb(
  { className, data, onItemClick, ...props },
  forwardedRef
) {
  return (
    <div
      {...props}
      className={classnames('szfe-breadcrumb', className)}
      ref={forwardedRef}
    >
      <div className="szfe-breadcrumb__content">
        {data.map((item, idx) => (
          <Fragment key={idx}>
            {idx !== 0 && <Icon.Arrow className="szfe-breadcrumb__arrow" />}
            <div
              className="szfe-breadcrumb__item"
              onClick={() => run(onItemClick, undefined, item, idx)}
            >
              {item.name}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
})

Breadcrumb.defaultProps = {}

export default Breadcrumb
