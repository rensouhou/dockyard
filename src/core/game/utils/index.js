/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */

import R from 'ramda';
import { Maybe } from 'ramda-fantasy';

const { Just, Nothing } = Maybe;

/**
 * @sig n -> Boolean
 * @param {number} n
 * @returns {boolean}
 */
export let asBoolean = (n) => n === 1;

/**
 * @sig n -> Maybe Number n
 * @param {?number} n
 * @returns {?number}
 */
export let asNumber = (n) => (
  isNaN(n)
    ? Nothing()
    : Just(parseInt(n))).getOrElse(null);

/**
 * @sig Transformer => (fn -> [l]) -> [a]
 * @param {Function} fn
 * @param {Array} l
 * @returns {Array}
 */
export let reduceWithTransformer = (fn, l) => R.reduce((list, s) => {
  if (s && s !== -1) list = list.concat(fn(s));
  return list;
}, [], l);