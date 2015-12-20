/**
 * @overview
 *
 * @since 0.0.0
 * @author Anon
 * @module
 */

import { MapStore } from 'flux/utils';
import Actions from '../constants/Actions';
import GameState from '../constants/GameState';

export default class GameStateStore extends MapStore {
  reduce(state, action) {
    switch (action.actionType) {
      case Actions.UPDATE_GAME_STATE:
        break;
    }
    return this.getState();
  }
}