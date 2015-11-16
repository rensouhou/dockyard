/**
 * @overview
 *  Chrome extension background script
 *
 * @since 0.1.0
 * @version 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module chrome/background
 */

import _ from 'lodash';
import T from 'immutable';

import NetworkRequestHandler from '../core/NetworkRequestHandler';
import kancolleApi from '../config/kancolleApi';
import AddonEvent from '../enums/addonEvents';

let RequestHandler = new NetworkRequestHandler();

chrome.runtime.onConnect.addListener((port) => {
  console.log('Added listener for %O', port);

  port.onMessage.addListener((msg) => {
    // @fixme Debugging and horrible, horrible horribleness
    if (typeof msg === 'string') {
      console.log(msg);
    }
    else if (_.isArray(msg)) {
      console.log.apply(console, ['console.log.apply =>'].concat(msg));
    }
    else if (msg.event && msg.event === AddonEvent.API_DATA_RECEIVED) {
      let requestResult = msg.requestResult;
      let requestContent = msg.content;

      let result = {
        request: requestResult.request,
        response: requestResult.response,
        timings: requestResult.timings,
        content: requestContent
      };

      if (RequestHandler.shouldRequestBeHandled(requestResult.response.headers)) {
        let a = RequestHandler.parseRequest(result);
        console.log('RequestHandler.parseRequest =>\n\t', a);
      }
    }
  })
});

