/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/game/handlers/GetQuestList
 */

import BaseClass from './BaseHandler';

export default class GetQuestList extends BaseClass {
  constructor(eventRecord, dispatcher) {
    super(eventRecord, dispatcher);

    console.log('GetQuestList:this.GET =>', this.GET);

    // Dispatch the action found in {@link BaseClass}.
    this.dispatchState();
  }
};