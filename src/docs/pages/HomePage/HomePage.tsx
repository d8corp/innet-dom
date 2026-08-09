import { Button, DelayPage, Dot, Title } from '../../ui'
import styles from './HomePage.scss'

export default function HomePage () {
  const version = process.env.INNETJS_PACKAGE_VERSION ?? '0.0.0'

  return (
    <DelayPage padding={[40, 24]} align='center' justify='center' class={styles.root}>
      <div class={styles.content}>
        <div class={styles.version}>
          <Dot size='s' color={version.includes('alpha') ? 'error' : version.includes('beta') ? 'warning' : 'success'} />
          v{process.env.INNETJS_PACKAGE_VERSION} is now available
        </div>
        <Title title='@innet/dom — Frontend Framework' class={styles.title}>
          Frontend Framework
        </Title>
        <p class={styles.description}>
          A lightweight frontend framework with fine-grained reactivity, JSX, and direct DOM manipulation. Build
          faster apps with smaller bundles.
        </p>
        <div class={styles.buttons}>
          <Button element='a' size='l' href='/quick-start'>
            Get Started
          </Button>
          <Button
            view='secondary' size='l'
            element='a'
            href='https://github.com/d8corp/innet-dom'
            target='_blank'
          >
            View on GitHub
          </Button>
        </div>
        <div class={styles.features}>
          <span>⚡ No VDOM diffing</span>
          <span>📦 ~3KB gzipped</span>
          <span>🔥 Fine-grained reactivity</span>
        </div>
      </div>
    </DelayPage>

  )
}
