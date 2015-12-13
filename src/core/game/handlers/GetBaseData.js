/**
 * @overview
 */

import BaseHandler from './BaseHandler';

class GetBaseData extends BaseHandler {
  constructor(eventRecord, dispatcher) {
    super(eventRecord, dispatcher);

    this.dispatchState();
  }
}

/**
 * @type {Dockyard.GameDataHandlerFn}
 * @param {Dockyard.NetworkEvent} eventRecord
 * @param {Dockyard.Dispatcher} dispatcher
 */

function GetBaseData2(eventRecord, dispatcher) {
  console.log('GetBaseData =>');
  console.log('└─ eventRecord => %O', eventRecord.toJS());

  /** @type {kcsapi.api.GetBaseData} */
  let baseData = eventRecord.GET;

  /** @type {kcsapi.PlayerProfile} */
  let playerProfile = eventRecord.GET.api_basic;

  /** @type {Array<kcsapi.Ship>} */
  let playerShips = baseData.api_ship;

  let result = {
    successful: true,
    model: {}
  };

  dispatcher.dispatch({
    actionType: 'UPDATE_GAME_DATA',
    eventName: eventRecord.event,
    payload: result
  })
}

export default GetBaseData;