/**
 * @overview
 *  Basic configuration for the extension
 *
 * @since 0.1.0
 * @version 0.1.1
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module config/extension
 */

export default {
  apiDataPrefix: 'svdata=',
  apiPathPrefix: /.*\/kcsapi/,
  datakeyPrefix: 'api_',
  acceptedContentTypes: ['text/javascript', 'text/plain']
};