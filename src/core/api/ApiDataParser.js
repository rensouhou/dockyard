/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/ApiData
 */
import T from 'immutable';
import invariant from 'invariant';
import camelCase from 'camel-case';

class ApiDataParser {
  /**
   * @param {*|any|Record.Class} data
   */
  static parse(data) {
    const event = data.get('event');

    invariant(event !== 'UNKNOWN_EVENT', 'A valid, mapped event is needed to parse data; check that the event is defined in `game/ApiEvents`');

    // So far so good, eh. Valid and all, hopefully.
    const requestGetData = data.get('requestGetData');
    const requestPostData = data.get('requestPostData');
  }
}

export default ApiDataParser;

export { ApiDataParser };