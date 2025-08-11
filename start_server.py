#!/usr/bin/env python3
"""
简单的HTTP服务器启动脚本
用于本地开发和测试网站
"""

import http.server
import socketserver
import os
import webbrowser
import time

# 服务器配置
PORT = 8000
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """自定义HTTP请求处理器，添加CORS支持"""
    
    def end_headers(self):
        # 添加CORS头部，允许跨域访问
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()
    
    def log_message(self, format, *args):
        """自定义日志格式"""
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {format % args}")

def start_server():
    """启动HTTP服务器"""
    
    # 确保在正确的目录中
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    print(f"🚀 正在启动HTTP服务器...")
    print(f"📁 工作目录: {os.getcwd()}")
    print(f"🌐 服务器地址: http://{HOST}:{PORT}")
    print(f"📄 主页面: http://{HOST}:{PORT}/lumarkai-lab.html")
    print(f"⏹️  按 Ctrl+C 停止服务器")
    print("-" * 50)
    
    try:
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            # 自动打开浏览器
            webbrowser.open(f'http://{HOST}:{PORT}/lumarkai-lab.html')
            
            # 启动服务器
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 服务器已停止")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ 端口 {PORT} 已被占用，请尝试其他端口")
            print(f"💡 或者终止占用端口的进程: lsof -ti:{PORT} | xargs kill")
        else:
            print(f"❌ 启动服务器时出错: {e}")

if __name__ == "__main__":
    start_server()