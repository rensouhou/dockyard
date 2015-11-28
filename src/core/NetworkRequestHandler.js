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

import GameApiEvents from '../game/ApiEvents';
import config from '../config/extension';
import AddonEvent from '../enums/addonEvents';

const UNKNOWN_EVENT = 'UNKNOWN_EVENT';

let NetworkRequestHandlerRecord = T.Record({
  apiDataPrefix: config.apiDataPrefix,
  apiPathPrefix: config.apiPathPrefix,
  datakeyPrefix: config.datakeyPrefix,
  acceptedContentTypes: T.List(config.acceptedContentTypes)
});

/**
 * @type {*|any|Record.Class}
 */
let NetworkRequestResultRecord = T.Record({
  path: null,
  event: UNKNOWN_EVENT,
  requestGetData: null,
  requestPostData: null
});

class NetworkRequestHandler {
  path = null;
  url = null;
  event = UNKNOWN_EVENT;
  options = new NetworkRequestHandlerRecord();

  requestGetData = null;
  requestPostData = null;

  /**
   * @param {ApiDataResultObject} result
   */
  constructor(result) {
    this.result = result;

    this._parseRequest();
  }

  /**
   * Checks if the request is valid to handle or not
   * @returns {boolean}
   *
   * @fixme This shit ain't working
   */
  static isRequestValid(headers) {
    console.log('isRequestValid; headers =>', headers);
    let foundContentType = T.Map(headers);
    let accepted = T.List(config.acceptedContentTypes);

    console.log('foundContentType =>', foundContentType);

    foundContentType = foundContentType.find((it) => {
      console.log('\t=>', it);

      return !!it ? it.name === 'Content-Type' : false;
    });

    if (!foundContentType) {
      return false;
    }

    return accepted.get('acceptedContentTypes').includes(foundContentType.get('value'));
  }

  /**
   * @returns {Map<string, V>}
   */
  getData() {
    return new NetworkRequestResultRecord({
      event: this.event,
      path: this.path,
      requestGetData: this.requestGetData,
      requestPostData: this.requestPostData
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
   * @returns {array|object|null}
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

    this.requestPostData = T.Map(qs.parse(request.postData) || {})
      .filterNot((v, k) => (k.includes('api_token') || k.includes('api_verno'))).toJS();
    this.requestGetData = this._parseDataBody(content) || null;
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