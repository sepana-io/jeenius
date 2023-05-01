// Background script to handle messages from content script

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'show_info') {
      // Fetch tweet info based on tweetId
      const tweetId = message.tweetId;
      // Replace this with your logic to fetch tweet info
      
      // Send tweet info to popup
      chrome.runtime.sendMessage({ type: 'tweet_info', tweetInfo });
    }
  });
  