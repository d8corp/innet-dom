import { DelayPage, Markdown, Typography } from '../../ui'
import description from './UseParamPage.md'

export default function UseParamPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
