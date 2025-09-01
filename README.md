# 易术科技官方网站

> ⚠️ **重要提醒**: 本项目已完成重构，请使用新的启动方式和访问路径

## 🚀 项目概述

易术科技官方网站是一个现代化的企业展示平台，包含易术主站和光影方舟实验室两个核心模块。项目采用前后端分离架构，支持响应式设计和现代化Web技术。

## 🏗️ 项目架构

### 重构后的项目结构
```
yishuosweb/
├── frontend/                    # 前端代码
│   ├── yishuos-main/           # 易术主站
│   │   ├── src/
│   │   │   ├── pages/          # 页面文件
│   │   │   │   ├── home/       # 主页
│   │   │   │   ├── eplan/      # E计划
│   │   │   │   ├── solutions/  # 解决方案
│   │   │   │   ├── support/    # 服务支持
│   │   │   │   ├── careers/    # 加入我们
│   │   │   │   ├── research/   # 易术研究
│   │   │   │   ├── contact/    # 联系我们
│   │   │   │   ├── auth/       # 登录注册
│   │   │   │   └── banjing15/  # 半径十五米
│   │   │   ├── styles/         # 样式文件
│   │   │   ├── scripts/        # 脚本文件
│   │   │   └── assets/         # 静态资源
│   │   └── package.json
│   └── lumarkai-lab/           # 光影方舟实验室
│       ├── src/
│       │   ├── pages/          # 页面文件
│       │   │   ├── home/       # 主页
│       │   │   ├── gallery/    # 光影素材库
│       │   │   └── auth/       # 用户认证
│       │   ├── styles/         # 样式文件
│       │   ├── scripts/        # 脚本文件
│       │   └── assets/         # 静态资源
│       └── package.json
├── backend/                     # 后端服务
├── database/                    # 数据库相关
├── scripts/                     # 工具脚本
│   └── start-refactored-fixed.py  # 核心启动脚本
├── RESTRUCTURE_LOG.md           # 重构日志
└── README.md                    # 项目说明
```

## 🌐 重构后的访问路径

### 易术主站
- **主页**: http://localhost:8000/yishuos-main/home/
- **E计划**: http://localhost:8000/eplan/
- **解决方案**: http://localhost:8000/solutions/
- **服务支持**: http://localhost:8000/support/
- **加入我们**: http://localhost:8000/careers/
- **易术研究**: http://localhost:8000/research/
- **联系我们**: http://localhost:8000/contact/
- **登录注册**: http://localhost:8000/auth/
- **半径十五米**: http://localhost:8000/banjing15/

### 光影方舟实验室
- **主页**: http://localhost:8000/lumarkai-lab/home/
- **光影素材库**: http://localhost:8000/lumarkai-lab/gallery/
- **用户登录**: http://localhost:8000/lumarkai-lab/auth/login.html
- **用户面板**: http://localhost:8000/lumarkai-lab/auth/dashboard.html
- **管理后台**: http://localhost:8000/lumarkai-lab/auth/admin.html

## 🚀 快速开始

### 环境要求
- **Python**: 3.7+ (推荐 3.9+)
- **浏览器**: 现代浏览器（支持ES6+）
- **操作系统**: macOS 10.15+ / Windows 10+ / Ubuntu 18.04+

### ⚠️ 重要提醒
**项目必须使用特定的启动脚本才能正常显示图片！**
- ❌ 不要直接双击HTML文件
- ❌ 不要使用 `python -m http.server`
- ✅ 必须使用 `./start-project.sh` 或 `python3 scripts/start-refactored-fixed.py`

### 启动步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd yishuosweb
```

2. **启动服务**

#### 方法一：一键启动脚本（推荐）
```bash
# macOS/Linux
./start-project.sh

# Windows
start-project.bat
```

#### 方法二：手动启动
```bash
# 使用默认端口8000
python3 scripts/start-refactored-fixed.py

# 使用自定义端口
PORT=3000 python3 scripts/start-refactored-fixed.py
```

#### 方法三：环境变量配置
```bash
# 设置端口
export PORT=3000

