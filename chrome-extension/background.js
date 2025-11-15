// chrome-extension/background.js - Service Worker for Chrome Extension
// Handles native messaging with Python backend and UI coordination

const VERSION = '1.0.0';
let pythonPort = null;
let messageQueue = [];
let isConnected = false;

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('CyberWarTools UA Extension installed');
  chrome.storage.local.set({ extensionVersion: VERSION });
  initializeNativeHost();
});

// Connect to native messaging host
function initializeNativeHost() {
  try {
    pythonPort = chrome.runtime.connectNative('com.cyberwartools.native');
    isConnected = true;
    console.log('Connected to native host');
    processQueuedMessages();
    
    pythonPort.onMessage.addListener((message) => {
      handlePythonResponse(message);
    });
    
    pythonPort.onDisconnect.addListener(() => {
      console.log('Disconnected from native host');
      isConnected = false;
      pythonPort = null;
    });
  } catch (error) {
    console.error('Failed to connect to native host:', error);
    isConnected = false;
  }
}

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'startAutomation') {
    sendMessageToPython({
      action: 'start_automation',
      config: request.config
    }, sendResponse);
  } else if (request.type === 'stopAutomation') {
    sendMessageToPython({
      action: 'stop_automation'
    }, sendResponse);
  } else if (request.type === 'getStatus') {
    sendMessageToPython({
      action: 'get_status'
    }, sendResponse);
  }
  return true;
});

// Send message to Python backend
function sendMessageToPython(message, callback) {
  if (isConnected && pythonPort) {
    messageQueue.push({ message, callback });
    pythonPort.postMessage(message);
  } else {
    messageQueue.push({ message, callback });
    console.log('Message queued, waiting for connection');
  }
}

// Handle response from Python
function handlePythonResponse(message) {
  if (messageQueue.length > 0) {
    const item = messageQueue.shift();
    if (item.callback) {
      item.callback(message);
    }
  }
  // Broadcast to all tabs
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, {
        type: 'pythonUpdate',
        data: message
      }).catch(() => {});
    });
  });
}

// Process queued messages after connection
function processQueuedMessages() {
  while (messageQueue.length > 0 && isConnected && pythonPort) {
    const item = messageQueue.shift();
    pythonPort.postMessage(item.message);
  }
}

console.log('Background service worker loaded');
