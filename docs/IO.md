# IO

```jsx
import React, { useState, useEffect } from 'react'
import { Input, Picker, toast } from 'szfe-ui'

function IOTest() {
  const [inputValue, setInputValue] = useState('')
  const [pickerValue, setPickerValue] = useState()
  const [error, setError] = useState(undefined)

  useEffect(() => {
    if (inputValue.length > 5) {
      setError('Error!')
    } else {
      setError()
    }
  }, [inputValue])

  return (
    <section>
      <p>以下是 Material IO 测试</p>
      <Input.Material
        label="Test Input"
        placeholder="Input Placeholder"
        error={error}
        value={inputValue}
        onChange={(value) => {
          setInputValue(value)
        }}
      />
      <Input.Material
        multipleLines
        placeholder="Input Placeholder"
        value={inputValue}
        error={error}
        onChange={(value) => {
          setInputValue(value)
        }}
      />
      <Picker.Material
        // disabled
        title="Picker 测试"
        placeholder="Picker Placeholder"
        error={error}
        value={pickerValue}
        data={[
          {
            label: '东城区',
            value: '01-1',
          },
          {
            label: '西城区',
            value: '01-2',
          },
          {
            label: '崇文区',
            value: '01-3',
          },
          {
            label: '宣武区',
            value: '01-4',
          },
          {
            label: '西湖区',
            value: '02-1-1',
          },
          {
            label: '上城区',
            value: '02-1-2',
          },
          {
            label: '江干区',
            value: '02-1-3',
          },
          {
            label: '下城区',
            value: '02-1-4',
          },
          {
            label: 'xx区',
            value: '02-2-1',
          },
          {
            label: 'yy区',
            value: '02-2-2',
          },
          {
            label: '温州',
            value: '02-3',
          },
          {
            label: '嘉兴',
            value: '02-4',
          },
          {
            label: '湖州',
            value: '02-5',
          },
          {
            label: '绍兴',
            value: '02-6',
          },
        ]}
        onClick={() => {
          toast.info('Test')
        }}
        onChange={(value) => {
          setPickerValue(value)
          // eslint-disable-next-line
          console.log(value)
        }}
      />
    </section>
  )
}

export default IOTest
```