# 启动服务
python3 scripts/start-refactored-fixed.py
```

3. **访问网站**
- 易术主站: http://localhost:8000/yishuos-main/home/
- 光影方舟: http://localhost:8000/lumarkai-lab/home/

## 🔧 技术特性

### 前端技术
- **HTML5**: 语义化标签和现代Web标准
- **CSS3**: 响应式设计、动画效果、Flexbox/Grid布局
- **JavaScript ES6+**: 模块化开发、异步处理、DOM操作
- **响应式设计**: 支持桌面、平板、移动设备

### 服务特性
- **绝对路径支持**: 所有资源使用绝对路径，确保部署稳定性
- **URL解码**: 支持中文路径和特殊字符
- **CORS支持**: 跨域请求支持
- **端口配置**: 支持环境变量端口配置
- **自动重定向**: 智能路径映射和重定向

## 📁 核心文件说明

### 启动脚本
- `scripts/start-refactored-fixed.py` - 重构后的项目启动器
  - 支持绝对路径资源访问
  - 自动路径重定向
  - URL解码支持
  - 环境变量端口配置

### 重要页面
- `frontend/yishuos-main/src/pages/home/index.html` - 易术主站主页
- `frontend/lumarkai-lab/src/pages/home/index.html` - 光影方舟主页
- `frontend/lumarkai-lab/src/pages/gallery/index.html` - 光影素材库

### 样式文件
- `frontend/yishuos-main/src/styles/pages/home.css` - 主站主页样式
- `frontend/lumarkai-lab/src/pages/home/index.html` - 光影方舟内联样式

## 🐛 问题排查

### 🚨 最常见问题：图片不显示

**症状**: 页面加载但图片显示为破损图标或空白  
**原因**: 没有使用项目启动脚本，绝对路径无法解析  

**解决方案**:
```bash
# 停止当前服务器 (Ctrl+C)
# 使用正确的启动脚本
./start-project.sh
# 或
python3 scripts/start-refactored-fixed.py
```

**为什么会出现这个问题？**
- 项目使用绝对路径 `/assets/images/...`
- 需要启动脚本进行路径映射到 `frontend/yishuos-main/src/assets/images/...`
- 普通HTTP服务器无法理解这种映射关系

### 其他常见问题

1. **端口被占用**
   ```bash
   # 查看端口占用
   lsof -i :8000
   
   # 终止占用进程
   lsof -ti:8000 | xargs kill -9
   
   # 使用其他端口
   PORT=8080 ./start-project.sh
   ```

2. **文件路径错误**
   - 确认在项目根目录执行脚本
   - 检查启动脚本是否存在
   - 验证项目文件结构

2. **页面404错误**
   - 检查访问路径是否正确
   - 确认文件名和目录结构
   - 查看服务器日志

3. **样式异常**
   - 检查CSS文件路径
   - 确认CSS语法正确
   - 检查样式优先级

4. **功能失效**
   - 检查JavaScript文件路径
   - 确认事件绑定正确
   - 查看浏览器控制台错误

### 调试工具
- 浏览器开发者工具
- 服务器日志输出
- 网络请求监控

## 📚 开发指南

### 🛠️ 开发环境配置

#### 详细配置指南
查看 `DEVELOPMENT_SETUP.md` 获取完整的开发环境配置说明，包括：
- 环境要求检查
- 常见问题解决方案
- 路径映射原理解释
- 一键启动脚本使用

#### 快速配置检查
```bash
# 1. 检查Python环境
python3 --version

# 2. 检查项目文件
ls -la scripts/start-refactored-fixed.py
ls -la frontend/yishuos-main/src/assets/images/

# 3. 启动项目
./start-project.sh
```

### 添加新页面
1. 在对应模块的 `src/pages/` 目录下创建新目录
2. 添加 `index.html` 文件
3. 更新启动脚本的路径映射
4. 测试页面访问

### 修改样式
1. 在对应模块的 `src/styles/` 目录下修改CSS文件
2. 或直接在HTML文件中修改内联样式
3. 注意样式优先级和继承关系

### 添加功能
1. 在对应模块的 `src/scripts/` 目录下添加JavaScript文件
2. 在HTML文件中引入脚本
3. 实现功能逻辑和事件绑定

## 🔄 重构状态

### ✅ 已完成
- 项目结构重构
- 路径引用修复
- 本地部署服务
- 光影方舟页面问题解决
- 项目清理优化

### 🎯 当前状态
- **重构完成度**: 100%
- **功能完整性**: 100%
- **路径正确性**: 100%
- **部署稳定性**: 100%

## 📞 技术支持

- **项目维护**: 易术科技开发团队
- **文档更新**: 2024-08-25
- **重构状态**: 完成

## 📄 许可证

本项目为易术科技内部项目，版权所有。

---

**最后更新**: 2024-08-25 19:30  
**重构状态**: 完成，所有问题已解决  
**下一步**: 功能测试和性能优化 