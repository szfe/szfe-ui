import React, { forwardRef } from 'react'
import { classnames } from 'szfe-tools'

import Icon from '../../Icon'
import Header from '../../Header'

import Modal from '../index'



const PopupModal = forwardRef(function PopupModal(
  {
    className,
    contentClassName,
    title,
    children,
    onClose,
    renderHeaderRight = () => (
      <button className="szfe-popup__close-btn" onClick={onClose}>
        <Icon type="amicon-close" />
      </button>
    ),
    renderHeaderLeft,
    ...props
  },
  forwardedRef
) {
  return (
    <Modal
      {...props}
      onClose={onClose}
      className={classnames('szfe-popup__modal', className)}
      placement="bottom"
      ref={forwardedRef}
    >
      <Header
        className="szfe-popup__header"
        renderLeft={renderHeaderLeft}
        renderRight={renderHeaderRight}
      >
        <div
          className={classnames('szfe-popup__title', {
            'szfe-popup__title--has-left-content': !!renderHeaderLeft,
            'szfe-popup__title--has-right-content': !!renderHeaderRight,
          })}
        >
          {title}
        </div>
      </Header>
      <div className={classnames('szfe-popup__content', contentClassName)}>
        {children}
      </div>
    </Modal>
  )
})

PopupModal.defaultProps = {
  className: '',
  onClose: null,
}

export default PopupModal
