/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module
 */

import BaseHandler from './BaseHandler';

export default class CraftShip extends BaseHandler {
  handleState() {
    console.group('CraftShip');
    console.log('this.method =>', this.method);

    this.dispatchState();
    console.groupEnd();
  }
}