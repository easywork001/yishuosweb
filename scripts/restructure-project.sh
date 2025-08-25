#!/bin/bash

# 易术科技项目结构重构脚本
# 用于将当前混乱的文件结构重构为标准的现代化项目架构

set -e  # 遇到错误时退出

echo "🚀 开始重构易术科技项目结构..."
echo "=================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目根目录
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo "📁 项目根目录: $PROJECT_ROOT"

# 创建新目录结构
create_directory_structure() {
    echo -e "${BLUE}📁 创建新的目录结构...${NC}"
    
    # 前端目录
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/pages/home"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/pages/solutions"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/pages/research"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/pages/support"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/pages/careers"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/pages/eplan"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/pages/contact"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/pages/banjing15"
    
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/components/layout/header"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/components/layout/footer"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/components/layout/navigation"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/components/ui/buttons"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/components/ui/cards"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/components/ui/modals"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/components/ui/forms"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/components/sections/hero"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/components/sections/brand-matrix"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/components/sections/solutions"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/components/sections/about"
    
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/assets/images"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/assets/videos"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/assets/icons"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/assets/fonts"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/assets/images/backgrounds"
    
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/styles/base"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/styles/components"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/styles/layouts"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/styles/pages"
    
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/scripts/utils"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/scripts/components"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/scripts/pages"
    
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/src/data"
    mkdir -p "$PROJECT_ROOT/frontend/yishuos-main/public"
    
    # 光影方舟实验室目录
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/home"
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/gallery"
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/models"
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/creator"
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/plan"
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/support"
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/about"
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/auth"
    
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/src/components"
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/src/assets"
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/src/styles"
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/src/scripts"
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/src/data"
    mkdir -p "$PROJECT_ROOT/frontend/lumarkai-lab/public"
    
    # 共享组件库
    mkdir -p "$PROJECT_ROOT/frontend/shared/components"
    mkdir -p "$PROJECT_ROOT/frontend/shared/styles"
    mkdir -p "$PROJECT_ROOT/frontend/shared/utils"
    
    # 后端目录
    mkdir -p "$PROJECT_ROOT/backend/yishuos-api/src/controllers"
    mkdir -p "$PROJECT_ROOT/backend/yishuos-api/src/models"
    mkdir -p "$PROJECT_ROOT/backend/yishuos-api/src/routes"
    mkdir -p "$PROJECT_ROOT/backend/yishuos-api/src/middleware"
    mkdir -p "$PROJECT_ROOT/backend/yishuos-api/src/services"
    mkdir -p "$PROJECT_ROOT/backend/yishuos-api/src/utils"
    mkdir -p "$PROJECT_ROOT/backend/yishuos-api/src/config"
    
    mkdir -p "$PROJECT_ROOT/backend/lumarkai-api/src/controllers"
    mkdir -p "$PROJECT_ROOT/backend/lumarkai-api/src/models"
    mkdir -p "$PROJECT_ROOT/backend/lumarkai-api/src/routes"
    mkdir -p "$PROJECT_ROOT/backend/lumarkai-api/src/middleware"
    mkdir -p "$PROJECT_ROOT/backend/lumarkai-api/src/services"
    mkdir -p "$PROJECT_ROOT/backend/lumarkai-api/src/utils"
    mkdir -p "$PROJECT_ROOT/backend/lumarkai-api/src/config"
    
    mkdir -p "$PROJECT_ROOT/backend/shared/middleware"
    mkdir -p "$PROJECT_ROOT/backend/shared/utils"
    mkdir -p "$PROJECT_ROOT/backend/shared/validators"
    
    # 其他目录
    mkdir -p "$PROJECT_ROOT/docs/api"
    mkdir -p "$PROJECT_ROOT/docs/deployment"
    mkdir -p "$PROJECT_ROOT/docs/development"
    mkdir -p "$PROJECT_ROOT/docs/user-guide"
    
    mkdir -p "$PROJECT_ROOT/scripts"
    mkdir -p "$PROJECT_ROOT/config"
    mkdir -p "$PROJECT_ROOT/.github/workflows"
    mkdir -p "$PROJECT_ROOT/.github/ISSUE_TEMPLATE"
    
    echo -e "${GREEN}✅ 目录结构创建完成${NC}"
}

