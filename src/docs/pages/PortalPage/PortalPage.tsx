import { DelayPage, Markdown, Typography } from '../../ui'
import description from './PortalPage.md'

export default function PortalPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
