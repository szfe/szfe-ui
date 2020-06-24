import React, { forwardRef } from 'react'
import { classnames } from 'szfe-tools'

import './style.less'

const ReminderBar = forwardRef(function ReminderBar(
  { text, animation, className, ...props },
  forwardedRef
) {
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={classnames(
        'szfe-reminder-bar__reminder-bar',
        {
          'szfe-reminder-bar__reminder-bar--scrollable': animation,
        },
        className
      )}
    >
      {animation ? (
        <>
          <div className="szfe-reminder-bar__content">{text}</div>
          <div className="szfe-reminder-bar__content">{text}</div>
        </>
      ) : (
        <div className="szfe-reminder-bar__txt">{text}</div>
      )}
    </div>
  )
})

ReminderBar.defaultProps = {
  // 是否开启跑马灯，默认开启
  animation: true,
  text: 'MISS TEXT',
}

export default ReminderBar
