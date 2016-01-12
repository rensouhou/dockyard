/**
 * @overview
 *
 * @since 0.1.1
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/game/handlers/GetOpponentInfo
 */
import R from 'ramda';

import BaseHandler from './base-handler';
import Action from '../constants/Actions';
import { apiData } from '../transformers';

export default class GetOpponentInfo extends BaseHandler {
  handleState() {
    const timestamp = +(new Date()),
          /** @type {kcsapi.api.GetOpponentInfo} */
          method    = this.method,

          /** @type {kcsapi.api.GetOpponentInfo.GET} */
          GET       = this.method.GET,

          /** @type {kcsapi.api.GetOpponentInfo.POST} */
          POST      = this.method.POST,
          memberId  = parseInt(POST.api_member_id);

    let meta    = { seenAt: timestamp, memberId },
        payload = R.merge(meta, apiData.transformOpponentInfo(GET));

    this.dispatchState({
      type: Action.UPDATE_PVP_OPPONENT,
      payload
    });
  }
}