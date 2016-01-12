/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module
 */

import R from 'ramda';

import BaseHandler from './base-handler';
import Actions from '../constants/actions';

export default class CraftShip extends BaseHandler {
  handleState() {
    console.log('CraftShip');
    console.log('this.method =>', this.method);

    const { GET, POST } = this.method;

    this.dispatchState(Actions.CREATE_SHIP, {
      actionType: 'UNKNOWN',
      eventName: this.eventRecord.event,
      payload: {}
    });
  }
}