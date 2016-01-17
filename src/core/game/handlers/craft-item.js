/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import R from 'ramda';
import BaseHandler from './base-handler';
import { Action } from '../constants';
import { apiData } from '../transformers';

export default class CraftItem extends BaseHandler {
  handleState() {
    this.dispatchState({
      type: Action.CREATE_ITEM,
      payload: apiData.transform.craftItem(this.method)
    });
  }
}