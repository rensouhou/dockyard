/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/game/handlers/InitializeGame
 */
import R from 'ramda';

import BaseHandler from './BaseHandler';
import { Actions as Action } from '../constants';

import { materialTransform, shipTransform, shipTypeTransform } from '../transformers/mst';

export default class InitializeGame extends BaseHandler {
  handleState() {
    console.log('InitializeGame#handleState()');

    /** @type {kcsapi.api.InitializeGame} */
    const GET = this.method.GET;

    const ships = this._parseShips(GET.api_mst_ship);
    const shipTypes = R.map(shipTypeTransform, GET.api_mst_stype);

    let action = {
      type: Action.UPDATE_BASE_DATA,
      payload: {
        ships, shipTypes
      }
    };

    this.dispatchState(action);
  }

  /**
   * @param {Array<kcsapi.mst.Ship>} list
   * @private
   */
  _parseShips(list) {
    return R.map(shipTransform, list);
  }
}