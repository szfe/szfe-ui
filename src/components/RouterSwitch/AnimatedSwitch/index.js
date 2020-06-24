import React, { Suspense, useState, useRef, useEffect, forwardRef } from 'react'
import { Switch, useLocation, useHistory, matchPath } from 'react-router-dom'
import { get, run, isArray } from 'szfe-tools'

import Spin from '../../Spin'
import TransitionSwitch from '../../Animate/Switch'

const AnimatedSwitch = forwardRef(function AnimatedSwitch(
  { children, always, mode, paths = children, ...props },
  forwardedRef
) {
  const location = useLocation()
  const { action } = useHistory()

  const [pathGroup] = useState(() =>
    (isArray(paths) ? paths : [paths]).map(
      (path) => get(path, 'path') || get(path.props, 'path')
    )
  )

  const matchIdx = pathGroup.findIndex((path) =>
    matchPath(location.pathname, path)
  )

  const prevMatchIdx = useRef(matchIdx)

  useEffect(() => {
    prevMatchIdx.current = matchIdx
  })

  return (
    <TransitionSwitch
      {...props}
      direction={
        mode === 'route'
          ? action === 'POP'
            ? 'back'
            : 'forward'
          : mode === 'tab'
          ? prevMatchIdx.current < matchIdx
            ? 'forward'
            : 'back'
          : 'forward'
      }
      animateKey={always ? location.key || location.pathname : matchIdx}
      ref={forwardedRef}
    >
      <Suspense fallback={<Spin.Page displayDelay={100} />}>
        <Switch location={location} {...props}>
          {run(children, undefined, { location, ...props })}
        </Switch>
      </Suspense>
    </TransitionSwitch>
  )
})

AnimatedSwitch.defaultProps = {
  always: true,
  mode: 'route',
}

export default AnimatedSwitch
