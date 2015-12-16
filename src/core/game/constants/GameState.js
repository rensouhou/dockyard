/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module
 */

const keymirror = require('keymirror');

/**
 * @type {Dockyard.GameState}
 */
export default keymirror({
  IDLE: null,
  IN_MENU: null,
  IN_PRACTICE: null,
  IN_REPAIR_DOCKS: null,
  IN_SORTIE: null,
  IN_QUEST_LIST: null,
  OTHER: null
});
