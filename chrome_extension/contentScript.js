// Function to fetch data from API and update modal content
function clearHtml() {
  document.getElementById("expertsList").innerHTML = "";
  document.getElementById("counterArgumentInfo").innerHTML = "";
  document.getElementById("jeenius-header").style.display = "none";
  document.getElementById("jeenius-question").style.display = "none";
  document.getElementById("jeenius-divider").style.display = "none";
}

async function fetchExpertsAndUpdateModal(data) {
  clearHtml();
  const modalContent = document.getElementById("expertsList");
  modalContent.innerHTML = `<div style="display: flex; align-items: flex-start; gap: 5px;"> 
  <img style="margin-top: 2px;" src=${chrome.runtime.getURL(
    "assets/user.svg"
  )} />
  <div style="display:flex; justify-content: between; align-items:center; gap: 8px; margin: 0 0 16px;">
  <p style="flex-grow: 1;margin: 0;">Ask experts:</p>
  <img style="width:16px" src=${chrome.runtime.getURL(
    "assets/spinner-green.svg"
  )} />
  </div>
  </div>`;

  try {
    const response = await fetch(
      `https://jeenius.vercel.app/api/getExperts/${encodeURIComponent(
        data.tweetText
      )}`
    );
    const jsonData = await response.json();
    // Update modal content with fetched data
    modalContent.innerHTML = `
    <div style="display: flex; align-items: flex-start; gap: 5px;"> 
    <div style="display: flex; justify-content: space-between; align-items: baseline;width: 100%">
      <div style="display: flex; align-items: flex-start; gap: 5px;">
        <img style="margin-top: 2px;" src=${chrome.runtime.getURL(
          "assets/user.svg"
        )} />
        <p style="margin: 0;">Ask experts</p>
      </div>
        <button type="button" class='modal-refresh' style="border: none; background: transparent; height: 28px; width: 28px; cursor: pointer;">
          <img src=${chrome.runtime.getURL(
            "assets/refresh.svg"
          )}  alt="refresh"/>
        </button>
      </div>
    </div>
    <div style="margin: 16px 0 40px;">
    <style>
    .green-bg-on-hover:hover {
      background-color: #eaffbe;
    }
    </style>
      ${jsonData.users
        .map(
          (expert) => `
        <div style="margin-bottom: 8px; align-items: start; display: grid; grid-template-columns: 24px calc(100% - 32px); gap: 8px; padding: 4px 0; color: #0E0F0C;">
          <img style="border-radius: 50%;" width="25" height="25" src="${expert.avatar}" />
          <div>
            <div style="display: flex; gap: 4px; margin-bottom: 4px;">
              <span style="font-size: 14px; font-weight: 600;">${expert.name}</span>
              <span style="font-size: 12px; color: #5B7083;">${expert.twitter}</span>
            </div>
            <p style="font-size: 14px;color: #454745; margin: 0;">${expert.intro}</p>
            <a href="https://twitter.com/${expert.twitter}" target="_blank" style="font-size: 12px; color: #5DD058; margin: 0; font-weight: 600;">Go to profile</a>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
      `;
    const refresh = document.querySelector(".modal-refresh");

    refresh.addEventListener("click", function (event) {
      event.stopPropagation();
      fetchExpertsAndUpdateModal(data);
    });
  } catch (error) {
    console.error(error);
    modalContent.innerHTML = `<p style="color: #E11D48;"><strong>Experts:</strong> Error fetching experts </p>`;
  }
}

function fetchDataAndUpdateModal(data) {
  clearHtml();
  // Make API request using fetch()
  const modalContent = document.getElementById("counterArgumentInfo");
  modalContent.innerHTML = `<div style="display: flex; align-items: flex-start; gap: 5px;"> 
  <img style="margin-top: 2px;" src=${chrome.runtime.getURL(
    "assets/lightning-green.svg"
  )} />
  <div style="display:flex; justify-content: between; align-items:center; gap: 8px;margin: 0 0 16px;">
  <p style="margin: 0;">See counterarguments:</p>
  <img style="width:16px" src=${chrome.runtime.getURL(
    "assets/spinner-green.svg"
  )} />
  </div>
  </div>`;

  fetch(
    `https://jeenius.vercel.app/api/gpt/tell me the counter arguments about ${data.tweetText}`
  )
    .then((response) => response.json())
    .then((jsonData) => {
      // Update modal content with fetched data
      modalContent.innerHTML = `<div>
      <div style="display: flex; align-items: flex-start; gap: 5px;"> 
      <img style="margin-top: 2px;" src=${chrome.runtime.getURL(
        "assets/lightning.svg"
      )} />
      <p style="margin: 0 0 12px;">See counterarguments:</p>
      </div>
     <pre style="white-space: pre-wrap; padding: 0; font-family: sans-serif; font-size: 13px; line-height: 18px;margin: 0 0 48px;">${
       jsonData.response
     }</pre>
      </div>
      `;
    })
    .catch((error) => {
      modalContent.innerHTML = `<div>
      <div style="display: flex; align-items: flex-start; gap: 5px;"> 
      <img style="margin-top: 2px;" src=${chrome.runtime.getURL(
        "assets/lightning-green.svg"
      )} />
      <p style="margin: 0 0 12px;">See counterarguments:</p>
      </div>
      <p style="margin: 0 0 16px; color: #E11D48;">Couldn't load counter arguments. Please try another tweet</p>
      </div>
      `;
    });
}

