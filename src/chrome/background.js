/**
 * @overview
 *
 * @since 0.1.0
 * @version 0.1.0
 * @module chrome/background
 */

import T from 'immutable';

import kancolleApi from '../config/kancolleApi';

const port = chrome.runtime.connect({ name: kancolleApi.channelName });


