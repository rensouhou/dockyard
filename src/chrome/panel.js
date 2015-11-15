/**
 * @overview
 *
 * @since 0.1.0
 * @version 0.1.0
 * @module chrome/panel
 */
import T from 'immutable';
import config from '../config/kancolleApi';
import AddonEvent from '../enums/addonEvents';

const port = chrome.runtime.connect({ name: config.channelName });

try {
  chrome.devtools.network.onRequestFinished.addListener((requestResult) => {
    requestResult.getContent((content) => {
      port.postMessage({ event: AddonEvent.API_DATA_RECEIVED, requestResult, content });
    });
  });
}
catch (e) {
  alert('error: ' + JSON.stringify(e.message));
}