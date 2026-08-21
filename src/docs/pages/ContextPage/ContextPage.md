# Context

You can pass a value from a parent element through any children to the place you need.

```tsx
//! src/Content.tsx
import { Context, useContext } from '@innet/jsx'

export const color = new Context('blue')

export function Content () {
  const currentColor = useContext(color)

  return (
    <h1 style={{ color: currentColor }}>
      {children}
    </h1>
  )
}
```

## ContextProvider

| Prop            | Type                           | Description                                                     |
|-----------------|--------------------------------|-----------------------------------------------------------------|
| for [*](#)      | `Context<T>` \| `Context<T>[]` | A context or array of contexts to provide                       |
| set [*](#)      | `T` \| `T[]`                   | A value or array of values to pass to the context(s)            |
| children [*](#) | `JSX.Element`                  | Child elements that will have access to the provided context(s) |

Use `ContextProvider` from [@innet/jsx](https://www.npmjs.com/package/innet-jsx) to provide context value into children.

```tsx
//! src/index.tsx
import { innet } from 'innet'
import { handler } from '@innet/dom'
import { ContextProvider } from '@innet/jsx'
import { Content, color } from './Content'

const app = (
  <>
    <Content>
      Without context
    </Content>
    <ContextProvider for={color} set='red'>
      <Content>
        With context
      </Content>
    </ContextProvider>
  </>
)

innet(app, handler)
```
