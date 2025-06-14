import { locationSearch } from '@watch-state/history-api';
import { Cache } from 'watch-state';
import '../parseSearch/index.es6.js';
import { parseSearch } from '../parseSearch/parseSearch.es6.js';

const parsedSearch = new Cache(() => parseSearch(locationSearch.value));

export { parsedSearch };
