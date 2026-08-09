import { DelayPage, Markdown, Typography } from '../../ui'
import installation from './instalation.md'

export default function InstallationPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={installation} />
      </Typography>
    </DelayPage>
  )
}
