
import PlayerProfile from '../dataModels/PlayerProfile';

/**
 * @param {NetworkRequestResultModel} eventRecord
 * @constructor
 */
function GetBaseData(eventRecord) {
  console.log('GetBaseData');
  console.log('└─ eventRecord => %O', eventRecord);

  /** @type {KanColle.API.GetBaseData} */
  let baseData = eventRecord.requestGetData;

  /** @type {KanColle.PlayerProfile} */
  let playerProfile = baseData.api_basic;
}

export default GetBaseData;