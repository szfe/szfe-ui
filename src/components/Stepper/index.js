import React, { useState, useEffect, forwardRef } from 'react'
import { run, clamp, isUndefined, classnames } from 'szfe-tools'

import Icon from '../Icon'
import useUpdateEffect from '../../helpers/useUpdateEffect'


const Stepper = forwardRef(function Stepper(
  { placeholder, value: propValue, onChange, min, max, className, ...props },
  forwardedRef
) {
  const [stateValue, setStateValue] = useState(0)
  const value = propValue || stateValue

  useEffect(() => {
    if (!isUndefined(propValue)) {
      setStateValue(Number(propValue))
    }
  }, [propValue])

  useUpdateEffect(() => {
    if (Number(stateValue) !== Number(propValue)) {
      run(onChange, undefined, stateValue)
    }
  }, [stateValue])

  return (
    <div
      {...props}
      className={classnames('szfe-stepper__stepper', className)}
      ref={forwardedRef}
    >
      <div className="szfe-stepper__placeholder">{placeholder}</div>
      <div className="szfe-stepper__value-wrapper">
        <span
          onClick={() => setStateValue((value) => clamp(value - 1, min, max))}
        >
          <Icon type="amicon-move" />
        </span>
        <span className="szfe-stepper__value">{value}</span>
        <span
          onClick={() => setStateValue((value) => clamp(value + 1, min, max))}
        >
          <Icon type="amicon-add" />
        </span>
      </div>
    </div>
  )
})

Stepper.defaultProps = {
  value: 0,
}

export default Stepper
