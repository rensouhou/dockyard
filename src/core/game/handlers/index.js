/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/core/game/handlers/index
 *
 * NOTE:
 *  All handlers should match the handlers found in {@link src/core/game/ApiEvents} as
 *  de-camelcased versions, e.g. `GET_BASE_DATA` turns into `GetBaseData`.
 */
import GetBaseData from './GetBaseData';

export { GetBaseData };

export default { GetBaseData };