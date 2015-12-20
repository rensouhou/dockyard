/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/game/utils/Action
 */

function constantFor(action) {

}

export default class Action {
  constructor(resourceName) {
    this._actionSuffix = resourceName;
  }

  get createAction() {
    return this._actionSuffix;
  }

  get updateAction() {
    return this._actionSuffix;
  }
}
