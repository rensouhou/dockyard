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

import kancolleApi from '../config/kancolleApi';
import KancolleApiEvents from '../config/kancolleApiEvents';
import AddonEvent from '../enums/addonEvents';
import { Parse as P } from '../core/Helpers';

const UNKNOWN_EVENT = 'UNKNOWN_EVENT';

let NetworkRequestHandlerRecord = T.Record({
  apiDataPrefix: 'svdata=',
  acceptedContentTypes: T.List.of('text/javascript', 'text/plain')
});

class NetworkRequestHandler {
  /**
   * @param {object} options
   */
  constructor(options) {
    this.options = new NetworkRequestHandlerRecord(options);
  }

  //noinspection JSMethodCanBeStatic
  /**
   * @param {string} content
   * @returns {array|object|null}
   * @private
   */
  parseContent(content) {
    if (content.includes(kancolleApi.panel.apiDataPrefix)) {
      content = content.substring(kancolleApi.panel.apiDataPrefix.length);
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
   * @param {Array<Object>} headers
   * @returns {Boolean}
   */
  shouldRequestBeHandled(headers) {
    let foundContentType = T.fromJS(headers).find((it) => it.get('name') === 'Content-Type');

    if (!foundContentType) {
      return false;
    }

    return this.options.get('acceptedContentTypes').includes(foundContentType.get('value'));
  }

  //noinspection JSMethodCanBeStatic
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
    let { request, response, timings, content } = result;

    let path = P.getApiPath(request.url);
    let post = P.postData(request.postData) || null;
    let get = this.parseContent(content) || null;
    let event = this.getGameEvent(path);

    return { event, path, post, get };
  }
}

export default NetworkRequestHandler;