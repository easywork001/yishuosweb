# 易术科技项目架构说明

> 📋 **文档说明**: 本文档详细描述了重构后的项目架构、开发规范和最佳实践

## 🏗️ 项目架构概览

### 整体架构
```
yishuosweb/
├── frontend/                    # 前端应用层
│   ├── yishuos-main/           # 易术主站模块
│   └── lumarkai-lab/           # 光影方舟实验室模块
├── backend/                     # 后端服务层
├── database/                    # 数据持久层
├── scripts/                     # 工具脚本层
└── docs/                        # 文档层
```

### 架构特点
- **前后端分离**: 前端独立部署，后端提供API服务
- **模块化设计**: 按业务功能划分模块，便于维护和扩展
- **标准化结构**: 遵循现代Web项目的最佳实践
- **配置化部署**: 支持多环境配置和灵活部署

## 🎯 前端架构详解

### 易术主站模块 (`frontend/yishuos-main/`)

#### 目录结构
```
src/
├── pages/                       # 页面文件
│   ├── home/                   # 主页
│   │   └── index.html         # 主页面
│   ├── eplan/                  # E计划
│   │   └── index.html         # E计划页面
│   ├── solutions/              # 解决方案
│   │   └── index.html         # 解决方案页面
│   ├── support/                # 服务支持
│   │   └── index.html         # 服务支持页面
│   ├── careers/                # 加入我们
│   │   ├── index.html         # 职位列表页面
│   │   └── job-detail.html    # 职位详情页面
│   ├── research/               # 易术研究
│   │   └── index.html         # 研究页面
│   ├── contact/                # 联系我们
│   │   ├── index.html         # 联系页面
│   │   └── form.html          # 联系表单页面
│   ├── auth/                   # 用户认证
│   │   └── login.html         # 登录页面
│   └── banjing15/              # 半径十五米
│       └── index.html         # 半径十五米页面
├── styles/                      # 样式文件
│   ├── pages/                  # 页面级样式
│   │   ├── home.css           # 主页样式
│   │   ├── eplan.css          # E计划样式
│   │   ├── solutions.css      # 解决方案样式
│   │   ├── support.css        # 服务支持样式
│   │   ├── careers.css        # 加入我们样式
│   │   ├── research.css       # 易术研究样式
│   │   └── banjing15-main.css # 半径十五米样式
│   └── components/             # 组件级样式
├── scripts/                     # 脚本文件
│   ├── pages/                  # 页面级脚本
│   │   ├── home.js            # 主页脚本
│   │   ├── eplan.js           # E计划脚本
│   │   ├── solutions.js       # 解决方案脚本
│   │   ├── support.js         # 服务支持脚本
│   │   ├── careers.js         # 加入我们脚本
│   │   ├── research.js        # 易术研究脚本
│   │   └── banjing15-main.js  # 半径十五米脚本
│   └── utils/                  # 工具脚本
└── assets/                      # 静态资源
    ├── images/                 # 图片资源
    │   ├── 精选官网照片50张/   # 精选照片
    │   ├── 解决方案/           # 解决方案配图
    │   ├── 品牌矩阵页面/       # 品牌展示图片
    │   ├── 纯图标logo/         # Logo图标
    │   └── llm/               # 大模型图标
    ├── videos/                 # 视频资源
    └── documents/             # 文档资源
```

#### 页面路由映射
```
/ → /yishuos-main/home/                    # 根路径重定向到主站
/yishuos-main/home/ → home/index.html      # 主站主页
/eplan/ → eplan/index.html                 # E计划页面
/solutions/ → solutions/index.html          # 解决方案页面
/support/ → support/index.html              # 服务支持页面
/careers/ → careers/index.html              # 加入我们页面
/research/ → research/index.html            # 易术研究页面
/contact/ → contact/index.html              # 联系我们页面
/auth/ → auth/login.html                    # 登录页面
/banjing15/ → banjing15/index.html         # 半径十五米页面
```

### 光影方舟实验室模块 (`frontend/lumarkai-lab/`)

#### 目录结构
```
src/
├── pages/                       # 页面文件
│   ├── home/                   # 主页
│   │   └── index.html         # 实验室主页
│   ├── gallery/                # 光影素材库
│   │   ├── index.html         # 素材库主页
│   │   └── detail.html        # 素材详情页
│   └── auth/                   # 用户认证
│       ├── login.html          # 用户登录
│       ├── dashboard.html      # 用户面板
│       └── admin.html          # 管理后台
├── styles/                      # 样式文件
├── scripts/                     # 脚本文件
└── assets/                      # 实验室资源
```

#### 页面路由映射
```
/lumarkai-lab/home/ → home/index.html      # 实验室主页
/lumarkai-lab/gallery/ → gallery/index.html # 素材库主页
/lumarkai-lab/gallery/detail.html → gallery/detail.html # 素材详情页
/lumarkai-lab/auth/login.html → auth/login.html # 用户登录
/lumarkai-lab/auth/dashboard.html → auth/dashboard.html # 用户面板
/lumarkai-lab/auth/admin.html → auth/admin.html # 管理后台
```

## 🔧 后端架构详解

