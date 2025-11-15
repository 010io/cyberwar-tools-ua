// docs/assets/js/squad303-core.js - Squad303 Core Automation Logic
// CyberWarTools UA - Ukrainian cyber operations toolkit
// Last Updated: 2024

/**
 * Squad303Core - Main automation controller for TextNow-based operations
 * Handles account management, message scheduling, and webhook integration
 * 
 * LEGAL DISCLAIMER:
 * This tool is designed for AUTHORIZED SECURITY TESTING ONLY
 * Unauthorized access to accounts, impersonation, or spam violates:
 * - Computer Fraud and Abuse Act (CFAA)
 * - TextNow Terms of Service
 * - Electronic Communications Privacy Act (ECPA)
 */
class Squad303Core {
  constructor(config = {}) {
    this.config = {
      apiEndpoint: config.apiEndpoint || 'http://localhost:5000',
      webhookSecret: config.webhookSecret || 'CHANGE_ME',
      rateLimit: config.rateLimit || 100,
      rateLimitWindow: config.rateLimitWindow || 3600000,
      maxRetries: config.maxRetries || 3,
      retryDelay: config.retryDelay || 1000,
      torEnabled: config.torEnabled || false,
      proxyUrl: config.proxyUrl || null,
      timeout: config.timeout || 30000,
      userAgent: config.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    };

    this.state = {
      isAuthenticated: false,
      isRunning: false,
      sessionToken: null,
      accountId: null,
      lastActivity: null,
      messageQueue: [],
      sentMessages: [],
      failedMessages: [],
    };

    this.rateLimitTracker = {
      requests: [],
      blockedUntil: null,
    };

    this.logs = [];
    this.logLevel = config.logLevel || 'info';
  }

  async init(credentials) {
    try {
      this.log('Initializing Squad303 core...', 'info');
      
      if (!credentials || !credentials.username || !credentials.password) {
        throw new Error('Invalid credentials provided');
      }

      this.validateConfig();

      const response = await this.apiRequest('/auth/login', 'POST', {
        username: credentials.username,
        password: credentials.password,
        torEnabled: this.config.torEnabled,
      });

      if (!response.success) {
        throw new Error(`Authentication failed: ${response.error}`);
      }

      this.state.isAuthenticated = true;
      this.state.sessionToken = response.token;
      this.state.accountId = response.accountId;
      this.state.lastActivity = new Date();

      this.log('Authentication successful', 'info');
      return { success: true, accountId: response.accountId };
    } catch (error) {
      this.log(`Initialization failed: ${error.message}`, 'error');
      return { success: false, error: error.message };
    }
  }

