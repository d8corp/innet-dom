# State Management

With `innet`, you can avoid the traditional component-based approach while still having access to state management.

State management is powered by [watch-state](https://github.com/d8corp/watch-state)

To bind state to content, use `State`, `Compute`, or a function as the content.

```tsx
//! src/index.tsx
import { innet } from 'innet'
import { handler } from '@innet/dom'
import { State } from 'watch-state'

const count = new State(0)
const increase = () => count.value++

const app = (
  <>
    <h1>
      Count: {count}
    </h1>
    <button onclick={increase}>
      Click Me
    </button>
  </>
)

innet(app, handler)
```

To bind a state and a prop use `State`, `Compute` or a function as a value of the prop.

```tsx
//! src/index.tsx
import { innet } from 'innet'
import { handler } from '@innet/dom'
import { State, Compute } from 'watch-state'

const darkMode = new State(false)
const modeClass = new Compute(() => darkMode.value ? 'dark' : 'light')

const handleChange = (e: Event) => {
  darkMode.value = e.target.checked
}

const app = (
  <div class={modeClass}>
    <h1>
      Hello World!
    </h1>
    <label>
      <input
        type="checkbox"
        onchange={handleChange}
      />
      Dark Mode
    </label>
  </div>
)

innet(app, handler)
```
