/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */

import T from 'immutable';
import { MapStore } from 'flux/utils';
import Actions from '../constants/Actions';

export default class ConstructionStore extends MapStore {
  static storeName = 'ConstructionStore';

  constructor(dispatcher) {
    super(dispatcher);
  }

  reduce(state, action) {
    console.log('action=%s', action.actionType);
    console.log('payload=%o', action.payload);

    switch (action.actionType) {
      // Craft
      case Actions.CREATE_ITEM:
        console.log(this.getState().toJS());
        break;

      // Destroy?
      case Actions.DELETE_ITEM:

      // Item upgrades?
      case Actions.UPDATE_ITEM:
      default:
        break;
    }

    return this.getState();
  }
}
