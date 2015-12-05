/**
 *
 */
import T from 'immutable';
import invariant from 'invariant';

class GameDataHandler {
  handlers = T.Map();

  /**
   * @constructor
   */
  constructor() {

  }

  /**
   * @param {string} event
   * @param {Function} handler
   * @throws If `event` and `handler` are not supplied.
   */
  registerHandler(event, handler) {
    invariant((event && handler), '`registerHandler` requires an event name and a handler.');



    this.handlers = this.handlers.set(event, handler);
  }

  handleEvent(event, eventData) {

  }
}

export default GameDataHandler;