import { DelayPage, Markdown, Typography } from '../../ui'
import description from './LinkPage.md'

export default function LinkPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
