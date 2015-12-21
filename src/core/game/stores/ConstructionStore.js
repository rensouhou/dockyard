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

  items = T.Set();
  ships = T.Set();

  constructor(dispatcher, items = [], ships = []) {
    super(dispatcher);
    this.items = T.List(items);
    this.ships = T.List(ships);
  }

  reduce(state, action) {
    console.log('action=%s', action.actionType);
    console.log('payload=%o', action.payload);

    switch (action.actionType) {
      // Craft
      case Actions.CREATE_ITEM:
        console.log(this.getState().toJS());
        let i = action.payload;
        this.items = this.items.push(i);
        break;

      // Destroy?
      case Actions.DELETE_ITEM:

      // Item upgrades?
      case Actions.UPDATE_ITEM:
        break;

      case Actions.CREATE_SHIP:
        break;

      case Actions.CREATE_SHIP_FINISH:
        break;

      default:
        break;
    }

    return this.getState();
  }
}
