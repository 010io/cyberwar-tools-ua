# Security Policy

## Supported Versions

Security updates are provided for the latest version of CyberWarTools UA.

## Reporting Vulnerabilities

**DO NOT** open public issues for security vulnerabilities.

Send reports to: **security@010io.dev**

Include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

Response time: **48 hours** for acknowledgment, **7 days** for patch.

## Security Best Practices

### For Users:
1. **Always use VPN/Tor** when running automation
2. **Rotate TextNow numbers** every 2-3 weeks
3. **Never commit `.env` files** to Git
4. **Use strong webhook secrets** (32+ characters)
5. **Monitor rate limits** to avoid bans
6. **Update dependencies** regularly

### For Contributors:
1. Run `bandit` before committing: `bandit -r squad303-automation/`
2. Update dependencies weekly: `pip-audit`
3. Use `pre-commit` hooks for automatic security checks
4. Follow OWASP Top 10 guidelines
5. Never include API keys in code
6. Use secure random generation for secrets

## Known Issues

- TextNow may rate-limit aggressive sending → use `MAX_CALLS_PER_HOUR=30`
- 1920.in may change selectors → update `squad303_secure.py` accordingly
- Some proxies may block VoIP requests → test with different proxies

## Dependencies

All dependencies are regularly scanned for vulnerabilities using:
- `bandit` for Python security
- `safety` for dependency vulnerability checks
- `pip-audit` for comprehensive audits

## Encryption

Sensitive data (cookies, tokens) are encrypted using Fernet (AES-128).

Generate new key:
```bash
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

## Legal

This project is provided AS-IS for Ukrainian cyber defense purposes. Users are responsible for ensuring compliance with applicable laws in their jurisdiction.

---

**Last Updated:** November 2025
**Maintainer:** Igor Omelchenko (@010io)
