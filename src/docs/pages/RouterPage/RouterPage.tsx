import { DelayPage, Markdown, Typography } from '../../ui'
import description from './RouterPage.md'

export default function RouterPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
