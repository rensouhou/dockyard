/**
 * @typedef {object} ApiDataResultObject
 * @property {object} request
 * @property {object} response
 * @property {object} content
 */

/**
 * @typedef {Object} NetworkEventMsg
 * @property {String} event
 * @property {Object} requestResult
 * @property {String} content
 */

/**
 * @typedef {object} HttpRequest
 * @property {Number} bodySize
 * @property {Array<Object>} cookies
 * @property {Array<Object>} headers
 * @property {Number} headersSize
 * @property {String} httpVersion
 * @property {String} method
 * @property {Object} postData
 * @property {Array<Object>} queryString
 */

/**
 * @typedef {object} HttpResponse
 * @property {Number} bodySize
 * @property {Object} content
 * @property {Array<Object>} cookies
 * @property {Array<Object>} headers
 * @property {Number} status
 * @property {String} statusText
 */

/**
 * @typedef {Object} NetworkRequest
 * @property {HttpRequest} request
 * @property {HttpResponse} response
 */

