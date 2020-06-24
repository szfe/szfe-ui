import React, { forwardRef } from 'react'
import { classnames } from 'szfe-tools'

import './style.less'

const Steps = forwardRef(function Steps(
  { current, steps, className, ...props },
  forwardedRef
) {
  return (
    <div
      {...props}
      className={classnames('szfe-steps__steps', className)}
      ref={forwardedRef}
    >
      <ul>
        {steps.map(({ title }, idx) => (
          <li
            key={idx}
            className={classnames('szfe-steps__item', {
              'szfe-steps__item--passed': current > idx,
              'szfe-steps__item--active': current >= idx,
              'szfe-steps__item--only': steps.length === 1,
              'szfe-steps__item--first': steps.length > 1 && idx === 0,
              'szfe-steps__item--last':
                steps.length > 1 && idx === steps.length - 1,
            })}
          >
            <div className="szfe-steps__tag">
              <div className="szfe-steps__roll">
                <span>{idx + 1}</span>
                <span className="szfe-steps__title">{title}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
})

export default Steps
