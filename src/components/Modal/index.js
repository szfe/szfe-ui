import React, { forwardRef, useState, useRef, useEffect } from 'react'
import hoistReactStatics from 'hoist-non-react-statics'
import { classnames, run } from 'szfe-tools'

import Popup from './Popup'
import Station from './Station'
import alert from './methods/alert'
import popup from './methods/popup'
import show from './methods/show'
import genRenderer from './helpers/genRenderer'

import Portal from '../Portal'
import Fade from '../Animate/Fade'
import Slide from '../Animate/Slide'

import useUpdateEffect from '../../helpers/useUpdateEffect'



const modalMap = new Map()

const Modal = forwardRef(function Modal(
  {
    maskClassName,
    portalClassName,
    wrapperClassName = portalClassName,
    mask,
    maskClosable,
    visible: propVisible,
    onClose,
    afterClose,
    onDestroy,
    children,
    className,
    placement,
    Transition,
    ...props
  },
  forwardedRef
) {
  const [mounted, setMounted] = useState(propVisible)
  const [visible, setVisible] = useState(false)
  const current = useRef(Math.random())

  useEffect(() => {
    modalMap.set(current, { setVisible, setMounted })

    return () => {
      modalMap.delete(current)
    }
  }, [])

  useEffect(() => {
    if (propVisible) {
      setMounted(propVisible)
    } else {
      setVisible(propVisible)
    }
  }, [propVisible])

  useEffect(() => {
    setVisible(mounted)
  }, [mounted])

  useUpdateEffect(() => {
    if (!mounted) {
      run(onClose)
      run(afterClose)
      run(onDestroy)
    }
  }, [mounted])

  const ContentTransition =
    Transition ||
    {
      top: Slide.Down,
      default: Fade,
      bottom: Slide,
    }[placement] ||
    Fade

  return (
    mounted && (
      <Portal className={classnames('szfe-modal__modal', wrapperClassName)}>
        {mask && (
          <Fade in={visible}>
            <div
              className={classnames('szfe-modal__mask', maskClassName)}
              onClick={maskClosable ? onClose : null}
            />
          </Fade>
        )}
        <ContentTransition
          in={visible}
          onExited={() => {
            run(afterClose)
            setMounted(false)
          }}
        >
          <div
            {...props}
            className={classnames('szfe-modal__content', className, {
              'szfe-modal__content--default': placement === 'default',
              'szfe-modal__content--center': placement === 'center',
              'szfe-modal__content--top': placement === 'top',
              'szfe-modal__content--bottom': placement === 'bottom',
            })}
            ref={forwardedRef}
          >
            {children}
          </div>
        </ContentTransition>
      </Portal>
    )
  )
})

const closeAll = () => {
  modalMap.forEach(({ setVisible }) => {
    run(setVisible, undefined, false)
  })
}

const clear = () => {
  modalMap.forEach(({ setVisible, setMounted }) => {
    // run(setVisible, undefined, false)
    run(setMounted, undefined, false)
  })
}

Modal.defaultProps = {
  mask: true,
  maskClosable: true,
  visible: false,
  placement: 'default',
}

hoistReactStatics(Modal, {
  Popup,
  Station,
  alert,
  popup,
  show,
  genRenderer,
  closeAll,
  clear,
})

export default Modal
