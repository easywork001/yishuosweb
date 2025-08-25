# 易术科技主站前端项目

## 📋 项目简介

易术科技主站前端项目，包含易术科技官网的所有页面和功能。

## 🏗️ 项目结构

```
src/
├── pages/                    # 页面文件
│   ├── home/                # 主页
│   ├── solutions/           # 解决方案
│   ├── research/            # 研究
│   ├── support/             # 支持服务
│   ├── careers/             # 招聘
│   ├── eplan/               # E计划
│   ├── contact/             # 联系我们
│   ├── docs/                # 文档中心
│   ├── auth/                # 认证页面
│   └── banjing15/           # 半径十五米社群
├── components/               # 可复用组件
├── assets/                   # 静态资源
│   ├── images/              # 图片资源
│   ├── videos/              # 视频资源
│   └── icons/               # 图标资源
├── styles/                   # 样式文件
│   ├── base/                # 基础样式
│   ├── components/          # 组件样式
│   └── pages/               # 页面样式
├── scripts/                  # JavaScript文件
│   ├── utils/               # 工具函数
│   ├── components/          # 组件脚本
│   └── pages/               # 页面脚本
└── data/                     # 静态数据
```

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 本地预览
```bash
npm start
```

## 🛠️ 技术栈

- **构建工具**: Webpack 5
- **开发服务器**: Webpack Dev Server
- **样式处理**: CSS Loader, Style Loader
- **资源处理**: File Loader
- **HTML处理**: Html Webpack Plugin

## 📱 页面说明

### 主要页面
- **主页** (`/home/`) - 易术科技官网首页
- **解决方案** (`/solutions/`) - 行业解决方案展示
- **研究** (`/research/`) - 易术研究相关内容
- **支持服务** (`/support/`) - 客户支持和服务
- **招聘** (`/careers/`) - 职位信息和招聘
- **E计划** (`/eplan/`) - 加入E计划页面
- **联系我们** (`/contact/`) - 联系方式和表单
- **文档中心** (`/docs/`) - 技术文档和指南
- **登录** (`/auth/login/`) - 用户登录页面
- **半径十五米** (`/banjing15/`) - 社群页面

## 🎨 设计系统

### 颜色系统
- 主色调: `#4a90e2`
- 辅助色: `#f8f9fa`
- 强调色: `#ff6b6b`

### 字体系统
- 基础字体: 系统默认字体栈
- 等宽字体: JetBrains Mono

### 间距系统
- 基础单位: `0.25rem`
- 标准间距: `0.5rem`, `1rem`, `1.5rem`, `2rem`, `3rem`

## 🔧 开发指南

### 添加新页面
1. 在 `src/pages/` 下创建新目录
2. 添加 `index.html` 文件
3. 在 `webpack.config.js` 中添加入口点
4. 创建对应的样式和脚本文件

### 添加新组件
1. 在 `src/components/` 下创建组件目录
2. 添加组件的HTML、CSS、JS文件
3. 在需要使用的页面中引入

### 样式规范
- 使用CSS变量定义主题色彩和间距
- 遵循BEM命名规范
- 支持响应式设计

## 📦 构建输出

构建后的文件将输出到 `dist/` 目录：
- HTML文件
- 打包后的JavaScript文件
- 处理后的CSS文件
- 优化后的静态资源

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

## 📞 联系我们

- 项目维护: 易术科技团队
- 技术支持: [联系方式] 