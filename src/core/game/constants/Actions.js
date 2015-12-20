/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */

import keymirror from 'keymirror';

/**
 * @type {Dockyard.Action}
 */
export default {
  // Construction
  CREATE_ITEM: 'CREATE_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',

  CREATE_SHIP: 'CREATE_SHIP',
  CREATE_SHIP_FINISH: 'CREATE_SHIP_FINISH',
  UPDATE_SHIP: 'UPDATE_SHIP',
  DELETE_SHIP: 'DELETE_SHIP',

  // Player state
  UPDATE_PLAYER_STATE: 'UPDATE_PLAYER_STATE',

  UPDATE_GAME_STATE: 'UPDATE_GAME_STATE'
};