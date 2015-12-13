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

  constructor(dispatcher, actions) {
    console.log('new ApiDataStore', dispatcher);
    super(dispatcher);
    this._actions = T.List(actions);
  }

  reduce(state, action) {

    switch(action.actionType) {
      case 'UPDATE_API_DATA':
        console.warn('UPDATE_API_DATA actionType');
        break;
    }

    console.log('ApiDataStore.reduce');
    console.log('action =>', action);
    console.log('state =>', state);

    console.log('this.getState() =>', this.getState());
    return this.getState();
  }
}