### 服务模块
```
backend/
├── lumarkai-api/               # 光影方舟API服务
│   ├── src/
│   │   ├── controllers/        # 控制器层
│   │   ├── models/            # 数据模型层
│   │   ├── routes/            # 路由层
│   │   ├── middleware/        # 中间件层
│   │   ├── services/          # 业务逻辑层
│   │   ├── utils/             # 工具函数层
│   │   └── config/            # 配置文件
│   ├── package.json
│   └── README.md
└── yishuos-api/                # 易术主站API服务
    ├── src/
    │   ├── controllers/        # 控制器层
    │   ├── models/            # 数据模型层
    │   ├── routes/            # 路由层
    │   ├── middleware/        # 中间件层
    │   ├── services/          # 业务逻辑层
    │   ├── utils/             # 工具函数层
    │   └── config/            # 配置文件
    ├── package.json
    └── README.md
```

### 技术栈
- **运行时**: Node.js 20.x
- **框架**: Express.js 4.x
- **语言**: TypeScript 5.x
- **数据库**: PostgreSQL (主数据库) + Redis (缓存)
- **ORM**: Prisma
- **认证**: JWT
- **API**: RESTful + GraphQL (可选)

## 🗄️ 数据库架构

### 数据库设计
```
database/
├── schemas/                     # 数据库模式
│   ├── user-schema.js          # 用户模式
│   └── cookie-schema.js        # Cookie模式
├── migrations/                  # 数据库迁移
│   └── run-migrations.js       # 迁移执行脚本
├── utils/                       # 数据库工具
│   └── database.js             # 数据库连接
├── package.json
└── README.md
```

### 数据模型
- **用户管理**: 用户注册、登录、权限管理
- **内容管理**: 文章、图片、视频等资源管理
- **系统配置**: 网站配置、环境变量等

## 🛠️ 工具脚本架构

### 脚本分类
```
scripts/
├── start-refactored-fixed.py   # 核心启动脚本 ⭐
├── development/                 # 开发工具脚本
├── deployment/                  # 部署工具脚本
└── maintenance/                 # 维护工具脚本
```

### 核心启动脚本特性
- **路径映射**: 智能路径重定向和映射
- **URL解码**: 支持中文路径和特殊字符
- **端口配置**: 支持环境变量端口配置
- **CORS支持**: 跨域请求支持
- **静态资源**: 绝对路径资源访问

## 📚 开发规范

### 文件命名规范
- **HTML文件**: 使用 `index.html` 作为页面入口
- **CSS文件**: 使用 `页面名.css` 格式
- **JavaScript文件**: 使用 `页面名.js` 格式
- **目录名**: 使用小写字母和连字符

### 路径引用规范
- **绝对路径**: 所有资源使用绝对路径 `/assets/...`
- **相对路径**: 避免使用复杂的相对路径 `../../../../../`
- **锚点链接**: 使用标准锚点格式 `#section-name`

### 代码组织规范
- **模块化**: 按功能模块组织代码
- **分层架构**: 遵循MVC或类似的分层模式
- **组件化**: 可复用的UI组件独立封装
- **配置化**: 环境相关的配置外部化

## 🚀 部署架构

### 本地开发
```bash
# 启动开发服务器
python3 scripts/start-refactored-fixed.py

# 指定端口启动
PORT=3000 python3 scripts/start-refactored-fixed.py
```

### 生产部署
```bash
# 使用PM2管理进程
pm2 start ecosystem.config.js

# 使用Docker部署
docker-compose up -d

# 使用Nginx反向代理
nginx -s reload
```

### 部署架构图
```
用户请求 → Nginx反向代理 → Node.js应用 → 数据库
                ↓
        静态资源CDN → 前端文件
```

## 🔍 监控与维护

### 日志管理
- **访问日志**: 记录用户访问行为
- **错误日志**: 记录系统错误和异常
- **性能日志**: 记录系统性能指标

### 性能监控
- **响应时间**: 页面加载和API响应时间
- **资源使用**: CPU、内存、磁盘使用情况
- **错误率**: 系统错误和异常统计

### 安全措施
- **HTTPS**: 强制使用HTTPS协议
- **CORS**: 跨域请求控制
- **认证授权**: JWT token认证
- **输入验证**: 防止XSS和SQL注入

## 📈 扩展性设计

### 水平扩展
- **负载均衡**: 支持多实例部署
- **数据库分片**: 支持数据库水平扩展
- **缓存集群**: Redis集群支持

### 垂直扩展
- **模块化设计**: 支持功能模块独立部署
- **微服务架构**: 支持服务拆分和独立部署
- **API网关**: 统一的API管理和路由

## 🎯 最佳实践

### 开发流程
1. **需求分析**: 明确功能需求和用户故事
2. **架构设计**: 设计系统架构和数据结构
3. **代码实现**: 遵循编码规范和最佳实践
4. **测试验证**: 单元测试、集成测试、用户测试
5. **部署上线**: 自动化部署和监控

### 代码质量
- **代码审查**: 强制代码审查流程
- **自动化测试**: 单元测试覆盖率要求
- **代码规范**: 使用ESLint和Prettier
- **文档维护**: 及时更新技术文档

### 版本管理
- **语义化版本**: 遵循SemVer规范
- **分支策略**: 使用Git Flow工作流
- **发布流程**: 自动化发布和回滚
- **变更日志**: 维护详细的变更记录

---

**文档版本**: v2.0.0  
**最后更新**: 2024-08-25 19:30  
**维护团队**: 易术科技开发团队  
**文档状态**: 重构完成，架构稳定 