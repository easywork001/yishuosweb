# 🚀 易术科技项目开发环境配置指南

> 📋 **适用对象**: 所有开发团队成员  
> ⏱️ **配置时间**: 5-10分钟  
> 🎯 **目标**: 确保所有开发环境一致，避免路径映射问题

## 📋 环境要求

### 基础环境
- ✅ **操作系统**: macOS 10.15+ / Windows 10+ / Ubuntu 18.04+
- ✅ **Python**: 3.7+ (推荐 3.9+)
- ✅ **浏览器**: Chrome 90+ / Firefox 88+ / Safari 14+
- ✅ **内存**: 至少 4GB RAM
- ✅ **磁盘**: 至少 2GB 可用空间

### 开发工具
- 🔧 **编辑器**: VS Code / Cursor / WebStorm
- 🔧 **Git**: 用于版本控制
- 🔧 **终端**: 支持Python命令执行

## 🚀 环境配置步骤

### 第一步：克隆项目
```bash
# 克隆项目到本地
git clone https://github.com/easywork001/yishuosweb.git
cd yishuosweb

# 确认项目结构
ls -la
```

### 第二步：检查Python环境
```bash
# 检查Python版本
python3 --version

# 如果没有Python3，安装方法：
# macOS: brew install python3
# Ubuntu: sudo apt install python3
# Windows: 下载安装包
```

### 第三步：验证项目文件
```bash
# 检查关键文件是否存在
ls -la scripts/start-refactored-fixed.py
ls -la frontend/yishuos-main/src/assets/images/
ls -la frontend/lumarkai-lab/src/pages/home/
```

## 🌐 启动项目

### ⚠️ 重要：必须使用项目启动脚本

**❌ 错误做法（会导致图片不显示）:**
- 直接双击HTML文件
- 使用 `python -m http.server`
- 使用其他HTTP服务器

**✅ 正确做法:**
```bash
# 在项目根目录执行
python3 scripts/start-refactored-fixed.py
```

### 启动成功标志
```
🚀 易术科技重构项目启动器 - URL解码修复版
==================================================
📁 项目根目录: /path/to/yishuosweb
🔍 检查项目结构...
  ✅ frontend/yishuos-main/src/pages/home
  ✅ frontend/yishuos-main/src/styles
  ✅ frontend/yishuos-main/src/scripts
  ✅ frontend/yishuos-main/src/assets

🌐 启动HTTP服务器...
   端口: 8000
   根目录: /path/to/yishuosweb
✅ 服务器启动成功！
🌍 访问地址: http://localhost:8000
📱 易术主站: http://localhost:8000/yishuos-main/home/
🎨 光影方舟: http://localhost:8000/lumarkai-lab/home/
```

## 🔧 端口配置

### 默认端口
- **主端口**: 8000
- **访问地址**: http://localhost:8000

### 自定义端口
```bash
# 使用环境变量指定端口
PORT=3000 python3 scripts/start-refactored-fixed.py

# 或者
export PORT=3000
python3 scripts/start-refactored-fixed.py
```

### 端口冲突解决
```bash
# 查看端口占用
lsof -i :8000

# 终止占用进程
lsof -ti:8000 | xargs kill -9

# 使用其他端口
PORT=8080 python3 scripts/start-refactored-fixed.py
```

## 🌍 访问路径

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

## 🚨 常见问题排查

### 问题1：图片不显示
**症状**: 页面加载但图片显示为破损图标或空白

**原因**: 没有使用项目启动脚本，绝对路径无法解析

**解决方案**:
```bash
# 停止当前服务器 (Ctrl+C)
# 使用正确的启动脚本
python3 scripts/start-refactored-fixed.py
```

### 问题2：端口被占用
**症状**: `[Errno 48] Address already in use`

**解决方案**:
```bash
# 方法1：终止占用进程
lsof -ti:8000 | xargs kill -9

# 方法2：使用其他端口
PORT=8080 python3 scripts/start-refactored-fixed.py
```

### 问题3：文件路径错误
**症状**: 404错误或页面无法访问

**解决方案**:
```bash
# 确认在项目根目录
pwd
# 应该显示: /path/to/yishuosweb

# 检查启动脚本是否存在
ls -la scripts/start-refactored-fixed.py
```

### 问题4：Python版本不兼容
**症状**: `SyntaxError` 或模块导入错误

**解决方案**:
```bash
# 检查Python版本
python3 --version

# 如果版本低于3.7，升级Python
# macOS: brew upgrade python3
# Ubuntu: sudo apt update && sudo apt upgrade python3
```

## 📁 项目结构说明

```
yishuosweb/
├── frontend/                    # 前端代码
│   ├── yishuos-main/           # 易术主站
│   │   └── src/
│   │       ├── pages/          # 页面文件
│   │       ├── styles/         # 样式文件
│   │       ├── scripts/        # 脚本文件
│   │       └── assets/         # 静态资源 ⭐
│   └── lumarkai-lab/           # 光影方舟实验室
│       └── src/
│           ├── pages/          # 页面文件
│           ├── styles/         # 样式文件
│           ├── scripts/        # 脚本文件
│           └── assets/         # 静态资源
├── backend/                     # 后端服务
├── database/                    # 数据库
├── scripts/                     # 工具脚本
│   └── start-refactored-fixed.py  # ⭐ 核心启动脚本
└── README.md                    # 项目说明
```

## 🔍 路径映射原理

### 为什么需要特殊启动脚本？

项目使用绝对路径 `/assets/images/...`，但实际文件在 `frontend/yishuos-main/src/assets/images/...`

**启动脚本的路径映射逻辑**:
```python
# 将 /assets/ 映射到实际目录
if path.startswith('/assets/'):
    actual_path = path.replace('/assets/', 'frontend/yishuos-main/src/assets/')
    target_path = project_root / actual_path
    if target_path.exists():
        return str(target_path)
```

**普通HTTP服务器**: 无法理解这种映射，导致404错误  
**项目启动脚本**: 自动处理路径映射，确保资源正常访问

## 🚀 快速启动命令

### 一键启动脚本
```bash
#!/bin/bash
# 保存为 start-project.sh，赋予执行权限: chmod +x start-project.sh

echo "🚀 启动易术科技项目..."
echo "检查Python环境..."

if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 未安装，请先安装Python3"
    exit 1
fi

echo "✅ Python3 已安装: $(python3 --version)"
echo "启动项目服务器..."

# 检查端口占用
if lsof -i :8000 &> /dev/null; then
    echo "⚠️  端口8000被占用，正在释放..."
    lsof -ti:8000 | xargs kill -9
    sleep 2
fi

# 启动项目
python3 scripts/start-refactored-fixed.py
```

### 使用一键启动
```bash
# 赋予执行权限
chmod +x start-project.sh

# 启动项目
./start-project.sh
```

## 📞 技术支持

### 遇到问题？
1. **检查本文档** - 90%的问题都能在这里找到答案
2. **查看控制台输出** - 启动脚本会显示详细的错误信息
3. **联系项目维护者** - 提供具体的错误信息和环境信息

### 环境信息收集
如果问题无法解决，请提供以下信息：
```bash
# 系统信息
uname -a
python3 --version
pwd
ls -la scripts/

# 错误日志
# 复制启动脚本的完整输出
```

---

**🎉 配置完成后，你就可以正常开发了！**

记住：**始终使用 `python3 scripts/start-refactored-fixed.py` 启动项目**
