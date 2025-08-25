# 易术科技项目结构重构提案

## 🎯 重构目标

将当前混乱的文件结构重构为标准的现代化项目架构，提高代码可维护性、可扩展性和开发效率。

## 🏗️ 重构后的项目结构

```
yishuosweb/
├── 📁 frontend/                          # 前端项目根目录
│   ├── 📁 yishuos-main/                  # 易术主站前端
│   │   ├── 📁 src/
│   │   │   ├── 📁 pages/                 # 页面组件
│   │   │   │   ├── home/
│   │   │   │   │   ├── index.html
│   │   │   │   │   ├── index.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── solutions/
│   │   │   │   ├── research/
│   │   │   │   ├── support/
│   │   │   │   ├── careers/
│   │   │   │   ├── eplan/
│   │   │   │   └── contact/
│   │   │   ├── 📁 components/            # 可复用组件
│   │   │   │   ├── layout/
│   │   │   │   │   ├── header/
│   │   │   │   │   ├── footer/
│   │   │   │   │   └── navigation/
│   │   │   │   ├── ui/
│   │   │   │   │   ├── buttons/
│   │   │   │   │   ├── cards/
│   │   │   │   │   ├── modals/
│   │   │   │   │   └── forms/
│   │   │   │   └── sections/
│   │   │   │       ├── hero/
│   │   │   │       ├── brand-matrix/
│   │   │   │       ├── solutions/
│   │   │   │       └── about/
│   │   │   ├── 📁 assets/                # 静态资源
│   │   │   │   ├── images/
│   │   │   │   ├── videos/
│   │   │   │   ├── icons/
│   │   │   │   └── fonts/
│   │   │   ├── 📁 styles/                 # 样式文件
│   │   │   │   ├── base/
│   │   │   │   │   ├── reset.css
│   │   │   │   │   ├── typography.css
│   │   │   │   │   └── variables.css
│   │   │   │   ├── components/
│   │   │   │   ├── layouts/
│   │   │   │   └── pages/
│   │   │   ├── 📁 scripts/                # JavaScript文件
│   │   │   │   ├── utils/
│   │   │   │   ├── components/
│   │   │   │   └── pages/
│   │   │   └── 📁 data/                   # 静态数据
│   │   │       ├── brands.json
│   │   │       ├── solutions.json
│   │   │       └── navigation.json
│   │   ├── 📁 public/                     # 公共资源
│   │   ├── package.json
│   │   ├── webpack.config.js              # 构建配置
│   │   └── README.md
│   │
│   ├── 📁 lumarkai-lab/                   # 光影方舟实验室前端
│   │   ├── 📁 src/
│   │   │   ├── 📁 pages/
│   │   │   ├── 📁 components/
│   │   │   ├── 📁 assets/
│   │   │   ├── 📁 styles/
│   │   │   ├── 📁 scripts/
│   │   │   └── 📁 data/
│   │   ├── 📁 public/
│   │   ├── package.json
│   │   ├── webpack.config.js
│   │   └── README.md
│   │
│   └── 📁 shared/                         # 共享组件库
│       ├── 📁 components/
│       ├── 📁 styles/
│       ├── 📁 utils/
│       └── package.json
│
├── 📁 backend/                             # 后端项目根目录
│   ├── 📁 yishuos-api/                     # 易术主站API
│   │   ├── 📁 src/
│   │   │   ├── 📁 controllers/             # 控制器
│   │   │   ├── 📁 models/                  # 数据模型
│   │   │   ├── 📁 routes/                  # 路由定义
│   │   │   ├── 📁 middleware/              # 中间件
│   │   │   ├── 📁 services/                # 业务逻辑
│   │   │   ├── 📁 utils/                   # 工具函数
│   │   │   └── 📁 config/                  # 配置文件
│   │   ├── package.json
│   │   ├── server.js
│   │   └── README.md
│   │
│   ├── 📁 lumarkai-api/                    # 光影方舟API
│   │   ├── 📁 src/
│   │   │   ├── 📁 controllers/
│   │   │   ├── 📁 models/
│   │   │   ├── 📁 routes/
│   │   │   ├── 📁 middleware/
│   │   │   ├── 📁 services/
│   │   │   ├── 📁 utils/
│   │   │   └── 📁 config/
│   │   ├── package.json
│   │   ├── server.js
│   │   └── README.md
│   │
│   └── 📁 shared/                          # 共享后端库
│       ├── 📁 middleware/
│       ├── 📁 utils/
│       ├── 📁 validators/
│       └── package.json
│
├── 📁 database/                             # 数据库相关
│   ├── 📁 schemas/                         # 数据模型定义
│   ├── 📁 migrations/                      # 数据库迁移
│   ├── 📁 seeds/                           # 初始数据
│   ├── 📁 utils/                           # 数据库工具
│   └── 📁 config/                          # 数据库配置
│
├── 📁 docs/                                 # 项目文档
│   ├── 📁 api/                             # API文档
│   ├── 📁 deployment/                      # 部署文档
│   ├── 📁 development/                     # 开发文档
│   └── 📁 user-guide/                      # 用户指南
│
├── 📁 scripts/                              # 构建和部署脚本
│   ├── build.sh                             # 构建脚本
│   ├── deploy.sh                            # 部署脚本
│   ├── setup.sh                             # 环境设置脚本
│   └── backup.sh                            # 备份脚本
│
├── 📁 config/                               # 项目配置文件
│   ├── webpack.common.js                    # Webpack公共配置
│   ├── babel.config.js                      # Babel配置
│   ├── eslint.config.js                     # ESLint配置
│   ├── prettier.config.js                   # Prettier配置
│   └── jest.config.js                       # Jest测试配置
│
├── 📁 .github/                              # GitHub配置
│   ├── 📁 workflows/                        # CI/CD工作流
│   └── 📁 ISSUE_TEMPLATE/                  # Issue模板
│
├── docker-compose.yml                       # Docker编排文件
├── docker-compose.dev.yml                   # 开发环境Docker配置
├── docker-compose.prod.yml                  # 生产环境Docker配置
├── .env.example                             # 环境变量示例
├── .gitignore                               # Git忽略文件
├── package.json                             # 根目录包管理
├── README.md                                # 项目说明
└── PROJECT_STRUCTURE.md                     # 项目结构说明
```

