import { DelayPage, Markdown, Typography } from '../../ui'
import description from './UseParamsPage.md'

export default function UseParamsPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
