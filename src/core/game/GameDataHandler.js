/**
 * @overview
 *
 * @since 0.1.0
 * @version 0.1.1
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/game/GameDataHandler
 *
 * @todo Data adapters; use Firebase, IndexedDB, etc.
 * @todo Only listen to messages from a defined namespace
 */
import _ from 'lodash';
import T from 'immutable';
import R from 'ramda';
import invariant from 'invariant';
import uppercamelcase from 'uppercamelcase';
import decamelize from 'decamelize';

import NetworkRequestHandler from '../NetworkRequestHandler';
import dispatcher from '../GameDataDispatcher';
import AddonEvent from '../../enums/addonEvents';

import * as handlers from './handlers';
import models from './dataModels';
import * as Stores from './stores';
import { ActionHandler } from '../../../runtime/firebase';
import { DataAdapter } from '../db'

/**
 * @type {Dockyard.GameDataHandler}
 */
export default class GameDataHandler {
  handlers = T.Map();
  models = T.Map();
  stores = T.Set();
  dataAdapter = null;

  /**
   * @constructor
   * @param {object} opts
   * @returns {function} Returns listener function for `chrome.runtime`
   */
  constructor(opts) {
    console.group(`Create new ${this.constructor.name}`);

    console.group('Register handlers');
    T.Map(handlers).forEach((eventName, handler) => {
      const handlerName = decamelize(handler).toUpperCase();
      this.registerHandler(handlerName, eventName);
    });
    console.groupEnd();

    console.group('Instantiate stores');
    Object.keys(Stores).forEach((storeName) => {
      let Store = Stores[storeName];
      this.stores = this.stores.add(Store.storeName, new Store(dispatcher));
    });
    console.groupEnd();

    console.group('Create data adapters');
    // Create a new data adapter and register it
    let adapter = new DataAdapter();
    this.dataAdapter = dispatcher.register(adapter.getHandlerFn.bind(adapter));
    console.groupEnd();

    console.groupEnd();

    return this.listenerFn.bind(this);
  }

  /**
   * The primary listener function that will be used in the
   * @param {chrome.runtime.Port} port
   * @returns {Function}
   */
  listenerFn(port) {
    console.log('Added listener for channel %s', port.name);
    port.onMessage.addListener(this.messageListenerFn.bind(this));
  }

  /**
   * {@link chrome.runtime.Port.onMessage} listener function
   * @param {Object} msg
   */
  messageListenerFn(msg) {
    if (_.isArray(msg)) {
      console.log.apply(console, ['debug =>'].concat(msg));
    }

    if (msg.event && msg.event === AddonEvent.API_DATA_RECEIVED) {
      const { chromeNetworkRequest, content } = msg;
      const { request, response } = chromeNetworkRequest;
      const timestamp = +(new Date());

      let RequestHandler = new NetworkRequestHandler({ timestamp, request, response, content });
      let resultRecord = RequestHandler.getData();

      // Just throw it in there for now
      console.group('Event => %s', resultRecord.event);
      console.info('path\t\t=> %s', resultRecord.path);
      console.info('timestamp\t=> %s', timestamp);
      console.info('GET\t\t\t=> %O', resultRecord.method.GET);
      console.info('POST\t\t=> %O', resultRecord.method.POST);
      console.groupEnd();

      this.handleEvent(resultRecord, dispatcher);
    }
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
   * @param {Dockyard.Dispatcher} dispatcher
   */
  handleEvent(eventRecord, dispatcher) {
    invariant(eventRecord, 'Cannot handle an empty event.');

    // @todo Should this throw instead?
    if (!this.handlers.has(eventRecord.event)) {
      console.warn(`The event \`${eventRecord.event}\` does not have a handler registered to it.`);
      return;
    }

    // This can probably be called synchronously.
    // @todo Look in if workers/async work distribution for larger data sets
    // @todo Also, move this into its own dispatcher _at some point_
    this._createNewHandlerInstance(this.handlers.get(eventRecord.event), eventRecord, dispatcher);
  }

  /**
   * @param {string} name
   * @returns {boolean}
   * @private
   */
  _hasHandler(name) {
    return this.handlers.has(name);
  }

  /**
   * @param {!Function} Handler
   * @param {!Dockyard.NetworkEvent} eventRecord
   * @param {!Dockyard.Dispatcher} dispatcher
   * @returns {*}
   * @private
   */
  _createNewHandlerInstance(Handler, eventRecord, dispatcher) {
    invariant(Handler, 'Cannot have an empty `Handler`.');

    return new Handler(eventRecord, dispatcher);
  }
}
