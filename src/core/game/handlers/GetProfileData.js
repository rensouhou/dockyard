/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 *
 * @module src/core/game/handlers/GetProfileData
 */

import BaseHandler from './BaseHandler';

export default class GetProfileData extends BaseHandler {
  handleState() {
    console.log('GetProfileData');
    console.log('└─ eventRecord => %O', this.eventRecord.toJS());

    //this.dispatchState();
  }
}