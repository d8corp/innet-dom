import { DelayPage, Markdown, Typography } from '../../ui'
import description from './RefPage.md'

export default function RefPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
