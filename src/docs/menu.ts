import type { LinkProps } from '../components'

interface MenuItem {
  title: string
  children: LinkProps[]
}

export const menu: MenuItem[] = [
  {
    title: 'Getting Started',
    children: [
      {
        href: '/quick-start',
        children: 'Quick Start',
      },
      {
        href: '/components',
        children: 'Components',
      },
      {
        href: '/state-management',
        children: 'State Management',
      },
      {
        href: '/lifecycle',
        children: 'Lifecycle',
      },
      {
        href: '/styling',
        children: 'Styling',
      },
    ],
  },
  {
    title: 'Components',
    children: [
      {
        href: '/portal',
        exact: true,
        children: 'Portal',
      },
      {
        href: '/context-provider',
        exact: true,
        children: 'ContextProvider',
      },
      {
        href: '/404',
        exact: true,
        children: 'Show / Hide',
      },
      {
        href: '/for',
        exact: true,
        children: 'For',
      },
      {
        href: '/router',
        exact: true,
        children: 'Router',
      },
      {
        href: '/link',
        exact: true,
        children: 'Link',
      },
      {
        href: '/delay',
        exact: true,
        children: 'Delay',
      },
    ],
  },
  {
    title: 'Hooks',
    children: [
      {
        href: '/404',
        exact: true,
        children: 'useParam',
      },
      {
        href: '/404',
        exact: true,
        children: 'useParams',
      },
      {
        href: '/404',
        exact: true,
        children: 'useParent',
      },
    ],
  },
  {
    title: 'Utils',
    children: [
      {
        href: '/404',
        exact: true,
        children: 'Ref',
      },
      {
        href: '/404',
        exact: true,
        children: 'Context',
      },
      {
        href: '/404',
        exact: true,
        children: 'style',
      },
    ],
  },
]
