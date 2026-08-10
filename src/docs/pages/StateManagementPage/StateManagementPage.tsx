import { DelayPage, Markdown, Typography } from '../../ui'
import description from './StateManagementPage.md'

export default function StateManagementPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
