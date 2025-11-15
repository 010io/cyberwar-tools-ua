# Installation Guide / Гайд Установки

🇺🇦 **Ukrainian Cyber Operations Toolkit** - Complete Installation Instructions

## System Requirements / Вимоги до системи

### Minimum Requirements
- **OS**: Linux (Ubuntu 20.04+), macOS (10.15+), Windows 10+ (with WSL2)
- **Python**: 3.9+
- **RAM**: 2GB minimum (4GB+ recommended)
- **Disk**: 500MB free space

### For Squad303 Automation
- TextNow account for mobile automation
- Webhook-capable communication service
- TLS/SSL certificate for HTTPS

### For OSINT Workflows
- Command-line tools: curl, jq, whois
- API keys (optional): Shodan, VirusTotal, IPQualityScore

### For PWA/Browser Component
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)
- Active internet connection for real-time data

### For Chrome Extension
- Chrome/Chromium 90+
- Node.js 14+ (for development)

## Installation Methods / Методи Установки

### Method 1: Docker (Recommended)

```bash
# Clone repository
git clone https://github.com/010io/cyberwar-tools-ua.git
cd cyberwar-tools-ua

# Build Docker image
docker build -t cyberwar-tools-ua .

# Run container
docker run -d --name cyberwar \  
  -p 5000:5000 \  
  -p 8080:8080 \  
  -e FLASK_ENV=production \  
  -v $(pwd)/config:/app/config \  
  cyberwar-tools-ua

# Check logs
docker logs -f cyberwar
```

### Method 2: Local Python Installation

```bash
# 1. Clone repository
git clone https://github.com/010io/cyberwar-tools-ua.git
cd cyberwar-tools-ua

# 2. Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r squad303-automation/requirements.txt

# 4. Configure environment
cp squad303-automation/python-desktop/.env.example squad303-automation/python-desktop/.env
nano squad303-automation/python-desktop/.env  # Edit with your settings

# 5. Run main application
python squad303-automation/squad303_bot.py
```

### Method 3: PWA Browser Installation

```bash
# No installation needed! Access directly:
# https://010io.github.io/cyberwar-tools-ua/

# Or self-host:
cd pwa
python -m http.server 8000
# Visit: http://localhost:8000
```

### Method 4: Chrome Extension Installation

```bash
# For Development
1. Open chrome://extensions/
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select: cyberwar-tools-ua/chrome-extension/dist/

# Build from source:
cd chrome-extension
npm install
npm run build
```

## Configuration / Конфігурація

### Essential Configuration Variables

Create `.env` file in `squad303-automation/python-desktop/`:

```bash
# TextNow Configuration
TEXTNOW_USERNAME=your_username
TEXTNOW_PASSWORD=your_password
TEXTNOW_2FA_SECRET=your_2fa_secret

# Webhook Configuration
WEBHOOK_URL=https://your-domain.com/webhook
WEBHOOK_SECRET=your_secret_key

# Flask Server
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
FLASK_ENV=production

# TLS/SSL
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/key.pem

# OSINT API Keys (optional)
SHODAN_API_KEY=optional_shodan_key
VIRUSTOTAL_API_KEY=optional_vt_key
IPQS_API_KEY=optional_ipqs_key

# Logging Configuration
LOG_LEVEL=INFO
LOG_FILE=/var/log/cyberwar.log

# Security Settings
ALLOW_LOCAL_ONLY=false
RATE_LIMIT_ENABLED=true
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=3600
```

## Verification / Перевірка

```bash
# Test Python installation
python3 --version

# Test virtual environment
source venv/bin/activate
pip list

# Run tests
pytest tests/ -v

# Check Flask server
curl http://localhost:5000/health

# Verify PWA
open http://localhost:8000 # macOS
xdg-open http://localhost:8000 # Linux
start http://localhost:8000 # Windows
```

## Troubleshooting / Вирішення Проблем

### Python Dependencies Error
```bash
pip install --upgrade pip
pip install --upgrade setuptools wheel
pip install -r squad303-automation/requirements.txt --no-cache-dir
```

### Port Already in Use
```bash
# Find and kill process using port 5000
lsof -i :5000
kill -9 <PID>
```

### SSL/TLS Certificate Issues
```bash
# Generate self-signed certificate for testing
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

### Docker Permission Denied
```bash
sudo usermod -aG docker $USER
newgrp docker
```

## Next Steps / Наступні Кроки

1. Read [SQUAD303_GUIDE.md](SQUAD303_GUIDE.md) for automation setup
2. Review [OSINT_WORKFLOWS.md](OSINT_WORKFLOWS.md) for intelligence operations
3. Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for integration
4. Join our [Discord community](#) for support

## Support / Підтримка

- 📖 Documentation: https://github.com/010io/cyberwar-tools-ua/wiki
- 🐛 Issues: https://github.com/010io/cyberwar-tools-ua/issues
- 💬 Discussions: https://github.com/010io/cyberwar-tools-ua/discussions
- 🇺🇦 Ukrainian Support: support@cyberwar-tools-ua.dev

---
**Last Updated**: November 2025
**Maintained by**: @010io
**License**: MIT
