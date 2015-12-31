/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */

import { combineReducers } from 'redux';
import playerState from './player-state';

const rootReducer = combineReducers({
  playerState
});

export default rootReducer;