  addMessage(recipient, content, options = {}) {
    try {
      if (!recipient || !content) {
        throw new Error('Recipient and content are required');
      }

      const message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        recipient: recipient,
        content: content,
        scheduledFor: options.scheduledFor || new Date(),
        priority: options.priority || 'normal',
        retryCount: 0,
        status: 'queued',
        createdAt: new Date(),
      };

      this.state.messageQueue.push(message);
      this.log(`Message queued: ${message.id}`, 'debug');
      return message.id;
    } catch (error) {
      this.log(`Failed to queue message: ${error.message}`, 'error');
      throw error;
    }
  }

  async sendMessages() {
    try {
      if (!this.state.isAuthenticated) {
        throw new Error('Not authenticated');
      }

      this.state.isRunning = true;
      let successCount = 0;
      let failureCount = 0;

      while (this.state.messageQueue.length > 0) {
        if (!this.checkRateLimit()) {
          this.log('Rate limit reached, pausing...', 'warn');
          break;
        }

        const message = this.state.messageQueue.shift();
        
        try {
          const result = await this.sendMessage(message);
          
          if (result.success) {
            this.state.sentMessages.push(message);
            successCount++;
            this.log(`Message sent: ${message.id}`, 'info');
          } else {
            message.retryCount++;
            
            if (message.retryCount < this.config.maxRetries) {
              this.state.messageQueue.push(message);
              this.log(`Retrying message ${message.id}`, 'warn');
            } else {
              this.state.failedMessages.push(message);
              failureCount++;
              this.log(`Message failed: ${message.id}`, 'error');
            }
          }

          await this.delay(this.config.retryDelay * (message.retryCount + 1));
        } catch (error) {
          this.log(`Error sending message: ${error.message}`, 'error');
          this.state.failedMessages.push(message);
          failureCount++;
        }
      }

      this.state.isRunning = false;
      return {
        success: true,
        sent: successCount,
        failed: failureCount,
        queued: this.state.messageQueue.length,
      };
    } catch (error) {
      this.state.isRunning = false;
      this.log(`Send operation failed: ${error.message}`, 'error');
      throw error;
    }
  }

  async sendMessage(message) {
    try {
      const response = await this.apiRequest('/messages/send', 'POST', {
        sessionToken: this.state.sessionToken,
        recipient: message.recipient,
        content: message.content,
        messageId: message.id,
      });

      return {
        success: response.success,
        messageId: response.messageId || null,
        error: response.error || null,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  checkRateLimit() {
    const now = Date.now();
    const windowStart = now - this.config.rateLimitWindow;

    this.rateLimitTracker.requests = this.rateLimitTracker.requests.filter(
      time => time > windowStart
    );

    if (this.rateLimitTracker.requests.length >= this.config.rateLimit) {
      const oldestRequest = this.rateLimitTracker.requests[0];
      this.rateLimitTracker.blockedUntil = oldestRequest + this.config.rateLimitWindow;
      return false;
    }

    this.rateLimitTracker.requests.push(now);
    return true;
  }

  async handleWebhook(payload, signature) {
    try {
      if (!this.verifyWebhookSignature(payload, signature)) {
        throw new Error('Invalid webhook signature');
      }

      if (payload.action === 'add_message') {
        const messageId = this.addMessage(payload.recipient, payload.content, {
          priority: payload.priority || 'normal',
        });
        return { success: true, messageId: messageId };
      } else if (payload.action === 'start_sending') {
        const result = await this.sendMessages();
        return result;
      } else if (payload.action === 'get_status') {
        return this.getStatus();
      }

      throw new Error(`Unknown webhook action: ${payload.action}`);
    } catch (error) {
      this.log(`Webhook processing failed: ${error.message}`, 'error');
      return { success: false, error: error.message };
    }
  }

  verifyWebhookSignature(payload, signature) {
    return signature === this.config.webhookSecret;
  }

  getStatus() {
    return {
      isRunning: this.state.isRunning,
      isAuthenticated: this.state.isAuthenticated,
      queuedMessages: this.state.messageQueue.length,
      sentMessages: this.state.sentMessages.length,
      failedMessages: this.state.failedMessages.length,
      lastActivity: this.state.lastActivity,
      rateLimitStatus: {
        remaining: this.config.rateLimit - this.rateLimitTracker.requests.length,
        blockedUntil: this.rateLimitTracker.blockedUntil,
      },
    };
  }

  async apiRequest(endpoint, method = 'GET', data = null) {
    let lastError;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const url = `${this.config.apiEndpoint}${endpoint}`;
        const fetchOptions = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': this.config.userAgent,
          },
          timeout: this.config.timeout,
        };

        if (data) {
          fetchOptions.body = JSON.stringify(data);
        }

        if (this.config.torEnabled && this.config.proxyUrl) {
          fetchOptions.proxy = this.config.proxyUrl;
        }

        const response = await fetch(url, fetchOptions);
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        return responseData;
      } catch (error) {
        lastError = error;
        
        if (attempt < this.config.maxRetries) {
          await this.delay(this.config.retryDelay * (attempt + 1));
        }
      }
    }

    throw lastError;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  validateConfig() {
    if (!this.config.webhookSecret || this.config.webhookSecret === 'CHANGE_ME') {
      throw new Error('Webhook secret must be configured');
    }
    
    if (this.config.rateLimit <= 0) {
      throw new Error('Rate limit must be positive');
    }
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message };
    this.logs.push(logEntry);
    console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
  }

  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }

  clearLogs() {
    this.logs = [];
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Squad303Core;
}

console.log('Squad303 core class loaded successfully');
