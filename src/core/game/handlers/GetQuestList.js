/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/game/handlers/GetQuestList
 */

import BaseHandler from './BaseHandler';

/**
 * @extends {BaseHandler}
 */
export default class GetQuestList extends BaseHandler {
  handleState() {
    console.group('GetQuestList.handleState()');
    console.log('this.method.GET\t\t=>', this.method.GET);
    console.log('this.method.POST\t=>', this.method.POST);

    // Dispatch the action found in `BaseHandler`.
    this.dispatchState();
    console.groupEnd();
  }
};