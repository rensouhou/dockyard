/**
 * @overview
 *
 * @since 0.1.1
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/game/transformers/api-data
 */

import invariant from 'invariant';
import R from 'ramda';
import { Maybe } from 'ramda-fantasy';
import { reduceWithTransformer, asBoolean, asNumber } from '../utils';

const { Just, Nothing } = Maybe;

const resList = [
  'fuel', 'ammo', 'steel', 'bauxite',
  'instantConstruction', 'instantRepair', 'developmentMaterials', 'improvementMaterials'
];

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
    isActive: asBoolean(o.api_active_flag),
    tutorial: {
      inProgress: asBoolean(o.api_tutorial),
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
 * @todo Redo return value into a tuple
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
 * @param {kcsapi.OpponentInfoShip} o
 * @returns {Object}
 */
export function transformOpponentInfoShip(o) {
  return {
    id: o.api_id,
    level: o.api_level,
    shipId: o.api_ship_id,
    star: o.api_star
  }
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
    fleet: reduceWithTransformer(transformOpponentInfoShip, o.api_deck.api_ships),
    fleetName: o.api_deckname,
    _unknown: {
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
  return [
    o.api_no, {
      id: o.api_no,
      title: o.api_title,
      detail: o.api_detail,
      category: o.api_category,
      type: o.api_type,
      reward: o.api_get_material,
      state: o.api_state,
      inProgress: asBoolean(o.api_progress_flag)
    }
  ];
}

export let transform = {
  craftItem: craftItem
};

/**
 * Turn an array of resources into a tuple list, that can be used to construct
 * an object.
 *
 * @param {Array} rs
 * @param {?Array<String> = resList} keys
 * @returns {Array<Array>}
 */
export let resourcesFromList = (rs, keys = resList) => R.compose(R.fromPairs, R.zip)(keys, rs);

/**
 * @param {Object} o
 * @param {?Array<String> = resList} keys
 * @returns {Object}
 */
export let resourcesFromPost = (o, keys = resList) => R.compose(
  R.fromPairs,
  R.map((p) => [p[0], asNumber(p[1])]),
  R.zip)(keys.slice(0, 4), R.values(o));

/**
 * Transforming function for
 *
 * @event CRAFT_ITEM
 * @param {kcsapi.api.CraftItem} rd
 * @returns {Object}
 */
export function craftItem(rd) {
  /** @type {kcsapi.api.CraftItem.GET} */
  const g = rd.GET;

  /** @type {kcsapi.api.CraftItem.POST} */
  const p = rd.POST;

  let now = new Date().toISOString();

  let created = asBoolean(g.api_create_flag);
  let devMatsUsed = asBoolean(g.api_shizai_flag);
  let wasSuccessful = created || devMatsUsed;

  let resourcesUsed = resourcesFromPost(p);
  let resourceState = resourcesFromList(g.api_material);

  let item = {
    successful: (o) => ({
      type: o.api_type3,
      id: o.api_slot_item.api_id,
      slotItemId: o.api_slot_item.api_slotitem_id
    }),
    failed: (o) => ({
      slotItemId: -1
    })
  };

  let itemBody = (wasSuccessful
    ? Just(item.successful(g))
    : Nothing()).getOrElse(item.failed(g));

  let craftedItem = R.merge({ createdAt: now, resourcesUsed }, itemBody);

  resourceState = R.merge({ updatedAt: now }, resourceState);

  return {
    resourceState,
    craftedItem
  };
}
