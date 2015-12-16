/**
 * @overview
 *  Declares a base `BaseHandler` class for game API events.
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/game/handlers/BaseHandler
 */

/**
 * @public
 * @type {Dockyard.BaseHandler}
 */
export default class BaseHandler {
  eventRecord = null;
  eventName = null;
  dispatcher = null;
  result = null;
  method = {
    GET: null,
    POST: null
  };

  /**
   * @param {Dockyard.NetworkEvent} eventRecord
   * @param {Dockyard.Dispatcher} dispatcher
   */
  constructor(eventRecord, dispatcher) {
    console.group('BaseHandler');
    console.log('└─ eventRecord => %O', eventRecord);

    this.eventRecord = eventRecord;
    this.eventName = eventRecord.event;
    this.dispatcher = dispatcher;
    this.method = {
      GET: eventRecord.method.GET,
      POST: eventRecord.method.POST
    };

    this.result = null;

    this.handleState();
    console.groupEnd();
  }

  /**
   * This method should be used for consuming the incoming API data.
   * Must call `dispatchState()` after this method is done.
   * @abstract
   */
  handleState() {
    console.warn('`%s` event handler\'s `handleState` method has not been overridden', this.eventName);
  }

  /**
   * Dispatch an action to the dispatcher that will update the stores.
   * `this.dispatchState()` must be called whenever the data that is
   * given to stores is ready.
   */
  dispatchState() {
    console.log('BaseHandler.dispatchState');
    console.log('└─ Dispatcher => %O', this.dispatcher);

    this.dispatcher.dispatch({
      actionType: 'UPDATE_GAME_DATA',
      eventName: this.eventRecord.event,
      payload: {
        method: {
          GET: this.GET,
          POST: this.POST
        }
      }
    })
  }
}

