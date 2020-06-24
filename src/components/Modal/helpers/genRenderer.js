import React, { useState, useEffect, useRef } from 'react'
import { run } from 'szfe-tools'

import Station from '../Station'

const stationManager = Station.manager
const { DEFAULT_STATION_NAME } = stationManager

Station.registerGlobalStation(DEFAULT_STATION_NAME)

const genRenderer = (getRenderer) => {
  function Modal({
    setCloseModal,
    setPropsModifier,
    renderModal,
    onUnmount,
    ...initialProps
  }) {
    const [props, setProps] = useState(initialProps)
    const [visible, setVisible] = useState(true)
    const unmounted = useRef(false)
    useEffect(() => {
      setCloseModal(() => {
        if (unmounted.current) {
          return
        }
        setVisible(false)
      })
      setPropsModifier((nextProps) => {
        if (unmounted.current) {
          return
        }
        setProps((prevProps) => ({
          ...prevProps,
          ...nextProps,
        }))
      })

      return () => {
        unmounted.current = true
      }
    }, [])

    return run(renderModal, undefined, {
      ...props,
      visible,
      afterClose: () => {
        run(onUnmount)
        run(props, 'afterClose')
      },
    })
  }

  const renderer = ({
    displayDelay,
    station: stationName = DEFAULT_STATION_NAME,
    key,
    ...props
  }) => {
    const renderModal = getRenderer()
    const station = stationManager.get(stationName)

    if (!station) {
      return { close: () => undefined }
    }

    let closeModal, unmountModal, modifyProps
    let modalStatus = 'active'

    function unmount() {
      run(unmountModal)
    }
    function close() {
      modalStatus = 'closed'
      run(closeModal)
    }

    function setProps(nextProps) {
      run(modifyProps, undefined, nextProps)
    }

    unmountModal = station.add(
      <Modal
        {...props}
        setCloseModal={(close) => {
          closeModal = close
        }}
        setPropsModifier={(propsModifier) => {
          modifyProps = propsModifier
        }}
        renderModal={renderModal}
        onClose={() => {
          run(close)
          run(props, 'onClose')
        }}
        onUnmount={unmount}
      />,
      {
        uuid: key,
        close,
        getStatus: () => modalStatus,
      }
    )

    return {
      close,
      set: setProps,
    }
  }

  return renderer
}

export default genRenderer
