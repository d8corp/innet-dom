# useParam

You can get a route param by `useParam`.

```tsx
import { Router, createRouting, useParam } from '@innet/dom'

const UserPage = () => {
  const userId = useParam('userId')
  
  return <div>{userId}</div>
}

const routing = createRouting([
  { index: true, component: () => 'Home page' },
  {
    index: true,
    path: 'user/:userId',
    component: UserPage,
  },
  { component: () => 'Not Found' }
])

export const Content = () => (
  <Router routing={routing}/>
)
```

`/` - Home page  
`/user/123` - `<div>123</div>`   
`/user` - Not Found

You can use square brackets and `|` to specify allowed values for a param.
You can use `?` to set optional param.

```tsx
import { Router, createRouting, useParam } from '@innet/dom'

const Home = () => {
  const lang = useParam('lang')
  
  return <>Home: {lang}</>
}

const About = () => {
  const lang = useParam('lang')
  
  return <>About: {lang}</>
}

const NotFound = () => 'NotFound Page'

const routing = createRouting([
  {
    path: ':lang[en|ru]?',
    children: [
      { index: true, component: Home },
      { index: true, path: 'about', component: About },
    ]
  },
  { component: NotFound },
])

export const Content = () => (
  <Router routing={routing} />
)
```

`/` - Home:  
`/en` - Home: en  
`/ru` - Home: ru  
`/about` - About:  
`/en/about` - About: en  
`/ru/about` - About: ru  
`/de/about` - Not Found  
`/de` - Not Found
