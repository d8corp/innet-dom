'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var historyApi = require('@watch-state/history-api');
var watchState = require('watch-state');
require('../parseSearch/index.js');
var parseSearch = require('../parseSearch/parseSearch.js');

const parsedSearch = new watchState.Cache(() => parseSearch.parseSearch(historyApi.locationSearch.value));

exports.parsedSearch = parsedSearch;
