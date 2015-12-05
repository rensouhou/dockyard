import T from 'immutable';

const UNKNOWN_EVENT = 'UNKNOWN_EVENT';

const NetworkRequestResultModel = T.Record({
  path: null,
  event: UNKNOWN_EVENT,
  requestGetData: null,
  requestPostData: null
});

export default NetworkRequestResultModel;