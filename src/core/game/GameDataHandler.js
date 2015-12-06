/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/game/GameDataHandler
 */
import T from 'immutable';
import invariant from 'invariant';
import uppercamelcase from 'uppercamelcase';
import decamelize from 'decamelize';

import handlers from './handlers/index';

class GameDataHandler {
  handlers = T.Map();

  /**
   * @constructor
   */
  constructor() {
    console.info('New GameDataHandler');

    // Take all default handlers
    T.Map(handlers).forEach((eventName, handler) => {
      const handlerName = decamelize(handler).toUpperCase();
      this.registerHandler(handlerName, eventName);
    });
  }

  /**
   * @param {string} event
   * @param {Function} handler
   * @throws If `event` and `handler` are not supplied.
   */
  registerHandler(event, handler) {
    invariant((event && handler), '`registerHandler` requires an event name and a handler.');
    console.info(`Register handler for \`${event}\``);

    this.handlers = this.handlers.set(event, handler);
  }

  /**
   * @param {NetworkRequestResultModel} eventRecord
   */
  handleEvent(eventRecord) {
    invariant(eventRecord, 'Cannot handle an empty event.');

    // @todo Should this throw instead?
    if (!this.handlers.has(eventRecord.event)) {
      console.warn(`The event \`${eventRecord.event}\` does not have a handler registered to it.`);
      return null;
    }

    console.log(`Calling \`${eventRecord.event}\` handler.`);

    this.handlers.get(eventRecord.event).call(eventRecord);
  }
}

export default GameDataHandler;