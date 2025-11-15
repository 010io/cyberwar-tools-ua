// docs/assets/js/pyodide-worker.js - Python WASM Worker
// Enables Python script execution in browser via Pyodide

let pyodide = null;
const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/';

self.onmessage = async (event) => {
  const { type, payload, id } = event.data;

  try {
    switch (type) {
      case 'init':
        await initPyodide();
        self.postMessage({ id, type: 'init', success: true });
        break;

      case 'runCode':
        const result = await runPythonCode(payload.code);
        self.postMessage({ id, type: 'runCode', result, success: true });
        break;

      case 'installPackage':
        await installPackage(payload.package);
        self.postMessage({ id, type: 'installPackage', success: true });
        break;

      default:
        self.postMessage({ id, type: 'error', error: 'Unknown command' });
    }
  } catch (error) {
    self.postMessage({ id, type: 'error', error: error.message });
  }
};

async function initPyodide() {
  if (pyodide) return;

  importScripts(`${PYODIDE_URL}pyodide.js`);
  pyodide = await loadPyodide({ indexURL: PYODIDE_URL });

  pyodide.runPython(`
    import sys
    sys.path.append('.')
    
    class PyodideHelper:
        def __init__(self):
            self.results = []
            self.errors = []
        
        def log(self, message):
            self.results.append(message)
        
        def error(self, message):
            self.errors.append(message)
    
    helper = PyodideHelper()
  `);
}

async function runPythonCode(code) {
  if (!pyodide) await initPyodide();

  try {
    const result = pyodide.runPython(code);
    return {
      output: String(result),
      type: typeof result,
    };
  } catch (error) {
    throw new Error(`Python execution error: ${error.message}`);
  }
}

async function installPackage(packageName) {
  if (!pyodide) await initPyodide();

  try {
    await pyodide.loadPackage('micropip');
    const micropip = pyodide.pyimport('micropip');
    await micropip.install(packageName);
  } catch (error) {
    throw new Error(`Failed to install: ${error.message}`);
  }
}

self.addEventListener('message', (event) => {
  if (typeof event.data === 'string' && event.data.startsWith('INIT')) {
    initPyodide().then(() => {
      self.postMessage('READY');
    }).catch((error) => {
      self.postMessage(`ERROR:${error.message}`);
    });
  }
});

console.log('Pyodide worker initialized');
