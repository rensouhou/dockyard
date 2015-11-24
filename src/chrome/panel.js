/**
 * @overview
 *
 *
 * @since 0.1.0
 * @version 0.1.0
 * @module src/chrome/panel
 */
import config from '../config/extension';
import AddonEvent from '../enums/addonEvents';

const port = chrome.runtime.connect({ name: config.channelName });

try {
  chrome.devtools.network.onRequestFinished.addListener((requestResult) => {
    requestResult.getContent((content) => {
      port.postMessage({ event: AddonEvent.API_DATA_RECEIVED, requestResult, content });
    });
  });

  chrome.runtime.onUpdateAvailable.addListener((details) => {
    console.log('onUpdateAvailable =>', details);
    port.postMessage(['onUpdateAvailable', JSON.parse(JSON.stringify(details))])
  })
}
catch (e) {
  alert('error: ' + JSON.stringify(e.message));
}

require('../app/application');