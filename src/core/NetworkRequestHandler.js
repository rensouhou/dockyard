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

let NetworkRequestHandlerRecord = T.Record({
  apiDataPrefix: 'svdata=',
  acceptedContentTypes: T.List.of('text/javascript', 'text/html', 'text/plain')
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
   *
   * @param {Array<Object>} headers
   * @returns {Boolean}
   */
  shouldRequestBeHandled(headers) {
    let foundContentType = T.fromJS(headers)
      .find((it) => {
        return it.get('name') === 'Content-Type'
      });

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

    const UNKNOWN_EVENT = 'UNKNOWN_EVENT';

    let e = KancolleApiEvents.findEntry((event, pathFragment) => path.includes(pathFragment));

    return (!!e && e.length > 1) ? e[1] : UNKNOWN_EVENT;
  }

  /**
   *
   * @param {T.Record} result
   * @returns {object}
   */
  parseRequest(result) {
    let request = result.get('request');
    let response = result.get('response');
    let timings = result.get('timings');
    let content = result.get('content');

    let postData = P.postData(request.postData);
    let data = this.parseContent(content);
    let gameEvent = this.getGameEvent(request.url);

    return {
      event: gameEvent,
      post: postData,
      get: data
    };
  }
}

export default NetworkRequestHandler;