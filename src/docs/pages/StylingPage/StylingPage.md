# Styling

You can style components with `style` function.
The function returns `useStyle` hook.
Use this hook inside a component to get [html-classes](https://www.npmjs.com/package/html-classes) features on `class` prop.

```tsx
//! src/Content.tsx
import { style, Style } from '@innet/dom'

import styles from './Content.scss'
// or you can use an object like
// { root: '...', header: '...', content: '...' }

const useContentStyles = style(styles)

export interface ContentProps extends Style {}

export function Content (props: ContentProps) {
  const styles = useContentStyles()

  return (
    <div class={() => styles.root}>
      <header class={() => styles.header}>
        header
      </header>
      <main class={() => styles.content}>
        content
      </main>
    </div>
  )
}
```

Then you can use `class` prop to define classes.

```typescript jsx
//! src/index.tsx
import { innet } from 'innet'
import { handler } from '@innet/dom'
import { State } from 'watch-state'

const show = new State(true)

const handleClick = () => {
  show.value = !show.value
}

const app = (
  <>
    <Content
      class={{
        root: 'root',
        header: ['header', 'another-class'],
        content: [
          'content',
          () => show.value && 'show'
        ],
      }}
    />
    <button
      onclick={handleClick}>
      Hide
    </button>
  </>
)

innet(app, handler)
```
