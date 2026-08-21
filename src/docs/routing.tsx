import { createRouting } from '../components'
import { lazy } from '../utils'
import { BASE_URL } from './constants'
import { MainLayout } from './layouts/MainLayout'
import { MenuLayout } from './layouts/MenuLayout'
import { LoadingPage } from './pages/LoadingPage'

export const routing = createRouting([
  {
    path: BASE_URL,
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
            component: lazy(() => import('./pages/QuickStartPage')),
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
          {
            index: true,
            path: 'context',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/ContextPage')),
          },
          {
            index: true,
            path: 'for',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/ForPage')),
          },
          {
            index: true,
            path: 'router',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/RouterPage')),
          },
          {
            index: true,
            path: 'link',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/LinkPage')),
          },
          {
            index: true,
            path: 'delay',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/DelayPage')),
          },
          {
            index: true,
            path: 'show',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/ShowPage')),
          },
          {
            index: true,
            path: 'hide',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/HidePage')),
          },
          {
            index: true,
            path: 'use-param',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/UseParamPage')),
          },
          {
            index: true,
            path: 'use-params',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/UseParamsPage')),
          },
          {
            index: true,
            path: 'use-parent',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/UseParentPage')),
          },
          {
            index: true,
            path: 'ref',
            fallback: <LoadingPage />,
            component: lazy(() => import('./pages/RefPage')),
          },
        ],
      },
      {
        component: lazy(() => import('./pages/NotFoundPage')),
      },
    ],
  },
])
