document.addEventListener("DOMContentLoaded", function () {
  let tabs = [];
  let currentTab = 0;

  // Function to create a new tab
  function createTab() {
    const tabId = tabs.length;
    // Add the new tab to the tabs array
    tabs.push({
      id: tabId,
      url: "",
      active: false,
    });
    // Render the tabs and the tab content
    renderTabs();
    renderTabContent(tabId);
  }

  // Function to render tabs
  function renderTabs() {
    const tabsList = document.getElementById("tabs-list");
    tabsList.innerHTML = ""; // Clear the existing tabs list
    tabs.forEach((tab) => {
      const tabClass = tab.active ? "tab active" : "tab";
      // Create a button element for each tab
      const button = document.createElement("button");
      button.setAttribute("class", tabClass);
      button.setAttribute("data-tab-id", tab.id);
      button.innerText = `Browser Tab ${tab.id + 1}`;
      button.innerHTML += '<span class="close-btn">x</span>'; // Add close button
      // Create a list item for the button and append it to the tabs list
      const li = document.createElement("li");
      li.appendChild(button);
      tabsList.appendChild(li);
    });

    // Add the "+" button to create new tabs
    const newTabBtn = document.createElement("button");
    newTabBtn.setAttribute("id", "new-tab-btn");
    newTabBtn.innerText = "+";
    newTabBtn.classList.add("new-tab-btn");
    const newTabLi = document.createElement("li");
    newTabLi.appendChild(newTabBtn);
    tabsList.appendChild(newTabLi);
  }

  // Function to render tab content
  function renderTabContent(tabId) {
    const tab = tabs[tabId];
    const tabContent = document.getElementById("tab-content");
    tabContent.innerHTML = ""; // Clear existing tab content
    tabContent.classList.add("tab-content");
    if (tab.url) {
      // If URL is provided, create an iframe element to display the content
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", tab.url);
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", "100%");
      iframe.setAttribute("frameborder", "0");
      tabContent.appendChild(iframe);
    } else {
      // If no URL is provided, create an input field to enter URL
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", `url-input-${tabId}`);
      input.setAttribute("placeholder", "Enter URL");
      input.classList.add("input-field");
      tabContent.appendChild(input);
    }
  }

  // Event listener for creating new tab
  document.addEventListener("click", function (event) {
    const target = event.target;
    if (target.id === "new-tab-btn") {
      createTab();
    } else if (target.classList.contains("tab")) {
      // Event listener for switching tabs
      const tabId = parseInt(target.getAttribute("data-tab-id"));
      currentTab = tabId;
      tabs.forEach((tab) => {
        tab.active = false;
      });
      tabs[tabId].active = true;
      renderTabs();
      renderTabContent(tabId);
    } else if (target.classList.contains("close-btn")) {
      // Event listener for closing tab
      event.stopPropagation();
      const tabId = parseInt(target.parentElement.getAttribute("data-tab-id"));
      tabs.splice(tabId, 1);
      if (currentTab >= tabs.length) {
        currentTab = tabs.length - 1;
      }
      renderTabs();
      if (tabs.length > 0) {
        renderTabContent(currentTab);
      } else {
        document.getElementById("tab-content").innerHTML = "";
      }
    }
  });

  // Event listener for URL input and content loading
  document.addEventListener("keypress", function (event) {
    const target = event.target;
    if (target.tagName === "INPUT" && target.type === "text") {
      // When Enter key is pressed in the URL input field
      const tabId = parseInt(target.getAttribute("id").split("-")[2]);
      const url = target.value;
      tabs[tabId].url = url;
      renderTabContent(tabId);
    }
  });

  // Initial creation of the first tab
  createTab();
});
