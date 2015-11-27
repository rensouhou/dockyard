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
  apiDataPrefix: 'svdata=',
  apiPathPrefix: /.*\/kcsapi/,
  datakeyPrefix: 'api_',
  acceptedContentTypes: T.List.of('text/javascript', 'text/plain')
});

let NetworkRequestResultRecord = T.Record({
  path: null,
  event: UNKNOWN_EVENT,
  requestGetData: [],
  requestPostData: []
});

class NetworkRequestHandler {
  path = null;
  url = null;
  event = UNKNOWN_EVENT;

  requestGetData = null;
  requestPostData = null;

  /**
   * @param {ApiDataResultObject} result
   * @param {object} [options]
   */
  constructor(result, options) {
    this.request = result.request;
    this.options = new NetworkRequestHandlerRecord(options || {});

    this._parseRequest();
  }

  /**
   * Checks if the request is valid to handle or not
   * @returns {boolean}
   */
  isRequestValid() {
    let foundContentType = T.fromJS(this.request.headers)
      .find((it) => it.get('name') === 'Content-Type');

    if (!foundContentType) {
      return false;
    }

    return this.options.get('acceptedContentTypes').includes(foundContentType.get('value'));
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

    if (content.includes(dataPrefix)) {
      content = content.substring(dataPrefix);
      let data = null;

      try {
        data = JSON.parse(content)['api_data'];
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
    invariant(this.path, 'Cannot detect game event without a path. Check the calling method.');
    let gameEvent = GameApiEvents.findEntry((event, pathFragment) => this.path.includes(pathFragment));

    if (!!gameEvent && gameEvent.length > 1) {
      this.event = gameEvent[1];
    }
  }

  /**
   * Parse the request into a somewhat usable form (for now)
   * @private
   */
  _parseRequest() {
    const { request, response, content } = this.result;

    let path = this._getApiPath(request.url);
    let requestPostData = T.Map(qs.parse(request.postData) || {})
      .filterNot((v, k) => (k.includes('api_token') || k.includes('api_verno'))).toJS();
    let requestGetData = this._parseDataBody(content) || null;
    let event = this._getGameEvent(path);

    this.path = path;
    this.event = event;
    this.requestGetData = requestGetData;
    this.requestPostData = requestPostData;
  }

  /**
   * Get the current usable API path
   * @private
   */
  _getApiPath() {
    this.path = this.url.replace(this.options.get('apiPathPrefix'), '');
  }
}

export default NetworkRequestHandler;