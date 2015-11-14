/**
 * @overview
 *
 * @since 0.1.0
 * @version 0.1.0
 * @module chrome/panel
 */
import T from 'immutable';
import kancolleApi from '../config/kancolleApi';

const port = chrome.runtime.connect({ name: kancolleApi.channelName });

chrome.devtools.network.onRequestFinished.addListener((networkRequest) => {
  const { response, request } = networkRequest;
  const acceptedContent = T.List.of('text/javascript', 'text/html', 'text/plain');


});
