#!/usr/bin/env python3
# squad303_secure.py - Squad303 TextNow Automation Engine
# WARNING: AUTHORIZED USE ONLY - Violations of CFAA, ECPA, Platform ToS

import json
import logging
import sys
import time
from datetime import datetime
from typing import Dict, List, Optional
import requests
import socks

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Squad303Secure:
    """Main automation engine for TextNow operations"""
    
    def __init__(self, config: Dict):
        self.config = config
        self.session = requests.Session()
        self.message_queue = []
        self.rate_limiter = {}
        self._setup_proxy()
        logger.info(f"Squad303 initialized - v{self.config.get('version', '1.0')}")
    
    def _setup_proxy(self):
        """Configure Tor/SOCKS5 proxy if enabled"""
        if self.config.get('tor_enabled'):
            proxy_url = self.config.get('proxy_url', 'socks5://127.0.0.1:9050')
            self.session.proxies = {'http': proxy_url, 'https': proxy_url}
            logger.info(f"Tor proxy enabled: {proxy_url}")
    
    def check_rate_limit(self, account_id: str) -> bool:
        """Enforce rate limiting per account"""
        now = time.time()
        limit = self.config.get('rate_limit', 10)
        window = self.config.get('rate_limit_window', 3600)
        
        if account_id not in self.rate_limiter:
            self.rate_limiter[account_id] = []
        
        self.rate_limiter[account_id] = [
            t for t in self.rate_limiter[account_id] if now - t < window
        ]
        
        if len(self.rate_limiter[account_id]) >= limit:
            logger.warning(f"Rate limit exceeded for {account_id}")
            return False
        
        self.rate_limiter[account_id].append(now)
        return True
    
    def validate_authorization(self, user_id: str) -> bool:
        """Validate user authorization before operations"""
        authorized_users = self.config.get('authorized_users', [])
        if user_id not in authorized_users:
            logger.error(f"Unauthorized user: {user_id}")
            return False
        logger.info(f"User {user_id} authorized")
        return True
    
    def queue_message(self, recipient: str, content: str, options: Dict = None) -> str:
        """Add message to queue"""
        msg_id = f"msg_{int(time.time() * 1000)}"
        message = {
            'id': msg_id,
            'recipient': recipient,
            'content': content,
            'status': 'queued',
            'created_at': datetime.now().isoformat(),
            'options': options or {}
        }
        self.message_queue.append(message)
        logger.info(f"Message queued: {msg_id}")
        return msg_id
    
    def send_messages(self) -> Dict:
        """Process and send queued messages"""
        results = {'sent': 0, 'failed': 0, 'queued': len(self.message_queue)}
        
        while self.message_queue:
            msg = self.message_queue.pop(0)
            
            if not self.check_rate_limit(msg.get('recipient', 'default')):
                self.message_queue.insert(0, msg)
                logger.warning("Rate limit hit, pausing sends")
                break
            
            try:
                response = self._send_single(msg)
                if response:
                    msg['status'] = 'sent'
                    results['sent'] += 1
                    logger.info(f"Sent {msg['id']}")
                else:
                    msg['status'] = 'failed'
                    results['failed'] += 1
            except Exception as e:
                logger.error(f"Error sending {msg['id']}: {e}")
                results['failed'] += 1
            
            time.sleep(self.config.get('send_delay', 1))
        
        return results
    
    def _send_single(self, message: Dict) -> bool:
        """Send individual message via TextNow API"""
        headers = {'User-Agent': self.config.get('user_agent', 'Mozilla/5.0')}
        payload = {
            'to': message['recipient'],
            'message': message['content']
        }
        
        try:
            resp = self.session.post(
                self.config.get('api_url'),
                json=payload,
                headers=headers,
                timeout=30
            )
            return resp.status_code == 200
        except Exception as e:
            logger.error(f"Send failed: {e}")
            return False
    
    def get_status(self) -> Dict:
        """Return current operation status"""
        return {
            'queued': len(self.message_queue),
            'timestamp': datetime.now().isoformat(),
            'config_version': self.config.get('version')
        }

def main():
    try:
        with open('config.py', 'r') as f:
            config = eval(f.read())
        
        squad = Squad303Secure(config)
        
        while True:
            status = squad.get_status()
            logger.info(f"Status: {status}")
            time.sleep(5)
    except KeyboardInterrupt:
        logger.info("Shutdown requested")
        sys.exit(0)
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
