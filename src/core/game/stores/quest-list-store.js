/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/game/stores/quest-list-store
 */

import T from 'immutable';
import { MapStore } from 'flux/utils';
import Action from '../constants/Actions';

const initialState = {
  quests: {}
};

export default class QuestListStore extends MapStore {
  static storeName = 'QuestListStore';

  constructor(dispatcher) {
    super(dispatcher);
    console.info(`${QuestListStore.storeName}#constructor`);
  }

  getInitialState() {
    return T.fromJS(initialState);
  }

  /**
   * @param {Immutable.Map<K, V>} state
   * @param {object} action
   * @returns {*|TState|T}
   */
  reduce(state, action) {
    let currentState = state;

    switch (action.type) {
      case Action.UPDATE_QUEST_LIST:
        if (!currentState.has('quests')) {
          currentState = currentState.set('quests', T.Map());
        }

        let questSet = currentState.get('quests');
        currentState = currentState.set('quests', questSet.merge(action.payload.quests));
        break;
    }

    return currentState;
  }
}