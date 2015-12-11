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
import dispatcher from '../GameDataDispatcher';

import handlers from './handlers/index';

/**
 * @type {Dockyard.GameDataHandler}
 */
class GameDataHandler {
  handlers = T.Map();

  /**
   * @constructor
   */
  constructor() {
    console.info('New GameDataHandler');

    // Take care for all the default handlers
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
   * @param {Dockyard.NetworkEvent} eventRecord
   */
  handleEvent(eventRecord) {
    invariant(eventRecord, 'Cannot handle an empty event.');

    // @todo Should this throw instead?
    if (!this.handlers.has(eventRecord.event)) {
      console.warn(`The event \`${eventRecord.event}\` does not have a handler registered to it.`);
      return;
    }

    console.log(`Calling \`${eventRecord.event}\` handler.`);

    // This can probably be called synchronously.
    // @todo Look in if workers/async work distribution for larger data sets
    // @todo Also, move this into its own dispatcher _at some point_
    return this.handlers.get(eventRecord.event).call(null, eventRecord);
  }
}

export default GameDataHandler;