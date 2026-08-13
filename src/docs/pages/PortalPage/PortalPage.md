# Portal

| Prop              | Type                                  | Description                                               |
|-------------------|---------------------------------------|-----------------------------------------------------------|
| **parent** [*](#) | `TargetElement` \| `DocumentFragment` | The element where the child content will be rendered      |
| **children**      | `JSX.Element`                         | The content to render inside the specified parent element |

If you want to render content into an element other than `body`, use the `Portal` component.

```html
//! public/index.html
<!doctype html>
<html lang="en">
<head ... >
<body>
  <div id="app"></div>
  <!-- add this ^ -->
</body>
</html>
```

Use a `Portal` to render content into the `app` element.

```tsx
//! src/index.tsx
import { innet } from 'innet'
import { handler } from '@innet/dom'
import { Portal } from '@innet/dom'

const app = (
  <Portal parent={document.getElementById('app')}>
    <h1>
      Hello World!
    </h1>
  </Portal>
)

innet(app, handler)
```

You can use `Portal` anywhere inside your app.

```tsx
//! src/index.tsx
import { innet } from 'innet'
import { handler } from '@innet/dom'
import { Portal } from '@innet/dom'

const myElement = document.createElement('div')

const app = (
  <Portal parent={document.getElementById('app')}>
    <h1>
      Hello World!
    </h1>
    <Portal parent={myElement}>
      This is content of myElement
    </Portal>
  </Portal>
)

innet(app, handler)
```

`myElement` should contain **This is content of myElement** and `app` should contain the following code:

```html
//! Content of `app`
<h1>
  Hello World!
</h1>
```
