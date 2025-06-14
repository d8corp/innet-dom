
<a href="https://www.npmjs.com/package/innet">
  <img src="https://raw.githubusercontent.com/d8corp/innet/main/logo.svg" align="left" width="90" height="90" alt="InnetJs logo by Mikhail Lysikov">
</a>

# &nbsp; @innet/dom

&nbsp;

[![NPM](https://img.shields.io/npm/v/@innet/dom.svg)](https://www.npmjs.com/package/@innet/dom)
[![downloads](https://img.shields.io/npm/dm/@innet/dom.svg)](https://www.npmtrends.com/@innet/dom)
[![license](https://img.shields.io/github/actions/workflow/status/d8corp/innet-dom/node.js.yml?branch=v1&label=tests
)](https://github.com/d8corp/innet-dom/actions/workflows/node.js.yml)
[![changelog](https://img.shields.io/badge/Changelog-⋮-brightgreen)](https://changelogs.xyz/@innet/dom)
[![license](https://img.shields.io/npm/l/@innet/dom)](https://github.com/d8corp/innet-dom/blob/main/LICENSE)

## Overview
`@innet/dom` is a lightweight and reactive frontend framework built on top of [innet](https://www.npmjs.com/package/innet). It provides a simple, JSX-based API for building highly performant web applications with fine-grained reactivity and minimal boilerplate.

### Why Use `@innet/dom`?
`@innet/dom` offers a declarative and reactive approach to UI development without the overhead of virtual DOM diffing. It enables developers to write simple, composable components with direct DOM manipulation, resulting in faster rendering and smaller bundle sizes compared to traditional frameworks.

Key features include:
- JSX support with full TypeScript integration
- Fine-grained reactivity powered by [watch-state](https://github.com/d8corp/watch-state)
- Built-in routing with flexible route definitions and permissions
- Support for async components and code splitting
- Lifecycle hooks for mounting and cleanup
- Context API for dependency injection and state sharing
- Utility components like Portal, Show, Hide, and Delay for common UI patterns
- Seamless integration with CSS Modules and styling utilities

[![stars](https://img.shields.io/github/stars/d8corp/innet-dom?style=social)](https://github.com/d8corp/innet-dom/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/innet-dom?style=social)](https://github.com/d8corp/innet-dom/watchers)

## Index

<sup>[Install](#install) • [Handler](#handler) • [JSX](#jsx) • [State Management](#state-management) • [style](#style)</sup>

<sup>**[Components](#components)**</sup>  
<sup>[Portal](#portal) • [ContextProvider](#contextprovider) • [Show](#show) • [Hide](#hide) • [For](#for) • [Router](#router) • [Link](#link) • [Delay](#delay)</sup>

<sup>**[Life Cycle](#life-cycle)**</sup>  
<sup>[onDestroy](#ondestroy) • [onMounted](#onmounted)</sup>

<sup>**[Hooks](#hooks)**</sup>  
<sup>[useParam](#useparam) • [useParams](#useparams) • [useParent](#useparent)</sup>

<sup>**Utils**</sup>  
<sup>[Ref](#ref) • [Context](#context)</sup>

## Install
###### [🏠︎](#index) / Install

To start developing an `innet-dom` application, use [innetjs](https://www.npmjs.com/package/innetjs):

```shell
npx innetjs init my-app -t fe
```
*Replace my-app with your working folder name*

Go into the `my-app` directory and check `README.md`

## Handler
###### [🏠︎](#index) / Handler

Use the `dom` handler to run the application.

Clear the `src` folder and create `index.ts` inside.
```typescript
import innet from 'innet'
import dom from '@innet/dom'

import app from './app'

innet(app, dom)
```

## JSX
###### [🏠︎](#index) / JSX

You can use XML-like syntax (JSX) to create and insert elements into the DOM.
Learn more about JSX [here](https://www.typescriptlang.org/docs/handbook/jsx.html).

Create `app.tsx` in `src` folder.
```typescript jsx
export default (
  <h1>
    Hello World!
  </h1>
)
```

Everything you provide as the first argument to the `innet` function (with the `dom` handler) will be rendered inside the body element.

## Portal
###### [🏠︎](#index) / [Components](#components) / Portal

| Prop     | Type                                   | Description                                               |
|----------|----------------------------------------|-----------------------------------------------------------|
| parent * | `TargetElements` \| `DocumentFragment` | The element where the child content will be rendered      |
| children | `JSX.Element`                          | The content to render inside the specified parent element |

If you want to render content into an element other than `body`, use the `Portal` [component](#components).

For example, you can modify `index.html` in `public` folder.
```html
<!doctype html>
<html lang="en">
<head ... >
<body>
  <div id="app"></div>
  <!-- add this ^ -->
</body>
</html>
```

And modify `app.tsx`

```typescript jsx
import { Portal } from '@innet/dom'

const app = document.getElementById('app')

export default (
  <Portal parent={app}>
    <h1>
      Hello World!
    </h1>
  </Portal>
)
```

You can use `Portal` anywhere inside your app.

Modify `app.tsx`
```typescript jsx
import { Portal } from '@innet/dom'

const app = document.getElementById('app')
const myElement = document.createElement('div')

export default (
  <Portal parent={app}>
    <h1>
      Hello World!
    </h1>
    <Portal parent={myElement}>
      This is content of myElement
    </Portal>
  </Portal>
)
```

`myElement` should contain `This is content of myElement` and `app` should contain the following code.
```html
<h1>
  Hello World!
</h1>
```

## State Management
###### [🏠︎](#index) / State Management

With `innet`, you can avoid the traditional component-based approach while still having access to state management.

State management is powered by [watch-state](https://github.com/d8corp/watch-state)

To bind state to content, use `State`, `Cache`, or a function as the content.

Turn back `index.html` and modify `app.tsx`
```typescript jsx
import { State } from 'watch-state'

const count = new State(0)

const increase = () => {
  count.value++
}

export default (
  <>
    <h1>
      Count: {count}
    </h1>
    <button onclick={increase}>
      Click Me
    </button>
  </>
)
```

To bind a state and a prop use `State`, `Cache` or a function as a value of the prop.

Modify `app.tsx`
```typescript jsx
import { State } from 'watch-state'

const darkMode = new State(false)

const handleChange = (e: Event) => {
  darkMode.value = e.target.checked
}

export default (
  <div class={() => darkMode.value ? 'dark' : 'light'}>
    <h1>
      Hello World!
    </h1>
    <label>
      <input
        type="checkbox"
        onchange={handleChange}
      />
      Dark Mode
    </label>
  </div>
)
```

## Components

###### [🏠︎](#index) / Components
<sup>[Life Cycle](#life-cycle)</sup>

<sup>**Component params**</sup>  
<sup>[props](#props) • [children](#children) • [return](#return)</sup>

<sup>**Component types**</sup>   
<sup>[Async Components](#async-component) • [Generic Async Component](#generic-async-component) • [Generic Component](#generic-component)</sup>   
 
<sup>**Default Components**</sup>   
<sup>[Portal](#portal) • [ContextProvider](#contextprovider) • [Show](#show) • [Hide](#hide) • [For](#for) • [Router](#router) • [Link](#link) • [Delay](#delay)</sup> 

A component is a function. You can use it as a JSX element.

Create `Content.tsx`
```typescript jsx
export const Content = () => (
  <h1>
    Hello World!
  </h1>
)
```

Modify `app.tsx`
```typescript jsx
import { Content } from './Content'

export default (
  <Content />
)
```

### Props
###### [🏠︎](#index) / [Components](#components) / Props

Each component receives a single argument: an object containing its `props`.

Modify `Content.tsx`
```typescript jsx
export function Content ({ color }) {
  return (
    <h1 style={{ color }}>
      Hello World!
    </h1>
  )
}
```

You should pass the `color` prop when using the component.

Modify `app.tsx`
```typescript jsx
import { Content } from './Content'

export default (
  <Content color='red' />
)
```

### Children
###### [🏠︎](#index) / [Components](#components) / Children

Component props can include a `children` prop.

Modify `Content.tsx`
```typescript jsx
export function Content ({ children }) {
  return <h1>{children}</h1>
}
```

You can pass `children` as content inside the component.

Modify `app.tsx`
```typescript jsx
import { Content } from './Content'

export default (
  <Content>Content</Content>
)
```

### Return
###### [🏠︎](#index) / [Components](#components) / Return

A component can return:

- `string`, `number` - render as text node
  ```typescript jsx
  const Test1 = () => 123
  const Test2 = () => '123'
  ```
- `null`, `undefined`, `boolean`, `symbol` - ignore
  ```typescript jsx
  const Test1 = () => null
  const Test2 = () => {}
  const Test3 = () => true
  const Test4 = () => Symbol()
  ```
- DOM Element - put in the DOM
  ```typescript jsx
  const Test = () => document.createElement('div')
  ```
- JSX Fragment, `array` - render content
  ```typescript jsx
  const Test1 = () => <>content</>
  const Test2 = () => ['content']
  ```
- JSX Element - put in the DOM
  ```typescript jsx
  const Test1 = () => <div>content</div>
  const Test2 = () => <br />
  ```
- function - observable children
  ```typescript jsx
  const state = new State()
  const Test1 = () => () => state.value
  const Test2 = () => state
  const Test3 = () => <>{() => state.value}</>
  ```

### Async Component
###### [🏠︎](#index) / [Components](#components) / Async Component

Innet supports async components, you can simplify previous code.
```typescript jsx
async function Content () {
  const { text } = await fetch('...').then(e => e.json())

  return <div>{text}</div>
}
```

[innetjs](https://www.npmjs.com/package/innetjs) helps to make code splitting.
```typescript jsx
async function Content () {
  const { Test } = await import('./Test')

  return (
    <div>
      <Test />
    </div>
  )
}
```

`Test.tsx`
```typescript jsx
export const Test = () => (
  <div>
    Test success!
  </div>
)
```

While it's loading nothing can be shown.
If you want to show something, use `Generic Async Component`.

### Generic Async Component
###### [🏠︎](#index) / [Components](#components) / Generic Async Component

Simply add an asterisk and use `yield` instead of `return`.
```typescript jsx
async function * Content () {
  yield 'Loading...'

  const { text } = await fetch('...').then(e => e.json())

  yield <div>{text}</div>
}
```

### Generic Component
###### [🏠︎](#index) / [Components](#components) / Generic Component

It can be useful when you want to do something after a content deployed.

```typescript jsx
function * Content () {
  yield (
    <div id='test'>
      Hello World!
    </div>
  )

  console.log(document.getElementById('test'))
}
```

You can use `queueMicrotask` instead of a generic component, but there are a small difference:

`queueMicrotask` runs after whole content is available and generic component runs right after the content of the component rendered.
```typescript jsx
function * A () {
  queueMicrotask(() => {
    console.log(
      'queueMicrotask A',
      document.getElementById('a'),
      document.getElementById('b'),
    )
  })

  yield <span id='a' />

  console.log(
    'generic A',
    document.getElementById('a'),
    document.getElementById('b'),
  )
}

function * B () {
  queueMicrotask(() => {
    console.log(
      'queueMicrotask B',
      document.getElementById('a'),
      document.getElementById('b'),
    )
  })

  yield <span id='b' />

  console.log(
    'generic B',
    document.getElementById('a'),
    document.getElementById('b'),
  )
}

function Content () {
  return (
    <>
      <A />
      <B />
    </>
  )
}
```

You get the next output:

```
generic A <span id="a"></span> null
generic B <span id="a"></span> <span id="b"></span>
queueMicrotask A <span id="a"></span> <span id="b"></span>
queueMicrotask B <span id="a"></span> <span id="b"></span>
```

### Life Cycle
###### [🏠︎](#index) / [Components](#components) / Life Cycle

<sup>[onDestroy](#ondestroy) • [onMounted](#onmounted)</sup>

Each component renders only once.

There are three lifecycle stages:
- **render** (DOM elements are not created)
- **mounted** (DOM elements are created)
- **destroy** (elements will be removed from the DOM)

Because of a component renders only once you can have effects right inside the component function.
```typescript jsx
import { State } from 'watch-state'

function Content () {
  const state = new State()

  fetch('...')
    .then(e => e.json())
    .then(data => {
      state.value = data.text
    })

  return (
    <div>
      {state}
    </div>
  )
}
```

#### onDestroy
###### [🏠︎](#index) / [Components](#components) / [Life Cycle](#life-cycle) / onDestroy

You can subscribe on destroy of a component by `onDestroy` from `watch-state`

Modify `Content.tsx`

```typescript jsx
import { State, onDestroy } from 'watch-state'

export function Content() {
  const count = new State(0)
  // create a state

  const timer = setInterval(() => {
    count.value++
  }, 1000)
  // increase the state each second

  onDestroy(() => clearInterval(timer))
  // stop timer on destroy

  return () => count.value
  // return observable value
}
```

And modify `app.tsx`
```typescript jsx
import { State } from 'watch-state'
import { Show } from '@innet/dom'
import { Content } from './Content'

const show = new State(true)

const handleChange = (e: Event) => {
  show.value = e.target.checked
}

export default (
  <>
    <Show when={show}>
      <Content />
    </Show>
    <input
      type="checkbox"
      checked
      onchange={handleChange}
    />
  </>
)
```

#### onMounted
###### [🏠︎](#index) / [Components](#components) / [Life Cycle](#life-cycle) / onMounted

You can use `onMounted` to do something after end of rendering.

Modify `Content.tsx`

```typescript jsx
import { onMounted, Ref } from '@innet/dom'
import { State, onDestroy } from 'watch-state'

export function Content() {
  const width = new State(0)
  const ref = new Ref<HTMLDivElement>()

  onMounted(() => {
    console.log(ref.value.clientWidth)
  })

  return <div ref={ref}>Hello world</div>
}
```

## Ref
###### [🏠︎](#index) / Ref

`Ref` helps to get an HTML element.
```typescript jsx
import { Ref } from '@innet/dom'

function * Content () {
  const wrapper = new Ref<HTMLDivElement>()
  
  yield (
    <div ref={wrapper}>
      Hello World!
    </div>
  )

  console.log(wrapper.value)
}
```

## Context
###### [🏠︎](#index) / Context

You can pass a value from a parent element through any children to the place you need.

Modify `Content.tsx`
```typescript jsx
import { Context, useContext } from '@innet/dom'

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
###### [🏠︎](#index) / [Components](#components) / ContextProvider

| Prop       | Type                           | Description                                                     |
|------------|--------------------------------|-----------------------------------------------------------------|
| for *      | `Context<T>` \| `Context<T>[]` | A context or array of contexts to provide                       |
| set *      | `T` \| `T[]`                   | A value or array of values to pass to the context(s)            |
| children * | `JSX.Element`                  | Child elements that will have access to the provided context(s) |

Use `ContextProvider` from [@innet/jsx](https://www.npmjs.com/package/innet-jsx) to provide context value into children.

Modify `app.tsx`
```typescript jsx
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

## Show
###### [🏠︎](#index) / [Components](#components) / Show

| Prop     | Type                                         | Description                                         |
|----------|----------------------------------------------|-----------------------------------------------------|
| when *   | `State<T>` \| `Cache<T>` \| `() => T` \| `T` | Condition to determine whether to show the children |
| fallback | `JSX.Element`                                | Element to render if the condition is not met       |
| children | `JSX.Element`                                | Content to render when the condition is met         |

You can use `Show` component to show/hide content by state.

```typescript jsx
import { Show } from '@innet/dom'
import { State } from 'watch-state'

const show = new State(true)

export default (
  <Show when={show}>
    <button
      onclick={() => {
        show.value = false
      }}>
      Click Me
    </button>
  </Show>
)
```

## Hide
###### [🏠︎](#index) / [Components](#components) / Hide

| Prop     | Type                                         | Description                                         |
|----------|----------------------------------------------|-----------------------------------------------------|
| when *   | `State<T>` \| `Cache<T>` \| `() => T` \| `T` | Condition to determine whether to hide the children |
| fallback | `JSX.Element`                                | Element to render if the condition is met           |
| children | `JSX.Element`                                | Content to render when the condition is not met     |

You can use `Hide` component to show/hide content by state.

```typescript jsx
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

> [!NOTE]  
> `when` can be: `State` | `Cache` | `() => any` | `any`

## For
###### [🏠︎](#index) / [Components](#components) / For

| Prop     | Type                                                    | Description                                               |
|----------|---------------------------------------------------------|-----------------------------------------------------------|
| of *     | `StateProp<Iterable<T>>`                                | The collection to iterate over                            |
| key      | `keyof T` \| `(item: T) => any`                         | Unique key for each item, used for DOM optimization       |
| children | `(item: State<T>, index: State<number>) => JSX.Element` | Function that returns JSX for each item in the collection |

You can use `map` method of an array to put view on data.
```typescript jsx
const names = ['Mike', 'Alex', 'Dan']

export default (
  <ul>
    {names.map(name => (
      <li>
        {name}
      </li>
    ))}
  </ul>
)
```

It's ok for static data, but if you use a state, it's better to use `For` component.
```typescript jsx
import { For } from '@innet/dom'
import { State } from 'watch-state'

const names = new State(['Mike', 'Alex', 'Dan'])

export default (
  <ul>
    <For of={names}>
      {(name, index) => (
        <li>
          #{index}:
          {name}
        </li>
      )}
    </For>
  </ul>
)
```

Use `key` property to improve `DOM` changes when you use an array of objects with some uniq field, like id.

```typescript jsx
import { For } from '@innet/dom'
import { State } from 'watch-state'

const users = new State([
  { id: 1, text: 'test1' },
  { id: 2, text: 'test2' },
  { id: 3, text: 'test3' },
])

export default (
  <ul>
    <For of={users} key='id'>
      {(user, index) => (
        <li>
          #{index}:
          {() => user.value.name}
        </li>
      )}
    </For>
  </ul>
)
```

## Router
###### [🏠︎](#index) / [Components](#components) / Router

<sup>[Layout](#layout) • [List of Segments](#list-of-segments) • [Optional Segment](#optional-segment) • [Permissions](#permissions) • [Lazy Loading](#lazy-loading) • [Params](#params)</sup>

<sup>**Hooks**</sup>  
<sup>[useParam](#useparam) • [useParams](#useparams)</sup>

| Prop        | Type                     | Description                                          |
|-------------|--------------------------|------------------------------------------------------|
| routing *   | `StateProp<Routing>`     | Routing object that defines the route structure      |
| permissions | `StateProp<Set<string>>` | Set of permissions required to access certain routes |

You can render content based on the current URL.

Use `component` to specify the component for a route.
Use `path` to define URL path segments.
Use `index` to mark a route as the endpoint for a given path.

```typescript jsx
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

```typescript jsx
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

### Layout
###### [🏠︎](#index) / [Components](#components) / [Router](#router) / Layout

You can group routes using `children`. The `component` field on a group defines a layout for its child pages.

```typescript jsx
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

### List of Segments
###### [🏠︎](#index) / [Components](#components) / [Router](#router) / List of Segments

You can separate available segments with `|`.

```typescript jsx
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

### Optional Segment
###### [🏠︎](#index) / [Components](#components) / [Router](#router) / Optional Segment

You can add `?` at the end of a segment to make it optional.

```typescript jsx
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

### Permissions
###### [🏠︎](#index) / [Components](#components) / [Router](#router) / Permissions

```typescript jsx
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

```typescript jsx
permissions.value.add('postlogin')
permissions.update()
```

`/` - Home page  
`/settings` - Settings Page  
`/foo` - NotFound Page

### Lazy Loading
###### [🏠︎](#index) / [Components](#components) / [Router](#router) / Lazy Loading

You can use `lazy` to load pages and layouts asynchronously, enabling code-splitting by pages and layouts.

You can use `fallback` field to render a glimmer while pages or layouts are loading.
You can use `childrenFallback` field to set `fallback` for children elements.

```typescript jsx
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

### Params
###### [🏠︎](#index) / [Components](#components) / [Router](#router) / Params

Prefix a path segment with `:` to capture its value as a param.

```typescript jsx
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

### useParam
###### [🏠︎](#index) / [Components](#components) / [Router](#router) / useParam

You can get a route param by `useParam`.

```typescript jsx
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

```typescript jsx
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

### useParams
###### [🏠︎](#index) / [Components](#components) / [Router](#router) / useParams

You can get all route params by `useParams`.

```typescript jsx
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

## Link
###### [🏠︎](#index) / [Components](#components) / Link

<sup>[href](#href) • [replace](#replace) • [class](#class) • [exact](#exact) • [scroll](#scroll) • [scrollTo](#scrollTo)</sup>

| Prop     | Type                                                 | Description                                                    |
|----------|------------------------------------------------------|----------------------------------------------------------------|
| href     | `string`                                             | URL or path the link navigates to                              |
| target   | `'_blank'` \| `'_parent'` \| `'__self'` \| `'__top'` | The target attribute for the link                              |
| scroll   | `'after'` \| `'before'` \| `'none'`                  | Controls scroll behavior on navigation                         |
| scrollTo | `number` \| `string`                                 | Position or selector to scroll to after navigation             |
| replace  | `boolean`                                            | Replace the current history entry instead of pushing a new one |
| exact    | `boolean`                                            | Match the path exactly instead of by prefix                    |
| class    | `string` \| `{ root: string, active: string }`       | CSS class(es) for the link and its active state                |
| children | `JSX.Element`                                        | Content to render inside the link                              |

Use the `Link` component to create links.
It behaves like an HTML `<a>` tag but uses the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) for internal navigation.
For external links, it automatically adds `rel="noopener noreferrer nofollow"` and `target="_blank"` attributes.

### href
###### [🏠︎](#index) / [Components](#components) / [Link](#link) / href

If `href` starts from `/`, `?` or `#` then the Link will use [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API).

```typescript jsx
import { Link, Router, createRouting } from '@innet/dom'

const routing = createRouting([
  { index: true, component: () => 'Home Page' },
  { index: true, path: 'test', component: () => 'Test Page' },
  { component: () => '404' },
])

export const Content = () => (
  <div>
    <Link href="/">home</Link>
    <Link href="/test">test</Link>
    <Link href="/home">unknown</Link>
    <div>
      <Router routing={routing} />
    </div>
  </div>
)
```

### replace
###### [🏠︎](#index) / [Components](#components) / [Link](#link) / replace

By default, it pushes to history, but you may use `replace` to replace current history state.

```typescript jsx
<Link replace href="/">
  home
</Link>
```

### class
###### [🏠︎](#index) / [Components](#components) / [Link](#link) / class

You can add root or active link class

```typescript jsx
import { Link } from '@innet/dom'

const classes = {
  root: 'link',
  active: 'active',
}

export const Content = () => (
  <div>
    <Link href='/' class='only-root'>
      home
    </Link>
    <Link href='/test' class={classes}>
      test
    </Link>
  </div>
)
```

You can use all features from [html-classes](https://www.npmjs.com/package/html-classes) for the `class` prop.

```typescript jsx
import { Link } from '@innet/dom'

const classes = {
  root: ['link1', 'link2', () => 'dynamic-class'],
  active: { active: true },
}

export const Content = () => (
  <div>
    <Link href='/' class={() => 'dynamic-root'}>
      home
    </Link>
    <Link href='/test' class={classes}>
      test
    </Link>
  </div>
)
```

### exact
###### [🏠︎](#index) / [Components](#components) / [Link](#link) / exact

By default, active class appends if URL starts with `href` prop value, but use `exact` to compare exactly.

```typescript jsx
import { Link } from '@innet/dom'

const classes = { root: 'link', active: 'active' }

export const Content = () => (
  <div>
    <Link href='/' exact classes={classes}>
      home
    </Link>
    <Link href="/test" classes={classes}>
      test
    </Link>
  </div>
)
```

### scroll
###### [🏠︎](#index) / [Components](#components) / [Link](#link) / scroll

You can use smooth scroll

```css
body, html {
  scroll-behavior: smooth;
}
```
The property of `scroll` says should we scroll on click and how.

> by default equals `before`

```typescript jsx
import { Link } from '@innet/dom'

export const Content = () => (
  <div>
    <Link href="/" scroll='before'>
      home
    </Link>
    <Link href="/test" scroll='after'>
      test
    </Link>
    <Link href="?modal" scroll='none'>
      test
    </Link>
  </div>
)
```

### scrollTo
###### [🏠︎](#index) / [Components](#components) / [Link](#link) / scrollTo

If you want to scroll the page to custom position (by default it's up of the page) use `scrollTo`

```typescript jsx
import { Link } from '@innet/dom'

export const Content = () => (
  <div>
    <Link href='/' scrollTo={100}>
      home
    </Link>
    <Link href='/test' scrollTo='#root'>
      test
    </Link>
  </div>
)
```

Use a string to scroll under an element relates to the CSS selector you provide or use `-1` to stop scrolling.

## Delay
###### [🏠︎](#index) / [Components](#components) / Delay

| Prop     | Type                  | Description                                        |
|----------|-----------------------|----------------------------------------------------|
| show     | `number`              | Delay before showing the content (in milliseconds) |
| hide     | `number`              | Delay before hiding the content (in milliseconds)  |
| ref      | `Ref<State<boolean>>` | Reference to the visibility state                  |
| children | `JSX.Element`         | Content to render with delay                       |

You can show or hide elements with a delay.

```typescript jsx
import { Delay } from '@innet/dom'

export function Content () {
  return (
    <Delay show={1000}>
      Works
      <Delay show={1000}>
        fine!
      </Delay>
    </Delay>
  )
}
```

### useHidden
###### [🏠︎](#index) / [Components](#components) / [Delay](#delay) / useHidden

You can react to elements being removed.

Modify `Content.tsx`
```typescript jsx
import { useHidden } from '@innet/dom'

export function Content () {
  const hidden = useHidden()

  return () => hidden.value ? 'hidden' : 'shown'
}
```

And modify `app.tsx`
```typescript jsx
import { Delay } from '@innet/dom'
import { State } from 'watch-state'

const show = new State(true)

const handleClick = () => {
  show.value = false
}

export default () => show.value && (
  <Delay hide={1000}>
    <Content />
    <button onclick={handleClick}>
      Hide
    </button>
  </Delay>
)
```

### ref
###### [🏠︎](#index) / [Components](#components) / [Delay](#delay) / ref
You can use `ref` to access the hidden state.

Modify `Content.tsx`
```typescript jsx
import { Delay } from '@innet/dom'

export function Content () {
  const hidden = new Ref()

  return (
    <Delay ref={hidden} hide={1000}>
      {() => hidden.value.value ? 'hidden' : 'shown'}
    </Delay>
  )
}
```

And modify `app.tsx`
```typescript jsx
import { State } from 'watch-state'

const show = new State(true)

const handleClick = () => {
  show.value = false
}

export default () => show.value && (
  <>
    <Content />
    <button onclick={handleClick}>
      Hide
    </button>
  </>
)
```

## Hooks
###### [🏠︎](#index) / Hooks

You can use hooks only inside a component.

```typescript jsx
export async function Content (props1) {
  const value1 = useHook1()
  const value2 = useHook2()
}
```

### useProps
###### [🏠︎](#index) / [Hooks](#hooks) / useProps

You can get props with `useProps` hook.

```typescript jsx
import { useProps } from '@innet/jsx'

export function Content (props1) {
  const props2 = useProps()

  return (
    <h1>
      {props1 === props2 ? 'same' : 'different'}
    </h1>
  )
}
```

### useChildren
###### [🏠︎](#index) / [Hooks](#hooks) / useChildren

To get children elements you can take `useChildren`.

Change `Content.tsx`
```typescript jsx
import { useChildren } from '@innet/jsx'

export function Content ({ color, children }) {
  return (
    <h1 style={{ color }}>
      {String(children === useChildren())}
    </h1>
  )
}
```

Then you can use the children outside.

Modify `app.tsx`
```typescript jsx
import { Content } from './Content'

export default (
  <Content color='red'>
    Hello World!
  </Content>
)
```

### useParent
###### [🏠︎](#index) / [Hooks](#hooks) / useParent

You can get parent HTML element inside a component

```typescript jsx
import { getParent } from '@innet/dom'

export function Content () {
  console.log(useParent())
}
```

## style
###### [🏠︎](#index) / style

You can style components with `style` function.
The function returns `useStyle` hook.
Use this hook inside a component to get [html-classes](https://www.npmjs.com/package/html-classes) features on `class` prop.

```typescript jsx
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
import { State } from 'watch-state'

const show = new State(true)

const handleClick = () => {
  show.value = !show.value
}

export default (
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
```

## Issues
If you find a bug or have a suggestion, please file an issue on [GitHub](https://github.com/d8corp/innet-dom/issues).

[![issues](https://img.shields.io/github/issues-raw/d8corp/innet-dom)](https://github.com/d8corp/innet-dom/issues)
