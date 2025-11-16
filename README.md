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

🎯 Mission
CyberWarTools UA — це відкритий набір інструментів для підтримки кіберопору України, зосереджений на контрпропаганді, OSINT-розвідці та автоматизації. Ми прагнемо надати доступні рішення для волонтерів, IT-армії та аналітиків, які не вимагають глибоких технічних навичок. Проект еволюціонує від базової PWA-панелі з локальним Python-бекендом до повноцінної екосистеми з хмарним доступом, мобільними LLM та інтеграціями для новачків у cyberwarfare.

Ключові принципи:

Доступність: Запуск через браузер або 1-клік (без терміналу для нетехнічних користувачів).

Безпека та етика: Вбудовані обмеження, OPSEC (Tor/VPN), чіткі застереження проти зловживань.

Масштабованість: Локальний/хмарний режим, офлайн-підтримка, інтеграція з AI (Ollama).

Підтримка України: Усі інструменти орієнтовані на протидію агресору, з акцентом на Bellingcat-style OSINT та IT Army workflows.

Майбутнє бачення: Розширення до SaaS-платформи з zero-install (хмарний бекенд), десктопними апками (Electron/Tauri), AI-агентами для автоматизованого OSINT та інтеграцією з урядовими e-services (Diia). Ми плануємо залучити спільноту для створення "vibe-coding" інструментів для новачків — простих, але потужних для інформаційних операцій.

🛠️ Tools
1. Squad303 Automation
Автоматизована розсилка повідомлень на російські номери через 1920.in (контрпропаганда).

Python Desktop: Повнофункціональний бекенд з вебхуками, Tor-підтримкою, rate limiting (Flask/FastAPI).

Android Automate: No-code рішення для мобільних (Termux + Automate app).

PWA Browser: Веб-інтерфейс на GitHub Pages з реальним часом статусами та логами.

Chrome Extension: Централізоване керування (MV3 з Native Messaging).

Поточний статус: Production-ready для Python; beta для PWA/Extension.

2. n8n OSINT Workflows
Готові workflows для розвідки з відкритих джерел.

Моніторинг Telegram-каналів, аналіз витоків даних.

Автоматичне архівування та верифікація.

Інтеграція з LLM для семантичного аналізу (Ollama або хмарні API).

Поточний статус: In development; базові workflows доступні.

3. Ollama Mobile
Локальний запуск LLM на Android (POCO/Xiaomi).

Оптимізація DeepSeek-R1 для мобільних (1-бітні моделі).

Скрипти для Termux: Встановлення, запуск, інтеграція з OSINT.

Офлайн-обробка даних для приватності.

Поточний статус: In development; базовий setup готовий.

4. Chrome Extension & Native Messaging
Єдиний контрол-панель для всіх інструментів.

Керування PWA, локальним бекендом та мобільними скриптами.

Real-time статистика, логи, інтеграція з браузером (e.g., scraping).

Поточний статус: Beta; Native Messaging для локального зв'язку.

Майбутні розширення
Хмарний SaaS: Безкоштовний доступ через браузер (Railway/PythonAnywhere) без локальної установки.

AI-агенти: Інтеграція з Diia.AI для прискорення e-services (від днів до годин).

Cyberwarfare для новачків: "Vibe-coding" інструменти — прості автоматизації з AI для Bellingcat-style розслідувань.

Десктоп-апп: Electron/Tauri для повної автономності (EXE для Windows, без Python).

🚀 Quick Start
Browser (PWA) — Мінімальні дії, без установки
Відкрийте https://010io.github.io/cyberwar-tools-ua/.

Натисніть "Install PWA" для встановлення як додатка (офлайн-режим доступний).

Введіть credentials TextNow (зашифровано Fernet).

Оберіть режим: Локальний (запустіть бекенд нижче) або Хмарний (demo на Railway).

Примітка: Для повної функціональності запустіть локальний бекенд або використовуйте хмарний demo. UI показує статус (Online/Offline) та етичне підтвердження.

Локальний (Python Backend) — Для повного контролю
bash
git clone https://github.com/010io/cyberwar-tools-ua
cd cyberwar-tools-ua/squad303-automation/python-desktop

pip install -r requirements.txt
cp .env.example .env  # Редагуйте з TextNow credentials (KDF + Fernet для безпеки)
python main.py  # Запуск FastAPI на localhost:8000
PWA з'єднається автоматично (CORS налаштовано).

