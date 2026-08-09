import { DelayPage, Markdown, Typography } from '../../ui'
import description from './StylingPage.md'

export default function StylingPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
