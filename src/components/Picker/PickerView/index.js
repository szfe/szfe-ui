import React, { useState, useEffect, useRef, forwardRef, Fragment } from 'react'
import {
  run,
  value as tryValue,
  classnames,
  isUndefined,
  get,
} from 'szfe-tools'

import Empty from '../../Empty'
import Icon from '../../Icon'
import List from '../../List'

import './style.less'

const { Item } = List

const PREFIX = 'szfe-picker-view'

const PickerView = forwardRef(function PickerView(
  {
    initialValue,
    value: propValue,
    data,
    onChange,
    border = true,
    scrollIntoView = false,
    className,
    ...props
  },
  forwardedRef
) {
  const [stateValue, setStateValue] = useState(initialValue)
  const currentValue = tryValue(propValue, stateValue)
  const currentRef = useRef()

  useEffect(() => {
    if (!isUndefined(propValue)) {
      setStateValue(propValue)
    }
  }, [propValue])

  useEffect(() => {
    if (scrollIntoView) {
      setTimeout(() => {
        run(currentRef.current, 'scrollIntoViewIfNeeded', true)
      }, 200)
    }
  }, [])

  return (
    <Fragment>
      {get(data, 'length', 0) === 0 ? (
        <Empty
          {...props}
          className={classnames(`${PREFIX}--empty`, className)}
          ref={forwardedRef}
        />
      ) : (
        <List
          {...props}
          className={classnames(PREFIX, className)}
          ref={forwardedRef}
        >
          {data.map(({ value, label, disabled = false, ...rest }) => (
            <Item
              key={value}
              border={border}
              className={classnames(`${PREFIX}__item`, {
                [`${PREFIX}__item--active`]:
                  String(get(currentValue, 'value', currentValue)) ===
                  String(value),
                [`${PREFIX}__item--disabled`]: disabled,
              })}
              ref={
                String(get(currentValue, 'value', currentValue)) ===
                String(value)
                  ? currentRef
                  : undefined
              }
              extra={<Icon type="amicon-check" className={`${PREFIX}__icon`} />}
              onClick={() => {
                if (disabled) {
                  return
                }
                setStateValue(value)
                run(onChange, undefined, value, {
                  value,
                  label,
                  disabled,
                  ...rest,
                })
              }}
            >
              <div className={`${PREFIX}__content`}>{label}</div>
            </Item>
          ))}
        </List>
      )}
    </Fragment>
  )
})

PickerView.defaultProps = {
  scrollIntoView: false,
  border: true,
}

export default PickerView
