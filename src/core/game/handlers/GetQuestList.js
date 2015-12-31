/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/game/handlers/GetQuestList
 */
const R = require('ramda');

import BaseHandler from './BaseHandler';
import Actions from '../constants/Actions';

/**
 * @extends {BaseHandler}
 */
class GetQuestList extends BaseHandler {
  handleState() {
    const { GET, POST } = this.method;

    let getQuest = (q) => ([q.api_no, {
      title: q.api_title,
      detail: q.api_detail,
      category: q.api_category,
      type: q.api_type,
      reward: q.api_get_material,
      state: q.api_state,
      inProgress: q.api_progress_flag === 1
    }]);

    let isObject = (o) => typeof o === 'object';
    let objects = R.filter(isObject);
    let f = R.compose(R.fromPairs, R.map(getQuest), objects);
    let quests = f(GET.api_list);

    // Dispatch the action found in `BaseHandler`.
    let action = {
      type: Actions.UPDATE_QUEST_LIST,
      payload: {
        quests: quests
      }
    };

    this.dispatchState(action);
  }
}

module.exports = GetQuestList;