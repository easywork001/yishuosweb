#!/bin/bash

# 🚀 易术科技项目一键启动脚本
# 自动检查环境并启动项目服务器

echo "🚀 易术科技项目启动器"
echo "========================"

# 检查是否在项目根目录
if [ ! -f "scripts/start-refactored-fixed.py" ]; then
    echo "❌ 错误：请在项目根目录执行此脚本"
    echo "当前目录: $(pwd)"
    echo "请执行: cd yishuosweb"
    exit 1
fi

echo "✅ 项目目录检查通过"

# 检查Python环境
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误：Python3 未安装"
    echo "请先安装Python3："
    echo "  macOS: brew install python3"
    echo "  Ubuntu: sudo apt install python3"
    echo "  Windows: 下载安装包"
    exit 1
fi

PYTHON_VERSION=$(python3 --version 2>&1)
echo "✅ Python环境: $PYTHON_VERSION"

# 检查Python版本
PYTHON_MAJOR=$(python3 -c "import sys; print(sys.version_info.major)")
PYTHON_MINOR=$(python3 -c "import sys; print(sys.version_info.minor)")

if [ "$PYTHON_MAJOR" -lt 3 ] || ([ "$PYTHON_MAJOR" -eq 3 ] && [ "$PYTHON_MINOR" -lt 7 ]); then
    echo "⚠️  警告：Python版本过低，推荐使用Python 3.7+"
    echo "当前版本: $PYTHON_VERSION"
    echo "是否继续？(y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "启动已取消"
        exit 1
    fi
fi

# 检查关键文件
echo "🔍 检查项目文件..."
if [ ! -d "frontend/yishuos-main/src/assets/images" ]; then
    echo "❌ 错误：资源目录不存在"
    exit 1
fi

if [ ! -d "frontend/lumarkai-lab/src/pages/home" ]; then
    echo "❌ 错误：页面目录不存在"
    exit 1
fi

echo "✅ 项目文件检查通过"

# 检查端口占用
PORT=${PORT:-8000}
echo "🌐 检查端口 $PORT..."

if lsof -i ":$PORT" &> /dev/null; then
    echo "⚠️  端口 $PORT 被占用，正在释放..."
    lsof -ti ":$PORT" | xargs kill -9
    sleep 2
    echo "✅ 端口已释放"
fi

echo "🚀 启动项目服务器..."
echo "端口: $PORT"
echo "项目根目录: $(pwd)"
echo ""
echo "💡 提示："
echo "  - 按 Ctrl+C 停止服务器"
echo "  - 易术主站: http://localhost:$PORT/yishuos-main/home/"
echo "  - 光影方舟: http://localhost:$PORT/lumarkai-lab/home/"
echo ""

# 启动服务器
python3 scripts/start-refactored-fixed.py
