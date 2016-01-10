/**
 * @overview
 *  Database schema version 1.
 *  Assumes only a single user (for now).
 *
 * @since 0.1.1
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/db/stores/v1
 */

export default {
  // Master API data
  baseDataShips: '&id,name,nameReading,shipType',
  baseDataShipTypes: '&id,name',

  // Game data
  quests: '&id,type,category',

  craftedItem: '&createdAt,id,itemId',

  // Player data
  playerProfile: '&memberId,name,level,experience',
  playerFleets: '&id',

  // PVP
  pvpOpponent: '&memberId,seenAt'
};
