# 🚀 GitHub部署指南

> 📋 **说明**: 本指南将帮助你将易术科技项目上传到GitHub并进行部署

## 📋 前置准备

### 1. GitHub账号准备
- ✅ 拥有GitHub账号
- ✅ 已创建新的仓库（Repository）
- ✅ 已安装Git客户端

### 2. 本地环境准备
```bash
# 检查Git版本
git --version

# 配置Git用户信息（如果未配置）
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的邮箱"
```

## 🎯 上传到GitHub

### 第一步：初始化Git仓库
```bash
# 进入项目目录
cd yishuosweb

# 初始化Git仓库
git init

# 添加远程仓库（替换为你的GitHub仓库URL）
git remote add origin https://github.com/你的用户名/仓库名.git
```

### 第二步：添加文件到Git
```bash
# 查看当前状态
git status

# 添加所有文件
git add .

# 查看将要提交的文件
git status

# 提交代码
git commit -m "feat: 初始提交 - 易术科技官方网站重构完成

- 完成项目结构重构
- 修复所有路径引用问题
- 支持光影方舟实验室功能
- 优化本地部署服务"
```

### 第三步：推送到GitHub
```bash
# 推送到主分支
git branch -M main
git push -u origin main

# 如果遇到认证问题，使用个人访问令牌
# 或者配置SSH密钥
```

## 🌐 部署配置

### 1. GitHub Pages部署（静态网站）

#### 启用GitHub Pages：
1. 进入GitHub仓库页面
2. 点击 `Settings` 标签
3. 左侧菜单选择 `Pages`
4. Source选择 `Deploy from a branch`
5. Branch选择 `main`，文件夹选择 `/ (root)`
6. 点击 `Save`

#### 注意事项：
- GitHub Pages只支持静态文件
- 需要将项目构建为静态文件
- 不支持服务器端功能

### 2. 服务器部署（推荐）

#### 从GitHub克隆到服务器：
```bash
# 在服务器上克隆项目
git clone https://github.com/你的用户名/仓库名.git
cd 仓库名

# 安装依赖（如果有）
npm install

# 配置Nginx（参考PROJECT_ARCHITECTURE.md）
```

## 🔧 自动化部署

### 1. GitHub Actions配置

#### 创建工作流文件：
```yaml
# .github/workflows/deploy.yml
name: Deploy to Server

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /var/www/yishuosweb
          git pull origin main
          sudo systemctl reload nginx
```

#### 配置Secrets：
1. 进入仓库 `Settings` → `Secrets and variables` → `Actions`
2. 添加以下Secrets：
   - `HOST`: 服务器IP地址
   - `USERNAME`: 服务器用户名
   - `KEY`: 服务器SSH私钥

### 2. 手动部署脚本

#### 创建部署脚本：
```bash
# scripts/deploy.sh
#!/bin/bash

echo "🚀 开始部署易术科技项目..."

# 拉取最新代码
git pull origin main

# 重启Nginx
sudo systemctl reload nginx

echo "✅ 部署完成！"
```

## 📁 项目文件结构（GitHub）

```
yishuosweb/
├── frontend/                    # 前端代码
│   ├── yishuos-main/           # 易术主站
│   └── lumarkai-lab/           # 光影方舟实验室
├── backend/                     # 后端服务
├── database/                    # 数据库相关
├── scripts/                     # 工具脚本
├── docs/                        # 项目文档
├── .gitignore                   # Git忽略文件
├── README.md                    # 项目说明
├── QUICK_START.md              # 快速开始指南
├── PROJECT_ARCHITECTURE.md     # 项目架构说明
├── RESTRUCTURE_LOG.md          # 重构日志
├── GITHUB_DEPLOY.md            # 本部署指南
└── LICENSE                      # 开源许可证
```

## ⚠️ 注意事项

### 1. 敏感信息
- ❌ 不要上传 `.env` 文件
- ❌ 不要上传数据库密码
- ❌ 不要上传API密钥
- ✅ 使用环境变量或配置文件模板

### 2. 大文件处理
- 如果图片/视频文件过大，考虑使用Git LFS
- 或者将大文件存储在CDN上

### 3. 分支管理
```bash
# 创建开发分支
git checkout -b develop

# 创建功能分支
git checkout -b feature/new-feature

# 合并到主分支
git checkout main
git merge feature/new-feature
```

## 🚀 部署后验证

### 1. 功能测试
- ✅ 页面访问正常
- ✅ 图片资源加载正常
- ✅ 页面跳转正常
- ✅ 功能按钮正常

### 2. 性能测试
- ✅ 页面加载速度
- ✅ 资源加载速度
- ✅ 服务器响应时间

### 3. 兼容性测试
- ✅ 不同浏览器兼容性
- ✅ 移动端适配性
- ✅ 不同设备兼容性

## 📞 遇到问题？

### 常见问题解决：
1. **认证失败**: 检查GitHub令牌或SSH密钥
2. **推送失败**: 检查远程仓库URL和权限
3. **部署失败**: 检查服务器配置和权限
4. **页面404**: 检查Nginx配置和路径映射

### 获取帮助：
- 📖 查看项目文档
- 🔍 搜索GitHub Issues
- 💬 联系开发团队

---

**部署状态**: 准备就绪 🚀  
**下一步**: 按照上述步骤操作  
**预计时间**: 30-60分钟 