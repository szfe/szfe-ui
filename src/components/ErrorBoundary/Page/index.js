import React, { forwardRef, useEffect } from 'react'
import { get, run, isFunction, classnames } from 'szfe-tools'

import Icon from '../../Icon'
import Button from '../../Button'

import './style.less'

const ErrorPage = forwardRef(function ErrorPage(
  {
    error,
    offlineErrorTips,
    systemErrorTips,
    onRetry,
    className,
    renderIcon,
    children = () => {
      const isOfflineError =
        /OFFLINE/.test(get(error, 'stack')) ||
        get(window, 'navigator.onLine') === false

      const isSystemError = [/^TypeError:/, /^SyntaxError:/].some((reg) =>
        reg.test(get(error, 'stack'))
      )

      return (
        <>
          <h2>
            {isOfflineError
              ? offlineErrorTips
              : isSystemError
              ? systemErrorTips
              : get(error, 'message', 'Unknow Error')}
          </h2>
          {isOfflineError && (
            <p>Check your Wi-Fi connection or celluar data and try again</p>
          )}
        </>
      )
    },
    renderFooter = () =>
      isFunction(onRetry) && (
        <Button onClick={onRetry} inline>
          Retry
        </Button>
      ),
    onMount,
    onUnmount,
    ...props
  },
  forwardedRef
) {
  useEffect(() => {
    run(onMount)

    return onUnmount
  }, [])

  return (
    <div
      {...props}
      className={classnames('szfe-error-page__wrapper', className)}
      ref={forwardedRef}
    >
      {run(renderIcon)}
      {run(children)}
      {run(renderFooter)}
    </div>
  )
})

ErrorPage.defaultProps = {
  offlineErrorTips: 'You seem to be Offline',
  systemErrorTips: 'System Error',
  renderIcon: () => (
    <Icon className="szfe-error-page__icon" type="amicon-warn" />
  ),
}

export default ErrorPage
