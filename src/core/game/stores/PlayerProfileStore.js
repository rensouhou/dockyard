/**
 * @overview
 *
 * @since 0.0.0
 * @author Anon
 * @module
 */
import { MapStore } from 'flux/utils';
import T from 'immutable';

export default class PlayerProfileStore extends MapStore {
  constructor(dispatcher) {
    super(dispatcher);
  }

  /**
   * @param state
   * @param actionObj
   */
  reduce(state, actionObj) {

  }
}