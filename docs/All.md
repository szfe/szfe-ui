# 汇总测试

```jsx
import React, {
  useState,
  createContext,
  useRef,
  useEffect,
  Fragment,
} from 'react'
import {
  Button,
  Portal,
  View,
  ScrollView,
  Modal,
  toast,
  loading,
  Input,
  Picker,
  Icon,
  Animate,
  Spin,
  RouterSwitch as TransitionSwitch,
  ReminderBar,
  Skeleton,
  Steps,
} from 'szfe-ui'

// Icon.defaultProps.prefix = ''

const Context = createContext()
const { Provider, Consumer } = Context

export default function UITest() {
  const scrollView = useRef()

  useEffect(() => {
    // console.log(scrollView.current)
  }, [])

  return (
    <Provider value={1}>
      <Modal.Station id="my-popup-station" />
      <View>
        <ScrollView
          ref={scrollView}
          className="wrapper"
          onEndReached={(done) => {
            toast.info('reached end', {
              onClose: done,
            })
          }}
        >
          <Steps
            className="steps"
            current={0}
            steps={Array(3)
              .fill('')
              .map(() => ({
                title: 'test',
              }))}
          />
          <ButtonTest />
          {/* <Portal>test</Portal> */}

          {/* <ReminderBar
            text="Test TestTest Test Test TestTest TestTest TestTestTestTest TestTestTestTest TestTest"
            animation
          ></ReminderBar> */}
          {/* <Skeleton />
          <Skeleton type="round" />
          <Spin></Spin> */}
          {/* <Spin.Page /> */}
          <PopupTest />
          <ToastTest />
          <LoadingTest />
          <IOTest />
          <br />
          <br />
          <TransitionTest />
        </ScrollView>
      </View>
    </Provider>
  )
}

function ButtonTest() {
  return (
    <Fragment>
      <section>
        <p>以下是 Button 主题测试</p>
        <div>
          <Button inline onClick={() => {}}>
            default
          </Button>
          <Button inline type="primary">
            primary
          </Button>
          <Button inline type="warn">
            warn
          </Button>
          <Button inline type="error">
            error
          </Button>
        </div>
      </section>
      <section>
        <p>以下是 Button disabled 主题测试</p>
        <div>
          <Button inline disabled>
            default
          </Button>
          <Button inline disabled type="primary">
            primary
          </Button>
          <Button inline disabled type="warn">
            warn
          </Button>
          <Button inline disabled type="error">
            error
          </Button>
        </div>
      </section>
      <section>
        <p>以下是 Button inline 尺寸测试</p>

        <div>
          <Button inline size="large">
            large
          </Button>
          <Button inline>default</Button>
          <Button inline size="small">
            small
          </Button>
        </div>
      </section>
      <section>
        <p>以下是 Button block 尺寸测试</p>

        <div>
          <Button size="large">large</Button>
          <Button>default</Button>
          <Button size="small">small</Button>
        </div>
      </section>
    </Fragment>
  )
}

function PopupTest() {
  const [isShowModal, setModalShowState] = useState(false)

  return (
    <section>
      <p>以下是 popup 测试</p>
      <Button onClick={() => setModalShowState(true)}>
        组件声明式唤起 PopupModal
      </Button>

      <Button
        onClick={() => {
          Modal.popup({
            station: 'my-popup-station', // 指定挂载驿站以保证可享用自定义上下文功能
            title: '命令式唤起 PopupModal 指定 station',
            onClose: () => {
              // console.log('onClose')
            },
            content: function renderContent({ close }) {
              return (
                <Consumer>
                  {(context) => (
                    <Button onClick={close}>
                      上下文内容: {context || 'null'}
                    </Button>
                  )}
                </Consumer>
              )
            },
          })
        }}
      >
        命令式唤起 PopupModal 指定 station
      </Button>
      <p>以下是 alert 方法测试</p>
      <Button
        onClick={() => {
          Modal.alert({
            title: '我是标题',
            content: '未指定行为的 alert',
          })
        }}
      >
        未指定行为的 alert
      </Button>
      <Button
        onClick={() => {
          Modal.alert({
            title: '我是标题',
            content: '指定了行为的 alert',
            actions: [
              {
                text: '取消',
              },
              {
                text: '确定',
                onClick: (close) => {
                  toast.info('点击了确定', {
                    onClose: close,
                  })
                },
              },
            ],
          })
        }}
      >
        指定了行为的 alert
      </Button>
      <Button
        onClick={() => {
          Modal.alert({
            title: '我是标题',
            content: '指定了行为的 alert',
            ButtonStyle: 'iOS',
            actions: [
              {
                text: '确定',
                onClick: (close) => {
                  toast.info('点击了确定', {
                    onClose: close,
                  })
                },
              },
              {
                text: '取消',
              },
            ],
          })
        }}
      >
        指定了行为的 alert（iOS）
      </Button>
      <p>以下是 show 方法测试</p>
      <Button
        onClick={() => {
          Modal.show({
            content: function renderContent({ close }) {
              return <div onClick={close}>{'我是内容'}</div>
            },
          })
        }}
      >
        默认的 show
      </Button>
      <Button
        onClick={() => {
          Modal.show({
            content: '重置样式的 show',
            resetStyle: true,
          })
        }}
      >
        重置样式的 show
      </Button>

      <Modal.Popup
        title="组件声明式唤起 PopupModal"
        visible={isShowModal}
        onClose={() => {
          setModalShowState(false)
        }}
      >
        <ul>
          {Array(100)
            .fill('')
            .map((item, idx) => (
              <li key={idx}>{idx}</li>
            ))}
        </ul>
      </Modal.Popup>
    </section>
  )
}

function ToastTest() {
  return (
    <section>
      <p>以下是 toast 测试</p>
      <Button
        onClick={() => {
          toast.info('info', {
            duration: 1,
            // className: 'test',
            onClose: () => {
              toast.info('关闭了', 2, null, false)
            },
          })
        }}
      >
        info
      </Button>
      <Button
        onClick={() => {
          toast.success('success')
        }}
      >
        success
      </Button>
      <Button
        onClick={() => {
          toast.fail('fail')
        }}
      >
        fail
      </Button>
    </section>
  )
}

function LoadingTest() {
  return (
    <section>
      <p>以下是 loading 测试</p>
      <Button
        onClick={() => {
          loading.show({
            toast: true,
            className: 'test name',
          })
        }}
      >
        loading.show
      </Button>
      <Button
        onClick={() => {
          loading.hide()
        }}
      >
        loading.hide
      </Button>
      <Button
        onClick={() => {
          loading.hide(true)
        }}
      >
        loading.hide(true) 强制关闭
      </Button>
      <Button
        onClick={() => {
          Array(3)
            .fill('')
            .forEach(() => {
              loading.show({
                toast: true,
              })
            })
        }}
      >
        loading.show 3 次
      </Button>
      <Button
        onClick={() => {
          Array(3)
            .fill('')
            .forEach(() => {
              loading.hide()
            })
        }}
      >
        loading.hide 3 次
      </Button>
    </section>
  )
}

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

function TransitionTest() {
  const [show, setShow] = useState(true)
  const [switchKey, setSwitchKey] = useState(0)
  const prevSwitchKey = useRef(switchKey)

  return (
    <section>
      <p>以下是 Transition 动画测试</p>
      <Button onClick={() => setShow((show) => !show)}>Toggle</Button>
      <div style={{ display: 'flex' }}>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <Animate.Fade in={show} unmountOnExit={false}>
            {<div>fade</div>}
          </Animate.Fade>
        </div>

        <div style={{ overflow: 'hidden', flex: 1 }}>
          <Animate.Slide in={show} unmountOnExit={false}>
            {<div>Slide(up)</div>}
          </Animate.Slide>
        </div>

        <div style={{ overflow: 'hidden', flex: 1 }}>
          <Animate.Slide.Down in={show} unmountOnExit={false}>
            {<div>Slide Down</div>}
          </Animate.Slide.Down>
        </div>
      </div>
      <div style={{ display: 'flex', margin: '10px 0' }}>
        <Icon
          type="amicon-move"
          onClick={() => {
            prevSwitchKey.current = switchKey
            setSwitchKey(switchKey - 1)
          }}
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Current Switch Key: {switchKey}
        </div>
        <Icon
          type="amicon-add1"
          onClick={() => {
            prevSwitchKey.current = switchKey
            setSwitchKey(switchKey + 1)
          }}
        />
      </div>
      <TransitionSwitch
        direction={prevSwitchKey.current < switchKey ? 'forward' : 'back'}
        animateKey={switchKey}
      >
        {switchKey}
      </TransitionSwitch>
    </section>
  )
}
```
