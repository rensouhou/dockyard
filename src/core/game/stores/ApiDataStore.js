/**
 * @overview
 *  Declares a base store class for other data stores to extend from,
 *  with a set of helper methods to update
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/game/stores/ApiDataStore
 */

import { MapStore } from 'flux/utils';
import T from 'immutable';

import handlers from '../handlers/index';

export default class ApiDataStore extends MapStore {
  _actions = T.List();

  constructor(dispatcher, actions) {
    console.log('new ApiDataStore', dispatcher);
    super(dispatcher);
    this._actions = T.List(actions);
  }

  reduce(state, action) {
    console.log('ApiDataStore', this.getState(), state, action);
    return this.getState();
  }
}

