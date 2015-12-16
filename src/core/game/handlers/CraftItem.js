/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module
 */

import BaseHandler from './BaseHandler';

export default class CraftItem extends BaseHandler {
  handleState() {
    console.group('CraftItem');
    console.log('this.method =>', this.method);

    this.dispatchState();
    console.groupEnd();
  }
}