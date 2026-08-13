import 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import './styles/external.global.scss'
import './styles/base.scss'

import { innet } from 'innet'

import { Router } from '../components'
import { handler } from '../handler'
import { removeLoading, scrollToHash } from './helpers'
import { routing } from './routing'

removeLoading()
scrollToHash()

innet(<Router routing={routing} />, handler)
