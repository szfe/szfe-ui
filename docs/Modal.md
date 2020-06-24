# Modal

```jsx
import React, { useState, useRef, useEffect, createContext } from 'react'
import { Button, Modal, toast, loading, View, ScrollView } from 'szfe-ui'

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
        <PopupTest />
        <ToastTest />
        <LoadingTest />
      </View>
    </Provider>
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
            buttonStyle: 'iOS',
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

```