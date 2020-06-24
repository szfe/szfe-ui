# Animate

```jsx
import React, { useState, useRef } from 'react'
import { Animate, Icon, Button } from 'szfe-ui'

export default function TransitionTest() {
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
      <Animate.Switch
        direction={prevSwitchKey.current < switchKey ? 'forward' : 'back'}
        animateKey={switchKey}
      >
        {switchKey}
      </Animate.Switch>
    </section>
  )
}

```