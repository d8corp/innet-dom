import './styles.scss'

import { innet } from 'innet'

import { Router } from '../components'
import { handler } from '../handler'
import { routing } from './routing'

innet(<Router routing={routing} />, handler)
