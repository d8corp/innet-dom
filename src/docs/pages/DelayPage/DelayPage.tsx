import { DelayPage, Markdown, Typography } from '../../ui'
import description from './DelayPage.md'

export default function () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