Для фону: PyInstaller для EXE (Windows) або NSSM/Tasker (Android).

Хмарний режим (Zero-Install, безкоштовно)
Railway/PythonAnywhere/Render: Зв'яжіть репо з GitHub, автодеплой (див. Deployment Options).

PWA використовує хмарний API: const API_BASE = 'https://your-app.railway.app';.

Demo: Спробуйте хмарний demo (якщо налаштовано).

Chrome Extension
Клонуйте репо.

Відкрийте chrome://extensions/, увімкніть Developer mode.

Load unpacked → chrome-extension/.

Налаштуйте Native Messaging (див. docs/native-host.md).

🏗️ Architecture Overview
Thin Client Model: PWA (GitHub Pages) ↔ FastAPI Backend (локальний/хмарний) ↔ External APIs (TextNow, 1920.in).

Frontend (PWA): React-free JS з Service Worker (App Shell кешування, offline UX). Індикатори: Backend status (fetch /health), SSE для логів, install CTA.

Backend (FastAPI): Асинхронний REST з Pydantic валідацією, BackgroundTasks для довгих операцій, SSE для реального часу. CORS для HTTPS PWA.

Зв'язок: HTTPS для хмари; localho.st:8000 для локального (обхід Mixed Content).

Режими: Demo (mock data), Production (реальні API з rate limiting).

Інтеграції: Native Messaging для Extension, n8n workflows, Ollama для AI-аналізу.

Diagram (Mermaid):

text
graph TD
    PWA[GitHub Pages PWA] -->|fetch/SSE| Backend[FastAPI Backend<br>localhost:8000 / Cloud]
    Backend -->|Tor/Proxy| External[TextNow API / 1920.in]
    Backend -->|Native Msg| Extension[Chrome Extension]
    Backend -->|Workflows| n8n[n8n OSINT]
    Backend -->|Local LLM| Ollama[Ollama Mobile]
🔒 Security First
Безпека — пріоритет для OPSEC у чутливих операціях.

Секрети: Завантаження з env vars (.env gitignored); шифрування Fernet + KDF (PBKDF2 з паролем користувача).

API Захист: JWT/HMAC аутентифікація, rate limiting (fastapi-limiter), Pydantic валідація (білий список команд/цілей).

Мережа: Tor/VPN інтеграція, CORS middleware (тільки GitHub Pages), HTTPS для хмари.

Логування: Аудит усіх дій (файли + SSE), security scans (Bandit/Safety у CI/CD).

OPSEC Рекомендації: Використовуйте VPN/Tor; обмежуйте IP-діапазони; регулярні оновлення залежностей.

Політика: Див. SECURITY.md. Звіт про вразливості: security@010io.dev (PGP ключ у файлі).

⚖️ Legal & Ethics
Відповідальне використання — обов'язок кожного:

Призначення: Тільки для освітніх, етичних OSINT та авторизованих операцій (захист/тестування). Заборонено спам, харасмент, атаки на цивільних.

Законність: Дотримуйтесь ToS TextNow/1920.in, українських/міжнародних законів. Контроль людини над автоматизацією (немає "autopilot").

Етика OSINT: Людський нагляд, аудит логів, уникнення масового збору даних. Підтвердження в UI: Чекбокс "Я ознайомлений з обмеженнями".

Відповідальність: Автори не несуть відповідальності за зловживання. Використовуйте анонімно (Tor/VPN).

Повний Disclaimer: ethics-warfare.md. Кодекс поведінки: CODE_OF_CONDUCT.md.

📊 Technology Stack
Компонент	Технології	Призначення
Backend	Python 3.12, FastAPI, n8n	Асинхронна автоматизація, workflows
Frontend	HTML/CSS/JS, PWA (Service Worker)	Браузерний інтерфейс, offline
Extension	Chrome MV3, Native Messaging	Централізоване керування
Mobile	Termux, Ollama, Tasker	Локальні LLM, фонові сервіси
Security	Tor, Fernet/KDF, HMAC-SHA256, fastapi-limiter	Анонімність, захист даних
Deployment	GitHub Pages, Railway/Render (хмара), PyInstaller	Локальний/хмарний запуск
Testing/CI	Pytest, Cypress, GitHub Actions (Bandit/Safety)	Unit/e2e тести, security scans
🤝 Contributing
Ми вітаємо внески! Див. CONTRIBUTING.md.

