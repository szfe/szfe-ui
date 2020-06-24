import React from 'react'
import { run } from 'szfe-tools'

import PopupModal from '../Popup'
import genRenderer from '../helpers/genRenderer'

const popup = genRenderer(
  () =>
    function Popup({ title, content, ...props }) {
      return (
        <PopupModal {...props} title={title}>
          {run(content, undefined, { close: props.onClose })}
        </PopupModal>
      )
    }
)

export default popup
