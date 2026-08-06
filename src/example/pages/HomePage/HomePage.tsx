import { Compute, State } from 'watch-state'

import { Page } from '../../components'
import styles from './HomePage.module.scss'
import logo from './logo.svg'

const name = new State('World')
const world = new Compute(() => name.value ? `, ${name.value}` : '')

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  name.value = target.value
}

export default function HomePage () {
  return (
    <Page class={styles.root}>
      <img
        src={logo}
        width={300}
        style={{ margin: '0 auto' }}
        alt='innet'
      />
      <h1 class={styles.header}>
        Hello{world}!
      </h1>
      <input
        class={styles.input}
        value={name}
        oninput={handleInput}
        placeholder='Enter your name'
      />
    </Page>
  )
}
