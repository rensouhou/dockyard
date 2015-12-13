/**
 * @overview
 *  Declares a base `BaseHandler` class for game API events.
 *  Classes can and should extend this class
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/game/handlers/BaseHandler
 */

/**
 * @type {Dockyard.BaseHandler}
 */
export default class BaseHandler {
  eventRecord = null;
  dispatcher = null;
  GET = null;
  POST = null;
  eventName = null;

  /**
   * @param {Dockyard.NetworkEvent} eventRecord
   * @param {Dockyard.Dispatcher} dispatcher
   */
  constructor(eventRecord, dispatcher) {
    console.log('BaseHandler:');
    console.log('└─ eventRecord => %O', eventRecord.toJS());

    this.eventRecord = eventRecord;
    this.dispatcher = dispatcher;
    this.GET = eventRecord.GET;
    this.POST = eventRecord.POST;
    this.eventName = eventRecord.event;

    this.handleState();
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
   *
   * @param {Dockyard.ActionType} actionType
   */
  dispatchState(actionType) {
    console.log('BaseHandler.dispatchState');
    console.log('└─ Dispatcher => %O', this.dispatcher);

    this.dispatcher.dispatch({
      actionType: actionType,
      eventName: this.eventRecord.event,
      payload: {
        GET: this.GET,
        POST: this.POST
      }
    })
  }
}

