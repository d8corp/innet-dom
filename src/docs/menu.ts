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
        href: '/routing',
        children: 'Routing',
      },
      {
        href: '/lifecycle',
        children: 'Lifecycle',
      },
      {
        href: '/styling',
        children: 'Styling',
      },
      {
        href: '/jsx-guide',
        children: 'JSX Guide',
      },
    ],
  },
  {
    title: 'Components',
    children: [
      {
        href: '/',
        exact: true,
        children: 'Portal',
      },
      {
        href: '/',
        exact: true,
        children: 'ContextProvider',
      },
      {
        href: '/',
        exact: true,
        children: 'Show / Hide',
      },
      {
        href: '/',
        exact: true,
        children: 'For',
      },
      {
        href: '/',
        exact: true,
        children: 'Router',
      },
      {
        href: '/',
        exact: true,
        children: 'Link',
      },
      {
        href: '/',
        exact: true,
        children: 'Delay',
      },
    ],
  },
  {
    title: 'Hooks',
    children: [
      {
        href: '/',
        exact: true,
        children: 'useParam',
      },
      {
        href: '/',
        exact: true,
        children: 'useParams',
      },
      {
        href: '/',
        exact: true,
        children: 'useParent',
      },
    ],
  },
  {
    title: 'Utils',
    children: [
      {
        href: '/',
        exact: true,
        children: 'Ref',
      },
      {
        href: '/',
        exact: true,
        children: 'Context',
      },
      {
        href: '/',
        exact: true,
        children: 'style',
      },
    ],
  },
]
