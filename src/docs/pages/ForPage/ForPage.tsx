import { DelayPage, Markdown, Typography } from '../../ui'
import description from './ForPage.md'

export default function ForPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
