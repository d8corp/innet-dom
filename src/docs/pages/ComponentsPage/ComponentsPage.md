# Components

A component is a function. You can use it as a JSX element.

```tsx
//! src/Content.tsx
export const Content = () => (
  <h1>
    Hello World!
  </h1>
)
```

Then you can use it as JSX element.

```tsx
//! src/index.tsx
import { innet } from 'innet'
import { handler } from '@innet/dom'
import { Content } from './Content'

innet(<Content />, handler)
```

## Props
---

Each component receives a single argument: an object containing its `props`.

```tsx
//! src/Content.tsx
interface ContentProps {
  color: string
}

export function Content ({ color }: ContentProps) {
  return (
    <p style={{ color }}>
      Hello World!
    </p>
  )
}
```

You should pass the `color` prop when using the component.

```tsx
//! src/index.tsx
import { innet } from 'innet'
import { handler } from '@innet/dom'
import { Content } from './Content'

innet(<Content color='red' />, handler)
```

## Children
---

Component props can include a `children` prop.

```tsx
//! src/Content.tsx
import { ChildrenProps } from '@innet/dom'

export function Content ({ children }: ChildrenProps) {
  return <h1>{children}!</h1>
}
```

You can pass `children` as content inside the component.

```tsx
//! src/index.tsx
import { innet } from 'innet'
import { handler } from '@innet/dom'
import { Content } from './Content'

innet(<Content color='red'>Hello</Content>, handler)
```

## Return
---

A component can return:

```tsx
//! `string`, `number` - render as text node
const Test1 = () => 123
const Test2 = () => '123'
```

```tsx
//! `null`, `undefined`, `boolean`, `symbol` - ignore
const Test1 = () => null
const Test2 = () => {}
const Test3 = () => true
const Test4 = () => Symbol()
```

  ```tsx
//! DOM Element - put in the DOM
const Test = () => document.createElement('div')
```

```tsx
//! JSX Fragment, `array` - render content
const Test1 = () => <>content</>
const Test2 = () => ['content']
```

```tsx
//! JSX Element - put in the DOM
const Test1 = () => <div>content</div>
const Test2 = () => <br />
```

```tsx
//! function - observable children
const state = new State()
const Test1 = () => () => state.value
const Test2 = () => state
const Test3 = () => <>{() => state.value}</>
```
  

## Async Component
---

Innet supports async components, you can simplify previous code.

```tsx
//! src/Content.tsx
async function Content () {
  const { text } = await fetch('...').then(e => e.json())

  return <div>{text}</div>
}
```

[innetjs](https://www.npmjs.com/package/innetjs) helps to make code splitting.

```tsx
//! src/Content.tsx
async function Content () {
  const { Test } = await import('./Test')

  return (
    <div>
      <Test />
    </div>
  )
}
```

```tsx
//! src/Test.tsx
export const Test = () => (
  <div>
    Test success!
  </div>
)
```

While it's loading nothing can be shown.
If you want to show something, use `Generic Async Component`.

## Generic Async Component
---

Simply add an asterisk and use `yield` instead of `return`.

```tsx
//! src/Content.tsx
async function * Content () {
  yield 'Loading...'

  const { text } = await fetch('...').then(e => e.json())

  yield <div>{text}</div>
}
```

## Generic Component
---

It can be useful when you want to do something after a content deployed.

```tsx
//! src/Content.tsx
function * Content () {
  yield (
    <div id='test'>
      Hello World!
    </div>
  )

  console.log(document.getElementById('test'))
}
```

You can use `queueMicrotask` instead of a generic component, but there are a small difference:

`queueMicrotask` runs after whole content is available and generic component runs right after the content of the component rendered.

```tsx
//! src/Content.tsx
function * A () {
  queueMicrotask(() => {
    console.log(
      'queueMicrotask A',
      document.getElementById('a'),
      document.getElementById('b'),
    )
  })

  yield <span id='a' />

  console.log(
    'generic A',
    document.getElementById('a'),
    document.getElementById('b'),
  )
}

function * B () {
  queueMicrotask(() => {
    console.log(
      'queueMicrotask B',
      document.getElementById('a'),
      document.getElementById('b'),
    )
  })

  yield <span id='b' />

  console.log(
    'generic B',
    document.getElementById('a'),
    document.getElementById('b'),
  )
}

function Content () {
  return (
    <>
      <A />
      <B />
    </>
  )
}
```

You get the next output:

```
generic A <span id="a"></span> null
generic B <span id="a"></span> <span id="b"></span>
queueMicrotask A <span id="a"></span> <span id="b"></span>
queueMicrotask B <span id="a"></span> <span id="b"></span>
```

## Lifecycle
---

Simple, predictable lifecycle hooks. Components render once — effects run inline.

```tsx
//! Counter.tsx
import { State, onDestroy } from 'watch-state'
import { onMounted } from '@innet/dom'

export function Counter () {
  const count = new State(0)
  const timer = setInterval(() => count.value++, 1000)

  onDestroy(() => clearInterval(timer))
  onMounted(() => console.log('Mounted!'))

  return () => count.value
}
```
