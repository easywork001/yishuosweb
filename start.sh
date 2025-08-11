#!/bin/bash
# 快速启动本地HTTP服务器

echo "🚀 启动本地HTTP服务器..."
echo "📁 当前目录: $(pwd)"
echo "🌐 服务器地址: http://localhost:8000"
echo "📄 访问页面: http://localhost:8000/lumarkai-lab.html"
echo "⏹️  按 Ctrl+C 停止服务器"
echo "----------------------------------------"

# 使用Python内置的HTTP服务器
python3 -m http.server 8000