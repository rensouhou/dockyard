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
import Firebase from 'firebase';

import '../common';
import NetworkRequestHandler from '../core/NetworkRequestHandler';
import GameDataHandler from '../core/game/GameDataHandler';

import AddonEvent from '../enums/addonEvents';
import { firebaseRef } from '../../runtime/firebase';

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
        const timeStamp = +(new Date());

        let RequestHandler = new NetworkRequestHandler({ timeStamp, request, response, content });
        let _result = RequestHandler.getData();

        // Just dump everything into Firebase
        let r = _result.toJS();
        firebaseRef.child(r.event).push(r);

        console.group('Event => %s', r.event);
        console.info('requestGetData\t=> %O', r.requestGetData);
        console.info('requestPostData\t=> %O', r.requestPostData);
        console.log('rest\t\t\t=> %O', r);
        console.groupEnd();
      }
    })
});

