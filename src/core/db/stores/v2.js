/**
 * @overview
 *  Database schema version 1.
 *  Assumes only a single user (for now).
 *
 * @since 0.1.1
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/db/stores/v2
 */

export default {
  // Master API data
  baseDataShips: '&id,name,nameReading,shipType',
  baseDataShipTypes: '&id,name',

  // Game data
  quests: '&id,type,category',

  // Player data
  playerProfile: '&memberId,name,level,experience',
  playerFleets: '&id',
  playerResources: '&updatedAt',
  craftedItem: '&createdAt,id,itemId',

  // PVP
  pvpOpponent: '&memberId,seenAt',
  pvpShips: '&id,shipId'
};
