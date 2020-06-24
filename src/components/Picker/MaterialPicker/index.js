import React, { useState, useEffect, forwardRef, useRef } from 'react'
import { classnames, run, get, value as tryValue } from 'szfe-tools'

import MaterialLabel from '../../MaterialLabel'
import Icon from '../../Icon'
import Picker from '../index'
import useUpdateEffect from '../../../helpers/useUpdateEffect'
import './style.less'

const MaterialPicker = forwardRef(function MaterialPicker(
  {
    value: propValue,
    extra,
    clearable,
    error,
    placeholderCapitalize,
    placeholder,
    title = placeholder,
    initialValue,
    onChange,
    disabled = false, // 兼容 disabled
    onClick,
    onClose,
    ...props
  },
  forwardedRef
) {
  const labelRef = useRef(null)
  const hasError = !!error
  const [stateValue, setStateValue] = useState(initialValue)
  const value = tryValue(propValue, stateValue)
  const hasValue = !!value && String(get(value, 'value', value)).length > 0

  const [active, setActive] = useState(hasValue)
  const [focused, setFocused] = useState(false)
  // const [clearShow, setClearShow] = useState(false)

  useEffect(() => {
    setActive(hasValue)
  }, [hasValue])

  useUpdateEffect(() => {
    // if (!isUndefined(propValue)) {
    setStateValue(propValue)
    // }
  }, [propValue])

  // useEffect(() => {
  //   setClearShow(clearable && hasValue)
  // }, [clearable && hasValue])

  return (
    <Picker
      {...props}
      disabled={disabled}
      title={title}
      value={value}
      onOpen={() => {
        setFocused(true)
        setActive(true)
      }}
      onClose={() => {
        setFocused(false)
        if (!hasValue) {
          setActive(false)
        }
        run(onClose)
      }}
      onChange={(value, item, ...args) => {
        run(onChange, undefined, value, item, ...args)
        setStateValue(value)
      }}
      ref={forwardedRef}
    >
      <MaterialLabel
        ref={labelRef}
        className={classnames(props.className, {
          'szfe-material-picker__disabled': disabled,
        })}
        placeholderCapitalize={placeholderCapitalize}
        placeholder={placeholder}
        helpers={
          hasError && (
            <div className="szfe-material-picker__error">
              <Icon
                className="szfe-material-picker__error-icon"
                type="amicon-infofill"
              />
              <span>{error}</span>
            </div>
          )
        }
        active={active}
        type={hasError ? 'error' : focused ? 'info' : ''}
        extra={extra || <Icon.Arrow className="szfe-material-picker__arrow" />}
        onClick={onClick}
      >
        <div className="szfe-material-picker__value">
          {get(
            props.data.find(
              (item) =>
                String(item.value) === String(get(value, 'value', value)) // 兼容对象类型 value
            ),
            'label',
            get(value, 'label', '')
          )}
        </div>
      </MaterialLabel>
    </Picker>
  )
})

MaterialPicker.defaultProps = {
  className: '',
  initialValue: '',
  placeholder: '',
  error: null,
  clearable: true,
  scrollIntoView: true,
  onChange: () => null,
  onFocus: () => null,
  onBlur: () => null,
}

export default MaterialPicker
