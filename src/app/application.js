/**
 * @overview
 */
import React from 'react';
import ReactDOM from 'react-dom';

let appHolder = document.createElement('div');
document.body.appendChild(appHolder);

let attemptReload = function () {
  if (chrome && chrome.runtime) {
    chrome.runtime.reload();
  }
};

ReactDOM.render(
  <div>
    <h1>Derpa</h1>
    <button onClick={attemptReload}>Reload addon pane</button>
  </div>,
  document.getElementsByTagName('div')[0]
);


