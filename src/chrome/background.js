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

import '../common';
import NetworkRequestHandler from '../core/NetworkRequestHandler';
import { GameDataHandler } from '../core/game/index';

import AddonEvent from '../enums/addonEvents';

import { firebaseRef } from '../../runtime/firebase';

let ApiDataHandler = new GameDataHandler();

chrome.runtime.onConnect.addListener((port) => {
  console.log('Added listener for channel %s', port.name);

  port.onMessage.addListener(
    /**
     * @param {NetworkEventMsg} msg
     */
    (msg) => {
      if (_.isArray(msg)) {
        console.log.apply(console, ['debug =>'].concat(msg));
      }

      if (msg.event && msg.event === AddonEvent.API_DATA_RECEIVED) {
        const { chromeNetworkRequest, content } = msg;
        const { request, response } = chromeNetworkRequest;
        const timestamp = +(new Date());

        let RequestHandler = new NetworkRequestHandler({ timestamp, request, response, content });
        let _result = RequestHandler.getData();

        // Just dump everything into Firebase
        let r = _result.toJS();
        firebaseRef.child(r.event).push(r);

        console.group('Event => %s', r.event);
        console.info('path\t\t\t=> %s', r.path);
        console.info('timestamp\t\t=> %s', timestamp);
        console.info('requestGetData\t=> %O', r.requestGetData);
        console.info('requestPostData\t=> %O', r.requestPostData);
        console.groupEnd();

        ApiDataHandler.handleEvent(_result);
      }
    })
});

