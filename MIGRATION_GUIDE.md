# 🚀 易术科技项目结构重构迁移指南

## 📋 迁移概述

本指南将帮助您将当前混乱的项目文件结构重构为标准的现代化项目架构。

## 🎯 重构目标

- ✅ 清晰的模块化目录结构
- ✅ 前后端分离架构
- ✅ 便于维护和扩展
- ✅ 符合现代开发标准

## 🛠️ 快速开始

### 1. 备份项目（重要！）
```bash
# 在项目根目录执行
cp -r . ../yishuosweb-backup-$(date +%Y%m%d)
```

### 2. 运行重构脚本
```bash
# 在项目根目录执行
./scripts/restructure-project.sh
```

### 3. 脚本会自动完成以下操作：
- 📁 创建新的目录结构
- 📄 移动所有HTML页面文件
- 🎨 移动所有CSS样式文件
- ⚡ 移动所有JavaScript文件
- 🖼️ 移动所有资源文件
- ⚙️ 创建配置文件
- 📦 创建package.json文件
- 🔧 创建Webpack配置
- 📖 创建README文件

## 📁 重构后的目录结构

```
yishuosweb/
├── 📁 frontend/                          # 前端项目根目录
│   ├── 📁 yishuos-main/                  # 易术主站前端
│   │   ├── 📁 src/
│   │   │   ├── 📁 pages/                 # 页面文件
│   │   │   │   ├── home/                 # 主页
│   │   │   │   ├── solutions/            # 解决方案
│   │   │   │   ├── research/             # 研究
│   │   │   │   ├── support/              # 支持
│   │   │   │   ├── careers/              # 招聘
│   │   │   │   ├── eplan/                # E计划
│   │   │   │   ├── contact/              # 联系
│   │   │   │   └── banjing15/            # 半径十五米
│   │   │   ├── 📁 components/            # 可复用组件
│   │   │   ├── 📁 assets/                # 静态资源
│   │   │   ├── 📁 styles/                # 样式文件
│   │   │   ├── 📁 scripts/               # JavaScript文件
│   │   │   └── 📁 data/                  # 静态数据
│   │   ├── package.json
│   │   ├── webpack.config.js
│   │   └── README.md
│   │
│   ├── 📁 lumarkai-lab/                   # 光影方舟实验室前端
│   └── 📁 shared/                         # 共享组件库
│
├── 📁 backend/                             # 后端项目根目录
│   ├── 📁 yishuos-api/                     # 易术主站API
│   ├── 📁 lumarkai-api/                    # 光影方舟API
│   └── 📁 shared/                          # 共享后端库
│
├── 📁 database/                             # 数据库相关
├── 📁 docs/                                 # 项目文档
├── 📁 scripts/                              # 构建和部署脚本
└── 📁 config/                               # 项目配置文件
```

## 🔄 文件迁移对照表

### 页面文件迁移
| 原文件 | 新位置 |
|--------|--------|
| `yishuos-main.html` | `frontend/yishuos-main/src/pages/home/index.html` |
| `yishuos-solutions.html` | `frontend/yishuos-main/src/pages/solutions/index.html` |
| `yishuos-research.html` | `frontend/yishuos-main/src/pages/research/index.html` |
| `yishuos-support.html` | `frontend/yishuos-main/src/pages/support/index.html` |
| `yishuos-careers.html` | `frontend/yishuos-main/src/pages/careers/index.html` |
| `yishuos-eplan.html` | `frontend/yishuos-main/src/pages/eplan/index.html` |
| `yishuos-contact.html` | `frontend/yishuos-main/src/pages/contact/index.html` |
| `lumarkai-lab.html` | `frontend/lumarkai-lab/src/pages/home/index.html` |
| `banjing15-main.html` | `frontend/yishuos-main/src/pages/banjing15/index.html` |

### 样式文件迁移
| 原文件 | 新位置 |
|--------|--------|
| `yishuos-main.css` | `frontend/yishuos-main/src/styles/pages/home.css` |
| `yishuos-solutions.css` | `frontend/yishuos-main/src/styles/pages/solutions.css` |
| `yishuos-research.css` | `frontend/yishuos-main/src/styles/pages/research.css` |
| `yishuos-support.css` | `frontend/yishuos-main/src/styles/pages/support.css` |
| `yishuos-eplan.css` | `frontend/yishuos-main/src/styles/pages/eplan.css` |
| `banjing15-main.css` | `frontend/yishuos-main/src/styles/pages/banjing15.css` |

### 脚本文件迁移
| 原文件 | 新位置 |
|--------|--------|
| `yishuos-main.js` | `frontend/yishuos-main/src/scripts/pages/home.js` |
| `yishuos-solutions.js` | `frontend/yishuos-main/src/scripts/pages/solutions.js` |
| `yishuos-research.js` | `frontend/yishuos-main/src/scripts/pages/research.js` |
| `yishuos-support.js` | `frontend/yishuos-main/src/scripts/pages/support.js` |
| `yishuos-eplan.js` | `frontend/yishuos-main/src/scripts/pages/eplan.js` |
| `banjing15-main.js` | `frontend/yishuos-main/src/scripts/pages/banjing15.js` |

## ⚠️ 重要注意事项

### 1. 文件引用路径更新
重构后，您需要手动更新HTML文件中的CSS和JS引用路径：

**更新前：**
```html
<link rel="stylesheet" href="yishuos-main.css">
<script src="yishuos-main.js"></script>
```

**更新后：**
```html
<link rel="stylesheet" href="./styles/pages/home.css">
<script src="./scripts/pages/home.js"></script>
```

### 2. 资源文件路径更新
图片、视频等资源文件的路径也需要相应更新：

**更新前：**
```html
<img src="assets/images/logo.png">
```

**更新后：**
```html
<img src="./assets/images/logo.png">
```

## 🚀 重构后的使用

### 1. 安装依赖
```bash
cd frontend/yishuos-main
npm install
```

### 2. 开发模式
```bash
npm run dev
```

### 3. 构建生产版本
```bash
npm run build
```

### 4. 访问页面
- 主页: http://localhost:3000
- 解决方案: http://localhost:3000/solutions.html
- 研究: http://localhost:3000/research.html
- 支持: http://localhost:3000/support.html

## 🔧 故障排除

### 问题1：端口被占用
```bash
# 查看端口占用
lsof -i :3000

# 终止占用进程
lsof -ti:3000 | xargs kill
```

### 问题2：文件路径错误
检查HTML文件中的资源引用路径是否正确更新。

### 问题3：样式不生效
确保CSS文件路径正确，并且Webpack配置正确。

## 📞 获取帮助

如果在迁移过程中遇到问题：

1. 检查控制台错误信息
2. 验证文件路径是否正确
3. 确认所有依赖已正确安装
4. 查看项目文档和README文件

## 🎉 迁移完成

恭喜！您的项目现在具有：
- ✅ 清晰的文件组织结构
- ✅ 现代化的构建系统
- ✅ 便于维护的代码架构
- ✅ 团队协作友好的目录结构

现在您可以专注于功能开发和代码优化了！ 