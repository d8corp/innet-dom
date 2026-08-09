# Lifecycle
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
