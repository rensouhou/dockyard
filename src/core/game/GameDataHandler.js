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

  registerHandler(event, handler) {
    invariant((event && handler), '`registerHandler` requires an event name and a handler.')

    this.handlers = this.handlers.set(event, handler);
  }
}

export default GameDataHandler;