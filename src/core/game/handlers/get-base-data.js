/**
 * @overview
 *
 *
 */
import R from 'ramda';

import BaseHandler from './base-handler';
import Action from '../constants/Actions';
import { apiData } from '../transformers';

export default class GetBaseData extends BaseHandler {
  handleState() {
    console.log('GetBaseData');
    console.log('└─ eventRecord => %O', this.eventRecord.toJS());

    /** @type {kcsapi.api.GetBaseData.GET} */
    const GET = this.method.GET;

    let profile = apiData.transformPlayerProfile(GET.api_basic);
    let fleets = R.map(apiData.transformFleet, GET.api_deck_port);

    let payload = { profile, fleets };

    this.dispatchState({
      type: Action.UPDATE_PLAYER_STATE,
      payload
    });
  }
}
