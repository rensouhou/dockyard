/**
 * @overview
 *
 * @since 0.1.1
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/game/handlers/GetOpponentInfo
 */
import R from 'ramda';

import BaseHandler from './base-handler';
import { Action } from '../constants';
import { transformOpponentInfo } from '../transformers/api-data';
import { asNumber } from '../utils';

export default class GetOpponentInfo extends BaseHandler {
  handleState() {
    const seenAt = +(new Date());

    /** @type {kcsapi.api.GetOpponentInfo.GET} */
    const GET = this.method.GET;

    /** @type {kcsapi.api.GetOpponentInfo.POST} */
    const POST = this.method.POST;

    /** @type {?(Just|Nothing)} */
    const memberId = asNumber(POST.api_member_id);

    let meta = { seenAt, memberId };
    let payload = R.merge(meta, transformOpponentInfo(GET));

    this.dispatchState({
      type: Action.UPDATE_PVP_OPPONENT,
      payload
    });
  }
}