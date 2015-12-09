/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/models/NetworkRequestResult
 */
import T from 'immutable';

const UNKNOWN_EVENT = 'UNKNOWN_EVENT';

/** @type {Dockyard.NetworkEvent} */
const NetworkRequestResultModel = T.Record({
  path: null,
  event: UNKNOWN_EVENT,
  requestGetData: null,
  requestPostData: null
});

export default NetworkRequestResultModel;