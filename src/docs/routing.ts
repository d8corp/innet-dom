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
            path: 'quick-start',
            component: lazy(() => import('./pages/QuickStartPage')),
          },
          {
            index: true,
            path: 'components',
            component: lazy(() => import('./pages/ComponentsPage')),
          },
          {
            index: true,
            path: 'state-management',
            component: lazy(() => import('./pages/StateManagementPage')),
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
          {
            index: true,
            path: 'portal',
            component: lazy(() => import('./pages/PortalPage')),
          },
        ],
      },
      {
        component: lazy(() => import('./pages/NotFoundPage')),
      },
    ],
  },
])
