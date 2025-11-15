// Squad303 Chrome Extension Popup Handler

let messageQueue = [];
let isOnline = false;

const DOM = {
    connectionStatus: document.getElementById('connection-status'),
    backendStatus: document.getElementById('backend-status'),
    operatorId: document.getElementById('operator-id'),
    messageText: document.getElementById('message-text'),
    targetPlatform: document.getElementById('target-platform'),
    sendBtn: document.getElementById('send-btn'),
    queueBtn: document.getElementById('queue-btn'),
    sendAllBtn: document.getElementById('send-all-btn'),
    clearQueueBtn: document.getElementById('clear-queue-btn'),
    queueList: document.getElementById('queue-list'),
    activityLog: document.getElementById('activity-log')
};

function logActivity(msg) {
    const ts = new Date().toLocaleTimeString();
    const p = document.createElement('p');
    p.className = 'log-entry';
    p.textContent = `[${ts}] ${msg}`;
    DOM.activityLog.appendChild(p);
    DOM.activityLog.scrollTop = DOM.activityLog.scrollHeight;
}

function updateQueueUI() {
    DOM.sendAllBtn.textContent = `Send All (${messageQueue.length})`;
    DOM.sendAllBtn.disabled = messageQueue.length === 0;
    if (messageQueue.length === 0) {
        DOM.queueList.innerHTML = '<p class="placeholder">No queued messages</p>';
    } else {
        DOM.queueList.innerHTML = messageQueue.map((m, i) => 
            `<p class="log-entry">${i + 1}. [${m.platform}] ${m.text.substring(0, 30)}...</p>`
        ).join('');
    }
}

function checkConnection() {
    try {
        chrome.runtime.sendMessage({action: 'STATUS_CHECK'}, (r) => {
            if (r && r.status === 'ok') {
                DOM.connectionStatus.className = 'status-badge online';
                DOM.connectionStatus.textContent = 'Online';
                isOnline = true;
            }
        });
    } catch (e) {
        DOM.connectionStatus.className = 'status-badge offline';
        isOnline = false;
    }
}

DOM.sendBtn.addEventListener('click', () => {
    const op = DOM.operatorId.value.trim();
    const msg = DOM.messageText.value.trim();
    if (!op || !msg) {
        logActivity('Error: All fields required');
        return;
    }
    try {
        chrome.runtime.sendMessage({
            action: 'SEND_MESSAGE',
            operator: op,
            message: msg,
            platform: DOM.targetPlatform.value,
            immediate: true
        }, (r) => {
            logActivity(r?.success ? 'Message sent' : 'Failed: ' + r?.error);
        });
    } catch (e) {
        logActivity('Error: ' + e.message);
    }
});

DOM.queueBtn.addEventListener('click', () => {
    const op = DOM.operatorId.value.trim();
    const msg = DOM.messageText.value.trim();
    if (!op || !msg) {
        logActivity('Error: All fields required');
        return;
    }
    messageQueue.push({operator: op, text: msg, platform: DOM.targetPlatform.value});
    logActivity('Queued: ' + msg.substring(0, 40));
    DOM.messageText.value = '';
    updateQueueUI();
});

DOM.sendAllBtn.addEventListener('click', () => {
    if (messageQueue.length === 0) return;
    chrome.runtime.sendMessage({action: 'SEND_BATCH', messages: messageQueue}, (r) => {
        logActivity(r?.success ? `Sent ${r.sent} messages` : 'Batch failed');
        messageQueue = [];
        updateQueueUI();
    });
});

window.addEventListener('load', () => {
    logActivity('Squad303 popup initialized');
    checkConnection();
    updateQueueUI();
    setInterval(checkConnection, 5000);
});
