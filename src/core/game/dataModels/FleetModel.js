/**
 *
 */
import T from 'immutable';

const FleetModel = T.Record({
  flagship: null,
  id: null,
  memberId: null,
  mission: null,
  name: null,
  nameId: null,
  ships: T.List()
});

export default FleetModel;

export { FleetModel };