## 🔄 迁移步骤

### 第一阶段：创建新目录结构
1. 创建新的目录层次
2. 移动现有文件到对应目录
3. 更新文件引用关系

### 第二阶段：文件重组
1. 按功能模块组织页面文件
2. 提取可复用组件
3. 整理样式和脚本文件

### 第三阶段：构建系统集成
1. 配置Webpack构建
2. 设置开发服务器
3. 配置热重载

### 第四阶段：测试和优化
1. 验证所有功能正常
2. 性能优化
3. 代码质量检查

## 📋 具体迁移计划

### 1. 页面文件迁移
```
当前文件 → 新位置
yishuos-main.html → frontend/yishuos-main/src/pages/home/index.html
yishuos-solutions.html → frontend/yishuos-main/src/pages/solutions/index.html
yishuos-research.html → frontend/yishuos-main/src/pages/research/index.html
yishuos-support.html → frontend/yishuos-main/src/pages/support/index.html
yishuos-careers.html → frontend/yishuos-main/src/pages/careers/index.html
yishuos-eplan.html → frontend/yishuos-main/src/pages/eplan/index.html
yishuos-contact.html → frontend/yishuos-main/src/pages/contact/index.html
lumarkai-lab.html → frontend/lumarkai-lab/src/pages/home/index.html
lumarkai-gallery.html → frontend/lumarkai-lab/src/pages/gallery/index.html
banjing15-main.html → frontend/yishuos-main/src/pages/banjing15/index.html
```

### 2. 样式文件迁移
```
当前文件 → 新位置
yishuos-main.css → frontend/yishuos-main/src/styles/pages/home.css
yishuos-solutions.css → frontend/yishuos-main/src/styles/pages/solutions.css
yishuos-research.css → frontend/yishuos-main/src/styles/pages/research.css
yishuos-support.css → frontend/yishuos-main/src/styles/pages/support.css
yishuos-eplan.css → frontend/yishuos-main/src/styles/pages/eplan.css
banjing15-main.css → frontend/yishuos-main/src/styles/pages/banjing15.css
```

### 3. 脚本文件迁移
```
当前文件 → 新位置
yishuos-main.js → frontend/yishuos-main/src/scripts/pages/home.js
yishuos-solutions.js → frontend/yishuos-main/src/scripts/pages/solutions.js
yishuos-research.js → frontend/yishuos-main/src/scripts/pages/research.js
yishuos-support.js → frontend/yishuos-main/src/scripts/pages/support.js
yishuos-eplan.js → frontend/yishuos-main/src/scripts/pages/eplan.js
banjing15-main.js → frontend/yishuos-main/src/scripts/pages/banjing15.js
```

### 4. 资源文件迁移
```
当前位置 → 新位置
assets/images/ → frontend/yishuos-main/src/assets/images/
assets/videos/ → frontend/yishuos-main/src/assets/videos/
image-back/ → frontend/yishuos-main/src/assets/images/backgrounds/
```

## 🎯 重构后的优势

### 1. 代码组织
- ✅ 清晰的模块化结构
- ✅ 易于维护和扩展
- ✅ 符合现代开发标准

### 2. 开发效率
- ✅ 快速定位文件
- ✅ 组件复用
- ✅ 热重载开发

### 3. 团队协作
- ✅ 统一的代码规范
- ✅ 清晰的分工边界
- ✅ 易于代码审查

### 4. 部署和维护
- ✅ 自动化构建
- ✅ 环境配置管理
- ✅ 版本控制友好

## 🚀 下一步行动

1. **确认重构方案** - 团队讨论并确认最终结构
2. **创建迁移脚本** - 自动化文件迁移过程
3. **逐步迁移** - 按模块逐步完成迁移
4. **测试验证** - 确保所有功能正常
5. **文档更新** - 更新相关文档和说明

这个重构方案将显著提升项目的可维护性和开发效率，为后续的技术栈升级奠定坚实基础。 