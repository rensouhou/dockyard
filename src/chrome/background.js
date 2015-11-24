/**
 * @overview
 *  Chrome extension background script
 *
 * @since 0.1.0
 * @version 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/chrome/background
 */
import _ from 'lodash';
import T from 'immutable';

import NetworkRequestHandler from '../core/NetworkRequestHandler';
import ApiDataParser from '../core/ApiDataParser';

import kancolleApi from '../config/extension';
import AddonEvent from '../enums/addonEvents';

chrome.runtime.onConnect.addListener((port) => {
  console.log('Added listener for %O', port);

  port.onMessage.addListener((msg) => {
    if (_.isArray(msg)) {
      console.log.apply(console, ['debug => '].concat(msg));
    }

    if (msg.event && msg.event === AddonEvent.API_DATA_RECEIVED) {
      let requestResult = msg.requestResult;
      let requestContent = msg.content;

      console.log('API_DATA_RECEIVED');

      /** @type {ApiDataResultObject} */
      let result = {
        request: requestResult.request,
        response: requestResult.response,
        content: requestContent
      };

      let RequestHandler = new NetworkRequestHandler(result);

      if (RequestHandler.isRequestValid()) {
        console.log('request is valid');
      }
    }
  })
});

