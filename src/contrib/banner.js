'use strict';

let PACKAGE = require('../../package.json');
let now = new Date();

let banner = [
  `Dockyard Kancolle Extension ${PACKAGE.version}`,
  `Build date: ${now.toString()}`
].join('\n');

module.exports = banner;