/**
 * @overview
 *
 * @since 0.1.0
 * @version 0.1.0
 * @module chrome/devtools
 */

let title = 'Dockyard';
let iconPath = '';
let pagePath = 'panel.html';
let callback = () => {};

chrome.devtools.panels.create(title, iconPath, pagePath, callback);