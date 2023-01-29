
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

Here you can find JSX components, state-management, portals, context, slots, routing and more.

Based on [innet](https://www.npmjs.com/package/innet).

[![stars](https://img.shields.io/github/stars/d8corp/innet-dom?style=social)](https://github.com/d8corp/innet-dom/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/innet-dom?style=social)](https://github.com/d8corp/innet-dom/watchers)

## Install
Use [innetjs](https://www.npmjs.com/package/innetjs) to start `innet-dom` app development.

```shell
npx innetjs init my-app -t fe
```
*change my-app to work folder name*

Go into `my-app` and check `README.md`

## Handler

Use `dom` handler to start an application.

Clear `src` folder and create `index.ts` inside.
```typescript
import innet from 'innet'
import dom from '@innet/dom'

import app from './app'

innet(app, dom)
```

## JSX
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

Everything, that you provide as the first argument of `innet` function with the `dom` handler,
will fall into the `body` DOM-element.

## portal

If you want to put your content into another element (not `body`), use portal element.

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
const app = document.getElementById('app')

export default (
  <portal parent={app}>
    <h1>
      Hello World!
    </h1>
  </portal>
)
```

You can use `portal` everywhere inside the app.

Change `app.tsx`
```typescript jsx
const app = document.getElementById('app')
const myElement = document.createElement('div')

export default (
  <portal parent={app}>
    <h1>
      Hello World!
    </h1>
    <portal parent={myElement}>
      This is content of myElement
    </portal>
  </portal>
)
```

`myElement` should contain `This is content of myElement` and `app` should contain the next code.
```html
<h1>
  Hello World!
</h1>
```

## State Management

Usually, state management is available only inside a component.

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

#### props
Any component gets an argument `props`.  
If props have not provided the argument equals `undefined` else you get an object that contains the props.

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

### Hooks
You can use hooks inside a component. Sync hooks should be used before `await`,
async hooks should be used as the first `await`.

```typescript jsx
export async function Content (props1) {
  const sync1 = useSyncHook1()
  const sync2 = useSyncHook2()
  
  const [
    async1,
    async2,
  ] = await Promise.all([
    useAsyncHook1(),
    useAsyncHook2(),
  ])
  
  // other
}
```

#### useProps
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

#### useChildren
To get children elements you can take `useChildren`.

Change `Content.tsx`
```typescript jsx
import { useChildren } from '@innet/jsx'

export function Content ({ color }) {
  const children = useChildren()

  return (
    <h1 style={{ color }}>
      {children}
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

### Return

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
- JSX Plugin - run plugin
  ```typescript jsx
  const Test1 = () => <portal parent={app}>content</portal>
  const Test2 = () => <slot>content</slot>
  ```
- function - observable children
  ```typescript jsx
  const state = new State()
  const Test1 = () => () => state.value
  const Test2 = () => state
  const Test3 = () => <>{() => state.value}</>
  ```

### Life Cycle
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

### Async Component

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

Just add a star and use `yield` instead of `return`
```typescript jsx
async function * Content () {
  yield 'Loading...'

  const { text } = await fetch('...').then(e => e.json())

  yield <div>{text}</div>
}
```

### Generic Component

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

## Ref

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

## onDestroy

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
import { Content } from './Content'

const show = new State(true)

const handleChange = (e: Event) => {
  show.value = e.target.checked
}

export default (
  <>
    <show state={show}>
      <Content />
    </show>
    <input
      type="checkbox"
      checked
      onchange={handleChange}
    />
  </>
)
```

## Context

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

And change `app.tsx`
```typescript jsx
import { Content, color } from './Content'

export default (
  <>
    <Content>
      Without context
    </Content>
    <context for={color} set='red'>
      <Content>
        With context
      </Content>
    </context>
  </>
)
```

## show

You can use `show` element to show/hide content by state.

```typescript jsx
import { State } from 'watch-state'

const show = new State(true)

export default (
  <show state={show}>
    <button
      onclick={() => {
        show.value = false
      }}>
      Click Me
    </button>
  </show>
)
```

> `state` can be: `State` | `Cache` | `() => any` | `any`

## for

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

It's ok for static data, but if you use a state, it's better to use `for` element.
```typescript jsx
import { State } from 'watch-state'

const names = new State(['Mike', 'Alex', 'Dan'])

export default (
  <ul>
    <for of={names}>
      {name => (
        <li>
          #{() => name.index}:
          {() => name.value}
        </li>
      )}
    </for>
  </ul>
)
```

Use `key` property to improve `DOM` changes when you use an array of objects.

```typescript jsx
import { State } from 'watch-state'

const names = new State([
  { id: 1, text: 'test1' },
  { id: 2, text: 'test2' },
  { id: 3, text: 'test3' },
])

export default (
  <ul>
    <for of={names} key='id'>
      {name => (
        <li>
          #{() => name.index}:
          {() => name.value}
        </li>
      )}
    </for>
  </ul>
)
```

## slots

You can use slots to provide a couple of named child elements.
```typescript jsx
import { useChildren } from '@innet/jsx'

export const Content = () => (
  <slots from={useChildren()}>
    <div class='header'>
      <slot name='header'>
        default header
      </slot>
    </div>
    <div class='content'>
      <slot>
        default content
      </slot>
    </div>
    <div class='footer'>
      <slot name='footer'>
        default footer
      </slot>
    </div>
  </slots>
)
```

```typescript jsx
export default (
  <Content>
    <slot>Custom content</slot>
    <slot name='header'>
      Custom header
    </slot>
  </Content>
)
```

You get `Custom header`, `Custom content` and `default footer`

## useSlots

`useSlots` is a way to get slots.
```typescript jsx
import { useSlots } from '@innet/dom'

export const Content = () => {
  const {
    '': content,
    header,
    footer
  } = useSlots()

  return (
    <>
      <show state={header}>
        <div class='header'>
          {header}
        </div>
      </show>
      <div class='content'>
        {content}
      </div>
      <show state={footer}>
        <div class='footer'>
          {footer}
        </div>
      </show>
    </>
  )
}
```

> Any slots without name or with name equals empty string and any content outside slots collect into empty string slot.

```typescript jsx
export default (
  <Content>
    <slot name='header'>
      Custom header
    </slot>
    Custom content
  </Content>
)
```

You can use a couple of slots with the same name.
```typescript jsx
export default (
  <Content>
    <slot name='header'>
      Custom header1 <br />
    </slot>
    <slot name='header'>
      Custom header2
    </slot>
    Custom content
  </Content>
)
```

## router
You can render content by url.

```typescript jsx
export const Content = () => (
  <router>
    <slot name='/'>
      Home page
    </slot>
    <slot name='settings'>
      Settings page
    </slot>
    Not Found
  </router>
)
```

There are strong matching by default, so you can see

`/` - Home page  
`/settings` - Settings page  
`/settings/test` - Not Found  
`/any-other` - Not Found

If you want to show `Settings page` on `/settings/test`, use `ish` prop on router element
```typescript jsx
export const Content = () => (
  <router ish>
    <slot name='/'>
      Home page
    </slot>
    <slot name='settings'>
      Settings page
    </slot>
    Not Found
  </router>
)
```

When you use a router, that is inside a slot of another router, the route checks the next peace of url path.
```typescript jsx
export const Content = () => (
  <router ish>
    <slot name='/'>
      Home page
    </slot>
    <slot name='settings'>
      <router>
        <slot name='main'>
          Main Settings
        </slot>
        <slot name='user'>
          User Settings
        </slot>
        Settings
      </router>
    </slot>
    Not Found
  </router>
)
```

`/` - Home page  
`/settings` - Settings  
`/settings/main` - Main Settings  
`/settings/user` - User Settings  
`/settings/any-other` - Settings  
`/any-other` - Not Found

You can use `search` prop to make router binds on query search params
```typescript jsx
export const Content = () => (
  <router search='modal'>
    <slot name='login'>
      Login
    </slot>
    <slot name='logout'>
      Logout
    </slot>
  </router>
)
```

`?modal=login` - Login  
`/settings?modal=logout` - Logout  
`/settings?user=1&modal=logout` - Logout  
`/any-other?any-params&modal=any-other` - render nothing

## useRoute
You can handle dynamic routes by `useRoute`.
```typescript jsx
const Test = () => {
  const route = useRoute()

  return () => route.value
}

export const Content = () => (
  <router ish>
    <slot name='/'>
      Home page: <Test />
    </slot>
    <slot name='settings'>
      Settings: <Test />
    </slot>
    Other: <Test />
  </router>
)
```

`/` - Home page: /  
`/settings` - Settings: /  
`/settings/test` - Settings: test    
`/any-other` - Other: any-other

## a
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

## delay
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

## useParent

You can get parent HTML element inside a component

```typescript jsx
import { getParent } from '@innet/dom'

export function Content () {
  console.log(useParent())
}
```

## style

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
