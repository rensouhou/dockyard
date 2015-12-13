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
  }

  dispatchState() {
    console.log('BaseHandler.dispatchState');
    console.log('└─ Dispatcher => %O', this.dispatcher);

    this.dispatcher.dispatch({
      actionType: 'HERP',
      eventName: '',
      payload: {
        GET: this.GET,
        POST: this.POST
      }
    })
  }
}

export default BaseHandler;