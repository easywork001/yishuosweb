# 🚀 易术科技项目快速开始指南

> ⏱️ **预计时间**: 5-10分钟  
> 🎯 **目标**: 快速启动项目并了解基本操作

## 📋 前置要求

### 基础环境
- ✅ **操作系统**: macOS 10.15+ / Windows 10+ / Ubuntu 18.04+
- ✅ **Python**: 3.7+ (推荐 3.9+)
- ✅ **浏览器**: Chrome 90+ / Firefox 88+ / Safari 14+
- ✅ **内存**: 至少 4GB RAM
- ✅ **磁盘**: 至少 2GB 可用空间

### 可选环境
- 🔧 **编辑器**: VS Code / Cursor / WebStorm
- 🔧 **Git**: 用于版本控制
- 🔧 **Node.js**: 16+ (用于后端开发)

## 🚀 快速启动

### 第一步：获取项目
```bash
# 克隆项目（如果有Git仓库）
git clone <repository-url>
cd yishuosweb

# 或者直接下载项目文件到 yishuosweb 目录
```

### 第二步：启动服务
```bash
# 使用默认端口8000启动
python3 scripts/start-refactored-fixed.py

# 或者指定自定义端口
PORT=3000 python3 scripts/start-refactored-fixed.py
```

### 第三步：访问网站
- 🌐 **易术主站**: http://localhost:8000/yishuos-main/home/
- 🎨 **光影方舟**: http://localhost:8000/lumarkai-lab/home/

## 🎯 核心功能体验

### 易术主站功能
1. **品牌展示** - 查看易术科技的品牌矩阵
2. **产品介绍** - 了解EAI、光影方舟等产品
3. **解决方案** - 浏览行业解决方案
4. **加入我们** - 查看职位信息
5. **联系我们** - 提交咨询表单

### 光影方舟实验室功能
1. **AI创作** - 体验AI艺术创作
2. **素材库** - 浏览精选AI艺术作品
3. **用户中心** - 登录和管理个人作品
4. **技术展示** - 了解AI技术能力

## 🔧 开发环境配置

### 本地开发设置
```bash
# 1. 创建开发分支
git checkout -b feature/your-feature-name

# 2. 启动开发服务器
python3 scripts/start-refactored-fixed.py

# 3. 在浏览器中访问
open http://localhost:8000/yishuos-main/home/
```

### 端口配置
```bash
# 使用环境变量配置端口
export PORT=3000
python3 scripts/start-refactored-fixed.py

# 或者直接指定
PORT=3000 python3 scripts/start-refactored-fixed.py
```

## 📁 项目结构速览

### 前端模块
```
frontend/
├── yishuos-main/           # 易术主站
│   └── src/
│       ├── pages/          # 页面文件
│       ├── styles/         # 样式文件
│       ├── scripts/        # 脚本文件
│       └── assets/         # 静态资源
└── lumarkai-lab/           # 光影方舟实验室
    └── src/
        ├── pages/          # 页面文件
        ├── styles/         # 样式文件
        ├── scripts/        # 脚本文件
        └── assets/         # 静态资源
```

### 核心文件
- `scripts/start-refactored-fixed.py` - 项目启动脚本
- `RESTRUCTURE_LOG.md` - 重构历程记录
- `PROJECT_ARCHITECTURE.md` - 详细架构说明
- `README.md` - 项目总览

## 🛠️ 常用操作

### 添加新页面
```bash
# 1. 创建页面目录
mkdir -p frontend/yishuos-main/src/pages/new-page

# 2. 创建页面文件
touch frontend/yishuos-main/src/pages/new-page/index.html

# 3. 在启动脚本中添加路径映射
# 编辑 scripts/start-refactored-fixed.py
```

### 修改样式
```bash
# 1. 编辑CSS文件
vim frontend/yishuos-main/src/styles/pages/home.css

# 2. 或者在HTML中直接修改
vim frontend/yishuos-main/src/pages/home/index.html
```

### 添加功能
```bash
# 1. 编辑JavaScript文件
vim frontend/yishuos-main/src/scripts/pages/home.js

# 2. 或者在HTML中直接添加
vim frontend/yishuos-main/src/pages/home/index.html
```

## 🐛 常见问题解决

### 问题1：端口被占用
```bash
# 查看端口占用
lsof -ti:8000

# 杀死占用进程
kill -9 $(lsof -ti:8000)

# 或者使用其他端口
PORT=3000 python3 scripts/start-refactored-fixed.py
```

### 问题2：图片不显示
```bash
# 检查图片路径是否为绝对路径
# 正确: /assets/images/logo.png
# 错误: ../../assets/images/logo.png

# 检查图片文件是否存在
ls -la frontend/yishuos-main/src/assets/images/
```

### 问题3：页面404错误
```bash
# 检查访问路径是否正确
# 检查文件名是否为 index.html
# 检查启动脚本的路径映射
```

### 问题4：样式异常
```bash
# 检查CSS文件路径
# 检查CSS语法是否正确
# 检查样式优先级
```

## 📚 学习资源

### 文档阅读顺序
1. **README.md** - 项目总览和快速开始
2. **QUICK_START.md** - 本快速开始指南
3. **PROJECT_ARCHITECTURE.md** - 详细架构说明
4. **RESTRUCTURE_LOG.md** - 重构历程和问题解决

### 代码学习路径
1. **HTML结构** - 学习页面布局和组件结构
2. **CSS样式** - 学习样式设计和响应式布局
3. **JavaScript功能** - 学习交互逻辑和数据处理
4. **服务配置** - 学习服务器配置和路径映射

## 🔄 开发工作流

### 日常开发流程
```bash
# 1. 启动开发服务器
python3 scripts/start-refactored-fixed.py

# 2. 修改代码
vim frontend/yishuos-main/src/pages/home/index.html

# 3. 刷新浏览器查看效果
# 4. 提交代码
git add .
git commit -m "feat: 添加新功能"
git push origin feature/your-feature-name
```

### 代码审查要点
- ✅ 路径引用是否正确
- ✅ 样式是否响应式
- ✅ 功能是否完整
- ✅ 代码是否规范
- ✅ 文档是否更新

## 🎉 恭喜！

你已经成功启动了易术科技项目！现在可以：

1. **浏览网站** - 体验所有功能模块
2. **修改代码** - 根据需求调整页面和功能
3. **添加功能** - 开发新的业务功能
4. **学习架构** - 深入了解项目架构设计

## 📞 需要帮助？

- 📖 **查看文档**: 项目根目录下的各种.md文件
- 🔍 **搜索问题**: 在RESTRUCTURE_LOG.md中查找类似问题
- 🐛 **报告问题**: 记录问题并提交Issue
- 💬 **团队支持**: 联系易术科技开发团队

---

**快速开始完成时间**: 5-10分钟  
**下一步建议**: 阅读 PROJECT_ARCHITECTURE.md 了解详细架构  
**开发状态**: 准备就绪 🚀 