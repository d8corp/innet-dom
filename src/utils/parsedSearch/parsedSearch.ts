import { locationSearch } from '@watch-state/history-api'
import { Cache } from 'watch-state'

import { parseSearch } from '../parseSearch'

export const parsedSearch = new Cache(() => parseSearch(locationSearch.value))