# 移动页面文件
move_page_files() {
    echo -e "${BLUE}📄 移动页面文件...${NC}"
    
    # 易术主站页面
    if [ -f "$PROJECT_ROOT/yishuos-main.html" ]; then
        mv "$PROJECT_ROOT/yishuos-main.html" "$PROJECT_ROOT/frontend/yishuos-main/src/pages/home/index.html"
        echo -e "${GREEN}✅ 移动 yishuos-main.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-solutions.html" ]; then
        mv "$PROJECT_ROOT/yishuos-solutions.html" "$PROJECT_ROOT/frontend/yishuos-main/src/pages/solutions/index.html"
        echo -e "${GREEN}✅ 移动 yishuos-solutions.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-research.html" ]; then
        mv "$PROJECT_ROOT/yishuos-research.html" "$PROJECT_ROOT/frontend/yishuos-main/src/pages/research/index.html"
        echo -e "${GREEN}✅ 移动 yishuos-research.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-support.html" ]; then
        mv "$PROJECT_ROOT/yishuos-support.html" "$PROJECT_ROOT/frontend/yishuos-main/src/pages/support/index.html"
        echo -e "${GREEN}✅ 移动 yishuos-support.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-careers.html" ]; then
        mv "$PROJECT_ROOT/yishuos-careers.html" "$PROJECT_ROOT/frontend/yishuos-main/src/pages/careers/index.html"
        echo -e "${GREEN}✅ 移动 yishuos-careers.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-eplan.html" ]; then
        mv "$PROJECT_ROOT/yishuos-eplan.html" "$PROJECT_ROOT/frontend/yishuos-main/src/pages/eplan/index.html"
        echo -e "${GREEN}✅ 移动 yishuos-eplan.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-contact.html" ]; then
        mv "$PROJECT_ROOT/yishuos-contact.html" "$PROJECT_ROOT/frontend/yishuos-main/src/pages/contact/index.html"
        echo -e "${GREEN}✅ 移动 yishuos-contact.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/banjing15-main.html" ]; then
        mv "$PROJECT_ROOT/banjing15-main.html" "$PROJECT_ROOT/frontend/yishuos-main/src/pages/banjing15/index.html"
        echo -e "${GREEN}✅ 移动 banjing15-main.html${NC}"
    fi
    
    # 光影方舟实验室页面
    if [ -f "$PROJECT_ROOT/lumarkai-lab.html" ]; then
        mv "$PROJECT_ROOT/lumarkai-lab.html" "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/home/index.html"
        echo -e "${GREEN}✅ 移动 lumarkai-lab.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/lumarkai-gallery.html" ]; then
        mv "$PROJECT_ROOT/lumarkai-gallery.html" "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/gallery/index.html"
        echo -e "${GREEN}✅ 移动 lumarkai-gallery.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/lumarkai-gallery-detail.html" ]; then
        mv "$PROJECT_ROOT/lumarkai-gallery-detail.html" "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/gallery/detail.html"
        echo -e "${GREEN}✅ 移动 lumarkai-gallery-detail.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/lumarkai-login.html" ]; then
        mv "$PROJECT_ROOT/lumarkai-login.html" "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/auth/login.html"
        echo -e "${GREEN}✅ 移动 lumarkai-login.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/lumarkai-user-dashboard.html" ]; then
        mv "$PROJECT_ROOT/lumarkai-user-dashboard.html" "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/auth/dashboard.html"
        echo -e "${GREEN}✅ 移动 lumarkai-user-dashboard.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/lumarkai-admin.html" ]; then
        mv "$PROJECT_ROOT/lumarkai-admin.html" "$PROJECT_ROOT/frontend/lumarkai-lab/src/pages/auth/admin.html"
        echo -e "${GREEN}✅ 移动 lumarkai-admin.html${NC}"
    fi
    
    # 其他页面
    if [ -f "$PROJECT_ROOT/job-detail.html" ]; then
        mv "$PROJECT_ROOT/job-detail.html" "$PROJECT_ROOT/frontend/yishuos-main/src/pages/careers/job-detail.html"
        echo -e "${GREEN}✅ 移动 job-detail.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-docs.html" ]; then
        mv "$PROJECT_ROOT/yishuos-docs.html" "$PROJECT_ROOT/frontend/yishuos-main/src/pages/docs/index.html"
        echo -e "${GREEN}✅ 移动 yishuos-docs.html${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-contact-form.html" ]; then
        mv "$PROJECT_ROOT/yishuos-contact-form.html" "$PROJECT_ROOT/frontend/yishuos-main/src/pages/contact/form.html"
        echo -e "${GREEN}✅ 移动 yishuos-contact-form.html${NC}"
    fi
    
    echo -e "${GREEN}✅ 页面文件移动完成${NC}"
}

