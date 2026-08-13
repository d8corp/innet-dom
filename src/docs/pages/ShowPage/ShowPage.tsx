import { DelayPage, Markdown, Typography } from '../../ui'
import description from './ShowPage.md'

export default function ShowPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
