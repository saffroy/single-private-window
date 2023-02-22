function openInPrivateWindow(url) {
  console.debug("Opening in private window:", url);
  return browser.windows.getAll({populate: true, windowTypes: ["normal"]})
    .then(windows => {
      console.debug("Existing windows:", windows);
      let privateWindow = windows.find(window => window.incognito);
      if (!privateWindow) {
        console.debug("Creating new private window");
        return browser.windows.create({incognito: true, url: url, focused: false});
      }
      console.debug("Using existing private window:", privateWindow);
      return browser.tabs.create({url: url, windowId: privateWindow.id});
    })
    .catch(error => {
      console.error("Error opening link in private window:", error);
    });
}

browser.contextMenus.create({
  id: "open-to-private-window",
  title: "Open Link in Single Private Window",
  contexts: ["link"],
});

browser.contextMenus.onClicked.addListener(info => {
  if (info.menuItemId === "open-to-private-window") {
    openInPrivateWindow(info.linkUrl);
  }
});
