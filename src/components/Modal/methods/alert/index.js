import React from 'react'
import { run, classnames } from 'szfe-tools'

import show from '../show'



function Alert({ title, content, buttonStyle, actions, close }) {
  return (
    <div className="szfe-alert__alert">
      <div className="szfe-alert__wrapper">
        {title && <h3 className="szfe-alert__title">{title}</h3>}
        <div className="szfe-alert__content">
          {run(content, undefined, { close })}
        </div>
      </div>
      <div
        className={classnames('szfe-alert__actions', {
          'szfe-alert__actions--android':
            run(buttonStyle, 'toUpperCase') === 'ANDROID',
          'szfe-alert__actions--iOS': run(buttonStyle, 'toUpperCase') === 'IOS',
        })}
      >
        {actions.map(({ text, onPress, onClick = onPress || close }, idx) => (
          <span
            key={idx}
            className="szfe-alert__action"
            onClick={() => {
              run(onClick, undefined, close)
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

Alert.defaultProps = {
  buttonStyle: 'android',
  actions: [
    {
      text: 'Ok',
    },
  ],
}

const alert = (props) =>
  show({
    maskClosable: false,
    placement: 'center',
    content: ({ close }) => <Alert {...props} close={close} />,
  })

alert.Alert = Alert

export default alert
