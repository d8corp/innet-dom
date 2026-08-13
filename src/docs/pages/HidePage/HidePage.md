# Hide

| Prop        | Type                                         | Description                                         |
|-------------|----------------------------------------------|-----------------------------------------------------|
| when [*](#) | `State<T>` \| `Cache<T>` \| `() => T` \| `T` | Condition to determine whether to hide the children |
| fallback    | `JSX.Element`                                | Element to render if the condition is met           |
| children    | `JSX.Element`                                | Content to render when the condition is not met     |

You can use `Hide` component to show/hide content by state.

```tsx
import { Hide } from '@innet/dom'
import { State } from 'watch-state'

const isHidden = new State(false)

export default (
  <Hide when={isHidden}>
    <button
      onclick={() => {
        isHidden.value = true
      }}>
      Click Me
    </button>
  </Hide>
)
```
