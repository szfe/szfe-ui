import React, { useState, useRef, forwardRef, useEffect } from 'react'
import { classnames, delay } from 'szfe-tools'

import Page from './Page'
import './style.less'

const Spin = forwardRef(function Spin(
  { className, displayDelay = 0, ...props },
  forwardedRef
) {
  const [show, setShow] = useState(displayDelay <= 0)
  const mountStatus = useRef(false)

  useEffect(() => {
    ;(async () => {
      mountStatus.current = true
      if (!show) {
        await delay(displayDelay)

        if (mountStatus.current) {
          setShow(true)
        }
      }
    })()
    return () => {
      mountStatus.current = false
    }
  }, [])

  return (
    show && (
      <div
        {...props}
        ref={forwardedRef}
        className={classnames('szfe-spin', className)}
        // style={{
        //   borderColor: subColor,
        //   borderLeftColor: color
        // }}
      />
    )
  )
})

Spin.defaultProps = {}
Spin.Page = Page

export default Spin
