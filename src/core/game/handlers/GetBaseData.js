/**
 * @overview
 */

import BaseHandler from './BaseHandler';

export default class GetBaseData extends BaseHandler {
  handleState() {
    console.group('GetBaseData');
    console.log('└─ eventRecord => %O', this.eventRecord.toJS());

    this.dispatchState();
    console.groupEnd();
  }
}
