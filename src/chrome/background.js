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
import dispatcher from '../core/GameDataDispatcher';

let ApiDataHandler = new GameDataHandler();

chrome.runtime.onConnect.addListener(
  /**
   * @param {Port} port
   */
  function (port) {
    console.log('Added listener for channel %s', port.name);

    port.onMessage.addListener(
      /**
       * @param {Dockyard.NetworkEventMsg} msg
       */
      function (msg) {
        if (_.isArray(msg)) {
          console.log.apply(console, ['debug =>'].concat(msg));
        }

        if (msg.event && msg.event === AddonEvent.API_DATA_RECEIVED) {
          const { chromeNetworkRequest, content } = msg;
          const { request, response } = chromeNetworkRequest;
          const timestamp = +(new Date());

          let RequestHandler = new NetworkRequestHandler({ timestamp, request, response, content });
          let resultRecord = RequestHandler.getData();

          let r = resultRecord.toJS();

          console.group('Event => %s', r.event);
          console.info('path\t\t=> %s', r.path);
          console.info('timestamp\t=> %s', timestamp);
          console.info('GET\t\t\t=> %O', r.method.GET);
          console.info('POST\t\t=> %O', r.method.POST);
          console.groupEnd();

          ApiDataHandler.handleEvent(resultRecord, dispatcher);
        }
      })
  });

