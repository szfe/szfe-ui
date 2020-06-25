import React, { useState, useRef, forwardRef } from 'react'
import { run, get, value as tryValue, classnames } from 'szfe-tools'

import Icon from '../Icon'

import useUpdateEffect from '../../helpers/useUpdateEffect'



const SearchBar = forwardRef(function SearchBar(
  { value: propValue, onChange, className, ...props },
  forwardedRef
) {
  const inputRef = useRef()
  const [stateValue, setStateValue] = useState()
  const value = tryValue(propValue, stateValue)
  const hasValue = !!value
  const [focused, setFocused] = useState()

  useUpdateEffect(() => {
    run(onChange, undefined, stateValue)
  }, [stateValue])

  return (
    <div
      {...props}
      className={classnames('szfe-searchbar__wrapper', className, {
        'szfe-searchbar__wrapper--active': focused || hasValue,
      })}
      ref={forwardedRef}
    >
      <div
        className={classnames('szfe-searchbar__search', {
          'szfe-searchbar__search--active': focused || hasValue,
        })}
      >
        <div
          className={classnames('szfe-searchbar__search-content', {
            'szfe-searchbar__search-content--active': focused || hasValue,
          })}
        >
          <Icon type="amicon-search" />
          {!hasValue && (
            <div className="szfe-searchbar__placeholder">Search Content</div>
          )}
          <input
            ref={inputRef}
            onChange={(e) => {
              setStateValue(get(e, 'target.value'))
            }}
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() =>
              setTimeout(() => {
                setFocused(false)
              })
            }
          />
        </div>
      </div>

      <Icon
        type="amicon-roundclosefill"
        className={classnames('szfe-searchbar__del-icon', {
          'szfe-searchbar__del-icon--show': hasValue && focused,
        })}
        onClick={() => {
          setStateValue('')
        }}
      />
    </div>
  )
})

SearchBar.defaultProps = {}

export default SearchBar
