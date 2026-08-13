## Link

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

## href
---

If `href` starts from `/`, `?` or `#` then the Link will use [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API).

```tsx
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

## replace
---

By default, it pushes to history, but you may use `replace` to replace current history state.

```tsx
<Link replace href="/">
  home
</Link>
```

## class
---

You can add root or active link class

```tsx
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

```tsx
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

## exact
---

By default, active class appends if URL starts with `href` prop value, but use `exact` to compare exactly.

```tsx
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

## scroll
---

You can use smooth scroll

```css
body, html {
  scroll-behavior: smooth;
}
```
The property of `scroll` says should we scroll on click and how.

> by default equals `before`

```tsx
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

## scrollTo
---

If you want to scroll the page to custom position (by default it's up of the page) use `scrollTo`

```tsx
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
