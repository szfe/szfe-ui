import React, {
  useState,
  useEffect,
  Fragment,
  useCallback,
  forwardRef,
} from 'react'
import { get, run, value as tryValue, nextTick, debounce } from 'szfe-tools'

import MaterialLabel from '../../MaterialLabel'
import Icon from '../../Icon'
import Spin from '../../Spin'
import View from '../../View'
import ScrollView from '../../ScrollView'
import SearchBar from '../../SearchBar'
import PickerView from '../../Picker/PickerView'
import Empty from '../../Empty'
import Modal from '../../Modal'



const { Popup } = Modal

const MaterialSearchPicker = forwardRef(function MaterialSearchPicker(
  {
    placeholderCapitalize,
    placeholder,
    title = placeholder,
    value: propValue,
    useSearchContent,
    searchable = true,
    error,
    onChange,
    onClick,
    onClose,
    onSearch,
    extra,
    scrollViewProps,
    popupProps,
    viewProps,
    searchBarProps,
    pickerViewProps,
    ...props
  },
  forwardedRef
) {
  const [stateValue, setStateValue] = useState(propValue)
  const value = tryValue(propValue, stateValue)
  const [show, setShow] = useState(false)
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const label = get(
    data.find(
      (item) => String(item.value) === String(get(value, 'value', value))
    ),
    'label',
    get(value, 'label', '')
  )

  const hasValue = !!value
  const hasError = !!error

  const searchData = useCallback(
    debounce(async (content) => {
      setSearching(true)
      const { success, data } =
        (await run(onSearch, undefined, content)) || Promise.resolve({})

      setSearching(false)
      if (success) {
        const reg = new RegExp(content, 'ig')
        setData(data.filter((item) => reg.test(item.name)))
      } else {
        setData([])
      }
    }, 300),
    []
  )

  useEffect(() => {
    searchData(search)
  }, [search])

  const options =
    useSearchContent &&
    search &&
    !data.find((item) => item.label.toLowerCase() === search.toLowerCase())
      ? [{ label: search, value: search }, ...data]
      : data

  return (
    <Fragment>
      <MaterialLabel
        {...props}
        ref={forwardedRef}
        placeholderCapitalize={placeholderCapitalize}
        placeholder={placeholder}
        active={hasValue}
        extra={
          extra || <Icon.Arrow className="szfe-material-search-picker__arrow" />
        }
        helpers={
          hasError ? (
            <div className="szfe-material-search-picker__error">
              <Icon
                className="szfe-material-search-picker__error-icon"
                type="amicon-infofill"
              />
              <span>{error}</span>
            </div>
          ) : null
        }
        type={hasError ? 'error' : ''}
        onClick={() => {
          setShow(true)
          nextTick(() => run(onClick))
        }}
      >
        {hasValue && (
          <div className="szfe-material-search-picker__value">{label}</div>
        )}
      </MaterialLabel>
      <Popup
        {...popupProps}
        title={title}
        visible={show}
        onClose={() => {
          run(onClose)
          setShow(false)
        }}
        style={{ height: '75%' }}
      >
        <View {...viewProps}>
          {searchable && (
            <div className="szfe-material-search-picker__search-bar">
              <SearchBar
                {...searchBarProps}
                value={search}
                onChange={(search) => {
                  setSearch(search)
                }}
              />
            </div>
          )}
          <ScrollView {...scrollViewProps}>
            {searching && <Spin.Page />}
            {!searching && options.length === 0 ? (
              <Empty />
            ) : (
              <PickerView
                {...pickerViewProps}
                scrollIntoView
                value={value}
                data={options}
                onChange={(value, ...args) => {
                  setStateValue(value)
                  setShow(false)
                  run(onChange, undefined, value, ...args)
                }}
              />
            )}
          </ScrollView>
        </View>
      </Popup>
    </Fragment>
  )
})

MaterialSearchPicker.defaultProps = {
  useSearchContent: false,
}

export default MaterialSearchPicker
