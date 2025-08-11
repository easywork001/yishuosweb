# 易术科技数据库系统

一个完整的用户数据和Cookie管理系统，支持本地SQLite和云数据库迁移。

## 🚀 功能特性

### 用户管理
- ✅ 用户注册、登录、登出
- ✅ 密码加密存储 (bcrypt)
- ✅ JWT令牌认证
- ✅ 用户会话管理
- ✅ 用户偏好设置
- ✅ 活动日志记录
- ✅ 验证码管理

### Cookie管理
- ✅ 网站Cookie存储
- ✅ 用户偏好Cookie
- ✅ Cookie同意记录
- ✅ 第三方Cookie追踪
- ✅ Cookie使用统计
- ✅ 自动过期清理

### 数据库特性
- ✅ SQLite本地数据库
- ✅ 完整的数据库迁移系统
- ✅ 数据备份和恢复
- ✅ 云数据库迁移支持
- ✅ 事务支持
- ✅ 索引优化

## 📁 项目结构

```
database/
├── schemas/                 # 数据库表结构定义
│   ├── user-schema.js      # 用户相关表
│   └── cookie-schema.js    # Cookie相关表
├── migrations/             # 数据库迁移
│   └── run-migrations.js   # 迁移执行脚本
├── seeds/                  # 初始数据
├── utils/                  # 工具类
│   └── database.js         # 数据库连接和操作
├── data/                   # 数据库文件存储
├── package.json           # 项目配置
└── index.js               # 主服务入口
```

## 🛠️ 安装和配置

### 1. 安装依赖

```bash
cd database
npm install
```

### 2. 环境配置

创建 `.env` 文件：

```env
# 服务器配置
PORT=3001
NODE_ENV=development

# 数据库配置
DB_PATH=./data/yishuos.db

# JWT配置
JWT_SECRET=your-super-secret-jwt-key

# 跨域配置
ALLOWED_ORIGINS=http://localhost:8000,http://localhost:3000

# 安全配置
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. 初始化数据库

```bash
# 执行数据库迁移
npm run migrate

# 查看迁移状态
node migrations/run-migrations.js status
```

### 4. 启动服务

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

## 📚 API接口文档

### 健康检查
```
GET /health
```

### 用户管理

#### 用户注册
```
POST /api/users/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "phone": "13800138000",
  "display_name": "测试用户"
}
```

#### 用户登录
```
POST /api/users/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123",
  "remember_me": false
}
```

#### 用户登出
```
POST /api/users/logout
```

### Cookie管理

#### 设置Cookie
```
POST /api/cookies
Content-Type: application/json

{
  "name": "theme",
  "value": "dark",
  "domain": "localhost",
  "path": "/",
  "secure": false,
  "httpOnly": true,
  "sameSite": "Lax",
  "expiresAt": "2024-12-31T23:59:59.000Z",
  "maxAge": 86400
}
```

#### 获取Cookie
```
GET /api/cookies?name=theme&session_id=xxx
```

#### 删除Cookie
```
DELETE /api/cookies/theme
```

## 🔧 数据库操作

### 迁移管理

```bash
# 执行所有迁移
npm run migrate

# 查看迁移状态
node migrations/run-migrations.js status

# 回滚指定迁移
node migrations/run-migrations.js rollback <migration_name>
```

### 数据备份

```bash
# 备份数据库
npm run backup

# 恢复数据库
npm run restore
```

### 数据清理

```bash
# 清理过期数据
node utils/cleanup.js
```

## 🗄️ 数据库表结构

### 用户相关表

#### users - 用户基本信息
- `id`: 主键
- `uuid`: 用户唯一标识
- `username`: 用户名
- `email`: 邮箱
- `phone`: 手机号
- `password_hash`: 密码哈希
- `salt`: 密码盐值
- `role`: 用户角色 (user/creator/admin/super_admin)
- `status`: 用户状态 (active/inactive/banned/pending)
- `created_at`: 创建时间
- `updated_at`: 更新时间

#### user_sessions - 用户会话
- `session_id`: 会话ID
- `user_id`: 用户ID
- `token`: JWT令牌
- `expires_at`: 过期时间
- `ip_address`: IP地址
- `user_agent`: 用户代理

#### user_preferences - 用户偏好
- `user_id`: 用户ID
- `theme`: 主题 (light/dark/auto)
- `language`: 语言
- `timezone`: 时区
- `notifications_enabled`: 通知开关

### Cookie相关表

#### website_cookies - 网站Cookie
- `cookie_id`: Cookie唯一标识
- `user_id`: 用户ID
- `session_id`: 会话ID
- `name`: Cookie名称
- `value`: Cookie值
- `domain`: 域名
- `path`: 路径
- `secure`: 安全标志
- `http_only`: HttpOnly标志
- `same_site`: SameSite设置
- `expires_at`: 过期时间

#### cookie_consent_logs - Cookie同意记录
- `user_id`: 用户ID
- `consent_version`: 同意版本
- `essential_cookies`: 必要Cookie同意
- `preference_cookies`: 偏好Cookie同意
- `analytics_cookies`: 分析Cookie同意
- `marketing_cookies`: 营销Cookie同意

## 🔄 云数据库迁移

### 迁移到MySQL

1. 安装MySQL驱动：
```bash
npm install mysql2
```

2. 修改数据库配置：
```javascript
// utils/database.js
const mysql = require('mysql2/promise');

class Database {
  async connect() {
    this.connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
  }
}
```

3. 数据迁移脚本：
```bash
node utils/migrate-to-mysql.js
```

### 迁移到PostgreSQL

1. 安装PostgreSQL驱动：
```bash
npm install pg
```

2. 修改数据库配置：
```javascript
const { Pool } = require('pg');

class Database {
  async connect() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
  }
}
```

## 🧪 测试

```bash
# 运行测试
npm test

# 运行特定测试
npm test -- --grep "用户注册"
```

## 📊 监控和日志

### 数据库统计
```bash
node utils/stats.js
```

### 性能监控
```bash
node utils/monitor.js
```

## 🔒 安全特性

- ✅ 密码加密存储
- ✅ JWT令牌认证
- ✅ 请求频率限制
- ✅ CORS配置
- ✅ Helmet安全头
- ✅ SQL注入防护
- ✅ XSS防护

## 🚀 部署

### Docker部署

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

### 环境变量

```env
# 生产环境配置
NODE_ENV=production
PORT=3001
JWT_SECRET=your-production-jwt-secret
ALLOWED_ORIGINS=https://yourdomain.com
```

## 📞 支持

如有问题，请联系：
- 📧 Email: support@yishuos.com
- 📱 电话: 400-007-8277

## �� 许可证

MIT License 