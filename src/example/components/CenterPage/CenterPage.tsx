import { Page } from '../Page'

import type { ChildrenProps } from '../../../types'
import styles from './CenterPage.module.scss'

export function CenterPage ({ children }: ChildrenProps) {
  return <Page class={styles.root}>{children}</Page>
}
