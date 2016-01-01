/**
 * @overview
 *  Defines master data transforms
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/game/dataModels/mst
 *
 * @fixme Rename to something more understandable than `mst`
 */

import R from 'ramda';

/**
 * Turn a flat array of numbers into a material object.
 * Does not take into account anything besides the four basic resources.
 * @param {Array<number>} list
 * @return {object}
 */
export function materialTransform (list) {
  let k = ['fuel', 'ammo', 'steel', 'bauxite'];
  let c = R.compose(R.fromPairs, R.zip);

  return c(k, list);
}

/**
 *
 * @param {kcsapi.mst.ShipType} obj
 * @returns {object}
 */
export function shipTypeTransform(obj) {
  return {
    equippableTypes: obj.api_equip_type,
    id: obj.api_id,
    name: obj.api_name,
    sortNo: obj.api_sortno,
    _unknown: {
      kcnt: obj.api_kcnt,
      scnt: obj.api_scnt
    }
  };
}

/**
 * Transform a ship from the API data to a sane object
 * @param {kcsapi.mst.Ship} o
 */
export function shipTransform (o) {
  return {
    remodel: {
      level: o.api_afterlv,
      id: o.api_aftershipid,
      capacity: {
        fuel: o.api_afterfuel,
        ammo: o.api_afterbull
      }
    },
    scrap: materialTransform(o.api_broken),
    rarity: o.api_backs,
    buildTime: o.api_buildtime,
    capacity: {
      ammo: o.api_bull_max,
      fuel: o.api_fuel_max
    },
    message: o.api_getmes,
    stats: {
      firePower: o.api_houg,
      range: o.api_leng,
      luck: o.api_luck,
      torpedo: o.api_raig,
      speed: o.api_soku,
      endurance: o.api_taik,
      antiAir: o.api_tyku
    },
    id: o.api_id,
    slot: {
      count: o.api_slot_num,
      planeCapacity: o.api_maxeq
    },
    name: o.api_name,
    remodelGain: o.api_powup,
    shipType: o.api_stype,
    shipExtraVoices: o.api_voicef,
    nameReading: o.api_yomi
  };
}

export default { materialTransform, shipTransform, shipTypeTransform };
