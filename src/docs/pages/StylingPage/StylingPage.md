# Styling
---

First-class CSS Modules support with dynamic class composition via `style` utility.

```tsx
import { style, Style } from '@innet/dom'
import styles from './Button.scss'

const useButtonStyles = style(styles)

export interface ButtonProps extends Style {}

export function Button (props: ButtonProps) {
  const s = useButtonStyles()

  return <button class={() => s.root}>Click</button>
}
```
