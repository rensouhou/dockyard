let title = 'Dockyard';
let iconPath = '';
let pagePath = 'panel.html';
let callback = () => {};

chrome.devtools.panels.create(title, iconPath, pagePath, callback);