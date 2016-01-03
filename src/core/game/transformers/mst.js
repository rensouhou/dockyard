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
 * @param {*} o
 * @returns {number}
 */
let asNumber = o => +o;

/**
 * @param {*} o
 * @returns {Array<string>}
 */
let formatLineBreaks = (o) => {
  if (!o) return null;
  return o.replace(/<br>/gi, '\n');
};

/**
 * @param {Array|Object} o
 */
let cleanedObject = (o) => { return JSON.parse(JSON.stringify(o)) };

/**
 * Turn a flat array of numbers into a material object.
 * Does not take into account anything besides the four basic resources.
 * @param {Array<number>} list
 * @return {object}
 */
export function materialTransform(list) {
  let k = ['fuel', 'ammo', 'steel', 'bauxite'];
  let c = R.compose(R.fromPairs, R.zip);

  return c(k, list);
}

/**
 * @param {kcsapi.mst.ShipType} obj
 * @returns {Array}
 */
export function shipTypeTransform(obj) {
  return cleanedObject([obj.api_sortno, {
    equippableTypes: obj.api_equip_type,
    id: obj.api_id,
    name: obj.api_name,
    sortNo: obj.api_sortno,
    _unknown: {
      kcnt: obj.api_kcnt,
      scnt: obj.api_scnt
    }
  }]);
}

/**
 * Transform a ship from the API data to a sane object
 * @param {kcsapi.mst.Ship} obj
 * @returns {Array}
 */
export function shipTransform(obj) {
  return cleanedObject([obj.api_id, {
    name: obj.api_name,
    nameReading: obj.api_yomi,
    message: formatLineBreaks(obj.api_getmes),
    shipType: obj.api_stype,
    remodel: {
      level: obj.api_afterlv,
      id: asNumber(obj.api_aftershipid),
      cost: {
        fuel: obj.api_afterfuel,
        ammo: obj.api_afterbull
      }
    },
    gains: {
      scrap: obj.api_broken,
      modernize: obj.api_powup
    },
    rarity: obj.api_backs,
    buildTime: obj.api_buildtime,
    capacity: {
      ammo: obj.api_bull_max,
      fuel: obj.api_fuel_max
    },
    stats: {
      firePower: obj.api_houg,
      range: obj.api_leng,
      luck: obj.api_luck,
      torpedo: obj.api_raig,
      speed: obj.api_soku,
      endurance: obj.api_taik,
      antiAir: obj.api_tyku
    },
    id: obj.api_id,
    slot: {
      count: obj.api_slot_num,
      planeCapacity: obj.api_maxeq
    },
    shipExtraVoices: obj.api_voicef
  }]);
}

export default { materialTransform, shipTransform, shipTypeTransform };
