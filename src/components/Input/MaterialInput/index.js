import React, { useState, useEffect, forwardRef, useRef } from 'react'
import { classnames, run, get, value as tryValue, throttle } from 'szfe-tools'

import MaterialLabel from '../../MaterialLabel'
import Icon from '../../Icon'



const scrollIntoView = throttle(
  (dom) => setTimeout(() => run(dom, 'scrollIntoView', true)),
  120
)

const MaterialInput = forwardRef(function MaterialInput(
  {
    initialValue,
    value: propValue,
    scrollIntoView: needScrollIntoView,
    multipleLines = false,
    prefix,
    helpers,
    extra,
    clearable,
    error,
    placeholderCapitalize,
    placeholder,
    label = placeholder,
    onChange,
    onFocus,
    onBlur,
    disabled,
    onClick,
    ...props
  },
  forwardedRef
) {
  const inputRef = useRef(null)
  const labelRef = useRef(null)
  const [stateValue, setStateValue] = useState(initialValue)
  const value = tryValue(propValue, stateValue)
  const hasValue = !!value

  const [active, setActive] = useState(hasValue)
  const [focused, setFocused] = useState(false)
  const [clearShow, setClearShow] = useState(false)
  const hasError = !!error

  useEffect(() => {
    if (!focused) {
      setActive(hasValue)
    }
  }, [hasValue])

  useEffect(() => {
    setTimeout(() => {
      setClearShow(clearable && hasValue && focused)
    }, 100)
  }, [clearable && hasValue && focused])

  useEffect(() => {
    if (!focused && multipleLines) {
      inputRef.current.innerHTML = value
    }
  }, [value])

  const handlerName = multipleLines ? 'onInput' : 'onChange'
  const inputProps = {
    ...props,
    value,
    [handlerName]: (e) => {
      const value = multipleLines
        ? get(e, 'target.innerText')
        : get(e, 'target.value')
      run(onChange, undefined, value, e)
      setStateValue(value)
      if (needScrollIntoView) {
        scrollIntoView(labelRef.current)
      }
    },
    onFocus: (e) => {
      if (disabled) {
        return
      }
      setFocused(true)
      setActive(true)
      run(onFocus, undefined, e)
      if (needScrollIntoView) {
        scrollIntoView(labelRef.current)
      }
    },
    onBlur: (e) => {
      run(onBlur, undefined, e)
      setFocused(false)

      if (!value) {
        setActive(false)
      }
    },
  }

  const type = focused ? 'info' : hasError ? 'error' : ''

  return (
    <MaterialLabel
      autoHeight={multipleLines}
      ref={labelRef}
      className={classnames('szfe-material-input__label', props.className, {
        'szfe-material-input__label--multiple': multipleLines,
        'szfe-material-input__label--disabled': disabled,
      })}
      placeholderCapitalize={placeholderCapitalize}
      placeholder={label}
      helpers={
        !focused ? (
          <div
            className={classnames({
              'szfe-material-input__error': type === 'error',
            })}
          >
            {hasError && (
              <Icon
                className="szfe-material-input__error-icon"
                type="amicon-infofill"
              />
            )}
            {hasError && <span>{error}</span>}
          </div>
        ) : (
          <div className="szfe-material-input__helpers">{helpers}</div>
        )
      }
      active={active}
      type={focused ? 'info' : hasError ? 'error' : ''}
      prefix={
        prefix && (
          <div
            className={classnames('szfe-material-input__prefix', {
              'input__prefix--active': active,
            })}
          >
            {prefix}
          </div>
        )
      }
      onClick={onClick}
      extra={
        <div className="szfe-material-input__extra-wrapper">
          <Icon
            type="amicon-roundclosefill"
            className={classnames('szfe-material-input__clear', {
              'szfe-material-input__clear--show': clearShow,
            })}
            onClick={(e) => {
              if (!clearShow) {
                return
              }
              run(onChange, undefined, '', e)
              setStateValue('')
            }}
          />
          <div className="szfe-material-input__extra">{extra}</div>
        </div>
      }
    >
      {multipleLines ? (
        <div
          ref={inputRef}
          {...inputProps}
          contentEditable
          className={classnames('szfe-material-input__textarea', {
            'szfe-material-input__textarea--disabled': disabled,
            'szfe-material-input__textarea--active': active,
          })}
        />
      ) : (
        <input
          ref={inputRef}
          {...inputProps}
          placeholder={active && label !== placeholder ? placeholder : ''}
          className={classnames('szfe-material-input__input', {
            'szfe-material-input__input--disabled': disabled,
            'szfe-material-input__input--active': active,
          })}
        />
      )}
    </MaterialLabel>
  )
})

MaterialInput.defaultProps = {
  className: '',
  initialValue: '',
  placeholder: '',
  error: null,
  disabled: false,
  clearable: true,
  scrollIntoView: false,
  onChange: () => null,
  onFocus: () => null,
  onBlur: () => null,
}

export default MaterialInput
