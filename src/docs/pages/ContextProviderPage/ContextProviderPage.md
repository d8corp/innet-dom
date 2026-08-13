# ContextProvider

| Prop            | Type                           | Description                                                     |
|-----------------|--------------------------------|-----------------------------------------------------------------|
| for [*](#)      | `Context<T>` \| `Context<T>[]` | A context or array of contexts to provide                       |
| set [*](#)      | `T` \| `T[]`                   | A value or array of values to pass to the context(s)            |
| children [*](#) | `JSX.Element`                  | Child elements that will have access to the provided context(s) |

Use `ContextProvider` from [@innet/jsx](https://www.npmjs.com/package/innet-jsx) to provide context value into children.

Modify `app.tsx`
```tsx
import { ContextProvider } from '@innet/jsx'
import { Content, color } from './Content'

export default (
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
```
