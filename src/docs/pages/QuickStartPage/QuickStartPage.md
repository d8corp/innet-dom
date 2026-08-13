# Quick Start

`@innet/dom` offers a declarative and reactive approach to UI development without the overhead of virtual DOM diffing. It enables developers to write simple, composable components with direct DOM manipulation, resulting in faster rendering and smaller bundle sizes compared to traditional frameworks.

Create your first reactive web-application in seconds.
No virtual DOM — just direct, fine-grained updates.

```tsx
//! src/index.tsx
import { innet } from 'innet'
import { handler } from '@innet/dom'
import { State } from 'watch-state'

const count = new State(0)

const app = (
  <>
    <h3>Count: {count}</h3>
    <button onclick={() => count.value++}>
      Click Me
    </button>
  </>
)

innet(app, handler)
```

> #### Fine-grained reactivity
> When `count.value` changes, only the text node updates. No component re-renders, no virtual DOM diffing.

- JSX support with full TypeScript integration
- Fine-grained reactivity powered by [watch-state](https://github.com/d8corp/watch-state)
- Built-in routing with flexible route definitions and permissions
- Support for async components and code splitting
- Lifecycle hooks for mounting and cleanup
- Context API for dependency injection and state sharing
- Utility components like Portal, Show, Hide, and Delay for common UI patterns
- Seamless integration with CSS Modules and styling utilities

## Installation
---

To work with `innet` and `@innet/dom`, you need **Node.js** version 16 or higher and a package manager like **npm**, **yarn**, or **pnpm**.
The framework can be used in any modern browser supporting ES6+.

### Create a project

The fastest way is using the `innetjs` CLI. It scaffolds a TypeScript + JSX project with hot reload out of the box.

```shell
npx innetjs init my-app -t fe
cd my-app
npm start
```

> The `-t fe` flag creates a frontend template, and `my-app` is the working folder.
> Open `http://localhost:3000` to see your app.

After running these commands, you'll have a ready-to-use project with component examples, configured routing, and a basic application structure.

### Existing Project

If you want to add `innet` to an existing project, install the required packages:

```shell
//! npm
npm install innet @innet/dom

//! yarn
yarn add innet @innet/dom

//! pnpm
pnpm add innet @innet/dom
```

## Hello World
---

After installation, create an entry point for your application.

```tsx
//! src/index.tsx
import { innet } from 'innet'
import { handler } from '@innet/dom'

function App () {
  return (
    <div>
      <h1>Hello, Innet!</h1>
      <p>Your application is running successfully</p>
    </div>
  )
}

innet(<App />, handler)
```

And the corresponding HTML file:

```html
//! public/index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Hello innet</title>
    <script type="module" defer src="index.js"></script>
  </head>
  <body>
  </body>
</html>
```
### Run the project

Start the development server using the command that matches your project setup. Run `npm start` if you scaffolded the project with `innetjs init` — the generated template already includes the dev server script in `package.json`.

For custom or manually configured projects, run `innetjs start` directly — the CLI will handle the build pipeline, hot module replacement, and dev server automatically.

```shell
//! Project
npm start
//! CLI
npx innetjs start
```

## TypeScript Configuration
---

To work with JSX in TypeScript, add the following settings to your:

```json
//! tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsxdev",
    "jsxImportSource": "@innet/jsx-runtime",
    ...
  }
}
```

## What's Next?
---

- Explore [Components](/components#children) to create your first components
- Discover component [Lifecycle](/lifecycle)
- Set up [Routing](/router) for a multi-page application
- Learn about [Styling](/styling) components
