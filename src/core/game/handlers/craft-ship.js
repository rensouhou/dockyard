/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module
 */
import R from 'ramda';

import BaseHandler from './base-handler';
import { Action } from '../constants';

export default class CraftShip extends BaseHandler {
  handleState() {
    /** @type {kcsapi.api.CraftShip} */
    const { GET, POST } = this.method;

    this.dispatchState({
      type: Action.CREATE_SHIP,
      payload: {

      }
    });
  }
}