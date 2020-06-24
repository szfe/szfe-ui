# Button

```jsx
import React from 'react'
import { Button } from 'szfe-ui'

export default () => (
  <>
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
  </>
)
```