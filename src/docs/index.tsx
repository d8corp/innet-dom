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
import Timer from 'sync-timer'

import { Router } from '../components'
import { handler } from '../handler'
import { routing } from './routing'

const loading = document.getElementById('loading')

if (loading) {
  loading.style.opacity = '0'

  new Timer(() => {
    loading.remove()
  }, 300)
}

innet(<Router routing={routing} />, handler)
