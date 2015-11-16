/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/Helpers
 */
import qs from 'query-string';
import invariant from 'invariant';

class Parse {
  /**
   * @static
   * @param {Object} postData
   */
  static postData(postData) {
    return postData ? qs.parse(postData.text) : null;
  }

  /**
   * @static
   * @param {string} url
   * @returns {string|void|XML|*}
   */
  static apiPath(url) {
    return url.replace(/.*\/kcsapi/, '');
  }
}

export { Parse }