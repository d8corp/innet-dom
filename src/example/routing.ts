import { createRouting } from '../components'
import { lazy } from '../utils'
import AppLayout from './layouts/AppLayout'

const HomePage = lazy(() => import('./pages/HomePage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export const routing = createRouting([
  {
    component: AppLayout,
    children: [
      { index: true, component: HomePage },
      { index: true, path: 'settings', component: SettingsPage },
      { component: NotFoundPage },
    ],
  },
])
