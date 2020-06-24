import React from 'react'
import { run } from 'szfe-tools'

import BasicModal from '../index'
import genRenderer from '../helpers/genRenderer'

const show = genRenderer(
  () =>
    function Modal({ content, placement, resetStyle = false, ...props }) {
      return (
        <BasicModal {...props} placement={resetStyle ? 'center' : placement}>
          {run(content, undefined, { close: props.onClose })}
        </BasicModal>
      )
    }
)

export default show
