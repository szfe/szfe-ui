import React from 'react'
import { run, isNumber } from 'szfe-tools'

import Icon from '../Icon'

import Modal from '../Modal'
import './style.less'

const { show } = Modal

const DEFAULT_CONFIG = { duration: 3, onClose: null, mask: false }

const parseConfig = (config = DEFAULT_CONFIG, ...rest) => {
  if (isNumber(config)) {
    const duration = config
    const [onClose = null, mask = true] = rest

    return { duration, onClose, mask }
  }

  return {
    ...DEFAULT_CONFIG,
    ...config,
  }
}

let close

const info = (content, config, ...rest) => {
  let { duration, onClose, mask, ...restConfig } = parseConfig(config, ...rest)

  run(close)
  const { close: closeModal } = show({
    ...restConfig,
    resetStyle: true,
    maskClassName: 'szfe-toast__mask',
    afterClose: onClose,
    maskClosable: false,
    content: <div className="szfe-toast__content">{content}</div>,
    mask,
  })

  close = closeModal

  setTimeout(close, duration * 1000)

  return {
    close,
  }
}

const success = (content, ...rest) =>
  info(
    <div className="szfe-toast__icon-content">
      <Icon className="szfe-toast__icon" type="amicon-emojilight" />
      <div className="szfe-toast__text">{content}</div>
    </div>,
    ...rest
  )

const fail = (content, ...rest) =>
  info(
    <div className="szfe-toast__icon-content">
      <Icon className="szfe-toast__icon" type="amicon-round_close_light" />
      <div className="szfe-toast__text">{content}</div>
    </div>,
    ...rest
  )

export default {
  info,
  success,
  fail,
}
