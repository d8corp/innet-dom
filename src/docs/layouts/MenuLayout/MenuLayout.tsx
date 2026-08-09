import type { LinkProps } from '../../../components'
import { Link } from '../../../components'
import type { ChildrenProps } from '../../../types'
import { DelayPage, Flex } from '../../ui'
import styles from './MenuLayout.scss'

interface MenuItem {
  title: string
  children: LinkProps[]
}

const menu: MenuItem[] = [
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
      {
        href: '/state-management',
        children: 'State Management',
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

export function MenuLayout ({ children }: ChildrenProps) {
  const itemClass = { root: styles.item, active: styles.itemSelected }

  return (
    <DelayPage class={styles.root} padding={[40, 24]} gap={24} vertical={false}>
      <Flex element='aside' vertical gap={24} class={styles.menu}>
        {menu.map(({ title, children }) => (
          <Flex vertical gap={10}>
            <div class={styles.group}>{title}</div>
            <Flex vertical gap={4}>
              {children.map(props => <Link {...props} class={itemClass} />)}
            </Flex>
          </Flex>
        ))}
      </Flex>

      <Flex element='main' flex class={styles.main}>
        {children}
      </Flex>

      <aside class={styles.submenu}>
        <div class={styles.submenuTitle}>
          On this page
        </div>
        <Flex vertical gap={8} class={styles.submenuContent}>
          <Link href='/' class={styles.subItem}>Installation</Link>
          <Link href='/' class={styles.subItem}>Quick Start</Link>
          <Link href='/' class={styles.subItem}>Components</Link>
          <Link href='/' class={styles.subItem}>Router</Link>
          <Link href='/' class={styles.subItem}>Lifecycle</Link>
          <Link href='/' class={styles.subItem}>Styling</Link>
        </Flex>
      </aside>
    </DelayPage>
  )
}
