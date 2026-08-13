import { DelayPage, Markdown, Typography } from '../../ui'
import description from './HidePage.md'

export default function HidePage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
