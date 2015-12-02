'use strict';

let fs = require('fs');
let crypto = require('crypto');
let path = require('path');
let cjson = require('cjson');
let T = require('immutable');

let manifestJson = cjson.load(path.join(__dirname, '..', 'config', 'manifest.json'));
let packageJson = cjson.load(path.join(__dirname, '..', 'package.json'));

let manifest = T.fromJS(manifestJson);

let name = 'Dockyard';
let permissions = T.List.of('experimental', 'tabs', 'webRequest', 'webRequestBlocking', '<all_urls>');
let background = T.Map().set('scripts', T.List.of('background.js'));
let csp = T.List.of('script-src \'self\' https://*.firebaseio.com', 'object-src \'self\'');

manifest = manifest
  .set('name', name)
  .set('version', packageJson.version + (process.env.NODE_ENV !== 'prod'
      ? '-' + crypto.createHash('sha1').update('togemaru').digest('hex')
      : ''))
  .set('permissions', permissions)
  .set('background', background)
  .set('devtools_page', 'devtools.html')
  .set('options_page', 'panel.html')
  .set('content_security_policy', csp.join('; '));

console.log(manifest.toJS());
