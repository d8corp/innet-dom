import { Button, DelayPage, Title, Typography } from '../../ui'
import styles from './NotFoundPage.scss'

export default function NotFoundPage () {
  return (
    <DelayPage justify='center' align='center' class={styles.root}>
      <Typography>
        <Title class={styles.h1}>404</Title>
        <h2>Page Not Found</h2>
        <p>
          The page you're looking for doesn't exist.
        </p>
        <Button size='l' element='a' href='/'>
          Go Home
        </Button>
      </Typography>
    </DelayPage>
  )
}
