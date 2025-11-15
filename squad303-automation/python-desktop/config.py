# squad303_config.py - Configuration for Squad303 Automation
# WARNING: Keep credentials secure, use environment variables in production

config = {
    'version': '1.0.0',
💫 Add Squad303 configuration with security settings    'rate_limit': 10,  # Messages per hour
    'rate_limit_window': 3600,  # 1 hour in seconds
    'send_delay': 2,  # Delay between sends (seconds)
    'max_retries': 3,
    'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'timeout': 30,
    
    # Proxy/Tor settings
    'tor_enabled': False,
    'proxy_url': 'socks5://127.0.0.1:9050',
    
    # Authorization
    'authorized_users': [
        'admin',
        'operator'
    ],
    
    # Logging
    'log_level': 'INFO',
    'log_file': 'squad303.log',
    
    # Security
    'https_verify': True,
    'api_key': 'SET_YOUR_API_KEY_HERE',
}

if __name__ == '__main__':
    import json
    print(json.dumps(config, indent=2))
