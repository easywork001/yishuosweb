# 易术官网项目 (Yishuos Official Website)

## 项目简介

易术官网是一个现代化的企业官网项目，集成了多个品牌展示、产品介绍、解决方案展示等功能模块。项目采用响应式设计，支持多端访问。

## 主要功能

### 🏢 品牌矩阵展示
- **易术创新** - 企业创新服务
- **易术研究** - 研究咨询服务  
- **易术营销** - 营销解决方案
- **EAI** - AI技术平台
- **光影方舟** - 创意设计服务
- **半径十五米** - 社区服务平台

### 🎯 核心页面
- 首页展示
- 产品介绍
- 解决方案
- 研究白皮书
- 社区互动
- 企业介绍
- 联系我们

### 🚀 技术特性
- 响应式设计，支持移动端
- 现代化UI/UX设计
- 流畅的动画效果
- 多语言支持
- AI聊天助手集成

## 项目结构

```
Yishuos官网/
├── assets/                 # 静态资源文件
│   ├── images/            # 图片资源
│   ├── documents/         # 文档资源
│   └── videos/            # 视频资源
├── backend/               # 后端服务
│   ├── lumarkai-api/      # Lumarkai API服务
│   ├── yishuos-api/       # 易术主站API
│   └── shared/            # 共享模块
├── database/              # 数据库相关
├── frontend/              # 前端应用
│   ├── lumarkai-lab/      # Lumarkai实验室
│   └── yishuos-main/      # 易术主站
├── index.html             # 主页面
├── yishuos-main.html      # 易术主站页面
├── yishuos-solutions.html # 解决方案页面
├── yishuos-research.html  # 研究页面
├── yishuos-support.html   # 支持页面
└── 其他页面文件...
```

## 快速开始

### 环境要求
- Node.js 16+
- Python 3.8+ (可选，用于Python服务器)
- 现代浏览器支持

### 安装依赖
```bash
# 安装Node.js依赖
npm install

# 安装后端依赖
cd backend/lumarkai-api && npm install
cd backend/yishuos-api && npm install

# 安装前端依赖
cd frontend/lumarkai-lab && npm install
cd frontend/yishuos-main && npm install
```

### 启动项目
```bash
# 启动Python服务器
python start_server.py

# 或者使用Shell脚本
./start.sh

# 启动后端服务
cd backend/lumarkai-api && npm start
cd backend/yishuos-api && npm start
```

### 访问地址
- 主站: http://localhost:8000
- 后端API: http://localhost:3000

## 部署说明

### 静态部署
项目支持静态部署到任何Web服务器或CDN服务。

### Docker部署
```bash
docker-compose up -d
```

## 开发指南

### 代码规范
- 使用ES6+语法
- 遵循CSS命名规范
- 保持代码注释完整

### 分支管理
- `master`: 主分支，用于生产环境
- `develop`: 开发分支
- `feature/*`: 功能分支

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系我们

- 官网: [https://yishuos.com](https://yishuos.com)
- 邮箱: contact@yishuos.com
- 电话: +86-xxx-xxxx-xxxx

## 更新日志

### v1.0.0 (2024-01-XX)
- 初始版本发布
- 完成主要功能模块
- 响应式设计实现
- 多品牌展示功能

---

**易术官网项目** - 让企业数字化更简单 