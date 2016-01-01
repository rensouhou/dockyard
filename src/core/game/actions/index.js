/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */

// Player State
// ==============

/**
 * Action types
 */
export const UPDATE_PLAYER_PROFILE = 'UPDATE_PLAYER_PROFILE';
export const UPDATE_PLAYER_RESOURCES = 'UPDATE_PLAYER_RESOURCES';

/**
 * Action creators
 */

/**
 * @param {!object} payload
 * @returns {{type: string, payload: *}}
 */
export function updatePlayerProfile(payload) {
  return {
    type: UPDATE_PLAYER_PROFILE,
    payload
  }
}

export function updatePlayerResources(payload) {
  return {
    type: UPDATE_PLAYER_RESOURCES,
    payload
  }
}

// Quest List
// ============

export const UPDATE_QUEST_LIST = 'UPDATE_QUEST_LIST';

export function updateQuestList(payload) {
  return {
    type: UPDATE_QUEST_LIST,
    payload
  }
}
