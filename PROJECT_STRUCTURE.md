# 易术科技官网 - 前后端分离项目结构规范

## 📋 项目命名规范

### 🏢 主品牌命名
- **易术科技官网**: `YishuosTech` (Yishuos)
- **光影方舟实验室**: `LumarkaiLab` (Lumarkai)

### 📁 目录结构规范

```
YishuosTech/
├── frontend/                    # 前端项目
│   ├── yishuos-main/           # 易术科技主站 (React + Next.js)
│   ├── lumarkai-lab/           # 光影方舟实验室 (React + Next.js)
│   └── shared/                 # 共享组件库
├── backend/                    # 后端项目
│   ├── yishuos-api/           # 易术科技API服务
│   ├── lumarkai-api/          # 光影方舟API服务
│   └── shared/                # 共享后端库
├── assets/                    # 静态资源
│   ├── images/               # 图片资源
│   ├── videos/               # 视频资源
│   └── documents/            # 文档资源
└── docs/                     # 项目文档
```

## 🎯 文件命名规范

### 📄 HTML文件重命名
```
当前文件 → 新命名
├── index.html → yishuos-main.html
├── lightark-home.html → lumarkai-lab.html
├── lightark-gallery.html → lumarkai-gallery.html
├── login.html → lumarkai-login.html
├── yishu-tech-form.html → yishuos-contact.html
└── document-center.html → yishuos-docs.html
```

### 🎨 CSS文件重命名
```
当前文件 → 新命名
├── styles.css → yishuos-main.css
└── 创建新文件 → lumarkai-lab.css
```

### ⚡ JavaScript文件重命名
```
当前文件 → 新命名
├── script.js → yishuos-main.js
└── 创建新文件 → lumarkai-lab.js
```

### 🖼️ 图片资源重命名
```
当前文件 → 新命名
├── 易术创新 主LOGO 透明背景.svg → yishuos-logo.svg
├── 光影方舟.png → lumarkai-logo.png
├── 方舟AI.jpg → lumarkai-ai-bg.jpg
├── 光影计划.jpg → lumarkai-plan-bg.jpg
├── 服务与支持.jpg → lumarkai-support-bg.jpg
├── 光影方舟登陆页.jpg → lumarkai-login-bg.jpg
├── 光影画册.png → lumarkai-gallery-bg.png
└── 方舟大模型.jpg → lumarkai-model-bg.jpg
```

## 🏗️ 技术栈规范

### 🎨 前端技术栈
```
YishuosTech Frontend Stack:
├── React 19.x
├── Next.js 15.x (App Router)
├── TypeScript 5.x
├── Tailwind CSS 3.x
├── Framer Motion (动画)
├── React Query (数据获取)
└── Zustand (状态管理)
```

### ⚙️ 后端技术栈
```
YishuosTech Backend Stack:
├── Node.js 20.x
├── Express.js 4.x
├── TypeScript 5.x
├── Prisma (ORM)
├── PostgreSQL (主数据库)
├── Redis (缓存)
├── JWT (认证)
└── OpenAI API (AI集成)
```

## 📦 项目模块划分

### 🏢 YishuosTech 主站模块
```
yishuos-main/
├── pages/
│   ├── home/              # 首页
│   ├── products/          # 产品矩阵
│   ├── solutions/         # 解决方案
│   ├── cases/             # 合作案例
│   ├── research/          # 技术研究
│   ├── ecosystem/         # 合作生态
│   ├── eplan/             # E计划
│   ├── about/             # 关于我们
│   └── contact/           # 联系我们
├── components/
│   ├── layout/           # 布局组件
│   ├── ui/               # UI组件
│   └── sections/         # 页面区块
└── api/
    └── routes/           # API路由
```

### 🌟 LumarkaiLab 光影方舟模块
```
lumarkai-lab/
├── pages/
│   ├── home/             # 光影方舟首页
│   ├── models/           # 方舟大模型
│   ├── creator/          # 创作者中心
│   ├── plan/             # 光影计划
│   ├── support/          # 服务与支持
│   ├── about/            # 关于我们
│   ├── gallery/          # 光影素材库
│   └── auth/             # 登录注册
├── components/
│   ├── layout/           # 布局组件
│   ├── ui/               # UI组件
│   ├── ai-nodes/         # AI节点组件
│   └── carousel/         # 轮播组件
└── api/
    └── routes/           # API路由
```

## 🔄 迁移计划

### 📅 第一阶段：文件重命名
1. 重命名所有HTML文件
2. 重命名所有CSS/JS文件
3. 重命名所有图片资源
4. 更新文件引用关系

### 📅 第二阶段：项目结构重组
1. 创建前后端分离目录结构
2. 迁移现有代码到新结构
3. 设置开发环境配置

### 📅 第三阶段：技术栈升级
1. 将HTML转换为React组件
2. 集成Next.js框架
3. 添加TypeScript支持
4. 实现API接口

### 📅 第四阶段：功能完善
1. 实现用户认证系统
2. 添加数据库支持
3. 集成AI功能
4. 优化性能和SEO

## 📝 命名约定

### 🏷️ 组件命名
```typescript
// 使用PascalCase
export const YishuosHeader = () => {}
export const LumarkaiCarousel = () => {}
export const AINodeCluster = () => {}
```

### 🏷️ 文件命名
```typescript
// 使用kebab-case
yishuos-header.tsx
lumarkai-carousel.tsx
ai-node-cluster.tsx
```

### 🏷️ 变量命名
```typescript
// 使用camelCase
const yishuosConfig = {}
const lumarkaiSettings = {}
const aiNodeData = {}
```

### 🏷️ 常量命名
```typescript
// 使用UPPER_SNAKE_CASE
const YISHUOS_API_BASE = 'https://api.yishuos.com'
const LUMARKAI_API_BASE = 'https://api.lumarkai.com'
```

## 🎯 开发规范

### 📋 代码规范
- 使用ESLint + Prettier
- 遵循TypeScript严格模式
- 使用Husky进行Git hooks
- 使用Conventional Commits

### 🧪 测试规范
- 使用Jest + React Testing Library
- 单元测试覆盖率 > 80%
- E2E测试使用Playwright

### 🚀 部署规范
- 使用Docker容器化
- CI/CD使用GitHub Actions
- 生产环境使用Vercel/Netlify
- 数据库使用Supabase/AWS RDS 