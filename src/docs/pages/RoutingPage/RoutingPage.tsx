import { DelayPage, Markdown, Typography } from '../../ui'
import description from './RoutingPage.md'

export default function RoutingPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
