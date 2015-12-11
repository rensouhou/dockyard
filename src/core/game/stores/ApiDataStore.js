/**
 * @overview
 *
 * @since 0.0.0
 * @author Anon
 * @module
 */

import {MapStore} from 'flux/utils';
import T from 'immutable';

import handlers from '../handlers/index';

export default class ApiDataStore extends MapStore {
  _actions = T.List();

  constructor(dispatcher) {
    console.log('new ApiDataStore', dispatcher);
    super(dispatcher);
    this._actions = T.List(actions);
  }

  reduce(state, action) {
    switch(action.actionType) {
      case 'X':
        break;

      default:
        console.warn('No handler registered for act');
        break;
    }

    console.log('ApiDataStore.reduce');
    console.log('action =>', action);
    console.log('state =>', state);

    console.log('this.getState() =>', this.getState());
    return this.getState();
  }
}

