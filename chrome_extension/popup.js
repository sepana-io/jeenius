// Popup script to receive post info and display it in the popup

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'post_info') {
      const postInfo = message.postInfo;
      // Update popup with post info
      document.getElementById('postInfo').textContent = postInfo;
    }
  });
  