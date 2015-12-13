/**
 * @overview
 *
 * @since 0.0.0
 * @author Anon
 * @module
 */

/**
 * @type {Dockyard.BaseHandler}
 */
class BaseHandler {
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

export default BaseHandler;