# 移动样式文件
move_style_files() {
    echo -e "${BLUE}🎨 移动样式文件...${NC}"
    
    # 易术主站样式
    if [ -f "$PROJECT_ROOT/yishuos-main.css" ]; then
        mv "$PROJECT_ROOT/yishuos-main.css" "$PROJECT_ROOT/frontend/yishuos-main/src/styles/pages/home.css"
        echo -e "${GREEN}✅ 移动 yishuos-main.css${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-solutions.css" ]; then
        mv "$PROJECT_ROOT/yishuos-solutions.css" "$PROJECT_ROOT/frontend/yishuos-main/src/styles/pages/solutions.css"
        echo -e "${GREEN}✅ 移动 yishuos-solutions.css${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-research.css" ]; then
        mv "$PROJECT_ROOT/yishuos-research.css" "$PROJECT_ROOT/frontend/yishuos-main/src/styles/pages/research.css"
        echo -e "${GREEN}✅ 移动 yishuos-research.css${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-support.css" ]; then
        mv "$PROJECT_ROOT/yishuos-support.css" "$PROJECT_ROOT/frontend/yishuos-main/src/styles/pages/support.css"
        echo -e "${GREEN}✅ 移动 yishuos-support.css${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-eplan.css" ]; then
        mv "$PROJECT_ROOT/yishuos-eplan.css" "$PROJECT_ROOT/frontend/yishuos-main/src/styles/pages/eplan.css"
        echo -e "${GREEN}✅ 移动 yishuos-eplan.css${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/banjing15-main.css" ]; then
        mv "$PROJECT_ROOT/banjing15-main.css" "$PROJECT_ROOT/frontend/yishuos-main/src/styles/pages/banjing15.css"
        echo -e "${GREEN}✅ 移动 banjing15-main.css${NC}"
    fi
    
    # 备份文件
    if [ -f "$PROJECT_ROOT/yishuos-main-minimal.css" ]; then
        mv "$PROJECT_ROOT/yishuos-main-minimal.css" "$PROJECT_ROOT/frontend/yishuos-main/src/styles/pages/home-minimal.css"
        echo -e "${GREEN}✅ 移动 yishuos-main-minimal.css${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-main-backup.html" ]; then
        mv "$PROJECT_ROOT/yishuos-main-backup.html" "$PROJECT_ROOT/frontend/yishuos-main/src/pages/home/backup.html"
        echo -e "${GREEN}✅ 移动 yishuos-main-backup.html${NC}"
    fi
    
    echo -e "${GREEN}✅ 样式文件移动完成${NC}"
}

