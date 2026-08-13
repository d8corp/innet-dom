import { DelayPage, Markdown, Typography } from '../../ui'
import description from './ContextProviderPage.md'

export default function ContextProviderPage () {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={description} />
      </Typography>
    </DelayPage>
  )
}
