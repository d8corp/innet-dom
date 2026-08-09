import { DelayPage, Markdown, Typography } from '../../ui'
import description from './LifecyclePage.md'

export default function LifecyclePage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