# 移动脚本文件
move_script_files() {
    echo -e "${BLUE}⚡ 移动脚本文件...${NC}"
    
    # 易术主站脚本
    if [ -f "$PROJECT_ROOT/yishuos-main.js" ]; then
        mv "$PROJECT_ROOT/yishuos-main.js" "$PROJECT_ROOT/frontend/yishuos-main/src/scripts/pages/home.js"
        echo -e "${GREEN}✅ 移动 yishuos-main.js${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-solutions.js" ]; then
        mv "$PROJECT_ROOT/yishuos-solutions.js" "$PROJECT_ROOT/frontend/yishuos-main/src/scripts/pages/solutions.js"
        echo -e "${GREEN}✅ 移动 yishuos-solutions.js${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-research.js" ]; then
        mv "$PROJECT_ROOT/yishuos-research.js" "$PROJECT_ROOT/frontend/yishuos-main/src/scripts/pages/research.js"
        echo -e "${GREEN}✅ 移动 yishuos-research.js${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-support.js" ]; then
        mv "$PROJECT_ROOT/yishuos-support.js" "$PROJECT_ROOT/frontend/yishuos-main/src/scripts/pages/support.js"
        echo -e "${GREEN}✅ 移动 yishuos-support.js${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/yishuos-eplan.js" ]; then
        mv "$PROJECT_ROOT/yishuos-main.js" "$PROJECT_ROOT/frontend/yishuos-main/src/scripts/pages/eplan.js"
        echo -e "${GREEN}✅ 移动 yishuos-eplan.js${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/banjing15-main.js" ]; then
        mv "$PROJECT_ROOT/banjing15-main.js" "$PROJECT_ROOT/frontend/yishuos-main/src/scripts/pages/banjing15.js"
        echo -e "${GREEN}✅ 移动 banjing15-main.js${NC}"
    fi
    
    echo -e "${GREEN}✅ 脚本文件移动完成${NC}"
}

# 移动资源文件
move_asset_files() {
    echo -e "${BLUE}🖼️ 移动资源文件...${NC}"
    
    # 移动assets目录
    if [ -d "$PROJECT_ROOT/assets" ]; then
        mv "$PROJECT_ROOT/assets" "$PROJECT_ROOT/frontend/yishuos-main/src/assets"
        echo -e "${GREEN}✅ 移动 assets 目录${NC}"
    fi
    
    # 移动image-back目录
    if [ -d "$PROJECT_ROOT/image-back" ]; then
        mv "$PROJECT_ROOT/image-back" "$PROJECT_ROOT/frontend/yishuos-main/src/assets/images/backgrounds"
        echo -e "${GREEN}✅ 移动 image-back 目录${NC}"
    fi
    
    echo -e "${GREEN}✅ 资源文件移动完成${NC}"
}

# 移动其他文件
move_other_files() {
    echo -e "${BLUE}📁 移动其他文件...${NC}"
    
    # 移动启动脚本
    if [ -f "$PROJECT_ROOT/start.sh" ]; then
        mv "$PROJECT_ROOT/start.sh" "$PROJECT_ROOT/scripts/start.sh"
        echo -e "${GREEN}✅ 移动 start.sh${NC}"
    fi
    
    if [ -f "$PROJECT_ROOT/start_server.py" ]; then
        mv "$PROJECT_ROOT/start_server.py" "$PROJECT_ROOT/scripts/start_server.py"
        echo -e "${GREEN}✅ 移动 start_server.py${NC}"
    fi
    
    # 移动数据库相关文件
    if [ -d "$PROJECT_ROOT/database" ]; then
        echo -e "${GREEN}✅ database 目录已存在，跳过${NC}"
    fi
    
    # 移动后端相关文件
    if [ -d "$PROJECT_ROOT/backend" ]; then
        echo -e "${GREEN}✅ backend 目录已存在，跳过${NC}"
    fi
    
    # 移动前端相关文件
    if [ -d "$PROJECT_ROOT/frontend" ]; then
        echo -e "${GREEN}✅ frontend 目录已存在，跳过${NC}"
    fi
    
    echo -e "${GREEN}✅ 其他文件移动完成${NC}"
}

