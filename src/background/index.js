chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ trackedDomains: {} });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'urlVisited') {
    const domain = new URL(request.url).hostname;
    chrome.storage.sync.get('trackedDomains', function (data) {
      const trackedDomains = data.trackedDomains || {};
      trackedDomains[domain] = trackedDomains[domain] || [];
      const href = request.url
      let linkToSave = href
      if(href.slice(-1) === "/"){
        linkToSave = href.slice(0,-1)
      }
      if (!trackedDomains[domain].includes(linkToSave)) {
        trackedDomains[domain].push(linkToSave);
        chrome.storage.sync.set({ trackedDomains });
      }
    });
  }
});