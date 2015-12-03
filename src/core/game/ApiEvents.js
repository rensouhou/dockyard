/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/game/ApiEvents
 */
import T from 'immutable';

/**
 * @type {T.Map<string, string>}
 */
export default T.Map({
  'api_start2': 'INITIALIZE_GAME',
  'api_port/port': 'GET_BASE_DATA',
  'mission/start': 'START_MISSION',
  'mission/result': 'COMPLETE_EXPEDITION',
  'req_mission/return_instruction': 'QUIT_MISSION',
  'quest/clearitemget': 'COMPLETE_QUEST',
  'kuosyou/destroyship': 'SCRAP_SHIP',
  'req_hokyu/charge': 'RESUPPLY_SHIP',
  'req_kousyou/createitem': 'CRAFT_ITEM',
  'req_kousyou/createship': 'CRAFT_SHIP',
  'req_kousyou/destroyship': 'DESTROY_SHIP',
  'req_kousyou/destroyitem2': 'DESTROY_ITEM',
  'req_kousyou/getship': 'GET_SHIP',
  'req_kousyou/remodel_slotlist': 'IMPROVE_ITEM',
  'req_kaisou/powerup': 'MODERNIZE_SHIP',
  'req_hensei/change': 'CHANGE_SHIP',
  'req_quest/start': 'START_QUEST',
  'req_quest/stop': 'STOP_QUEST',
  'req_map/start': 'START_SORTIE',
  'req_map/next': 'NEXT_SORTIE_NODE',
  'req_sortie/battle': 'SORTIE_STAGE',
  'req_sortie/battleresult': 'FINISHED_SORTIE',
  'req_nyukyo/start': 'START_REPAIR',

  'req_member/get_practice_enemyinfo': 'GET_OPPONENT_INFO',
  'req_member/payitemuse': 'USE_PAID_ITEM',
  'req_member/get_incentive': 'GET_INCENTIVE',

  'req_practice/battle': 'START_PVP_BATTLE',
  'req_practice/midnight_battle': 'START_PVP_NIGHT_BATTLE',
  'req_practice/battle_result': 'FINISHED_PRACTICE',
  'req_hensei/combined': 'FLEET_COMBINED',
  'req_combined_battle/battle_water': 'COMBINED_BATTLE_WATER_PHASE',
  'req_combined_battle/battleresult': 'FINISHED_COMBINED_FLEET',
  'req_battle_midnight/battle': 'START_NIGHT_BATTLE',

  'get_member/sortie_conditions': 'GET_SORTIE_CONDITIONS',
  'get_member/ship_deck': 'GET_FLEET',
  'get_member/preset_deck': 'GET_FLEET_PRESETS',
  'get_member/deck': 'GET_FLEET_DATA',
  'get_member/basic': 'GET_PROFILE_DATA',
  'get_member/furniture': 'GET_FURNITURE',
  'get_member/slotitem': 'GET_SLOT_ITEMS',
  'get_member/useitem': 'GET_USABLE_ITEMS',
  'get_member/ndock': 'GET_REPAIR_DOCKS',
  'get_member/kdock': 'GET_CONSTRUCTION_DOCKS',
  'get_member/material': 'GET_MATERIAL',
  'get_member/questlist': 'GET_QUEST_LIST',
  'get_member/mission': 'GET_MISSION_LIST',
  'get_member/practice': 'GET_PVP_OPPONENT_LIST',
  'get_member/payitem': 'GET_PAID_ITEMS',
  'get_member/slot_item': 'GET_SLOT_ITEMS',

  // Needs to figure out what the shit this is
  'get_member/unsetslot': 'UNSET_SLOT',

  // Needs data contracts
  'get_member/mapcell': 'GET_MAP_CELL',
  'get_member/ship3': 'GET_SHIP_INFO',
  'get_member/mapinfo': 'GET_MAP_LIST',
  'req_kaisou/lock': 'LOCK_SHIP',
  'req_kaisou/unsetslot_all': 'REMOVE_ALL_SLOT_ITEMS',
  'req_hensei/preset_register': 'SAVE_FLEET_PRESET',
  'req_hensei/preset_select': 'LOAD_FLEET_PRESET',
  'req_kaisou/slotset': 'SET_SLOT'
});