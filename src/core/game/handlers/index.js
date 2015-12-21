/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/game/handlers/index
 *
 * NOTE:
 *  All handlers should match the handlers found in {@link src/core/game/ApiEvents} as
 *  de-camelcased versions, e.g. `GET_BASE_DATA` turns into `GetBaseData`.
 */
//module.exports.GetBaseData = require('./GetBaseData');
//module.exports.GetProfileData = require('./GetProfileData');
module.exports.GetQuestList = require('./GetQuestList');
module.exports.CraftItem = require('./CraftItem').default;
module.exports.CraftShip = require('./CraftShip').default;
module.exports.StartSortie = require('./StartSortie').default;
