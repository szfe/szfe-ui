import React, { useState, useEffect, forwardRef } from 'react'
import { get, run, value as tryValue, isString } from 'szfe-tools'

import MaterialLabel from '../../MaterialLabel'
import Icon from '../../Icon'

import Cascader from '../index'
import './style.less'

const MaterialCascader = forwardRef(function MaterialCascader(
  {
    initialValue,
    value: propValue,
    placeholderCapitalize,
    placeholder,
    error,
    onChange,
    onClick,
    extra,
    ...props
  },
  forwardedRef
) {
  const [stateValue, setStateValue] = useState(initialValue)
  const value = tryValue(propValue, stateValue)

  const hasValue = value.length > 0

  const [active, setActive] = useState(hasValue)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    setActive(hasValue)
  }, [hasValue])
  const hasError = !!error

  useEffect(() => {
    if (get(propValue, 'length', 0) > 0) {
      setStateValue(propValue)
    }
  }, [propValue])

  return (
    <Cascader
      {...props}
      title={placeholder}
      onOpen={() => {
        setFocused(true)
        setActive(true)
      }}
      onClose={() => {
        setFocused(false)
        if (!hasValue) {
          setActive(false)
        }
      }}
      onChange={(value) => {
        setStateValue(value)
        run(onChange, undefined, value)
      }}
      ref={forwardedRef}
    >
      <MaterialLabel
        placeholderCapitalize={placeholderCapitalize}
        placeholder={placeholder}
        active={active}
        extra={extra || <Icon.Arrow className="szfe-material-cascader__arrow" />}
        helpers={
          hasError ? (
            <div className="szfe-material-cascader__error">
              <Icon
                className="szfe-material-cascader__error-icon"
                type="amicon-infofill"
              />
              <span>{error}</span>
            </div>
          ) : null
        }
        type={hasError ? 'error' : focused ? 'info' : ''}
        onClick={onClick}
      >
        <div className="szfe-material-cascader__value">
          {hasValue
            ? value
                .map((item) =>
                  isString(item) ? item : get(item, 'item.label')
                )
                .join(' - ')
            : ''}
        </div>
      </MaterialLabel>
    </Cascader>
  )
})

MaterialCascader.defaultProps = {
  initialValue: [],
}

export default MaterialCascader
