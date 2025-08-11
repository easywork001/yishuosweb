/**
 * 易术科技数据库服务主入口
 * 提供用户数据和Cookie管理的RESTful API
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const database = require('./utils/database');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 环境配置
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件配置
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:8000', 'http://localhost:3000'],
  credentials: true
}));

// 请求限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  message: {
    error: '请求过于频繁，请稍后再试'
  }
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 数据库连接
let dbConnected = false;

// 启动数据库连接
async function initializeDatabase() {
  try {
    await database.connect();
    dbConnected = true;
    console.log('✅ 数据库连接成功');
  } catch (error) {
    console.error('❌ 数据库连接失败:', error);
    process.exit(1);
  }
}

// 中间件：检查数据库连接
app.use((req, res, next) => {
  if (!dbConnected) {
    return res.status(503).json({
      error: '数据库服务不可用',
      message: '请稍后再试'
    });
  }
  next();
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'connected' : 'disconnected'
  });
});

// ==================== 用户管理API ====================

// 用户注册
app.post('/api/users/register', async (req, res) => {
  try {
    const { username, email, password, phone, display_name } = req.body;

    // 验证必填字段
    if (!username || !email || !password) {
      return res.status(400).json({
        error: '缺少必填字段',
        message: '用户名、邮箱和密码为必填项'
      });
    }

    // 检查用户是否已存在
    const existingUser = await database.get(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser) {
      return res.status(409).json({
        error: '用户已存在',
        message: '用户名或邮箱已被注册'
      });
    }

    // 生成密码哈希
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const userUuid = uuidv4();

    // 创建用户
    const result = await database.run(`
      INSERT INTO users (uuid, username, email, phone, password_hash, salt, display_name)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [userUuid, username, email, phone, passwordHash, salt, display_name]);

    // 创建用户偏好设置
    await database.run(`
      INSERT INTO user_preferences (user_id, user_uuid)
      VALUES (?, ?)
    `, [result.lastID, userUuid]);

    res.status(201).json({
      message: '用户注册成功',
      user: {
        id: result.lastID,
        uuid: userUuid,
        username,
        email,
        display_name
      }
    });

  } catch (error) {
    console.error('用户注册失败:', error);
    res.status(500).json({
      error: '注册失败',
      message: '服务器内部错误'
    });
  }
});

// 用户登录
app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password, remember_me = false } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: '缺少必填字段',
        message: '用户名和密码为必填项'
      });
    }

    // 查找用户
    const user = await database.get(`
      SELECT id, uuid, username, email, password_hash, salt, role, status
      FROM users WHERE username = ? OR email = ?
    `, [username, username]);

    if (!user) {
      return res.status(401).json({
        error: '登录失败',
        message: '用户名或密码错误'
      });
    }

    // 检查用户状态
    if (user.status !== 'active') {
      return res.status(403).json({
        error: '账户被禁用',
        message: '您的账户已被禁用，请联系管理员'
      });
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        error: '登录失败',
        message: '用户名或密码错误'
      });
    }

    // 生成JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        userUuid: user.uuid, 
        username: user.username,
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: remember_me ? '30d' : '24h' }
    );

    // 创建会话
    const sessionId = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (remember_me ? 30 : 1));

    await database.run(`
      INSERT INTO user_sessions (session_id, user_id, user_uuid, token, expires_at, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      sessionId,
      user.id,
      user.uuid,
      token,
      expiresAt.toISOString(),
      req.ip,
      req.get('User-Agent')
    ]);

    // 更新用户登录信息
    await database.run(`
      UPDATE users SET last_login_at = ?, login_count = login_count + 1
      WHERE id = ?
    `, [new Date().toISOString(), user.id]);

    // 设置Cookie
    res.cookie('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: remember_me ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
    });

    res.json({
      message: '登录成功',
      user: {
        id: user.id,
        uuid: user.uuid,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (error) {
    console.error('用户登录失败:', error);
    res.status(500).json({
      error: '登录失败',
      message: '服务器内部错误'
    });
  }
});

// 用户登出
app.post('/api/users/logout', async (req, res) => {
  try {
    const sessionId = req.cookies.session_id || req.headers.authorization?.replace('Bearer ', '');

    if (sessionId) {
      await database.run(`
        UPDATE user_sessions SET is_active = 0
        WHERE session_id = ? AND is_active = 1
      `, [sessionId]);
    }

    res.clearCookie('session_id');
    res.json({ message: '登出成功' });

  } catch (error) {
    console.error('用户登出失败:', error);
    res.status(500).json({
      error: '登出失败',
      message: '服务器内部错误'
    });
  }
});

// ==================== Cookie管理API ====================

// 设置Cookie
app.post('/api/cookies', async (req, res) => {
  try {
    const { name, value, domain, path, secure, httpOnly, sameSite, expiresAt, maxAge } = req.body;
    const sessionId = req.cookies.session_id;

    if (!name || !value) {
      return res.status(400).json({
        error: '缺少必填字段',
        message: 'Cookie名称和值为必填项'
      });
    }

    const cookieId = uuidv4();
    const userId = sessionId ? await getUserIdFromSession(sessionId) : null;

    await database.run(`
      INSERT INTO website_cookies (cookie_id, user_id, session_id, name, value, domain, path, secure, http_only, same_site, expires_at, max_age)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      cookieId,
      userId,
      sessionId,
      name,
      value,
      domain,
      path || '/',
      secure || false,
      httpOnly !== false,
      sameSite || 'Lax',
      expiresAt,
      maxAge
    ]);

    res.json({
      message: 'Cookie设置成功',
      cookie: {
        id: cookieId,
        name,
        value
      }
    });

  } catch (error) {
    console.error('设置Cookie失败:', error);
    res.status(500).json({
      error: '设置Cookie失败',
      message: '服务器内部错误'
    });
  }
});

// 获取Cookie
app.get('/api/cookies', async (req, res) => {
  try {
    const { name, session_id } = req.query;
    const sessionId = session_id || req.cookies.session_id;

    let sql = 'SELECT * FROM website_cookies WHERE is_active = 1';
    const params = [];

    if (name) {
      sql += ' AND name = ?';
      params.push(name);
    }

    if (sessionId) {
      sql += ' AND session_id = ?';
      params.push(sessionId);
    }

    const cookies = await database.query(sql, params);

    res.json({
      cookies,
      count: cookies.length
    });

  } catch (error) {
    console.error('获取Cookie失败:', error);
    res.status(500).json({
      error: '获取Cookie失败',
      message: '服务器内部错误'
    });
  }
});

// 删除Cookie
app.delete('/api/cookies/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const sessionId = req.cookies.session_id;

    await database.run(`
      UPDATE website_cookies SET is_active = 0
      WHERE name = ? AND session_id = ?
    `, [name, sessionId]);

    res.json({ message: 'Cookie删除成功' });

  } catch (error) {
    console.error('删除Cookie失败:', error);
    res.status(500).json({
      error: '删除Cookie失败',
      message: '服务器内部错误'
    });
  }
});

// ==================== 工具函数 ====================

// 从会话获取用户ID
async function getUserIdFromSession(sessionId) {
  const session = await database.get(`
    SELECT user_id FROM user_sessions 
    WHERE session_id = ? AND is_active = 1 AND expires_at > ?
  `, [sessionId, new Date().toISOString()]);
  
  return session ? session.user_id : null;
}

// 错误处理中间件
app.use((error, req, res, next) => {
  console.error('服务器错误:', error);
  res.status(500).json({
    error: '服务器内部错误',
    message: '请稍后再试'
  });
});

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    error: '接口不存在',
    message: '请求的API接口不存在'
  });
});

// 启动服务器
async function startServer() {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`数据库服务启动成功`);
    console.log(`服务地址: http://localhost:${PORT}`);
    console.log(`健康检查: http://localhost:${PORT}/health`);
    console.log(`API文档: http://localhost:${PORT}/api`);
  });
}

// 优雅关闭
process.on('SIGINT', async () => {
  console.log('\n🛑 正在关闭服务器...');
  await database.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 正在关闭服务器...');
  await database.close();
  process.exit(0);
});

// 启动服务器
startServer().catch(error => {
  console.error('❌ 服务器启动失败:', error);
  process.exit(1);
});

module.exports = app; 