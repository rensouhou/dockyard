
import PlayerProfile from '../dataModels/PlayerProfile';

/**
 * @param {NetworkRequestResultModel} eventRecord
 * @constructor
 */
function GetBaseData(eventRecord) {
  console.log('GetBaseData');
  console.log('└─ eventRecord => %O', eventRecord);

  /** @type {KCAPI.ApiGetBaseData} */
  let baseData = eventRecord.requestGetData;

  /** @type {PlayerProfile} */
  let playerProfile = baseData.api_basic;
}

export default GetBaseData;