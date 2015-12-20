/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import BaseModel from './BaseModel';

let model = {
  api_active_flag: ['isActive', { type: Boolean }],
  api_comment: 'comment',
  api_comment_id: 'commentId',
  api_count_deck: 'fleets',
  api_count_kdock: 'constructionDocks',
  api_count_ndock: 'repairDocks',
  api_experience: 'experience',
  api_fcoin: 'coins',
  api_firstflag: ['firstFlag', { use: null }],
  api_fleetname: ['fleetName', { use: null }],
  api_furniture: 'furniture',
  api_large_dock: ['largeConstructionUnlocked', { type: Boolean }],
  api_level: 'level',
  api_max_chara: 'maxShips',
  api_max_kagu: 'maxFurniture',
  api_max_slotitem: 'maxSlotItems',
  api_medals: 'medals',
  api_member_id: 'memberId',
  api_ms_count: 'expeditionTotalCount',
  api_ms_success: 'expeditionSuccessCount',
  api_nickname: 'nickname',
  api_nickname_id: ['nicknameId', { use: null }],
  api_playtime: ['playtime', { use: null }],
  api_pt_challenged: ['pvpChallenged', { use: null }],
  api_pt_challenged_win: ['pvpChallengedWins', { use: null }],
  api_pt_lose: 'pvpLosses',
  api_pt_win: 'pvpWins',
  api_pvp: ['pvp', { use: null }],
  api_rank: 'rank',
  api_st_lose: 'sortieLosses',
  api_st_win: 'sortieWins',
  api_starttime: ['startTime', { use: null }],
  api_tutorial: ['tutorialNotDone', { type: Boolean }],
  api_tutorial_progress: 'tutorialProgress'
};

export default class PlayerProfileModel extends BaseModel {
  constructor(data) {
    super(data, model);
  }
}