/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
import T from 'immutable';

class BaseModel {
  model = T.Map();
  data = null;

  constructor(data, model) {
    this.data = T.fromJS(data);
    this.model = T.fromJS(model);
  }
}

export default BaseModel;