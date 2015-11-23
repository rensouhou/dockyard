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

import kancolleApi from '../config/extension';
import KancolleApiEvents from '../game/ApiEvents';
import AddonEvent from '../enums/addonEvents';
import { Parse as P } from '../core/Helpers';

const UNKNOWN_EVENT = 'UNKNOWN_EVENT';

let NetworkRequestHandlerRecord = T.Record({
  apiDataPrefix: 'svdata=',
  datakeyPrefix: 'api_',
  acceptedContentTypes: T.List.of('text/javascript', 'text/plain')
});

class NetworkRequestHandler {
  /**
   * @param {ApiDataResultObject} result
   * @param {object} [options]
   * @returns {boolean} - validity of the request; should it be handled?
   */
  constructor(result, options) {
    this.request = result.request;
    this.options = new NetworkRequestHandlerRecord(options || {});

    let isRequestValid = this.isRequestValid();

    // If the request is not valid, return immediately
    if (!isRequestValid) {
      return false;
    }

    // Otherwise, do content parsing


    return isRequestValid;
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
   * @param {string} content
   * @returns {array|object|null}
   * @private
   */
  parseDataBody(content) {
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
   * @param {string} path
   * @returns {*}
   */
  getGameEvent(path) {
    invariant(path, 'Cannot detect game event without a path. Check the calling method.');

    let gameEvent = KancolleApiEvents.findEntry((event, pathFragment) => path.includes(pathFragment));

    return (!!gameEvent && gameEvent.length > 1) ? gameEvent[1] : UNKNOWN_EVENT;
  }

  /**
   * @param {object} result
   * @returns {object}
   */
  parseRequest(result) {
    const { request, response, timings, content } = result;

    let path = P.getApiPath(request.url);
    let post = T.Map(P.postData(request.postData) || {})
      .filterNot((v, k) => (k.includes('api_token') || k.includes('api_verno'))).toJS();
    let get = this.parseDataBody(content) || null;
    let event = this.getGameEvent(path);

    return { event, path, post, get };
  }
}

export default NetworkRequestHandler;