# 创建配置文件
create_config_files() {
    echo -e "${BLUE}⚙️ 创建配置文件...${NC}"
    
    # 创建基础样式文件
    cat > "$PROJECT_ROOT/frontend/yishuos-main/src/styles/base/reset.css" << 'EOF'
/* CSS Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

a {
    text-decoration: none;
    color: inherit;
}

img {
    max-width: 100%;
    height: auto;
}
EOF

    cat > "$PROJECT_ROOT/frontend/yishuos-main/src/styles/base/variables.css" << 'EOF'
/* CSS Variables */
:root {
    /* Colors */
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    
    /* Typography */
    --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-size-base: 16px;
    --line-height-base: 1.5;
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 3rem;
    
    /* Breakpoints */
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
}
EOF

    cat > "$PROJECT_ROOT/frontend/yishuos-main/src/styles/base/typography.css" << 'EOF'
/* Typography */
body {
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    color: var(--dark-color);
}

h1, h2, h3, h4, h5, h6 {
    margin-bottom: var(--spacing-md);
    font-weight: 600;
    line-height: 1.2;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }

p {
    margin-bottom: var(--spacing-md);
}
EOF

    # 创建主样式文件
    cat > "$PROJECT_ROOT/frontend/yishuos-main/src/styles/main.css" << 'EOF'
/* Main Styles */
@import './base/reset.css';
@import './base/variables.css';
@import './base/typography.css';
@import './pages/home.css';
@import './pages/solutions.css';
@import './pages/research.css';
@import './pages/support.css';
@import './pages/eplan.css';
@import './pages/banjing15.css';

/* Global Styles */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
}

.section {
    padding: var(--spacing-xl) 0;
}

/* Responsive */
@media (max-width: var(--breakpoint-md)) {
    .container {
        padding: 0 var(--spacing-sm);
    }
    
    .section {
        padding: var(--spacing-lg) 0;
    }
}
EOF

    echo -e "${GREEN}✅ 配置文件创建完成${NC}"
}

# 创建package.json文件
create_package_files() {
    echo -e "${BLUE}📦 创建package.json文件...${NC}"
    
    # 易术主站package.json
    cat > "$PROJECT_ROOT/frontend/yishuos-main/package.json" << 'EOF'
{
  "name": "yishuos-main",
  "version": "1.0.0",
  "description": "易术科技主站前端",
  "main": "index.js",
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix"
  },
  "keywords": ["yishuos", "frontend", "website"],
  "author": "YishuosTech Team",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.0",
    "html-webpack-plugin": "^5.5.0",
    "css-loader": "^6.8.0",
    "style-loader": "^3.3.0",
    "file-loader": "^6.2.0"
  }
}
EOF

    # 光影方舟实验室package.json
    cat > "$PROJECT_ROOT/frontend/lumarkai-lab/package.json" << 'EOF'
{
  "name": "lumarkai-lab",
  "version": "1.0.0",
  "description": "光影方舟实验室前端",
  "main": "index.js",
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix"
  },
  "keywords": ["lumarkai", "frontend", "ai-lab"],
  "author": "YishuosTech Team",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.0",
    "html-webpack-plugin": "^5.5.0",
    "css-loader": "^6.8.0",
    "style-loader": "^3.3.0",
    "file-loader": "^6.2.0"
  }
}
EOF

    # 共享组件库package.json
    cat > "$PROJECT_ROOT/frontend/shared/package.json" << 'EOF'
{
  "name": "yishuos-shared",
  "version": "1.0.0",
  "description": "易术科技共享组件库",
  "main": "index.js",
  "scripts": {
    "build": "webpack --mode production",
    "dev": "webpack --mode development --watch"
  },
  "keywords": ["yishuos", "shared", "components"],
  "author": "YishuosTech Team",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.0"
  }
}
EOF

    echo -e "${GREEN}✅ package.json文件创建完成${NC}"
}

