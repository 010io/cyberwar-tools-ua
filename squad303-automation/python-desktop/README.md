# Squad303 Desktop Automation Engine

## Overview

Squad303 is a secure Python automation framework for distributed social media OSINT operations. This module provides the desktop/server-side backend for coordinating OSINT campaigns with built-in rate limiting, authorization, and compliance controls.

## Installation

```bash
pip install -r requirements.txt
```

## Configuration

Edit `config.py` to configure:

- **API Endpoints**: Discord, Slack, or custom webhook URLs
- **Rate Limits**: Messages per hour (default: 10/hour)
- **Send Delays**: Seconds between messages (default: 2s)
- **Proxy/Tor**: Enable `tor_enabled` for OPSEC
- **Authorization**: List of approved operator usernames
- **API Keys**: Set `api_key` for secure authentication

## Usage

```python
from squad303_secure import Squad303Secure
from config import config

# Initialize automation engine
engine = Squad303Secure(config)

# Queue message
engine.queue_message('operator1', 'message_text', 'discord')

# Send queued messages
status = engine.send_messages()
print(status)
```

## Security

**CRITICAL LEGAL DISCLAIMERS:**
- This tool is provided for authorized OSINT research only
- Unauthorized access violates CFAA (Computer Fraud and Abuse Act)
- Violates ECPA (Electronic Communications Privacy Act) if used without consent
- Violates platform Terms of Service - use only on authorized accounts
- Rate limiting prevents account suspension and detection
- Tor/proxy support for operational security only

## Logging

All operations are logged to `squad303.log` with timestamps and operator IDs for audit trails.

## Status Check

```python
print(engine.get_status())
# Output: {"queued": 0, "sent": 15, "failed": 1, "rate_limit_remaining": 9}
```
