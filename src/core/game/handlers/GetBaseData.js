/**
 * @overview
 */

/**
 * @param {Dockyard.NetworkEvent} eventRecord
 */
function GetBaseData(eventRecord) {
  console.log('GetBaseData');
  console.log('└─ eventRecord => %O', eventRecord);

  /** @type {kcsapi.api.GetBaseData} */
  let baseData = eventRecord.requestGetData;

  /** @type {kcsapi.PlayerProfile} */
  let playerProfile = baseData.api_basic;

  /** @type {Array<kcsapi.Ship>} */
  let playerShips = baseData.api_ship;
}

export default GetBaseData;