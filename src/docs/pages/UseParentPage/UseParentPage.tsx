import { DelayPage, Markdown, Typography } from '../../ui'
import description from './UseParentPage.md'

export default function UseParentPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
