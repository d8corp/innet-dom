
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

Here you can find JSX components, state-management, portals, context and more.

Based on [innet](https://www.npmjs.com/package/innet).

[![stars](https://img.shields.io/github/stars/d8corp/innet-dom?style=social)](https://github.com/d8corp/innet-dom/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/innet-dom?style=social)](https://github.com/d8corp/innet-dom/watchers)

## Install
The simplest way is using `innetjs`

```shell
npx innetjs init my-app -t fe
```
*change my-app to work folder name*

Go into `my-app` and check `README.md`

## Handler

Use `dom` handler to start an application.

Clear `src` folder and create `index.ts` inside
```typescript
import innet from 'innet'
import dom from '@innet/dom'

import app from './app'

innet(app, dom)
```

## JSX
You can use xml-like syntax to create and append elements into the DOM.
More information about JSX [here](https://www.typescriptlang.org/docs/handbook/jsx.html).

Create `app.tsx`
```typescript jsx
export default (
  <h1>
    Hello World!
  </h1>
)
```

Everything, that you provide as the first argument of `innet` function with the `dom` handler,
will fall into the `body` after running `npm start`

## portal

If you want to insert your content into another element (not `body`), use portal element.

For example, you can change `index.html` from `public` folder
```html
<!doctype html>
<html lang="en">
<head ... >
<body>
  <div id="app"></div>
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

Also, you can use `portal` everywhere inside the app

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

Then the `myElement` contains `This is content of myElement` and `app` element contains the next code.
```html
<h1>
  Hello World!
</h1>
```

## State Management

Usually, state management using is available only inside a component.

`innet` gives you a possible fully exclude component approach, but state management still to be available.

The state management based on [watch-state](https://github.com/d8corp/watch-state)

To bind state and content, use a function as a content.

Turn back `index.html` and change `app.tsx`
```typescript jsx
const count = new State(0)

export default (
  <>
    <h1>
      Count: {() => count.value}
    </h1>
    <button onclick={() => count.value++}>
      Click Me
    </button>
  </>
)
```

To bind state and prop use a function as a prop.

Change `app.tsx`
```typescript jsx
const darkMode = new State(false)

const handleChange = e => {
  darkMode.value = e.target.checked
}

export default (
  <div class={() => darkMode.value ? 'dark' : 'light'}>
    <h1>
      Hello World!
    </h1>
    <label>
      <input type="checkbox" onchange={handleChange} />
      Dark Mode
    </label>
  </div>
)
```

## Components

Component is just a function you can use as JSX element.

Create `Content.tsx`
```typescript jsx
export function Content () {
  return (
    <h1>
      Hello World!
    </h1>
  )
}
```

Change `app.tsx`
```typescript jsx
import { Content } from './Content'

export default (
  <Content />
)
```

### Arguments

Any component gets 3 arguments:
- **props** - list of params
- **children** - content
- **handler** - current handler

#### props

The first argument of a component is `props`.
If `props` are not provided the argument equals `undefined`, otherways you get an object that contains the props.

Change `Content.tsx`
```typescript jsx
export function Content ({ color }) {
  return (
    <h1 style={`color: ${color}`}>
      Hello World!
    </h1>
  )
}
```

Then you should use the prop outside.

Change `app.tsx`
```typescript jsx
import { Content } from './Content'

export default (
  <Content color='red' />
)
```

#### children

The second argument of a component is `children`.

Change `Content.tsx`
```typescript jsx
export function Content ({ color }, children) {
  return (
    <h1 style={`color: ${color}`}>
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

#### handler

The third argument of a component is `handler`.

This is a current handler, you can use it for different features you can see below.

### Return

A component awaits a return:
- `string`, `number` - render as text node
  ```typescript jsx
  const Test1 = () => 123
  const Test2 = () => '123'
  ```
- `null`, `undefined`, `boolean`, `symbol` - ignored
  ```typescript jsx
  const Test1 = () => null
  const Test2 = () => {}
  const Test3 = () => true
  const Test4 = () => Symbol()
  ```
- DOM Element - render as is
  ```typescript jsx
  const Test = () => document.createElement('div')
  ```
- JSX Element, `array` - render by content
  ```typescript jsx
  const Test1 = () => <>content</>
  const Test2 = () => ['content']
  ```
- function - observable children
  ```typescript jsx
  const state = new State()
  const Test = () => () => state.value
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
      {() => state.value}
    </div>
  )
}
```

### Async Component

Innet supports async components, you can simplify previous code
```typescript jsx
async function Content () {
  const { text } = await fetch('...').then(e => e.json())

  return (
    <div>
      {text}
    </div>
  )
}
```
While it's loading nothing can be shown.
If you want to show something, use `Generic Async Component`

### Generic Async Component

Just add a star and use `yield` instead of `return`
```typescript jsx
async function* Content () {
  yield 'Loading...'

  const { text } = await fetch('...').then(e => e.json())

  yield (
    <div>
      {text}
    </div>
  )
}
```

### Generic Component

It can be useful when you want to do something after a content deployed.

```typescript jsx
function* Content () {
  yield (
    <div id='test'>
      Hello World!
    </div>
  )

  colsole.log(document.getElementById('test'))
}
```

## Ref

Ref helps to get an HTML element
```typescript jsx
import { Ref } from '@innet/dom'

function* Content () {
  const wrapper = new Ref()
  
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

export function Content (props, children, handler) {
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

const handleChange = e => {
  darkMode.value = e.target.checked
}

export default (
  <>
    {() => show.value && <Content />}
    <input type="checkbox" checked onchange={handleChange} />
  </>
)
```

## Context

You can pass a value from a parent element through any children to the place you need.

Change `Content.tsx`
```typescript jsx
import { Context } from '@innet/dom'

export const color = new Context('blue')

export function Content (props, children, handler) {
  return (
    <h1 style={`color: ${color.get(handler)}`}>
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
const names = new State(['Mike', 'Alex', 'Dan'])

export default (
  <ul>
    <for of={() => names.value}>
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

## getParent

You can get parent HTML element inside a component
```typescript jsx
import { getParent } from '@innet/dom'

export function Content (props, children, handler) {
  console.log(getParent(handler))

  return (
    <h1>
      {children}
    </h1>
  )
}
```

## Issues
If you find a bug or have a suggestion, please file an issue on [GitHub](https://github.com/d8corp/innet-dom/issues).

[![issues](https://img.shields.io/github/issues-raw/d8corp/innet-dom)](https://github.com/d8corp/innet-dom/issues)
