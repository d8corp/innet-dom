import type { ChildrenProps } from '../../../types'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Flex } from '../../ui'
import styles from './MainLayout.scss'

export function MainLayout ({ children }: ChildrenProps) {
  return (
    <Flex vertical flex>
      <Flex vertical flex class={styles.wrapper}>
        <Header />
        <Flex flex vertical class={styles.content}>
          {children}
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  )
}
