import React, { useState, Fragment, forwardRef } from 'react'
import { get, run, value as tryValue } from 'szfe-tools'

import Modal from '../Modal'
import View from '../View'
import ScrollView from '../ScrollView'

import PickerView from './PickerView'
import MaterialPicker from './MaterialPicker'

import useUpdateEffect from '../../helpers/useUpdateEffect'

const { Popup } = Modal

const Picker = forwardRef(function Picker(
  {
    initialValue,
    value: propValue,
    title,
    children,
    data,
    onChange,
    onOpen,
    onClose,
    disabled = false,
    scrollIntoView,
    viewProps,
    popupProps,
    scrollViewProps,
    pickerViewProps,
    ...props
  },
  forwardedRef
) {
  const [show, setShow] = useState(false)
  const [stateValue, setStateValue] = useState(initialValue)
  const value = tryValue(propValue, stateValue)
  const selectedItem = data.find(
    (item) => String(item.value) === String(get(value, 'value', value))
  )

  useUpdateEffect(() => {
    // if (!isUndefined(propValue)) {
    setStateValue(propValue)
    // }
  }, [propValue])

  useUpdateEffect(() => {
    if (show) {
      run(onOpen)
    } else {
      run(onClose)
    }
  }, [show])

  return (
    <Fragment>
      <div
        {...props}
        onClick={() => {
          if (disabled) {
            return
          }
          setShow(true)
        }}
        ref={forwardedRef}
      >
        {run(children, undefined, selectedItem, value)}
      </div>
      <Popup
        {...popupProps}
        title={title}
        visible={show}
        style={{
          height: '75%',
        }}
        onClose={() => setShow(false)}
        afterClose={() => setShow(false)}
      >
        <View {...viewProps}>
          <ScrollView {...scrollViewProps}>
            <PickerView
              {...pickerViewProps}
              scrollIntoView={scrollIntoView}
              value={value}
              data={data}
              onChange={(value, ...args) => {
                setShow(false)
                setStateValue(value)
                run(onChange, undefined, value, ...args)
              }}
            />
          </ScrollView>
        </View>
      </Popup>
    </Fragment>
  )
})

Picker.View = PickerView
Picker.Material = MaterialPicker
Picker.defaultProps = {
  scrollIntoView: true,
}

export default Picker
