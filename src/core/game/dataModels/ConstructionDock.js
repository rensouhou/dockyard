/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import T from 'immutable';

const ConstructionDockModel = T.Record({
  a: 1,
  b: 2
});

class ConstructionDockRecord extends ConstructionDockModel {
  test() {
    return [this.a, this.b];
  }
}

export default ConstructionDockRecord;