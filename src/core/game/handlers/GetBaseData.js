/**
 * @overview
 */
import T from 'immutable';

import BaseHandler from './BaseHandler';

export default class GetBaseData extends BaseHandler {
  handleState() {
    console.log('GetBaseData');
    console.log('└─ eventRecord => %O', this.eventRecord.toJS());

    //let profile = T.fromJS(this.GET.api_basic);

    //this.dispatchState('BASE_DATA');
  }
}
