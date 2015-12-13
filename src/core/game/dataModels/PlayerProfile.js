/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/game/dataModels/PlayerProfile
 */
import T from 'immutable';

const PlayerProfileModel = T.Record({
  nickname: null,
  nicknameId: null,
  memberId: null,
  comment: null,
  commentId: null,
  level: 0,
  experience: 0,
  rank: null,
  coins: 0,

  // HQ customizations, furniture
  furniture: [],

  maxShips: null,
  maxFurniture: null,
  maxSlotItems: null,
  fleetCount: null,
  constructionDocks: null,
  repairDocks: null,

  medals: 0,
  missionStats: { total: 0, success: 0 },
  sortieStats: { win: 0, lose: 0 },
  pvpStats: { win: 0, lose: 0 }
});

export default PlayerProfileModel;