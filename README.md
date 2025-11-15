# 🇺🇦 CyberWarTools UA

**Professional toolkit for Ukrainian cyber operations**

[![Security Scan](https://img.shields.io/badge/Security-Active-success)]()
[![Python](https://img.shields.io/badge/python-3.12+-blue)](https://www.python.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Made in Ukraine](https://img.shields.io/badge/made_in-Ukraine-blue?labelColor=yellow)](https://war.ukraine.ua/)

## 🎯 Mission

Provide accessible, secure, and effective automation tools for:
- **Counter-propaganda operations** via 1920.in (Squad303)
- **OSINT intelligence gathering** and data analysis
- **Mobile AI deployment** (Ollama on Android)
- **Cyber resistance** through open-source collaboration

## 🛠️ Tools

### 1. Squad303 Automation
**Automated messaging to Russian numbers via [1920.in](https://1920.in/)**

- **Python Desktop**: Full-featured with webhooks, Tor support, rate limiting
- **Android Automate**: No-code mobile solution
- **PWA Browser**: GitHub Pages web interface
- **Chrome Extension**: Unified control center

[📖 Setup Guide](squad303-automation/README.md)

### 2. n8n OSINT Workflows
Pre-built workflows for:
- Telegram channel monitoring
- Data leak analysis
- Automated archiving & verification
- LLM-powered analysis

### 3. Ollama Mobile
Run local LLMs on Android (POCO, Xiaomi):
- DeepSeek-R1 optimization for mobile
- Termux setup scripts
- Offline AI processing

### 4. Chrome Extension
**CyberWarTools Controller**: Unified control panel for:
- PWA (GitHub Pages) management
- Local Python automation
- Native Messaging to local service
- Real-time statistics & logs

## 🚀 Quick Start

### Browser (PWA)
```
1. Open https://010io.github.io/cyberwar-tools-ua/
2. Click "Install" for PWA
3. Configure TextNow credentials
4. Start automation
```

### Local (Python)
```bash
git clone https://github.com/010io/cyberwar-tools-ua
cd cyberwar-tools-ua/squad303-automation/python-desktop

pip install -r requirements.txt
cp .env.example .env
# Edit .env with your TextNow credentials

python squad303_secure.py
```

### Chrome Extension
```bash
1. Clone repo
2. Open chrome://extensions/
3. Enable "Developer mode"
4. Load unpacked → select chrome-extension/
5. Configure native host (see docs)
```

## 🔒 Security First

- **Tor Integration**: Built-in Tor proxy support
- **Rate Limiting**: Prevents service bans
- **Encrypted Secrets**: Fernet encryption for credentials
- **Webhook Authentication**: HMAC-SHA256 signatures
- **Background Service Worker**: Offline operation
- **Automated Security Scans**: Bandit + Safety in CI/CD

[📖 Security Policy](SECURITY.md)

## ⚖️ Legal & Ethics

**Use Responsibly**:
- Respect TextNow Terms of Service
- Only target valid operational objectives
- Comply with local laws
- Use VPN/Tor for anonymity
- No harassment or spam

[📖 Full Legal Disclaimer](docs/ethics-warfare.md)

## 📊 Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|----------|
| **Backend** | Python 3.12, Flask, n8n | Automation & workflows |
| **Frontend** | HTML/CSS/JS, PWA | Browser interface |
| **Extension** | Chrome MV3, Native Messaging | Unified control |
| **Mobile** | Termux, Ollama, Android | Local LLM deployment |
| **Security** | Tor, VPN, HMAC, Fernet | Anonymity & protection |
| **Deployment** | GitHub Pages, Docker | Hosting & scaling |

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md)

**Priority Areas**:
- Improved selectors for 1920.in scraping
- Additional OSINT workflows
- Mobile LLM optimizations
- Internationalization (other languages)
- Better documentation

## 📞 Contact & Support

- **Maintainer**: [@010io](https://github.com/010io) — Igor Omelchenko, Kharkiv 🇺🇦
- **Co-Author**: [@offsystemputin](https://instagram.com/offsystemputin) — Eduard Kunaev
- **Security**: security@010io.dev (PGP available)
- **Support**: Create an issue or discussion

## ❤️ Support Ukraine

- [Come Back Alive Foundation](https://savelife.in.ua/en/)
- [Hospitallers Battalion](https://www.hospitallers.life/)
- [I Want to Live Hotline](https://hochuzhit.com/)
- [IT Army of Ukraine](https://itarmy.com.ua/)

## 📊 Project Statistics

![GitHub stars](https://img.shields.io/github/stars/010io/cyberwar-tools-ua?style=social)
![GitHub forks](https://img.shields.io/github/forks/010io/cyberwar-tools-ua?style=social)
![Contributors](https://img.shields.io/github/contributors/010io/cyberwar-tools-ua)
![Last commit](https://img.shields.io/github/last-commit/010io/cyberwar-tools-ua)

## 📁 Repository Structure

```
cyberwar-tools-ua/
├── docs/                          # GitHub Pages & documentation
│   ├── index.html                # PWA interface
│   ├── manifest.json             # PWA manifest
│   └── assets/                   # CSS, JS, images
├── squad303-automation/
│   ├── python-desktop/           # Python automation
│   ├── android-automate/         # Automate app flows
│   └── docs/
├── chrome-extension/             # Chrome extension
├── n8n-workflows/                # Pre-built OSINT workflows
├── ollama-termux/                # Mobile LLM setup
├── docs/                         # Full documentation
├── README.md                     # This file
├── LICENSE                       # MIT License
└── SECURITY.md                   # Security policy
```

## 🔄 Workflow Overview

1. **Data Collection**: Scrape targets from 1920.in
2. **Message Processing**: Parse & validate content
3. **Delivery**: Send via TextNow (virtual SMS)
4. **Verification**: Confirm delivery & log stats
5. **Analysis**: OSINT processing with LLMs

## ✅ Status

- ✅ Squad303 Python automation (production-ready)
- ✅ PWA browser interface (beta)
- ✅ Chrome extension (beta)
- 🔄 n8n workflows (in development)
- 🔄 Mobile Ollama (in development)

## 📜 License

MIT License - See [LICENSE](LICENSE) for details

---

**Tags**: `#CyberWarTools_UA` `#StandWithUkraine` `#InfoWar` `#OSINT` `#Anonymous` `#OpenSource`

**Last Updated**: November 2025
**Status**: Active Development
**Maintainer**: Igor Omelchenko (@010io)
