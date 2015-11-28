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

import AddonEvent from '../enums/addonEvents';

chrome.runtime.onConnect.addListener((port) => {
  console.log('Added listener for %O !', port);

  port.onMessage.addListener((msg) => {
    if (_.isArray(msg)) {
      console.log.apply(console, ['debug =>'].concat(msg));
    }

    if (msg.event && msg.event === AddonEvent.API_DATA_RECEIVED) {
      const { chromeNetworkRequest, content } = msg;
      const { request, response } = chromeNetworkRequest;

      let RequestHandler = new NetworkRequestHandler({ request, response, content });

      let _result = RequestHandler.getData();
      console.log('_result =>', _result.toJS());
    }
  })
});

