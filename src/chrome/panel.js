/**
 * @overview
 *
 *
 * @since 0.1.0
 * @version 0.1.0
 * @module src/chrome/panel
 */
import T from 'immutable';

import config from '../config/extension';
import AddonEvent from '../enums/addonEvents';

const port = chrome.runtime.connect({ name: config.channelName });

try {
  chrome.devtools.network.onRequestFinished.addListener(
    /**
     * @param {NetworkRequest} chromeNetworkRequest
     */
    (chromeNetworkRequest) => {
      try {
        let request = T.fromJS(chromeNetworkRequest.request);
        let response = T.fromJS(chromeNetworkRequest.response);
        let requestHeaders = request.get('headers');
        let responseHeaders = response.get('headers');
        let acceptedContentTypes = T.List(config.acceptedContentTypes);

        let contentType = responseHeaders.find((it) => {
          return it.get('name') === 'Content-Type';
        });

        if (contentType && contentType.size > 0 && acceptedContentTypes.includes(contentType.get('value'))) {
          port.postMessage(['contentType =>', contentType]);

          chromeNetworkRequest.getContent((content) => {
            port.postMessage({ event: AddonEvent.API_DATA_RECEIVED, chromeNetworkRequest, content });
          });
        }
      }
      catch (e) {
        alert('e => ' + JSON.stringify(e.message));
      }
    });

  chrome.runtime.onUpdateAvailable.addListener((details) => {
    console.log('onUpdateAvailable =>', details);
    port.postMessage(['onUpdateAvailable', JSON.parse(JSON.stringify(details))])
  })
}
catch (e) {
  port.postMessage(['error', e]);
}

require('../app/application');