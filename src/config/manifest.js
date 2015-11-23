/**
 * @overview
 *  Chrome Extension Manifest base
 *
 * @since 0.1.0
 * @author Stefan Rimaila
 * @module src/config/manifest
 */
export default {
  "manifest_version": 2,
  "name": "Dockyard",
  "version": "0.1.1",
  "permissions": [
    "experimental",
    "tabs",
    "webRequest",
    "webRequestBlocking",
    "<all_urls>"
  ],
  "devtools_page": "devtools.html",
  "options_page": "panel.html",
  "background": {
    "scripts": ["background.js"]
  },
  "content_security_policy": "script-src 'self' https://*.firebaseio.com; object-src 'self'"
}