# Router

| Prop           | Type                     | Description                                          |
|----------------|--------------------------|------------------------------------------------------|
| routing [*](#) | `StateProp<Routing>`     | Routing object that defines the route structure      |
| permissions    | `StateProp<Set<string>>` | Set of permissions required to access certain routes |

You can render content based on the current URL.

Use `component` to specify the component for a route.
Use `path` to define URL path segments.
Use `index` to mark a route as the endpoint for a given path.

```tsx
import { Router, createRouting } from '@innet/dom'

const routing = createRouting([
  { index: true, component: () => 'Home page' },
  {
    index: true,
    path: 'settings',
    component: () => 'Settings Index',
  },
  {
    path: 'settings',
    component: () => 'Settings Rest',
  },
  { component: () => 'Not Found' }
])

export const Content = () => (
  <Router routing={routing} />
)
```

The following routes will be available:

`/` - Home page  
`/settings` - Settings Index  
`/settings/foo` - Settings Rest
`/foo` - Not Found

You can split path segments using `/`

```tsx
import { Router, createRouting } from '@innet/dom'

const routing = createRouting([
  { index: true, component: () => 'Home page' },
  {
    index: true,
    path: 'settings',
    component: () => 'Settings Index',
  },
  {
    index: true,
    path: 'settings/account',
    component: () => 'Account Settings',
  },
  {
    index: true,
    path: 'settings/notifications',
    component: () => 'Notification Settings',
  },
  { component: () => 'Not Found' }
])

export const Content = () => (
  <Router routing={routing} />
)
```

The following routes will be available:

`/` - Home page  
`/settings` - Settings Index  
`/settings/account` - Account Settings  
`/settings/notifications` - Notification Settings  
`/settings/foo` - Not Found  
`/foo` - Not Found

## Layout
---

You can group routes using `children`. The `component` field on a group defines a layout for its child pages.

```tsx
import { Router, createRouting, ChildrenProps } from '@innet/dom'

const Home = () => 'Home Page'
const About = () => 'About Page'
const Settings = () => 'Settings Page'
const NotFound = () => 'NotFound Page'

const MainLayout = (props: ChildrenProps) => <article>{props.children}</article>
const SecondLayout = (props: ChildrenProps) => <div>{props.children}</div>

const routing = createRouting([
  {
    component: MainLayout,
    children: [
      { index: true, component: Home },
      { index: true, path: 'about', component: About },
      { component: NotFound },
    ],
  },
  {
    component: SecondLayout,
    children: [
      { index: true, path: 'settings', component: Settings },
    ],
  },
])

export const Content = () => (
  <Router routing={routing} />
)
```

The following routes will be available:

`/` - `<article>Home Page</article>`  
`/about` - `<article>About Page</article>`  
`/settings` - `<div>Settings Page</div>`  
`/settings/foo` - `<article>NotFound Page</article>`  
`/foo` - `<article>NotFound Page</article>`

## List of Segments
---

You can separate available segments with `|`.

```tsx
import { Router, createRouting } from '@innet/dom'

const Home = () => 'Home Page'
const FooBar = () => 'FooBar Page'
const NotFound = () => 'NotFound Page'

const routing = createRouting([
  { index: true, component: Home },
  { path: 'foo|bar', component: FooBar },
  { component: NotFound },
])

export const Content = () => (
  <Router routing={routing} />
)
```

`/` - Home page  
`/foo` - FooBar Page  
`/bar` - FooBar Page  
`/baz` - NotFound Page

## Optional Segment
---

You can add `?` at the end of a segment to make it optional.

```tsx
import { Router, createRouting, ChildrenProps } from '@innet/dom'

const Home = () => 'Home Page'
const Settings = ({ children }: ChildrenProps) => <div>{children}</div>
const MainTab = () => 'Main Tab'
const AccountTab = () => 'Account Tab'
const NotificationsTab = () => 'Notifications Tab'
const NotFound = () => 'NotFound Page'

const routing = createRouting([
  { index: true, component: Home },
  { path: 'settings', component: Settings, children: [
    { index: true, path: 'main?', component: MainTab },
    { index: true, path: 'account', component: AccountTab },
    { index: true, path: 'notifications', component: NotificationsTab },
  ]},
  { component: NotFound },
])

export const Content = () => (
  <Router routing={routing} />
)
```

`/` - Home page  
`/settings` - `<div>Main Tab</div>`  
`/settings/main` - `<div>Main Tab</div>`  
`/settings/account` - `<div>Account Tab</div>`  
`/settings/notifications` - `<div>Notifications Tab</div>`  
`/settings/foo` - NotFound Page  
`/foo` - NotFound Page

## Permissions
---

```tsx
import { Router, createRouting } from '@innet/dom'
import { State } from 'watch-state'

const Home = () => 'Home Page'
const Settings = () => 'Settings Page'
const NotFound = () => 'NotFound Page'

const permissions = new State(new Set<string>())

const routing = createRouting([
  { index: true, component: Home },
  {
    path: 'settings',
    permissions: ['postlogin'],
    component: Settings,
  },
  { component: NotFound },
])

export const Content = () => (
  <Router routing={routing} permissions={permissions} />
)
```

`/` - Home page  
`/settings` - NotFound Page  
`/foo` - NotFound Page

Set permissions

```tsx
permissions.value.add('postlogin')
permissions.update()
```

`/` - Home page  
`/settings` - Settings Page  
`/foo` - NotFound Page

## Lazy Loading
---

You can use `lazy` to load pages and layouts asynchronously, enabling code-splitting by pages and layouts.

You can use `fallback` field to render a glimmer while pages or layouts are loading.
You can use `childrenFallback` field to set `fallback` for children elements.

```tsx
import { Router, createRouting, lazy } from '@innet/dom'

const routing = createRouting([
  {
    childrenFallback: 'Loading...',
    children: [
      {
        index: true,
        component: lazy(() => import('./Home')),
        fallback: 'Home Loading...',
      },
      {
        path: 'settings',
        component: lazy(() => import('./Settings')),
      },
      { component: lazy(() => import('./NotFound')) },
    ],
  }
])

export const Content = () => (
  <Router routing={routing} />
)
```

## Params
---

Prefix a path segment with `:` to capture its value as a param.

```tsx
import { Router, createRouting, useParam } from '@innet/dom'

const Home = () => 'Home Page'
const Products = () => 'Products Page'
const NotFound = () => 'NotFound Page'

const Product = () => {
  const productId = useParam('productId')

  return <>Product: {productId}</>
}

const routing = createRouting([
  {
    index: true,
    component: Home,
  },
  {
    path: 'products',
    children: [
      {
        index: true,
        component: Products,
      },
      {
        path: ':productId',
        component: Product,
      },
    ],
  },
  { component: NotFound },
])

export const Content = () => (
  <Router routing={routing} />
)
```

`/` - Home page  
`/products` - Products Page  
`/products/123` - Product: 123  
`/foo` - NotFound Page

## useParam
---

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

## useParams
---

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
