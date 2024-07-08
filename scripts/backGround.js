const bg = '#070F2B';
const txt = '#9290C3';
const acc = '#535C91';
const scrll = '#1B1A55';
const nav = '#04091a';
let isDark = false;

function insertCSS() {
    console.log(chrome)
    chrome.scripting.insertCSS({
        target: { tabId: sender.tab.id },
        files: ['styles.css']
    });
}

function removeCSS() {
    chrome.scripting.removeCSS({
        target: { tabId: sender.tab.id },
        files: ['styles.css']
    });
}

function toggleDarkMode(bool) {
    if (bool && !isDark) {
        insertCSS(); // Insert the CSS styles initially
        isDark = true;
    } else {
        removeCSS();
        isDark = false;
    }
}

chrome.storage.sync.get(['darkMode'], (data) => {
    console.log('TOGGLING:', data.darkMode);
    toggleDarkMode(data.darkMode || false);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const isDarkMode = message.darkMode || false;
    toggleDarkMode(isDarkMode);
});