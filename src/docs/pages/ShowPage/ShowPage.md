# Show

| Prop        | Type                                         | Description                                         |
|-------------|----------------------------------------------|-----------------------------------------------------|
| when [*](#) | `State<T>` \| `Cache<T>` \| `() => T` \| `T` | Condition to determine whether to show the children |
| fallback    | `JSX.Element`                                | Element to render if the condition is not met       |
| children    | `JSX.Element`                                | Content to render when the condition is met         |

You can use `Show` component to show/hide content by state.

```tsx
import { Show } from '@innet/dom'
import { State } from 'watch-state'

const show = new State(true)

export default (
  <Show when={show}>
    <button
      onclick={() => {
        show.value = false
      }}>
      Click Me
    </button>
  </Show>
)
```
