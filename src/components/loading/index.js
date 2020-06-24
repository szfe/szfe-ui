import React from 'react'
import { run, classnames, clamp } from 'szfe-tools'

import Spin from '../Spin'
import Modal from '../Modal'

import './style.less'

const { show: showModal, Station } = Modal

export const STATION_NAME = '__loadingStation'

let callCount = 0
let controller = {
  close: undefined,
}

const getStation = Station.registerGlobalStation(STATION_NAME)

export const show = ({
  toast = false,
  maskClosable = false,
  mask = !toast,
  maskClassName,
  className,
  delay: delayTimestamp,
  ...config
} = {}) => {
  const station = getStation()

  if (!station) {
    return {
      close: () => undefined,
    }
  }

  const loading =
    station.values().filter(({ getStatus }) => getStatus() === 'active')
      .length > 0

  if (loading) {
    callCount++

    return
  }
  callCount = 1

  let modalController

  function show() {
    modalController = showModal({
      ...config,
      maskClosable,
      mask,
      maskClassName: classnames('szfe-loading__mask', maskClassName),
      className: classnames('szfe-loading__wrapper', className),
      station: STATION_NAME,
      resetStyle: true,
      content: (
        <div className="szfe-loading">
          <Spin className="szfe-loading__spin" />
        </div>
      ),
    })
  }

  function close() {
    run(modalController, 'close')
    callCount = 0
  }

  if (delayTimestamp) {
    setTimeout(show, delayTimestamp)
  } else {
    show()
  }

  controller.close = close

  return { close }
}

export const hide = (force = false, { delay: delayTimestamp = 16 } = {}) => {
  callCount--

  if (force) {
    callCount = 0
  }

  // 延迟关闭，避免 hide 紧接 show 操作产生的不美观 UI 呈现
  setTimeout(() => {
    if (callCount <= 0) {
      run(controller, 'close')
    }
  }, clamp(delayTimestamp, 16))

  return callCount
}

export default {
  show,
  hide,
}
