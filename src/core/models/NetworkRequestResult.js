import T from 'immutable';

const UNKNOWN_EVENT = 'UNKNOWN_EVENT';

/**
 *
 * @type {*|any|Record.Class}
 * @property {string} path
 * @property {string} event
 * @property {*} requestGetData
 * @property {*} requestPostData
 */
const NetworkRequestResultModel = T.Record({
  path: null,
  event: UNKNOWN_EVENT,
  requestGetData: null,
  requestPostData: null
});

export default NetworkRequestResultModel;