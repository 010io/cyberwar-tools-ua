# CyberWarTools UA - Installation & Setup Guide

## Overview
CyberWarTools UA is a comprehensive Ukrainian cyber operations toolkit featuring:
- **Squad303 Automation**: TextNow SMS automation with rate limiting
- **OSINT Workflows**: n8n-based data collection and analysis
- **Mobile LLM Deployment**: Ollama on Termux for offline AI
- **Browser PWA Interface**: GitHub Pages hosted application
- **Chrome Extension**: Native messaging bridge for desktop integration

## Project Structure

```
cyberwar-tools-ua/
├── docs/                          # GitHub Pages PWA
│   ├── index.html                # Main interface
│   ├── manifest.json             # PWA manifest
│   ├── serviceworker.js          # Offline support
│   ├── ethics-warfare.md         # Legal disclaimer
│   ├── assets/
│   │   ├── css/style.css         # UI styling
│   │   └── js/
│   │       ├── app.js            # App controller
│   │       ├── squad303-core.js  # Automation logic
│   │       └── pyodide-worker.js # Python WASM worker
│
├── chrome-extension/              # Desktop integration
│   ├── manifest.json             # Extension config
│   ├── background.js             # Service worker
│   ├── popup/                    # UI components
│   ├── content/                  # Content scripts
│   └── native-host/              # Python bridge
│
├── squad303-automation/          # Python backend
│   ├── squad303_secure.py        # Main application
│   ├── config.py                 # Configuration
│   ├── requirements.txt          # Dependencies
│   └── tests/                    # Test suite
│
├── n8n-osint-workflows/         # Workflow templates
│   ├── telegram-monitor.json    # Telegram scraper
│   ├── osint-pipeline.json      # Main workflow
│   └── leak-analyzer.json       # Data analysis
│
├── ollama-mobile/               # Mobile LLM setup
│   ├── termux-setup.sh         # Installation script
│   ├── deepseek-optimization.md # Model tuning
│   └── poco-guide.md           # Device-specific guide
│
├── .github/workflows/           # CI/CD pipelines
│   ├── security-scan.yml       # Security checks
│   ├── python-tests.yml        # Unit tests
│   └── deploy-docs.yml         # Deploy to Pages
│
├── README.md
├── SECURITY.md
├── ethics-warfare.md
└── docker-compose.yml
```

## Quick Start

### 1. Browser PWA (No Installation)
1. Open https://github.com/010io/cyberwar-tools-ua/tree/main/docs
2. View as GitHub Pages: https://010io.github.io/cyberwar-tools-ua
3. Click "Install" for offline mode

### 2. Chrome Extension
1. Clone repository
2. Go to chrome://extensions/
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select `chrome-extension/` folder

### 3. Python Backend
```bash
cd squad303-automation
pip install -r requirements.txt
python squad303_secure.py --config config.py
```

### 4. n8n Workflows
1. Install n8n: https://n8n.io
2. Import JSON files from `n8n-osint-workflows/`
3. Configure API credentials

### 5. Mobile LLM (Ollama on Termux)
```bash
curl https://raw.githubusercontent.com/010io/cyberwar-tools-ua/main/ollama-mobile/termux-setup.sh | bash
ollama pull deepseek-coder
```

## Security Considerations

⚠️ **CRITICAL**: Review SECURITY.md and ethics-warfare.md before use

- All operations require explicit authorization
- Rate limiting prevents abuse
- Tor/proxy support for OPSEC
- Legal compliance checks mandatory
- Logging for audit trails

## Development

### Contributing
See CONTRIBUTING.md for guidelines

### Testing
```bash
python -m pytest squad303-automation/tests/
```

### Deployment
Push to main branch triggers:
- Security scanning (SAST/dependency checks)
- Unit test suite
- PWA deployment to GitHub Pages

## Support & Documentation

- **README.md**: Project overview
- **SECURITY.md**: Security best practices
- **ethics-warfare.md**: Legal framework
- **Issues**: GitHub issues for bugs/features
- **Discussions**: Community Q&A

## License
MIT License - See LICENSE file

## Legal Disclaimer
This toolkit is for authorized security testing only. Unauthorized use violates:
- CFAA (Computer Fraud and Abuse Act)
- ECPA (Electronic Communications Privacy Act)
- Platform Terms of Service

Users assume all legal responsibility.
