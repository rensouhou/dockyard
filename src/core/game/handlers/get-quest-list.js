/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/game/handlers/GetQuestList
 */
import R from 'ramda';

import BaseHandler from './base-handler';
import Actions from '../constants/Actions';

import { apiData } from '../transformers';

/**
 * @extends {BaseHandler}
 */
export default class GetQuestList extends BaseHandler {
  handleState() {
    /** @type {kcsapi.api.GetQuestList.GET} */
    const GET = this.method.GET;

    let isObject = (o) => R.is(Object, o);
    let justObjects = R.filter(isObject);
    let f = R.compose(R.fromPairs, R.map(apiData.transformQuest), justObjects);
    let quests = f(GET.api_list || []);

    // Dispatch the action found in `BaseHandler`.

    this.dispatchState({
      type: Actions.UPDATE_QUEST_LIST,
      payload: {
        quests
      }
    });
  }
}
