/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/NetworkRequestHandler
 */
import T from 'immutable';
import invariant from 'invariant';
import qs from 'query-string';

import GameApiEvents from './game/ApiEvents';
import config from '../config/extension';
import AddonEvent from '../enums/addonEvents';

import { NetworkRequestResult } from './models';

const UNKNOWN_EVENT = 'UNKNOWN_EVENT';

let NetworkRequestHandlerRecord = T.Record({
  apiDataPrefix: config.apiDataPrefix,
  apiPathPrefix: config.apiPathPrefix,
  datakeyPrefix: config.datakeyPrefix,
  acceptedContentTypes: T.List(config.acceptedContentTypes)
});

/**
 * @type {Dockyard.NetworkRequestHandler}
 */
class NetworkRequestHandler {
  path = null;
  url = null;
  event = UNKNOWN_EVENT;
  options = new NetworkRequestHandlerRecord();
  method = {
    GET: null,
    POST: null
  };

  /**
   * @param {ApiDataResultObject} result
   */
  constructor(result) {
    this.result = result;
    this._parseRequest();
  }

  /**
   * Returns an immutable `NetworkRequestRecord`
   * @returns {NetworkEvent}
   */
  getData() {
    return new NetworkRequestResult({
      event: this.event,
      path: this.path,
      method: this.method
    });
  }

  /**
   * @returns {HttpRequest}
   */
  getRequest() {
    return this.result.request;
  }

  /**********************************************
   * Private methods
   **********************************************/

  /**
   * @param {string} content
   * @returns {?array}
   * @private
   */
  _parseDataBody(content) {
    let dataPrefix = this.options.get('apiDataPrefix');

    if (content.indexOf(dataPrefix) !== -1) {
      let _content = content.substring(dataPrefix.length);
      let data = null;

      try {
        data = JSON.parse(_content)['api_data'];
      }
      catch (e) {
        console.error('Error parsing result', e.message, e.stack);
      }

      return data;
    }

    return null;
  }

  /**
   */
  _getGameEvent() {
    let gameEvent = GameApiEvents.findEntry((event, pathFragment) => this.path.includes(pathFragment));

    if (gameEvent && gameEvent.length > 1) {
      return gameEvent[1];
    }

    return UNKNOWN_EVENT;
  }

  /**
   * Parse the request into a somewhat usable form (for now)
   * @private
   */
  _parseRequest() {
    let request = this.result.request;
    let response = this.result.response;
    let content = this.result.content;

    this.path = this._getApiPath();
    this.event = this._getGameEvent();

    this.method = {
      POST: T.Map(qs.parse((request.postData ? request.postData.text : '')) || {})
        .filterNot((v, k) => (k.includes('api_token') || k.includes('api_verno'))).toJS(),
      GET: this._parseDataBody(content)
    };
  }

  /**
   * Get the current usable API path
   * @private
   */
  _getApiPath() {
    let request = this.getRequest();
    return request.url ? request.url.replace(this.options.get('apiPathPrefix'), '') : null;
  }
}

export default NetworkRequestHandler;