chrome.runtime.sendMessage({ action: 'urlVisited', url: window.location.href });

chrome.storage.sync.get('trackedDomains', function (data) {
    const trackedDomains = data.trackedDomains || {};
    const currentDomain = window.location.hostname
    document.querySelectorAll('a').forEach(link => {
        const linkUrl = link.href;
        if (linkUrl && (trackedDomains[currentDomain] || []).includes(linkUrl)) {
            // Change the color of visited link
          link.style.color = 'green';
          link.title = 'visited';
          // You can customize the styles further based on your preferences
        }
    });
});

function handleLinkClick(event) {
    const clickedUrl = event.target.href;
  
    // Send a message to the background script indicating the clicked URL
    chrome.runtime.sendMessage({ action: 'urlVisited', url: clickedUrl });
  
    // Change the color of the clicked link to green
    event.target.style.color = 'green';
    event.target.title = 'visited';
    // You can customize the styles further based on your preferences
}

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', handleLinkClick);
});