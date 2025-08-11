/**
 * 用户数据表结构定义
 * 支持本地SQLite和云数据库迁移
 */

const userSchema = {
  // 用户基本信息表
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      avatar_url TEXT,
      display_name TEXT,
      bio TEXT,
      role TEXT DEFAULT 'user' CHECK (role IN ('user', 'creator', 'admin', 'super_admin')),
      status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'banned', 'pending')),
      email_verified BOOLEAN DEFAULT FALSE,
      phone_verified BOOLEAN DEFAULT FALSE,
      last_login_at DATETIME,
      login_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME,
      metadata TEXT -- JSON格式存储额外信息
    )
  `,

  // 用户表索引
  users_indexes: `
    CREATE INDEX IF NOT EXISTS idx_users_uuid ON users (uuid);
    CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
    CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);
    CREATE INDEX IF NOT EXISTS idx_users_status ON users (status);
    CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at);
    )
  `,

  // 用户会话表
  user_sessions: `
    CREATE TABLE IF NOT EXISTS user_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT UNIQUE NOT NULL,
      user_id INTEGER NOT NULL,
      user_uuid TEXT NOT NULL,
      token TEXT NOT NULL,
      refresh_token TEXT,
      ip_address TEXT,
      user_agent TEXT,
      device_info TEXT, -- JSON格式存储设备信息
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_active BOOLEAN DEFAULT TRUE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `,

  // 用户会话表索引
  user_sessions_indexes: `
    CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON user_sessions (session_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions (user_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions (token);
    CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON user_sessions (expires_at);
    )
  `,

  // 用户配置表
  user_preferences: `
    CREATE TABLE IF NOT EXISTS user_preferences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      user_uuid TEXT NOT NULL,
      theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
      language TEXT DEFAULT 'zh-CN',
      timezone TEXT DEFAULT 'Asia/Shanghai',
      notifications_enabled BOOLEAN DEFAULT TRUE,
      email_notifications BOOLEAN DEFAULT TRUE,
      sms_notifications BOOLEAN DEFAULT FALSE,
      privacy_level TEXT DEFAULT 'public' CHECK (privacy_level IN ('public', 'friends', 'private')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id)
    )
  `,

  // 用户偏好表索引
  user_preferences_indexes: `
    CREATE INDEX IF NOT EXISTS idx_preferences_user_id ON user_preferences (user_id);
    )
  `,

  // 用户活动日志表
  user_activity_logs: `
    CREATE TABLE IF NOT EXISTS user_activity_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      user_uuid TEXT,
      activity_type TEXT NOT NULL,
      activity_data TEXT, -- JSON格式存储活动详情
      ip_address TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,

  // 用户活动日志表索引
  user_activity_logs_indexes: `
    CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON user_activity_logs (user_id);
    CREATE INDEX IF NOT EXISTS idx_activity_logs_activity_type ON user_activity_logs (activity_type);
    CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON user_activity_logs (created_at);
    )
  `,

  // 用户验证码表
  user_verification_codes: `
    CREATE TABLE IF NOT EXISTS user_verification_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      email TEXT,
      phone TEXT,
      code TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('email', 'phone', 'password_reset')),
      expires_at DATETIME NOT NULL,
      used BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,

  // 用户验证码表索引
  user_verification_codes_indexes: `
    CREATE INDEX IF NOT EXISTS idx_verification_codes_user_id ON user_verification_codes (user_id);
    CREATE INDEX IF NOT EXISTS idx_verification_codes_code ON user_verification_codes (code);
    CREATE INDEX IF NOT EXISTS idx_verification_codes_expires_at ON user_verification_codes (expires_at);
    )
  `
};

module.exports = userSchema; 