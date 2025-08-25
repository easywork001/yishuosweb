#!/usr/bin/env python3
"""
重构后的项目启动脚本 - URL解码修复版
支持新的项目结构，正确处理中文路径的URL编码
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path
from urllib.parse import urlparse, unquote

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """支持CORS的HTTP请求处理器"""
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def translate_path(self, path):
        """重写路径转换，支持新的项目结构和URL解码"""
        # 解析URL路径
        parsed_path = urlparse(path)
        path = parsed_path.path
        
        # 关键修复：URL解码，解决中文路径问题
        try:
            path = unquote(path)
        except Exception as e:
            print(f"URL解码失败: {e}")
        
        # 获取项目根目录
        project_root = Path(__file__).parent.parent
        
        # 处理根路径，重定向到易术主站主页
        if path == '/' or path == '':
            target_path = project_root / "frontend/yishuos-main/src/pages/home/index.html"
            if target_path.exists():
                return str(target_path)
        
        # 处理易术主站页面
        if path.startswith('/yishuos-main/'):
            # 将 /yishuos-main/ 映射到实际目录
            actual_path = path.replace('/yishuos-main/', 'frontend/yishuos-main/src/pages/')
            target_path = project_root / actual_path
            if target_path.exists():
                return str(target_path)
        
        # 处理易术主站根路径页面（如 /eplan/, /careers/, /solutions/ 等）
        if path.startswith('/') and path.count('/') == 1 and path.endswith('/'):
            # 例如：/eplan/ -> frontend/yishuos-main/src/pages/eplan/index.html
            page_name = path.strip('/')
            target_path = project_root / "frontend/yishuos-main/src/pages" / page_name / "index.html"
            if target_path.exists():
                return str(target_path)
        
        # 处理光影方舟实验室页面
        if path.startswith('/lumarkai-lab/'):
            # 将 /lumarkai-lab/ 映射到实际目录
            actual_path = path.replace('/lumarkai-lab/', 'frontend/lumarkai-lab/src/pages/')
            target_path = project_root / actual_path
            
            # 如果是目录路径，尝试添加 index.html
            if target_path.is_dir():
                index_path = target_path / "index.html"
                if index_path.exists():
                    return str(index_path)
            elif target_path.exists():
                return str(target_path)
        
        # 处理静态资源 - 关键修复：支持相对路径访问
        if path.startswith('/assets/'):
            # 将 /assets/ 映射到易术主站的资源目录
            actual_path = path.replace('/assets/', 'frontend/yishuos-main/src/assets/')
            target_path = project_root / actual_path
            if target_path.exists():
                return str(target_path)
        
        # 处理样式文件
        if path.startswith('/styles/'):
            # 将 /styles/ 映射到易术主站的样式目录
            actual_path = path.replace('/styles/', 'frontend/yishuos-main/src/styles/')
            target_path = project_root / actual_path
            if target_path.exists():
                return str(target_path)
        
        # 处理脚本文件
        if path.startswith('/scripts/'):
            # 将 /scripts/ 映射到易术主站的脚本目录
            actual_path = path.replace('/scripts/', 'frontend/yishuos-main/src/scripts/')
            target_path = project_root / actual_path
            if target_path.exists():
                return str(target_path)
        
        # 处理相对路径的资源访问 - 新增：支持 ../../../assets/ 这样的路径
        if path.startswith('/') and 'assets/' in path:
            # 提取assets/后面的部分
            assets_part = path.split('assets/')[-1] if 'assets/' in path else None
            if assets_part:
                # 直接映射到易术主站的assets目录
                target_path = project_root / "frontend/yishuos-main/src/assets" / assets_part
                if target_path.exists():
                    return str(target_path)
        
        # 默认处理：在项目根目录中查找文件
        target_path = project_root / path.lstrip('/')
        if target_path.exists():
            return str(target_path)
        
        # 如果找不到文件，尝试在易术主站目录中查找
        target_path = project_root / "frontend/yishuos-main/src/pages" / path.lstrip('/')
        if target_path.exists():
            return str(target_path)
        
        # 最后尝试在项目根目录中查找
        return str(project_root / path.lstrip('/'))

def main():
    """主函数"""
    print("🚀 易术科技重构项目启动器 - URL解码修复版")
    print("=" * 50)
    
    # 获取项目根目录
    project_root = Path(__file__).parent.parent
    print(f"📁 项目根目录: {project_root}")
    
    # 检查关键目录是否存在
    key_dirs = [
        "frontend/yishuos-main/src/pages/home",
        "frontend/yishuos-main/src/styles",
        "frontend/yishuos-main/src/scripts",
        "frontend/yishuos-main/src/assets"
    ]
    
    print("\n🔍 检查项目结构...")
    for dir_path in key_dirs:
        full_path = project_root / dir_path
        if full_path.exists():
            print(f"  ✅ {dir_path}")
        else:
            print(f"  ❌ {dir_path} - 目录不存在")
    
    # 设置端口
    PORT = int(os.environ.get("PORT", 8000))
    
    # 切换到项目根目录
    os.chdir(project_root)
    
    print(f"\n🌐 启动HTTP服务器...")
    print(f"   端口: {PORT}")
    print(f"   根目录: {project_root}")
    
    try:
        # 创建服务器
        with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
            print(f"✅ 服务器启动成功！")
            print(f"🌍 访问地址: http://localhost:{PORT}")
            print(f"📱 易术主站: http://localhost:{PORT}/yishuos-main/home/")
            print(f"🎨 光影方舟: http://localhost:{PORT}/lumarkai-lab/home/")
            print("\n💡 提示:")
            print("   - 按 Ctrl+C 停止服务器")
            print("   - 支持CORS跨域请求")
            print("   - 绝对路径资源访问")
            print("   - 自动路径重定向")
            print("   - 修复了URL解码问题")
            
            # 自动打开浏览器
            try:
                webbrowser.open(f'http://localhost:{PORT}')
                print("🌐 已自动打开浏览器")
            except:
                print("⚠️  无法自动打开浏览器，请手动访问")
            
            # 启动服务器
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 服务器已停止")
    except Exception as e:
        print(f"\n❌ 启动失败: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 