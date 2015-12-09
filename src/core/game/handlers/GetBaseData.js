/**
 * @overview
 */

/**
 * @param {Dockyard.NetworkEvent} eventRecord
 * @constructor
 */
function GetBaseData(eventRecord) {
  console.log('GetBaseData');
  console.log('└─ eventRecord => %O', eventRecord);

  /** @type {KanColle.API.GetBaseData} */
  let baseData = eventRecord.requestGetData;

  /** @type {KanColle.PlayerProfile} */
  let playerProfile = baseData.api_basic;

  /** @type {Array<KanColle.Ship>} */
  let playerShips = baseData.api_ship;

}

export default GetBaseData;