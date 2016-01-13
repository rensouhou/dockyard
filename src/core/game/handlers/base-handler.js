/**
 * @overview
 *  Declares a base `BaseHandler` class for game API events.
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/game/handlers/BaseHandler
 */

import invariant from 'invariant';
import { isFSA } from 'flux-standard-action';

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
    let _name = this.constructor.name;
    console.log(`${_name}#constructor`);

    this.eventRecord = eventRecord;
    this.eventName = eventRecord.event;
    this.dispatcher = dispatcher;
    this.method = {
      GET: eventRecord.method.GET,
      POST: eventRecord.method.POST
    };

    this.result = null;

    this.handleState();
  }

  /**
   * This method should be used for consuming the incoming API data.
   * Must call `dispatchState()` after this method is done.
   * @abstract
   */
  handleState() {
    invariant(null, `${this.eventName} event handler's \`handleState\` method has not been overridden.`);
  }

  /**
   * Dispatch an action to the dispatcher that will update the stores.
   * `this.dispatchState()` must be called whenever the data that is
   * given to stores is ready.
   *
   * `action` must conform to the `flux-standard-action` specification.
   * @see {@link https://github.com/acdlite/flux-standard-action}
   *
   * @param {!object} action
   */
  dispatchState(action) {
    invariant((action && isFSA(action)), 'Dispatching the state requires a valid action object.');
    console.log('Dispatching action %s', action.type);

    this.dispatcher.dispatch(action)
  }
}

