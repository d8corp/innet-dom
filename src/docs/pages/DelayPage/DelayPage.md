# Delay

| Prop     | Type                  | Description                                        |
|----------|-----------------------|----------------------------------------------------|
| show     | `number`              | Delay before showing the content (in milliseconds) |
| hide     | `number`              | Delay before hiding the content (in milliseconds)  |
| ref      | `Ref<State<boolean>>` | Reference to the visibility state                  |
| children | `JSX.Element`         | Content to render with delay                       |

You can show or hide elements with a delay.

```tsx
import { Delay } from '@innet/dom'

export function Content () {
  return (
    <Delay show={1000}>
      Works
      <Delay show={1000}>
        fine!
      </Delay>
    </Delay>
  )
}
```

## useHidden
---

You can react to elements being removed.

```tsx
//! src/Content.tsx
import { useHidden } from '@innet/dom'

export function Content () {
  const hidden = useHidden()

  return () => hidden.value ? 'hidden' : 'shown'
}
```

```tsx
//! src/app.tsx
import { Delay } from '@innet/dom'
import { State } from 'watch-state'

const show = new State(true)

const handleClick = () => {
  show.value = false
}

export default () => show.value && (
  <Delay hide={1000}>
    <Content />
    <button onclick={handleClick}>
      Hide
    </button>
  </Delay>
)
```

## ref
---

You can use `ref` to access the hidden state.

```tsx
//! src/Content.tsx
import { Delay } from '@innet/dom'

export function Content () {
  const hidden = new Ref()

  return (
    <Delay ref={hidden} hide={1000}>
      {() => hidden.value.value ? 'hidden' : 'shown'}
    </Delay>
  )
}
```

```tsx
//! src/app.tsx
import { State } from 'watch-state'

const show = new State(true)

const handleClick = () => {
  show.value = false
}

export default () => show.value && (
  <>
    <Content />
    <button onclick={handleClick}>
      Hide
    </button>
  </>
)
```
