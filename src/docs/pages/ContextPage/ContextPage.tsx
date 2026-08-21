import { DelayPage, Markdown, Typography } from '../../ui'
import description from './ContextPage.md'

export default function ContextPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
