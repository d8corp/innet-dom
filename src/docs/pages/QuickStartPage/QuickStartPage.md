# Quick Start
---

Create your first reactive component in seconds.
No virtual DOM — just direct, fine-grained updates.

```tsx
//!app.tsx
import { State } from'watch-state'

const count = new State(0)

export default (
  <>
    <h3>Count: {count}</h3>
    <button onclick={() => count.value++}>
      Click Me
    </button>
  </>
)
```

> #### Fine-grained reactivity
> When `count.value` changes, only the text node updates. No component re-renders, no virtual DOM diffing.

