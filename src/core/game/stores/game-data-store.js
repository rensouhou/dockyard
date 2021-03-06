/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/game/stores/game-data-store
 */

import T from 'immutable';
import { MapStore } from 'flux/utils';
import Action from '../constants/actions';

const _initialState = {
  furniture: [],
  ships: [],
  shipTypes: [],
  slotItems: [],
  slotItemTypes: []
};

export default class GameDataStore extends MapStore {
  static storeName = 'GameDataStore';

  constructor(dispatcher, initialState) {
    super(dispatcher);
    console.info(`${GameDataStore.storeName}#constructor`);
  }

  getInitialState() {
    return T.fromJS(_initialState);
  }

  reduce(state, action) {
    switch (action.type) {
      case Action.UPDATE_BASE_DATA:
        break;
    }

    return state;
  }
}
