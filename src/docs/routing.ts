import { createRouting } from '../components'
import { lazy } from '../utils'
import { MainLayout } from './layouts/MainLayout'
import { MenuLayout } from './layouts/MenuLayout'

export const routing = createRouting([
  {
    component: MainLayout,
    children: [
      {
        index: true,
        component: lazy(() => import('./pages/HomePage')),
      },
      {
        component: MenuLayout,
        children: [
          {
            index: true,
            path: 'installation',
            component: lazy(() => import('./pages/InstallationPage')),
          },
          {
            index: true,
            path: 'quick-start',
            component: lazy(() => import('./pages/QuickStartPage')),
          },
          {
            index: true,
            path: 'routing',
            component: lazy(() => import('./pages/RoutingPage')),
          },
          {
            index: true,
            path: 'lifecycle',
            component: lazy(() => import('./pages/LifecyclePage')),
          },
          {
            index: true,
            path: 'styling',
            component: lazy(() => import('./pages/StylingPage')),
          },
        ],
      },
      {
        component: lazy(() => import('./pages/NotFoundPage')),
      },
    ],
  },
])
