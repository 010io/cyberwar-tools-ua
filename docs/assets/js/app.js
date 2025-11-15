docs/assets/js/app.js// CyberWarTools UA - PWA App Controller
// Main application logic and UI interaction
// Last Updated: 2024

let core;
const DOM = {
  statusIcon: document.getElementById('status-icon'),
  statusText: document.getElementById('status-text'),
  startBtn: document.getElementById('start-automation'),
  stopBtn: document.getElementById('stop-automation'),
  sendOnceBtn: document.getElementById('send-once'),
  clearLogsBtn: document.getElementById('clear-logs'),
  logConsole: document.getElementById('log-console'),
  configForm: {
    username: document.getElementById('textnow-username'),
    sid: document.getElementById('textnow-sid'),
    rateLimit: document.getElementById('rate-limit'),
    useTor: document.getElementById('use-tor'),
    saveBtn: document.getElementById('save-config')
  },
  installPrompt: document.getElementById('install-prompt'),
  installBtn: document.getElementById('install-btn')
};

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 CyberWarTools UA initializing...');
  core = new Squad303Core();
  
  try {
    await core.init();
    setupPWAInstall();
    bindEvents();
    enableControls();
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    alert('Failed to initialize: ' + error.message);
  }
});

// Bind UI events
function bindEvents() {
  if (DOM.configForm.saveBtn) {
    DOM.configForm.saveBtn.addEventListener('click', async () => {
      const config = {
        textnowUsername: DOM.configForm.username?.value || '',
        textnowSid: DOM.configForm.sid?.value || '',
        rateLimit: parseInt(DOM.configForm.rateLimit?.value || 30),
        useTor: DOM.configForm.useTor?.checked || false
      };
      
      await core.saveConfiguration(config);
      alert('✅ Configuration saved');
    });
  }

  if (DOM.startBtn) {
    DOM.startBtn.addEventListener('click', () => {
      core.startAutomation();
      toggleButtons(true);
    });
  }

  if (DOM.stopBtn) {
    DOM.stopBtn.addEventListener('click', () => {
      core.stopAutomation();
      toggleButtons(false);
    });
  }

  if (DOM.sendOnceBtn) {
    DOM.sendOnceBtn.addEventListener('click', () => {
      core.sendOnce();
    });
  }

  if (DOM.clearLogsBtn) {
    DOM.clearLogsBtn.addEventListener('click', () => {
      if (DOM.logConsole) DOM.logConsole.innerHTML = '';
    });
  }
}

// Enable/disable controls based on config
function enableControls() {
  const hasConfig = core.config && core.config.textnowUsername && core.config.textnowSid;
  if (DOM.startBtn) DOM.startBtn.disabled = !hasConfig;
  if (DOM.sendOnceBtn) DOM.sendOnceBtn.disabled = !hasConfig;
}

// Toggle button states
function toggleButtons(isRunning) {
  if (DOM.startBtn) DOM.startBtn.disabled = isRunning;
  if (DOM.stopBtn) DOM.stopBtn.disabled = !isRunning;
  if (DOM.sendOnceBtn) DOM.sendOnceBtn.disabled = isRunning;
}

// PWA Install handling
let deferredPrompt;

function setupPWAInstall() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (DOM.installPrompt) DOM.installPrompt.style.display = 'block';
  });

  if (DOM.installBtn) {
    DOM.installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      deferredPrompt = null;
      if (DOM.installPrompt) DOM.installPrompt.style.display = 'none';
    });
  }

  window.addEventListener('appinstalled', () => {
    console.log('✅ PWA installed successfully');
    if (core) core.log('PWA installed successfully', 'success');
  });
}

// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceworker.js')
    .then((reg) => {
      console.log('✅ Service Worker registered');
      if (core) core.log('Service Worker registered', 'success');
    })
    .catch((error) => {
      console.error('❌ Service Worker registration failed:', error);
    });
}

console.log('✅ App initialized successfully');
