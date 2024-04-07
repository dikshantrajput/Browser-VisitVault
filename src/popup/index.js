chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const currentDomain = new URL(tabs[0].url).hostname;

  chrome.storage.sync.get('trackedDomains', function (data) {
    const trackedUrls = document.getElementById('urlList');
    trackedUrls.innerHTML = ''; 

    if (data.trackedDomains && data.trackedDomains[currentDomain]) {
      for(const link of data.trackedDomains[currentDomain]){
        const domainItem = document.createElement('li');
        domainItem.textContent = link;
        trackedUrls.appendChild(domainItem);
      }
    } else {
      const noDataItem = document.createElement('li');
      noDataItem.textContent = 'No data for the current domain.';
      trackedUrls.appendChild(noDataItem);
    }

    trackedUrls.style.listStyle = 'none';
    trackedUrls.style.padding = '10px';
    trackedUrls.style.fontFamily = 'Arial, sans-serif';
    trackedUrls.style.fontSize = '14px';

    const listItems = trackedUrls.querySelectorAll('li');
    Array.from(listItems).forEach((listItem) => {
      listItem.style.marginBottom = '10px';
      listItem.style.padding = '18px';
      listItem.style.border = '1px solid #ccc';
      listItem.style.borderRadius = '5px';
    })

    const countElement = document.getElementById('visitedUrlsCount')
    if(countElement && listItems.length) countElement.textContent = listItems.length  

  });
});
