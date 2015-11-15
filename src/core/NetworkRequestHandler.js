/**
 * @overview
 *
 * @since 0.1.0
 * @module src/core/NetworkRequestHandler
 */
import T from 'immutable';
import invariant from 'invariant';

import kancolleApi from '../config/kancolleApi';
import KancolleApiEvent from '../config/kancolleApiEvents';
import AddonEvent from '../enums/addonEvents';

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

  /**
   *
   * @param {string} content
   * @returns {array|object|null}
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
   * @returns {*}
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

  /**
   *
   * @param {T.Record} result
   * @returns {*}
   */
  parseRequest(result) {
    let request = result.get('request');
    let response = result.get('response');
    let timings = result.get('timings');
    let content = result.get('content');

    //console.log({ request, response, timings, content });

    let data = this.parseContent(content);
    let path = request.url.replace(/.*\/kcsapi/, '');

    return data;
  }
}

export default NetworkRequestHandler;