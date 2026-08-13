import { createRouting } from '../components'
import { lazy } from '../utils'
import { MainLayout } from './layouts/MainLayout'
import { MenuLayout } from './layouts/MenuLayout'
import { LoadingPage } from './pages/LoadingPage'

export const routing = createRouting([
  {
    component: MainLayout,
    children: [
      {
        index: true,
        fallback: <LoadingPage />,
        component: lazy(() => import('./pages/HomePage')),
      },
      {
        component: MenuLayout,
        children: [
          {
            index: true,
            path: 'quick-start',
            fallback: <LoadingPage />,
            component: lazy(async () => {
              // await new Promise(resolve => setTimeout(resolve, 100000))

              return await import('./pages/QuickStartPage')
            }),
          },
          {
            index: true,
            path: 'components',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/ComponentsPage')),
          },
          {
            index: true,
            path: 'state-management',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/StateManagementPage')),
          },
          {
            index: true,
            path: 'routing',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/RoutingPage')),
          },
          {
            index: true,
            path: 'lifecycle',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/LifecyclePage')),
          },
          {
            index: true,
            path: 'styling',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/StylingPage')),
          },
          {
            index: true,
            path: 'portal',
            fallback: <LoadingPage />,
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
