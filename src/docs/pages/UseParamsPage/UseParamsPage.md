# useParams

You can get all route params by `useParams`.

```tsx
import { Router, createRouting, ChildrenProps, useParams } from '@innet/dom'

const UserPage = (props: ChildrenProps) => {
  const params = useParams()
  
  return <div>{() => params.value.userId}</div>
}

const routing = createRouting([
  {index: true, component: () => 'Home page'},
  {
    index: true,
    path: 'user/:userId',
    component: UserPage,
  },
  {component: () => 'Not Found'}
])

export const Content = () => (
  <Router routing={routing}/>
)
```

`/` - Home page  
`/user/123` - `<div>123</div>`   
`/user` - Not Found
