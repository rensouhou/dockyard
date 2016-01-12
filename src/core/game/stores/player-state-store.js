/**
 * @overview
 *
 * @since 0.1.1
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/game/stores/player-state-store
 */

import { MapStore } from 'flux/utils';
import Action from '../constants/actions';

const initialState = {
  materials: {}
};

export default class PlayerStateStore extends MapStore {
  static storeName = 'PlayerStateStore';

  constructor(dispatcher) {
    super(dispatcher);
    console.info(`${PlayerStateStore.storeName}#constructor`);
  }

  /**
   * @param {Immutable.Map<K, V>} state
   * @param {Object} action
   * @returns {*}
   */
  reduce(state, action) {
    switch (action.type) {
      case Action.UPDATE_PLAYER_STATE:
        return state.mergeDeep(action.payload);

      default:
        return state;
    }
  }
}
