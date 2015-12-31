/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module
 */

import T from 'immutable';
import { MapStore } from 'flux/utils';
import { Actions as Action, GameState } from '../constants';

const initialState = {
  currentState: GameState.IDLE
};

export default class GameStateStore extends MapStore {
  static storeName = 'GameStateStore';

  constructor(dispatcher) {
    super(dispatcher);
    console.info(`${GameStateStore.storeName}#constructor`);
  }

  getInitialState() {
    return T.fromJS(initialState);
  }

  reduce(state, action) {
    let currentState = state;

    switch (action.type) {
      case Action.UPDATE_GAME_STATE:
        break;
    }

    return currentState;
  }
}
