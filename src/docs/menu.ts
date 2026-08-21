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
        href: '/styling',
        children: 'Styling',
      },
      {
        href: '/context',
        exact: true,
        children: 'Context',
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
        href: '/show',
        exact: true,
        children: 'Show',
      },
      {
        href: '/hide',
        exact: true,
        children: 'Hide',
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
        href: '/use-param',
        exact: true,
        children: 'useParam',
      },
      {
        href: '/use-params',
        exact: true,
        children: 'useParams',
      },
      {
        href: '/use-parent',
        exact: true,
        children: 'useParent',
      },
    ],
  },
  {
    title: 'Utils',
    children: [
      {
        href: '/ref',
        exact: true,
        children: 'Ref',
      },
      {
        href: '/context',
        exact: true,
        children: 'Context',
      },
      {
        href: '/style',
        exact: true,
        children: 'style',
      },
    ],
  },
]
