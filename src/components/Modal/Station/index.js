import React, { useEffect, useState, Fragment, forwardRef } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import hoistReactStatics from 'hoist-non-react-statics'
import { run, isFunction, EventBus, nextTick } from 'szfe-tools'

import applyRef from '../../../helpers/applyRef'
import useGetSet from '../../../helpers/useGetSet'

import * as stationManager from './stationManager'
import uniqueId from '../helpers/uniqueId'

const eventBus = new EventBus()

const ModalStation = forwardRef(function ModalStation({ id }, forwardedRef) {
  const [getModal, setModal] = useGetSet({})

  useEffect(() => {
    const remove = (uuid) => {
      const modal = getModal()
      delete modal[uuid]

      setModal(modal)
    }

    const add = (component, { uuid = uniqueId(), close, getStatus } = {}) => {
      setModal({
        ...getModal(),
        [uuid]: {
          component,
          close,
          getStatus,
        },
      })

      return () => remove(uuid)
    }

    const keys = () => Object.keys(getModal())
    const values = () => Object.values(getModal())
    const clear = () => {
      keys().forEach(remove)
    }

    const close = (uuid) => {
      const modal = getModal()
      run(modal, `${uuid}.close`)
    }

    const closeAll = () => {
      values().forEach(({ close }) => run(close))
    }

    const station = {
      add,
      remove,
      clear,
      keys,
      values,
      close,
      closeAll,
    }

    applyRef(forwardedRef, station)
    stationManager.mount(id, station)
    eventBus.emit('mount', id)

    return () => {
      stationManager.unmount(id)
      eventBus.emit('unmount', id)
    }
  }, [])

  return Object.entries(getModal()).map(([key, { component }]) => (
    <Fragment key={key}>{component}</Fragment>
  ))
})

let addGlobalId
let globalIdList = []

function GlobalStation() {
  const [globalIdMap, setGlobalIdMap] = useState({})

  useEffect(() => {
    addGlobalId = (id) => {
      setGlobalIdMap((map) => ({
        ...map,
        [id]: true,
      }))
    }

    globalIdList.forEach((id) => {
      const node = document.getElementById(id)

      function onUnmount(unmountId) {
        if (unmountId === id) {
          run(addGlobalId, undefined, id)
          eventBus.off('unmount', onUnmount)
        }
      }

      if (node) {
        nextTick(() => {
          eventBus.on('unmount', onUnmount)
          unmountComponentAtNode(node)
          node.parentNode.removeChild(node)
        })
      } else {
        run(addGlobalId, undefined, id)
      }
    })

    return () => {
      addGlobalId = undefined
    }
  }, [])

  return (
    <Fragment>
      {Object.keys(globalIdMap).map((id) => (
        <ModalStation id={id} key={id} />
      ))}
    </Fragment>
  )
}

function registerGlobalStation(id) {
  // SSR 阶段不挂载 station，节约性能
  if (window.__SSR__) {
    return () => null
  }

  globalIdList.push(id)

  if (isFunction(addGlobalId)) {
    addGlobalId(id)

    return () => stationManager.get(id)
  }

  try {
    let div = document.getElementById(id)

    if (!div) {
      div = document.createElement('div')
      div.id = id
      document.body.appendChild(div)
    }

    render(<ModalStation id={id} />, div)

    return () => stationManager.get(id)
  } catch (err) {
    console.error('[Register Global Station Failed]:', err)
    return () => null
  }
}

hoistReactStatics(ModalStation, {
  registerGlobalStation,
  eventBus,
  Global: GlobalStation,
  manager: stationManager,
})

export default ModalStation
