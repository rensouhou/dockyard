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
    console.log('GetQuestList.handleState()');
    console.log('this.method.GET\t\t=>', this.method.GET);
    console.log('this.method.POST\t=>', this.method.POST);

    let camelCase = (k) => k.toUpperCase();
    let transformKeys = R.map(camelCase);
    let k = R.compose(transformKeys, R.keys);

    // Dispatch the action found in `BaseHandler`.
    this.dispatchState(Actions.UPDATE_QUEST_LIST, {

    });
  }
}

module.exports = GetQuestList;