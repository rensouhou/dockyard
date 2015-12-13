/**
 * @overview
 *
 * @since 0.0.0
 * @author Anon
 * @module
 */

import { MapStore } from 'flux/utils';

export default class BaseStore extends MapStore {
  constructor(dispatcher) {
    super(dispatcher);
  }

  reduce(state, action) {
    return this.getState();
  }
}