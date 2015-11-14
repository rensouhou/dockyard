/**
 * @overview
 *
 * @since 0.1.0
 * @version 0.1.0
 * @module chrome/panel
 */
import T from 'immutable';
import kancolleApi from '../config/kancolleApi';
import addonEvents from '../enums/addonEvents';

const port = chrome.runtime.connect({ name: kancolleApi.channelName });

chrome.devtools.network.onRequestFinished.addListener((networkRequest) => {
  const { response, request } = networkRequest;
  const acceptedContent = T.List.of('text/javascript', 'text/html', 'text/plain');

  let contentType = null;

  // @fixme Please make me saner
  response.headers.forEach((it) => {
    if (it.name.toLowerCase() === 'content-type' && acceptedContent.includes(it.value)) {
      contentType = it.value;
    }
  });

  // @fixme No, pls, help
  if (contentType) {
    networkRequest.getContent((requestContent) => {
      if (requestContent.includes(kancolleApi.panel.apiDataPrefix)) {
        let content = requestContent.substring(kancolleApi.panel.apiDataPrefix.length);
        let path = request.url.replace(/.*\/kcsapi/, '');
        let apiJsonData = null;

        try {
          apiJsonData = JSON.parse(content)['api_data'];
        }
        catch (e) {
          port.postMessage({ event: addonEvents.REQUEST_CONTENT_PARSE_ERROR });
        }

        let apiRequestObject = T.Map({
          event: addonEvents.API_DATA_RECEIVED,
          content, response, request, path, apiJsonData
        });

        port.postMessage(apiRequestObject);
      }
    });
  }
});