// Function to add the "Info" button beside the "Share" button for each tweet
function addPostInfoButtons() {
  const tweets = document.querySelectorAll('[data-testid="tweet"]');
  tweets.forEach((tweet) => {
    const shareButton = tweet.querySelector('[aria-label="Share Tweet"]');
    // if (shareButton) {

    const shareButtonGroup =
      shareButton.parentElement.parentElement.parentElement;
    if (shareButtonGroup && !tweet.querySelector(".post-info-button")) {
      const button = document.createElement("img");
      button.className = "post-info-button";
      button.style.marginLeft = "16px";
      button.style.opacity = 1;
      button.style.width = "24px";
      button.style.cursor = "pointer";
      button.src = chrome.runtime.getURL("assets/logo.svg");

      // Show the info icon on button hover
      button.addEventListener("mouseover", () => {
        button.style.opacity = 0.9;
      });

      // Hide the info icon when the mouse leaves the button
      button.addEventListener("mouseout", () => {
        button.style.opacity = 1;
      });

      const anchorTags = tweet.getElementsByTagName("a");
      button.dataset.tweetId = getTweetData(anchorTags).id;
      button.dataset.tweetURL = getTweetData(anchorTags).url;
      button.dataset.tweetText = tweet.querySelector(
        '[data-testid="tweetText"]'
      ).innerText;
      const userName = tweet.querySelector('[data-testid="User-Name"');
      const userAvatar = tweet.querySelector('[data-testid="Tweet-User-Avatar"')
        .children[0].children[0];

      button.addEventListener("click", function (event) {
        event.stopPropagation();
        chrome.runtime.sendMessage(
          { action: "getPostInfo" },
          function (response) {
            // Display the post information in the popup modal
            showModalPopup(button.dataset, { userName, userAvatar });
          }
        );
      });

      shareButtonGroup.appendChild(button);
    }
  });
}

function getTweetData(anchorTags) {
  for (let i = 0; i < anchorTags.length; i++) {
    const link = anchorTags[i];

    const match = link.href.match(/\/status\/(\d+)/);
    if (match) {
      return { id: match[1], url: link.href };
    }
  }
}

// Initialize the "Info" buttons on page load
addPostInfoButtons();

// Use a MutationObserver to detect changes in the DOM and update the buttons accordingly
const observer = new MutationObserver(function (mutations) {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      // If new nodes are added to the DOM, check for tweets and add "Info" buttons
      addPostInfoButtons();
    }
  });
});

// Observe changes in the DOM for tweets
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false,
});

