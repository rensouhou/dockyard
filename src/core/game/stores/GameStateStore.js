/**
 * @overview
 *
 * @since 0.0.0
 * @author Anon
 * @module
 */

import { MapStore } from 'flux/utils';

export default class GameStateStore extends MapStore {
  reduce(state, action) {
    return this.getState();
  }
}