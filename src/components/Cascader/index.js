import React, { useState, Fragment, useRef, useEffect, forwardRef } from 'react'
import { get, run, value as tryValue, last, isArray } from 'szfe-tools'

import Breadcrumb from '../Breadcrumb'
import Icon from '../Icon'
import Spin from '../Spin'
import View from '../View'
import ScrollView from '../ScrollView'
import TransitionSwitch from '../Animate/Switch'
import Modal from '../Modal'
import Picker from '../Picker'

import MaterialCascader from './MaterialCascader'
import './style.less'

const { View: PickerView } = Picker
const { Popup } = Modal

const Cascader = forwardRef(function Cascader(
  {
    initialValue,
    value: propValue,
    data: getData,
    current: getCurrentTag,
    title,
    children,
    deep,
    onChange,
    onOpen,
    onClose,
    afterClose,
    ...props
  },
  forwardedRef
) {
  const [stateValue, setStateValue] = useState(initialValue)
  const value = tryValue(propValue, stateValue)
  const [selectedValue, setSelectedValue] = useState(value)
  const [show, setShow] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [data, setData] = useState({})

  const prevIdx = useRef(currentIdx)

  useEffect(() => {
    if (get(propValue, 'length', 0) > 0) {
      setStateValue(propValue)
    }
  }, [propValue])

  useEffect(() => {
    const isOver = selectedValue.length >= deep

    if (!isOver) {
    } else {
      setStateValue(selectedValue)
    }
  }, [selectedValue])

  useEffect(() => {
    if (show) {
      run(onChange, undefined, value)
      setShow(false)
    }
  }, [value])

  useEffect(() => {
    if (show) {
      run(onOpen)
    } else {
      run(onClose)
    }
  }, [show])

  const loadData = async () => {
    setData((data) => ({
      ...data,
      [currentIdx]: 'loading',
    }))
    const result = await run(getData, undefined, currentIdx, [...selectedValue])

    setData((data) => ({
      ...data,
      [currentIdx]: isArray(result) ? result : 'error',
    }))
  }

  useEffect(() => {
    if (show) {
      loadData()
    }
  }, [show, currentIdx])

  return (
    <Fragment>
      <div
        onClick={() => {
          setSelectedValue(value)
          setShow(true)
        }}
        ref={forwardedRef}
      >
        {children}
      </div>
      <Popup
        {...props}
        title={title}
        visible={show}
        onClose={() => {
          setShow(false)
        }}
        afterClose={() => {
          setShow(false)
          run(afterClose)
          // setData({})
          setSelectedValue([])

          if (selectedValue.length < deep) {
            setCurrentIdx(0)
          }
        }}
        style={{
          height: '75%',
        }}
      >
        <View>
          <Breadcrumb
            data={[
              ...selectedValue.map(({ item }) => ({
                name: item.label,
              })),
              {
                name: run(getCurrentTag, undefined, currentIdx, [
                  ...selectedValue,
                ]),
              },
            ].slice(0, deep)}
            onItemClick={(item, idx) => {
              const nextSelectedValue = selectedValue.slice(0, idx)

              setSelectedValue(nextSelectedValue)
              prevIdx.current = currentIdx
              setCurrentIdx(nextSelectedValue.length)
            }}
          />
          <ScrollView>
            <TransitionSwitch
              direction={currentIdx < prevIdx.current ? 'back' : 'forward'}
              animateKey={currentIdx}
            >
              {get(data, currentIdx) === 'error' && (
                <div className="szfe-cascader__error" onClick={loadData}>
                  <Icon type="amicon-refresh_light" />
                  Refresh
                </div>
              )}
              {get(data, currentIdx) === 'loading' && <Spin.Page />}
              {isArray(get(data, currentIdx)) && (
                <PickerView
                  data={data[currentIdx]}
                  value={
                    selectedValue.length === deep
                      ? get(last(selectedValue), 'id')
                      : undefined
                  }
                  onChange={(value, item) => {
                    const nextSelectedValue = [
                      ...selectedValue.slice(0, deep - 1),
                      {
                        id: value,
                        item,
                      },
                    ]
                    setSelectedValue(nextSelectedValue)

                    if (nextSelectedValue.length < deep) {
                      prevIdx.current = currentIdx
                      setCurrentIdx(selectedValue.length + 1)
                    }
                  }}
                />
              )}
            </TransitionSwitch>
          </ScrollView>
        </View>
      </Popup>
    </Fragment>
  )
})

Cascader.Material = MaterialCascader
Cascader.defaultProps = {
  initialValue: [],
}

export default Cascader