Пріоритети:

Покращення PWA: Offline UX, install flow, мультимовність.

Бекенд: SSE логи, BackgroundTasks, інтеграція з Diia.AI.

OSINT: Нові workflows (Telegram scraping, AI-аналіз).

Мобільне: Оптимізація Ollama для low-end пристроїв.

Хмара: Безкоштовний SaaS на Railway для zero-install.

Документація: Відео-гайди, FAQ для новачків.

Створіть issue/discussion для ідей. Форкніть і подайте PR!

📈 Roadmap
Q4 2025 (Beta 1.0): Повна PWA з offline, FastAPI бекенд, хмарний demo (Railway).

Q1 2026 (1.0 Release): Electron десктоп, e2e тести, Legal UI блок.

Q2 2026: AI-агенти для OSINT, інтеграція з Bellingcat tools, мультиролі.

Довгостроково: Повний SaaS, підтримка інших мов, спільнота IT Army.

Статус: Active Development. Див. Projects для трекінгу.

📞 Contact & Support
Maintainer: @010io — Igor Omelchenko, Kharkiv 🇺🇦 (mesh-архітектор, AI-контент творець).

Co-Author: @offsystemputin — Eduard Kunaev.

Security: security@010io.dev (PGP: ключ у SECURITY.md).

Support: Issues, Discussions, Telegram: @010io_support.

❤️ Support Ukraine
Come Back Alive

Hospitallers

I Want to Live

IT Army of Ukraine

Допомагайте Україні — використовуйте інструменти відповідально!

📁 Repository Structure
text
cyberwar-tools-ua/
├── docs/                          # PWA & документація
│   ├── index.html                 # Головний інтерфейс PWA
│   ├── manifest.json              # PWA маніфест
│   ├── sw.js                      # Service Worker
│   └── assets/                    # CSS/JS/іконки
├── squad303-automation/           # Автоматизація розсилки
│   ├── python-desktop/            # FastAPI бекенд
│   ├── android-automate/          # Мобільні скрипти
│   └── docs/                      # Гайди
├── chrome-extension/              # Chrome розширення
│   ├── manifest.json              # MV3 маніфест
│   └── native-host/               # Native Messaging
├── n8n-osint-workflows/           # OSINT workflows
│   └── workflows/                 # JSON файли n8n
├── ollama-mobile/                 # Мобільні LLM
│   ├── termux-setup.sh            # Скрипти встановлення
│   └── models/                    # Оптимізовані моделі
├── .github/workflows/             # CI/CD (тести, scans)
├── docs/                          # Повна документація
├── README.md                      # Цей файл
├── INSTALLATION_GUIDE.md          # Детальний гайд
├── CONTRIBUTING.md                # Внески
├── LICENSE                        # MIT
├── SECURITY.md                    # Безпека
└── docker-compose.yml             # Хмарне/локальне розгортання
🔄 Workflow Overview
Збір даних: Scraping цілей з 1920.in (з rate limiting).

Обробка: Валідація Pydantic, шифрування секретів.

Доставка: SMS через TextNow (Tor проксі, BackgroundTasks).

Верифікація: SSE логи, аудит, LLM-аналіз (Ollama).

OSINT: n8n workflows для моніторингу/архівування.

✅ Status & Checklist
✅ Squad303 Python (production-ready з FastAPI).

✅ PWA інтерфейс (beta з health-check, SSE).

✅ Chrome extension (beta з Native Messaging).

🔄 n8n workflows (базові готові).

🔄 Mobile Ollama (setup скрипти).

🔄 Хмарний SaaS (demo на Railway).

🔄 Тести/CI (GitHub Actions з Bandit).

Див. Projects для деталей.

📜 License
MIT License — Див. LICENSE. Теги: #CyberWarTools_UA #StandWithUkraine #InfoWar #OSINT #Anonymous #OpenSource

Last Updated: November 2025 | Status: Active Development | Maintainer: Igor Omelchenko (@010io)

---

**Tags**: `#CyberWarTools_UA` `#StandWithUkraine` `#InfoWar` `#OSINT` `#Anonymous` `#OpenSource`

**Last Updated**: November 2025
**Status**: Active Development
**Maintainer**: Igor Omelchenko (@010io)
