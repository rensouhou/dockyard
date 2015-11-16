
import qs from 'query-string';
import invariant from 'invariant';

class Parse {
  /**
   * @param {Object} postData
   */
  static postData(postData) {
    invariant(postData, 'Parse.postData can not be falsy. Check its calling method.');
    return qs.parse(postData.text);
  }

  /**
   *
   * @param {string} url
   * @returns {string|void|XML|*}
   */
  static apiPath(url) {
    invariant(url, 'Parse.apiPath can not be falsy. Check its calling method.');
    return url.replace(/.*\/kcsapi/, '');
  }
}

export { Parse }