async function showModalPopup(postInfo, userInfo) {
  const owner = document.querySelector(
    '[data-testid="SideNav_AccountSwitcher_Button"'
  ).textContent;
  const { userName, userAvatar } = userInfo;

  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.right = "0";
  modal.style.bottom = "0";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "9999";
  const imageSrc = userAvatar.getElementsByTagName("img")[0].src;
  modal.innerHTML = `
  <div id="modalContent" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 16px; max-width: 400px; width: 100%;">
  <button style="position: absolute; top: -10px; right: -10px; display: flex; align-items: center; justify-content: center; z-index: 5; background-color: #F1F5F9; border: none; border-radius: 100px; cursor: pointer; height: 28px; width: 28px; display: flex; align-items: center; justify-content: center;" type='button' class='post-info-modal-close'>
  <img src="${chrome.runtime.getURL("assets/close.svg")}" alt="close"/></button>
  <div style="font-family: sans-serif; overflow: scroll; height: fit-content; max-height: 80vh; padding: 20px; background-color: #fff; border-radius: 16px;">
      <div id="jeenius-header" style="display: grid; grid-template-columns: 24px calc(100% - 34px);  gap: 10px; align-items: start;">
      <div style="height: 24px; width: 24px; border-radius: 360px; overflow: hidden;">
      <img src=${imageSrc} style="height: 24px; width: 24px; border-radius: 360px"/>
      </div>
      <div>
      <p style="margin: 0; font-weight: 600;">${
        userName.innerText.split("@")[0]
      }<span style="color: #5B7083; margin-left: 4px; font-weight: 400;">${
    userName.innerText.split("@")[1]
  }</span></p>
      <p style="overflow: hidden; margin: 8px 0 0; width: 100%; color: #5B7083; white-space: nowrap; text-overflow: ellipsis;">${
        postInfo.tweetText
      }</p>
      </div>
      </div>
      <div id="jeenius-divider" style="height: 1px; background-color: #ACF70D; width: 100%; margin: 16px 0px;">
      </div>

      <div style="height: 100%; display: grid; grid-template-columns: 24px calc(100% - 34px); gap: 10px; align-items: flex-start;">
      <img src=${chrome.runtime.getURL(
        "assets/logo.svg"
      )} style="width: 24px;" />
        <div style="height: 100%; overflow: scroll;">
          <p style="font-size: 14px; margin: 2px 0 8px;"><strong>Jeenius</strong></p>
          <p id="jeenius-question" style="font-size: 14px; maring: 0 0 16px;">What do you want to do?</p>
          <div id="counterArgumentInfo"></div>
          <div id="expertsList"> </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="post-info-modal-ca" style="background-color: #ACF70D; height: 32px; border-radius: 100px; border-width: 0px; font-weight: 600; padding: 0px 16px; display: flex; gap: 10px; align-items: center; cursor: pointer; width: max-content; font-weight: 500;">
            <img src=${chrome.runtime.getURL(
              "assets/lightning.svg"
            )} style="padding-top: 0px;" />
            <p>See counterarguments</p>
            </button>

            <button class="post-info-modal-pool" style="background-color: #ACF70D; height: 32px; border-radius: 100px; border-width: 0px; font-weight: 600; padding: 0px 16px; display: flex; gap: 10px; align-items: center; cursor: pointer; width: max-content; font-weight: 500;">
            <img src=${chrome.runtime.getURL(
              "assets/whatsapp.svg"
            )} style="padding-top: 0px;" />
            <p>Poll friends</p>
            </button>

            <button class="post-info-modal-ask" style="background-color: #ACF70D; height: 32px; border-radius: 100px; border-width: 0px; font-weight: 600; padding: 0px 16px; display: flex; gap: 10px; align-items: center; cursor: pointer; width: max-content; font-weight: 500;">
            <img src=${chrome.runtime.getURL(
              "assets/user.svg"
            )} style="padding-top: 0px;" />
            <p>Ask experts</p>
            </button>
          </div
        </div>
      </div>
      </div>
      </div>
    `;
  document.body.appendChild(modal);

  const counterArgumentButton = modal.querySelector(".post-info-modal-ca");
  counterArgumentButton.addEventListener("click", () => {
    fetchDataAndUpdateModal(postInfo);
  });

  const askExpertsButton = modal.querySelector(".post-info-modal-ask");
  askExpertsButton.addEventListener("click", () => {
    fetchExpertsAndUpdateModal(postInfo);
  });

  const poolFrinedsButton = modal.querySelector(".post-info-modal-pool");
  poolFrinedsButton.addEventListener("click", () => {
    shareData(postInfo);
  });

  const closeButton = modal.querySelector(".post-info-modal-close");
  closeButton.addEventListener("click", function (event) {
    modal.remove();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });
}

function getTweetInfo(postElement) {
  // Replace with the actual code to retrieve tweet information from the postElement
  const tweetId = postElement.getAttribute("data-tweet-id");
  const tweetContent = postElement.querySelector(".tweet-content").textContent;
  const tweetAuthor = postElement.querySelector(".tweet-author").textContent;
  const tweetDate = postElement.querySelector(".tweet-date").textContent;

  // Return an object with the tweet information
  return {
    tweetId: tweetId,
    tweetContent: tweetContent,
    tweetAuthor: tweetAuthor,
    tweetDate: tweetDate,
  };
}

async function fetchCounterArgs(data) {
  try {
    const res = await fetch(
      `https://jeenius.vercel.app/api/gpt/tell me the counter arguments about ${data.tweetText}`
    );
    const resJson = await res.json();
    return resJson;
  } catch (e) {
    return "NA";
  }
}

async function shareData(data) {
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
    data.tweetURL
  )}&text=${encodeURIComponent(data.tweetText)}`;
  const whatsappUrl =
    "https://web.whatsapp.com/send?text=Thoughts on this%3F Agree%3F Disagree%3F " +
    encodeURIComponent(data.tweetURL);
  window.open(whatsappUrl, "_blank");
}
