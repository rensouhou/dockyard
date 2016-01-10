/**
 * @overview
 *
 * @since 0.1.1
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/game/transformers/api-data
 */

import R from 'ramda';

/**
 * @param {kcsapi.PlayerProfile} o
 * @returns {Object}
 */
export function transformPlayerProfile(o) {
  return {
    name: o.api_nickname,
    memberId: o.api_member_id,
    status: null,
    level: o.api_level,
    experience: o.api_experience,
    coins: o.api_fcoin,
    furniture: o.api_furniture,
    fleets: o.api_count_deck,
    docks: {
      reparation: o.api_count_ndock,
      construction: o.api_count_kdock
    },
    maximum: {
      ships: o.api_max_chara,
      slotItems: o.api_max_slotitem,
      furniture: o.api_max_kagu
    },
    pvp: {
      win: o.api_pt_win,
      lose: o.api_pt_lose
    },
    sortie: {
      win: o.api_st_win,
      lose: o.api_st_lose
    },
    expedition: {
      runCount: o.api_ms_count,
      successful: o.api_ms_success
    },
    isActive: !!(o.api_active_flag),
    tutorial: {
      inProgress: !!(o.api_tutorial),
      progress: o.api_tutorial_progress
    },
    _unknown: {
      nicknameId: o.api_nickname_id,
      playtime: o.api_playtime,
      pvpChallenged: o.api_pt_challenged,
      pvpChallengedWon: o.api_pt_challenged_win
    }
  }
}

/**
 * @param {kcsapi.Fleet} o
 * @returns {Object}
 */
export function transformFleet(o) {
  return {
    flagship: o.api_flagship,
    id: o.api_id,
    name: o.api_name,
    mission: o.api_mission,
    ships: o.api_ship,
    memberId: o.api_member_id,
    _unknown: {
      nameId: o.api_name_id
    }
  }
}

/**
 * @param {kcsapi.Material} o
 * @returns {Object}
 */
export function transformMaterial(o) {
  let resources = {
    1: 'fuel',
    2: 'ammo',
    3: 'steel',
    4: 'bauxite',
    5: 'instantConstruction',
    6: 'instantRepair',
    7: 'developmentMaterials',
    8: 'improvementMaterials'
  };

  return [resources[o.api_id], o.api_value];
}

/**
 * @param {Array<kcsapi.Material>} o
 * @returns {Object}
 */
export function transformMaterials(o) {
  return R.fromPairs(R.map(transformMaterial, o));
}

/**
 * @param {kcsapi.OpponentInfo} o
 * @returns {Object}
 */
export function transformOpponentInfo(o) {
  return {
    name: o.api_nickname,
    level: o.api_level,
    rank: o.api_rank,
    experience: o.api_experience,
    fleet: o.api_deck,
    fleetName: o.api_deckname,
    unknown: {
      fleetNameId: o.api_deckname_id,
      nicknameId: o.api_nickname_id
    }
  }
}

/**
 * @param {kcsapi.Quest} o
 * @returns {Array}
 */
export function transformQuest(o) {
  return [o.api_no, {
    id: o.api_no,
    title: o.api_title,
    detail: o.api_detail,
    category: o.api_category,
    type: o.api_type,
    reward: o.api_get_material,
    state: o.api_state,
    inProgress: o.api_progress_flag === 1
  }];
}

/**
 * @param {kcsapi.api.CraftItem.GET} o
 * @returns {*[]}
 */
export function transformCraftItem(o) {
  // Was it successful?
  let created = o.api_create_flag === 1;
  let devMatsUsed = o.api_shizai_flag === 1;

  let slotItem;

  if (created || devMatsUsed) {
    slotItem = {

    };
  }

  return [id, R.merge({
    created, devMatsUsed
  }, slotItem)];
}