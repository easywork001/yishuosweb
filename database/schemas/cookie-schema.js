/**
 * Cookie数据表结构定义
 * 支持本地SQLite和云数据库迁移
 */

const cookieSchema = {
  // 网站Cookie表
  website_cookies: `
    CREATE TABLE IF NOT EXISTS website_cookies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cookie_id TEXT UNIQUE NOT NULL,
      user_id INTEGER,
      user_uuid TEXT,
      session_id TEXT,
      name TEXT NOT NULL,
      value TEXT NOT NULL,
      domain TEXT,
      path TEXT DEFAULT '/',
      secure BOOLEAN DEFAULT FALSE,
      http_only BOOLEAN DEFAULT TRUE,
      same_site TEXT DEFAULT 'Lax' CHECK (same_site IN ('Strict', 'Lax', 'None')),
      expires_at DATETIME,
      max_age INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_active BOOLEAN DEFAULT TRUE,
      metadata TEXT, -- JSON格式存储额外信息
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (session_id) REFERENCES user_sessions(session_id) ON DELETE CASCADE
    )
  `,

  // 网站Cookie表索引
  website_cookies_indexes: `
    CREATE INDEX IF NOT EXISTS idx_cookies_cookie_id ON website_cookies (cookie_id);
    CREATE INDEX IF NOT EXISTS idx_cookies_user_id ON website_cookies (user_id);
    CREATE INDEX IF NOT EXISTS idx_cookies_session_id ON website_cookies (session_id);
    CREATE INDEX IF NOT EXISTS idx_cookies_name ON website_cookies (name);
    CREATE INDEX IF NOT EXISTS idx_cookies_expires_at ON website_cookies (expires_at);
    )
  `,

  // 用户偏好Cookie表
  user_preference_cookies: `
    CREATE TABLE IF NOT EXISTS user_preference_cookies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      user_uuid TEXT,
      cookie_name TEXT NOT NULL,
      cookie_value TEXT NOT NULL,
      category TEXT DEFAULT 'preference' CHECK (category IN ('preference', 'analytics', 'marketing', 'essential')),
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id, cookie_name)
    )
  `,

  // 用户偏好Cookie表索引
  user_preference_cookies_indexes: `
    CREATE INDEX IF NOT EXISTS idx_preference_cookies_user_id ON user_preference_cookies (user_id);
    CREATE INDEX IF NOT EXISTS idx_preference_cookies_category ON user_preference_cookies (category);
    )
  `,

  // Cookie同意记录表
  cookie_consent_logs: `
    CREATE TABLE IF NOT EXISTS cookie_consent_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      user_uuid TEXT,
      session_id TEXT,
      consent_version TEXT NOT NULL,
      essential_cookies BOOLEAN DEFAULT TRUE,
      preference_cookies BOOLEAN DEFAULT FALSE,
      analytics_cookies BOOLEAN DEFAULT FALSE,
      marketing_cookies BOOLEAN DEFAULT FALSE,
      consent_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      ip_address TEXT,
      user_agent TEXT,
      consent_data TEXT, -- JSON格式存储详细同意信息
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (session_id) REFERENCES user_sessions(session_id) ON DELETE CASCADE
    )
  `,

  // Cookie同意记录表索引
  cookie_consent_logs_indexes: `
    CREATE INDEX IF NOT EXISTS idx_consent_logs_user_id ON cookie_consent_logs (user_id);
    CREATE INDEX IF NOT EXISTS idx_consent_logs_session_id ON cookie_consent_logs (session_id);
    CREATE INDEX IF NOT EXISTS idx_consent_logs_timestamp ON cookie_consent_logs (consent_timestamp);
    )
  `,

  // 第三方Cookie追踪表
  third_party_cookies: `
    CREATE TABLE IF NOT EXISTS third_party_cookies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      domain TEXT NOT NULL,
      cookie_name TEXT NOT NULL,
      purpose TEXT NOT NULL,
      provider TEXT,
      privacy_policy_url TEXT,
      data_retention_days INTEGER,
      is_active BOOLEAN DEFAULT TRUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(domain, cookie_name)
    )
  `,

  // 第三方Cookie追踪表索引
  third_party_cookies_indexes: `
    CREATE INDEX IF NOT EXISTS idx_third_party_cookies_domain ON third_party_cookies (domain);
    CREATE INDEX IF NOT EXISTS idx_third_party_cookies_provider ON third_party_cookies (provider);
    )
  `,

  // Cookie使用统计表
  cookie_usage_stats: `
    CREATE TABLE IF NOT EXISTS cookie_usage_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cookie_name TEXT NOT NULL,
      usage_count INTEGER DEFAULT 0,
      last_used_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(cookie_name)
    )
  `,

  // Cookie使用统计表索引
  cookie_usage_stats_indexes: `
    CREATE INDEX IF NOT EXISTS idx_usage_stats_cookie_name ON cookie_usage_stats (cookie_name);
    CREATE INDEX IF NOT EXISTS idx_usage_stats_last_used ON cookie_usage_stats (last_used_at);
    )
  `
};

module.exports = cookieSchema; 