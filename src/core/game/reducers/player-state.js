/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */

import { UPDATE_PLAYER_PROFILE, UPDATE_PLAYER_RESOURCES } from '../actions/index';

/**
 * Initial player profile state
 */
const initialState = {
  profile: null,
  resources: null
};

export default function playerState(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYER_PROFILE:
      return Object.assign({}, state, {
        profile: 'updated ' + +(new Date())
      });
      break;

    default:
      return state;
      break;
  }
}