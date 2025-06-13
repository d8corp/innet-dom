
<a href="https://www.npmjs.com/package/innet">
  <img src="https://raw.githubusercontent.com/d8corp/innet/main/logo.svg" align="left" width="90" height="90" alt="InnetJs logo by Mikhail Lysikov">
</a>

# &nbsp; @innet/dom

&nbsp;

[![NPM](https://img.shields.io/npm/v/@innet/dom.svg)](https://www.npmjs.com/package/@innet/dom)
[![downloads](https://img.shields.io/npm/dm/@innet/dom.svg)](https://www.npmtrends.com/@innet/dom)
[![changelog](https://img.shields.io/badge/Changelog-⋮-brightgreen)](https://changelogs.xyz/@innet/dom)
[![license](https://img.shields.io/npm/l/@innet/dom)](https://github.com/d8corp/innet-dom/blob/main/LICENSE)

## Abstract
This is an `innet` tool, that helps to create frontend-side application.

Here you can find JSX components, state-management, portals, context, routing and more.

Based on [innet](https://www.npmjs.com/package/innet).

[![stars](https://img.shields.io/github/stars/d8corp/innet-dom?style=social)](https://github.com/d8corp/innet-dom/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/innet-dom?style=social)](https://github.com/d8corp/innet-dom/watchers)

## Index

[Install](#install) | 
[Handler](#handler) | 
[JSX](#jsx) | 
[State Management](#state-management) |
[style](#style)

**[Components](#components)**  
[Portal](#portal) | 
[ContextProvide](#contextprovide) | 
[Show](#show) | 
[Hide](#hide) | 
[For](#for) | 
[Router](#router) | 
[Link](#link) | 
[Delay](#delay)

**[Life Cycle](#life-cycle)**  
[onDestroy](#ondestroy) |
[onMounted](#onmounted)

**[Hooks](#hooks)**  
[useRoute](#useroute) | 
[useParent](#useparent)

**Utils**  
[Ref](#ref) | 
[Context](#context)

## Install

[← back](#index)

Use [innetjs](https://www.npmjs.com/package/innetjs) to start `innet-dom` app development.

```shell
npx innetjs init my-app -t fe
```
*change my-app to work folder name*

Go into `my-app` and check `README.md`

## Handler

[← back](#index)

Use `dom` handler to start an application.

Clear `src` folder and create `index.ts` inside.
```typescript
import innet from 'innet'
import dom from '@innet/dom'

import app from './app'

innet(app, dom)
```

## JSX

[← back](#index)

You can use xml-like syntax to create and append elements into the DOM.
More information about JSX [here](https://www.typescriptlang.org/docs/handbook/jsx.html).

Create `app.tsx` in `src` folder.
```typescript jsx
export default (
  <h1>
    Hello World!
  </h1>
)
```

Everything, that you provide as the first argument of `innet` function (with the `dom` handler),
will fall into the `body` DOM-element.

## Portal

[← back](#index)

If you want to put your content into another element (not `body`), use `Portal` component.

For example, you can change `index.html` from `public` folder.
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

And change `app.tsx`

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

You can use `Portal` everywhere inside the app.

Change `app.tsx`
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

`myElement` should contain `This is content of myElement` and `app` should contain the next code.
```html
<h1>
  Hello World!
</h1>
```

## State Management

[← back](#index)

With `innet` you can fully exclude component approach, but state management still to be available.

The state management based on [watch-state](https://github.com/d8corp/watch-state)

To bind state and content, use `State`, `Cache` or a function as the content.

Turn back `index.html` and change `app.tsx`
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

Change `app.tsx`
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

[← back](#index)

[props](#props) | 
[children](#children) | 
[return](#return)  
[Async Components](#async-component) | 
[Generic Async Component](#generic-async-component) | 
[Generic Component](#generic-component)  
[Life Cycle](#life-cycle)  

Component is a function.
You can use it as JSX element.

Create `Content.tsx`
```typescript jsx
export const Content = () => (
  <h1>
    Hello World!
  </h1>
)
```

Change `app.tsx`
```typescript jsx
import { Content } from './Content'

export default (
  <Content />
)
```

### Props

[← back](#components)

Any component gets the first argument of an object that contains the `props`.

Change `Content.tsx`
```typescript jsx
export function Content ({ color }) {
  return (
    <h1 style={{ color }}>
      Hello World!
    </h1>
  )
}
```

Then you should use the `color` prop outside.

Change `app.tsx`
```typescript jsx
import { Content } from './Content'

export default (
  <Content color='red' />
)
```

### Children

[← back](#components)

Component props can contains `children` prop.

Change `Content.tsx`
```typescript jsx
export function Content ({ children }) {
  return <h1>{children}</h1>
}
```

You can put `children` inside component body.

Change `app.tsx`
```typescript jsx
import { Content } from './Content'

export default (
  <Content>Content</Content>
)
```

### Return

[← back](#components)

A component awaits a return:
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

[← back](#components)

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

[← back](#components)

Just add a star and use `yield` instead of `return`
```typescript jsx
async function * Content () {
  yield 'Loading...'

  const { text } = await fetch('...').then(e => e.json())

  yield <div>{text}</div>
}
```

### Generic Component

[← back](#components)

It can be useful when you want to do something after a content deployed.

```typescript jsx
function * Content () {
  yield (
    <div id='test'>
      Hello World!
    </div>
  )

  colsole.log(document.getElementById('test'))
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

[← back](#components)

[onDestroy](#ondestroy) | 
[onMounted](#onmounted)

Each component renders only once!

There are 3 steps of life cycle:
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

[← back](#life-cycle)

You can subscribe on destroy of a component by `onDestroy` from `watch-state`

Change `Content.tsx`

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

And change `app.tsx`
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

[← back](#life-cycle)

You can use `onMounted` to do something after end of rendering.

Change `Content.tsx`

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

[← back](#index)

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

  colsole.log(wrapper.value)
}
```

## Context

[← back](#index)

You can pass a value from a parent element through any children to the place you need.

Change `Content.tsx`
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

## ContextProvide

[← back](#index)

Use `ContextProvide` to provide context value into children.

Change `app.tsx`
```typescript jsx
import { ContextProvider } from '@innet/dom'
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

[← back](#index)

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

> `when` can be: `State` | `Cache` | `() => any` | `any`

## Hide

[← back](#index)

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

> `when` can be: `State` | `Cache` | `() => any` | `any`

## For

[← back](#index)

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

const names = new State([
  { id: 1, text: 'test1' },
  { id: 2, text: 'test2' },
  { id: 3, text: 'test3' },
])

export default (
  <ul>
    <For of={names} key='id'>
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

## Router

[← back](#index)

[Layout](#layout) | 
[List of Segments](#list-of-segments) | 
[Optional Segment](#optional-segment) | 
[Permissions](#permissions) | 
[Lazy Loading](#lazy-loading) | 
[Params](#params)

You can render content by url.

Use `component` to define a route component.
Use `path` to define segments of URL path.
Use `index` to define a route as end of segments.

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

You can see

`/` - Home page  
`/settings` - Settings Index  
`/settings/foo` - Settings Rest
`/foo` - Not Found

You can split path segments by `/`

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

You can see

`/` - Home page  
`/settings` - Settings Index  
`/settings/account` - Account Settings  
`/settings/notifications` - Notification Settings  
`/settings/foo` - Not Found  
`/foo` - Not Found

### Layout

You can use `children` to group routes. You can use `component` field on a group to add a layout for children pages.

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

You can see

`/` - `<article>Home Page</article>`  
`/about` - `<article>About Page</article>`  
`/settings` - `<div>Settings Page</div>`  
`/settings/foo` - `<article>NotFound Page</article>`  
`/foo` - `<article>NotFound Page</article>`

### List of Segments

You can split available segments by `|`.

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

### Permissions

### Lazy Loading

### Params

## useParam

[← back](#index)

You can get route params by `useParam`.

```typescript jsx
import { Router, createRouting, ChildrenProps, useParam } from '@innet/dom'

const UserPage = (props: ChildrenProps) => {
  const userId = useParam('userId')
  
  return <div>{userId}</div>
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

[← back](#index)

The tag `a` has a couple of features.

> `rel="noopener noreferrer nofollow"` and `target="_blank"` are default for external links.

### href
If `href` starts from `/`, `?` or `#` then the Link will use [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API).

```typescript jsx
export const Content = () => (
  <div>
    <a href="/">home</a>
    <a href="/test">test</a>
    <a href="/home">unknown</a>
    <a href="?modal=test">modal</a>
    <div>
      <router>
        <slot name='/'>
          Home Page
        </slot>
        <slot name='test'>
          Test Page
        </slot>
        404
      </router>
      <router search='modal'>
        <slot name='test'>
          Test Modal
        </slot>
      </router>
    </div>
  </div>
)
```

### replace
By default, it pushes to history, but you may use `replace` to replace current history state.

```typescript jsx
export const Content = () => (
  <a replace href="/">
    home
  </a>
)
```

### class
You can add root or active link class

```typescript jsx
const classes = {
  root: 'link',
  active: 'active',
}

export const Content = () => (
  <div>
    <a
      href="/"
      class='only-root'>
      home
    </a>
    <a
      href="/test"
      class={classes}>
      test
    </a>
  </div>
)
```

You can use all features from [html-classes](https://www.npmjs.com/package/html-classes) for the `class` prop.

```typescript jsx
const classes = {
  root: ['link1', 'link2', () => 'dynamic-class'],
  active: { active: true },
}

export const Content = () => (
  <div>
    <a
      href="/"
      class={() => 'dynamic-root'}>
      home
    </a>
    <a
      href="/test"
      class={classes}>
      test
    </a>
  </div>
)
```

### exact
By default, active class appends if URL starts with `href` prop value, but use `exact` to compare exactly.

```typescript jsx
const classes = { root: 'link', active: 'active' }

export const Content = () => (
  <div>
    <a
      href="/"
      exact
      classes={classes}>
      home
    </a>
    <a
      href="/test"
      classes={classes}>
      test
    </a>
  </div>
)
```

### scroll
You can use smooth scroll
```css
body, html {
  scroll-behavior: smooth;
}
```
The property of `scroll` says should we scroll on click and how.

> by default equals `before`

```typescript jsx
export const Content = () => (
  <div>
    <a href="/" scroll='before'>
      home
    </a>
    <a href="/test" scroll='after'>
      test
    </a>
    <a href="?modal" scroll='none'>
      test
    </a>
  </div>
)
```

### scrollTo
If you want to scroll the page to custom position (by default it's up of the page) use `scrollTo`

```typescript jsx
export const Content = () => (
  <div>
    <a href="/" scrollTo={100}>
      home
    </a>
    <a href="/test" scrollTo='#root'>
      test
    </a>
  </div>
)
```

Use a string to scroll under an element relates to the CSS selector you provide or use `-1` to stop scrolling.

## Delay

[← back](#index)

You can show and hide elements with delay.

```typescript jsx
export function Content () {
  return (
    <delay show={1000}>
      Works
      <delay show={1000}>
        fine!
      </delay>
    </delay>
  )
}
```

### useHidden
You can react on removing of elements

Change `Content.tsx`
```typescript jsx
import { useHidden } from '@innet/dom'

export function Content () {
  const hidden = useHidden()

  return () => hidden.value ? 'hidden' : 'shown'
}
```

And change `app.tsx`
```typescript jsx
import { State } from 'watch-state'

const show = new State(true)

const handleClick = () => {
  show.value = false
}

export default () => show.value && (
  <delay hide={1000}>
    <Content />
    <button
      onclick={handleClick}>
      Hide
    </button>
  </delay>
)
```

### ref
You can use `ref` to get the hidden state.

Change `Content.tsx`
```typescript jsx
export function Content () {
  const hidden = new Ref()

  return (
    <delay ref={hidden} hide={1000}>
      {() => hidden.value.value ? 'hidden' : 'shown'}
    </delay>
  )
}
```

And change `app.tsx`
```typescript jsx
import { State } from 'watch-state'

const show = new State(true)

const handleClick = () => {
  show.value = false
}

export default () => show.value && (
  <>
    <Content />
    <button
      onclick={handleClick}>
      Hide
    </button>
  </>
)
```

## Hooks

[← back](#index)

You can use hooks only inside a component.

```typescript jsx
export async function Content (props1) {
  const value1 = useHook1()
  const value2 = useHook2()
}
```

### useProps
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

Change `app.tsx`
```typescript jsx
import { Content } from './Content'

export default (
  <Content color='red'>
    Hello World!
  </Content>
)
```

### useParent

[← back](#index)

You can get parent HTML element inside a component

```typescript jsx
import { getParent } from '@innet/dom'

export function Content () {
  console.log(useParent())
}
```

## style

[← back](#index)

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
