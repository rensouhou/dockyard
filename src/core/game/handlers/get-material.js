/**
 * @overview
 *
 * @since 0.1.1
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/game/handlers/GetMaterial
 */

import BaseHandler from './base-handler';
import Action from '../constants/actions';
import { apiData } from '../transformers';

export default class GetMaterial extends BaseHandler {
  handleState() {
    /** @type {kcsapi.api.GetMaterial} */
    const GET = this.method.GET;

    let materials = apiData.transformMaterials(GET);

    this.dispatchState({
      type: Action.UPDATE_PLAYER_STATE,
      payload: {
        materials
      }
    })
  }
}