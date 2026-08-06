import { Link } from '../../../components'
import type { ChildrenProps } from '../../../types'
import styles from './AppLayout.scss'

export default function AppLayout ({ children }: ChildrenProps) {
  return (
    <>
      <header class={styles.header}>
        <Link href='/' exact class={styles}>Home</Link>
        <Link href='/settings' class={styles}>Settings</Link>
        <Link href='/any-other' class={styles}>404</Link>
      </header>
      <main class={styles.main}>
        {children}
      </main>
    </>
  )
}
