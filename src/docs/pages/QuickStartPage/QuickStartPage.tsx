import { DelayPage, Markdown, Typography } from '../../ui'
import description from './QuickStartPage.md'

export default function QuickStartPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