# 创建Webpack配置
create_webpack_config() {
    echo -e "${BLUE}🔧 创建Webpack配置...${NC}"
    
    # 易术主站webpack配置
    cat > "$PROJECT_ROOT/frontend/yishuos-main/webpack.config.js" << 'EOF'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    home: './src/scripts/pages/home.js',
    solutions: './src/scripts/pages/solutions.js',
    research: './src/scripts/pages/research.js',
    support: './src/scripts/pages/support.js',
    eplan: './src/scripts/pages/eplan.js',
    banjing15: './src/scripts/pages/banjing15.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/home/index.html',
      filename: 'index.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/solutions/index.html',
      filename: 'solutions.html',
      chunks: ['solutions']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/research/index.html',
      filename: 'research.html',
      chunks: ['research']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/support/index.html',
      filename: 'support.html',
      chunks: ['support']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/eplan/index.html',
      filename: 'eplan.html',
      chunks: ['eplan']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/banjing15/index.html',
      filename: 'banjing15.html',
      chunks: ['banjing15']
    })
  ],
  devServer: {
    static: './dist',
    hot: true,
    port: 3000,
    open: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
EOF

    echo -e "${GREEN}✅ Webpack配置创建完成${NC}"
}

# 创建README文件
create_readme_files() {
    echo -e "${BLUE}📖 创建README文件...${NC}"
    
    # 易术主站README
    cat > "$PROJECT_ROOT/frontend/yishuos-main/README.md" << 'EOF'
# 易术科技主站前端

## 项目简介

易术科技主站前端项目，包含企业官网的所有页面和功能。

## 快速开始

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

## 项目结构

```
src/
├── pages/          # 页面文件
├── components/     # 组件
├── assets/         # 静态资源
├── styles/         # 样式文件
├── scripts/        # JavaScript文件
└── data/           # 静态数据
```

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Webpack 5
- 响应式设计
EOF

    # 光影方舟实验室README
    cat > "$PROJECT_ROOT/frontend/lumarkai-lab/README.md" << 'EOF'
# 光影方舟实验室前端

## 项目简介

光影方舟实验室前端项目，专注于AI技术展示和实验室功能。

## 快速开始

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

## 项目结构

```
src/
├── pages/          # 页面文件
├── components/     # 组件
├── assets/         # 静态资源
├── styles/         # 样式文件
├── scripts/        # JavaScript文件
└── data/           # 静态数据
```

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Webpack 5
- AI技术集成
EOF

    echo -e "${GREEN}✅ README文件创建完成${NC}"
}

# 更新文件引用关系
update_file_references() {
    echo -e "${BLUE}🔗 更新文件引用关系...${NC}"
    
    # 这里可以添加自动更新HTML文件中CSS和JS引用的逻辑
    # 由于文件内容复杂，建议手动检查和更新
    
    echo -e "${YELLOW}⚠️  请手动检查并更新HTML文件中的CSS和JS引用路径${NC}"
    echo -e "${YELLOW}⚠️  建议使用相对路径，如: ./styles/pages/home.css${NC}"
}

# 主函数
main() {
    echo -e "${GREEN}🚀 开始重构易术科技项目结构...${NC}"
    echo "=================================="
    
    # 检查是否在正确的目录
    if [ ! -f "$PROJECT_ROOT/package.json" ]; then
        echo -e "${RED}❌ 错误: 请在项目根目录运行此脚本${NC}"
        exit 1
    fi
    
    # 备份当前状态
    echo -e "${YELLOW}⚠️  建议在运行前备份项目文件${NC}"
    read -p "是否继续? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}操作已取消${NC}"
        exit 0
    fi
    
    # 执行重构步骤
    create_directory_structure
    move_page_files
    move_style_files
    move_script_files
    move_asset_files
    move_other_files
    create_config_files
    create_package_files
    create_webpack_config
    create_readme_files
    update_file_references
    
    echo "=================================="
    echo -e "${GREEN}🎉 项目结构重构完成！${NC}"
    echo ""
    echo -e "${BLUE}📋 下一步操作建议:${NC}"
    echo "1. 检查所有文件是否正确移动"
    echo "2. 更新HTML文件中的资源引用路径"
    echo "3. 安装依赖: cd frontend/yishuos-main && npm install"
    echo "4. 测试构建: npm run build"
    echo "5. 启动开发服务器: npm run dev"
    echo ""
    echo -e "${GREEN}✨ 项目现在具有清晰的结构，便于后续开发和维护！${NC}"
}

# 运行主函数
main "$@" 