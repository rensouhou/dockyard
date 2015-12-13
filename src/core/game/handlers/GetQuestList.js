/**
 * @overview
 *
 * @since 0.0.0
 * @author Anon
 * @module
 */

import BaseClass from './BaseHandler';

class GetQuestList extends BaseClass {
  constructor(eventRecord, dispatcher) {
    super(eventRecord, dispatcher);

    console.log('GetQuestList:this.GET =>', this.GET);

    // Dispatch the action found in {@link BaseClass}.
    this.dispatchState();
  }
}

export default GetQuestList;