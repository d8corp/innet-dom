# Routing
---

Powerful, declarative routing with nested layouts, code splitting, and permission-based access control.

```tsx
//! routing.tsx
import { Router, createRouting, lazy } from '@innet/dom'

const routing = createRouting([
  {
    index: true,
    component: lazy(() => import('./Home'))
  },
  {
    path: 'settings',
    component: lazy(() => import('./SettingsLayout')),
    children: [
      { index: true, component: () => 'Settings Index' },
      { path: ':id', component: () => 'Detail' },
    ]
  },
  { component: () => '404' }
])
```
