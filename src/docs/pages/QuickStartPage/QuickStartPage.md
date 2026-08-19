# Quick Start

Welcome to **innet**[/dom](/)

Build reactive web applications with direct DOM manipulation and fine-grained updates.
Say goodbye to virtual DOM overhead and unnecessary re-renders.
You get simple, composable components and a runtime that updates only what actually changed.

This guide will take you from an empty directory to a running application, help you understand the core building blocks, and prepare your project for production.

## Why innet?
---

[**innet**](https://www.npmjs.com/package/innet) is a JavaScript ecosystem built around a single function-based core, offering an out-of-the-box solution for a variety of application types:

- **innet**[/dom](https://www.npmjs.com/package/@innet/dom) — Website
- **innet**[/server](https://www.npmjs.com/package/@innet/server) — API Server
- **innet**[/native](https://www.npmjs.com/package/@innet/native) — Mobile Application

`@innet/dom` delivers a declarative, JSX-based development experience with direct DOM updates.

Here is what makes it stand out:

- **Fine-grained reactivity** — Updates only what changed, not the entire component tree
- **Smaller bundles** — No virtual DOM diffing library
- **Simple mental model** — Components render once, state drives updates automatically
- **TypeScript-first** — Full type safety for JSX, props, and state
- **Built-in routing** — Flexible routing with code-splitting, permissions, and nested layouts
- **Powerful utilities** — Portal, Show, Hide, For, Delay, and more out of the box

## See It in Action
---

Here is a complete, reactive counter in just a few lines of code:

```tsx
//! src/index.tsx
import { innet } from 'innet'
import { handler } from '@innet/dom'
import { State } from 'watch-state'

const count = new State(0)

const app = (
  <button onclick={() => count.value++}>
    Count: {count}
  </button>
)

innet(app, handler)
```

Notice how we pass `count` directly into the JSX.

When `count.value` changes, `@innet/dom` automatically tracks it and **updates only the text node** inside the button.
No component re-renders, no diffing algorithm.

> The use of [components](/components) is not mandatory

## Installation
---

### Prerequisites

- **Node.js** 22 or higher
- **Package manager**: npm, yarn, or pnpm
- **Browser**: Any modern browser supporting ES6+

### Option 1: Create a New Project (Recommended)

The fastest way to get started is with the official [innetjs](https://www.npmjs.com/package/innetjs) CLI:

```shell
//! Terminal
npx innetjs init my-app -t fe
```

> The `-t fe` flag creates a frontend template, and `my-app` is the working folder.

This creates a ready-to-use project with component examples, configured routing, a development server with TypeScript + JSX setup, and an optimized build pipeline.

```
//! Project structure
my-app/
├── public/
│   └── index.html     // HTML shell
├── src/
│   └── index.tsx      // Application entry point
├── tsconfig.json      // TypeScript and JSX configuration
└── package.json
```

### Option 2: Add to Existing Project

If you prefer to integrate **innet**[/dom](/) into your own build setup, install the core packages:

```shell
//! npm
npm install innet @innet/dom watch-state

//! yarn
yarn add innet @innet/dom watch-state

//! pnpm
pnpm add innet @innet/dom watch-state
```

**Package breakdown:**
- [innet](https://github.com/d8corp/innet) — Core rendering engine
- [@innet/dom](https://github.com/d8corp/innet-dom) — DOM handler and built-in components
- [watch-state](https://github.com/d8corp/watch-state) — Reactive state management

## Your First Application
---

If you scaffolded your project using `npx innetjs init my-app -t fe` (where `-t fe` selects the standard frontend template), your environment is already fully configured.

Let's look under the hood of your new project. The following steps break down the generated files, explain how they work together, and show you how to run and build your app.

*(Note: If you are setting up Innet manually in an existing project, you can use these steps as a blueprint to configure your own files!)*

### The Entry Point

Open `src/index.tsx`. This is where your application comes to life:

```tsx
//! src/index.tsx
import { innet } from 'innet'
import { handler } from '@innet/dom'

function App () {
  return (
    <div>
      <h1>Hello, Innet!</h1>
      <p>Your first reactive application</p>
    </div>
  )
}

innet(<App />, handler)
```

The `innet()` function takes your root JSX component and mounts it to the DOM using the `handler` from `@innet/dom`.

### HTML Shell

Next, look at `public/index.html`. This is the shell that hosts your app:

```html
//! public/index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Innet App</title>
    <script type="module" defer src="index.js"></script>
  </head>
  <body>
    <!-- @innet/dom automatically injects your app here -->
  </body>
</html>
```

By default, `@innet/dom` attaches your application directly to `document.body`.
If you prefer to mount your app inside a specific wrapper (like `<div id="root">`), you can easily do so using the built-in [Portal](/portal) component.

### TypeScript & JSX Configuration

To ensure TypeScript understands JSX syntax of `@innet/dom`, the CLI configures `tsconfig.json` like this:

```json
//! tsconfig.json
{
  "compilerOptions": {
    "rootDir": "src",
    "target": "ES2018",
    "lib": [ "dom", "dom.iterable", "esnext" ],
    "types": ["jest"],
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "react-jsxdev",
    "jsxImportSource": "@innet/jsx-runtime"
  },
  "include": [ "src" ]
}

```

### Start the Development Server

If you haven't already, fire up the development server:

```shell
//! Terminall
npm start
```

The `innetjs` CLI acts as your bundler and dev server, providing TypeScript compilation, JSX transformation, and lightning-fast rebuilds.

### Build for Production

Once you are happy with your app and ready to deploy, you need to create an optimized production bundle:

```shell
//! Terminall
npm run build
```

This compiles your application, applies minification, tree-shaking, and other optimizations.
The final static files are written to a `build` folder by default.
Because `@innet/dom` ships a fully static bundle, there is no server-side runtime required — you can deploy the `build` folder to any static hosting provider (Netlify, Vercel, GitHub Pages, AWS S3, etc.).

## What's Next?
---

Now that you have a working `@innet/dom` application, explore more advanced features:

### Core Concepts

- **[Components](/components)** — Learn about component patterns, props, children, and lifecycle hooks like `useEffect`.
- **[State Management](/state-management)** — Deep dive into reactive state with `watch-state`, including `State`, `Compute`, and watchers.

### Routing & Navigation

- **[Routing](/router)** — Build multi-page apps with nested routes, permissions, and lazy loading.
- **[Link](/link)** — Navigate between pages without full page reloads.
- **[useParam](/use-param)** — Access route parameters in components.

### Built-in Components

- **[Portal](/portal)** — Render content in different DOM locations (modals, tooltips).
- **[Show](/show) / [Hide](/hide)** — Conditionally render or hide content based on reactive state.
- **[For](/for)** — Efficiently render lists with automatic DOM reconciliation.
- **[Delay](/delay)** — Delay rendering of components.
- **[Lazy](/lazy)** — Lazy load components with code splitting.

### Advanced Topics

- **[Context](/context-provider)** — Share state across component trees without prop drilling.
- **[Styling](/styling)** — CSS Modules, dynamic styles, and theming patterns.
- **[Ref](/ref)** — Access DOM elements directly.
