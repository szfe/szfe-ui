import React, { forwardRef, useRef, useEffect, useState } from 'react'
import {
  get,
  run,
  classnames,
  isFunction,
  ScrollListener,
  isArray,
  isExist,
} from 'szfe-tools'

import applyRef from '../../helpers/applyRef'



const ScrollView = forwardRef(function ScrollView(
  {
    children,
    className,
    distanceToReachEnd,
    onEndReached,
    distanceEvents,
    scrollableShadow,
    wrapperClassName,
    ...props
  },
  forwardedRef
) {
  const [useScrollUpAbleShadow, useScrollDownAbleShadow] = isArray(
    scrollableShadow
  )
    ? scrollableShadow
    : scrollableShadow === true
    ? [true, true]
    : [false, false]
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const scrollView = useRef()
  const scrollListener = useRef()
  const onEndReachedRef = useRef(onEndReached)

  onEndReachedRef.current = onEndReached

  useEffect(() => {
    applyRef(forwardedRef, scrollView.current)

    if (
      get(scrollView.current, 'scrollHeight') >
      get(scrollView.current, 'offsetHeight')
    ) {
      setCanScrollDown(true)
    }

    scrollListener.current = new ScrollListener({
      element: scrollView.current,
      distanceToReachEnd,
      onEndReached: (...args) => {
        run(onEndReachedRef.current, undefined, ...args)
      },
      distanceEvents: [
        ...distanceEvents,
        {
          distance: 0,
          onGoingIn: () => {
            setCanScrollUp(false)
          },
          onGoingOut: () => {
            setCanScrollUp(true)
          },
        },
        {
          distance: () =>
            get(scrollView.current, 'scrollHeight') -
            get(scrollView.current, 'offsetHeight') -
            1,
          dynamic: true,
          onGoingIn: () => {
            setCanScrollDown(true)
          },
          onGoingOut: () => {
            setCanScrollDown(false)
          },
        },
      ],
    })
  }, [])

  return (
    <div
      {...props}
      className={classnames('szfe-scroll-view', wrapperClassName, {
        'szfe-scroll-view--can-scroll-up': useScrollUpAbleShadow && canScrollUp,
        'szfe-scroll-view--can-scroll-down':
          useScrollDownAbleShadow && canScrollDown,
      })}
    >
      <div
        className={classnames('szfe-scroll-view__content', className)}
        ref={scrollView}
      >
        {run(children, undefined, {
          canScrollUp,
          canScrollDown,
        })}
      </div>
    </div>
  )
})

ScrollView.defaultProps = {
  distanceEvents: [],
  scrollableShadow: false,
}

export default ScrollView
