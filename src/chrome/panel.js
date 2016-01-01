/**
 * @overview
 *
 * @since 0.1.0
 * @version 0.1.1
 * @module src/chrome/panel
 *
 * @fixme Externalize this handler into its own class
 */
import T from 'immutable';
import invariant from 'invariant';

import { ExtensionEvent } from '../core/game/constants';
import { extension } from '../config';

const port = chrome.runtime.connect({ name: extension.channelName });

try {

  chrome.devtools.network.onRequestFinished.addListener(
    /**
     * @type {chrome.devtools.network.onRequestFinished}
     * @param {Dockyard.Request} chromeNetworkRequest
     */
    function (chromeNetworkRequest) {
      try {
        let request = T.fromJS(chromeNetworkRequest.request);
        let response = T.fromJS(chromeNetworkRequest.response);
        let requestHeaders = request.get('headers');
        let responseHeaders = response.get('headers');
        let acceptedContentTypes = T.List(extension.acceptedContentTypes);

        let contentType = responseHeaders.find((it) => it.get('name') === 'Content-Type');

        if (contentType && contentType.size > 0 && acceptedContentTypes.includes(contentType.get('value'))) {
          chromeNetworkRequest.getContent((content) => {
            port.postMessage({ event: ExtensionEvent.API_DATA_RECEIVED, chromeNetworkRequest, content });
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
  let error = new Error();

  error.name = 'Error in Panel';
  error.framesToPop = 1;
  error.message = e.message;

  port.postMessage([error]);
}

/**
 * Front-end starts here some day
 */
require('../app/application');