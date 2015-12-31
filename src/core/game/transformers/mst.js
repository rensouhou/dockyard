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
 * Does not take into account anything besides basic resources.
 * @param {Array<number>} m
 * @return {object}
 */
export function materialTransform (m) {
  let k = ['fuel', 'ammo', 'steel', 'bauxite'];
  let c = R.compose(R.fromPairs, R.zip);

  return c(k, m);
}

/**
 *
 * @param {kcsapi.mst.ShipType} st
 * @returns {object}
 */
export function shipTypeTransform(st) {
  return {
    equippableTypes: st.api_equip_type,
    id: st.api_id,
    name: st.api_name,
    sortNo: st.api_sortno,
    _unknown: {
      kcnt: st.api_kcnt,
      scnt: st.api_scnt
    }
  };
}

/**
 * Transform a ship from the API data to a sane object
 * @param {kcsapi.mst.Ship} s
 */
export function shipTransform (s) {
  return {
    remodel: {
      level: s.api_afterlv,
      id: s.api_aftershipid,
      capacity: {
        fuel: s.api_afterfuel,
        ammo: s.api_afterbull
      }
    },
    scrap: materialTransform(s.api_broken),
    rarity: s.api_backs,
    buildTime: s.api_buildtime,
    capacity: {
      ammo: s.api_bull_max,
      fuel: s.api_fuel_max
    },
    message: s.api_getmes,
    stats: {
      firePower: s.api_houg,
      range: s.api_leng,
      luck: s.api_luck,
      torpedo: s.api_raig,
      speed: s.api_soku,
      endurance: s.api_taik,
      antiAir: s.api_tyku
    },
    id: s.api_id,
    slot: {
      count: s.api_slot_num,
      planeCapacity: s.api_maxeq
    },
    name: s.api_name,
    remodelGain: s.api_powup,
    shipType: s.api_stype,
    shipExtraVoices: s.api_voicef,
    nameReading: s.api_yomi
  };
}

export default { materialTransform, shipTransform, shipTypeTransform };
