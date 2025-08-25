#!/usr/bin/env python3
"""
批量修复所有HTML文件中的相对路径问题
将所有相对路径转换为绝对路径
"""

import re
import os
from pathlib import Path

def fix_all_paths():
    """批量修复所有HTML文件中的相对路径"""
    print("🔧 开始批量修复所有HTML文件中的相对路径...")
    
    project_root = Path(__file__).parent.parent
    
    # 需要处理的目录
    target_dirs = [
        "frontend/yishuos-main/src/pages",
        "frontend/lumarkai-lab/src/pages"
    ]
    
    # 转换规则
    replacements = [
        # 相对路径转绝对路径
        (r'src="\.\./\.\./\.\./\.\./\.\./assets/', 'src="/assets/'),
        (r'src="\.\./\.\./\.\./\.\./assets/', 'src="/assets/'),
        (r'src="\.\./\.\./\.\./assets/', 'src="/assets/'),
        (r'src="\.\./\.\./assets/', 'src="/assets/'),
        (r'src="\.\./assets/', 'src="/assets/'),
        
        (r'href="\.\./\.\./\.\./\.\./\.\./assets/', 'href="/assets/'),
        (r'href="\.\./\.\./\.\./\.\./assets/', 'href="/assets/'),
        (r'href="\.\./\.\./\.\./assets/', 'href="/assets/'),
        (r'href="\.\./\.\./assets/', 'href="/assets/'),
        (r'href="\.\./assets/', 'href="/assets/'),
        
        # 样式文件
        (r'href="\.\./\.\./\.\./\.\./\.\./styles/', 'href="/styles/'),
        (r'href="\.\./\.\./\.\./\.\./styles/', 'href="/styles/'),
        (r'href="\.\./\.\./\.\./styles/', 'href="/styles/'),
        (r'href="\.\./\.\./styles/', 'href="/styles/'),
        (r'href="\.\./styles/', 'href="/styles/'),
        
        # 脚本文件
        (r'src="\.\./\.\./\.\./\.\./\.\./scripts/', 'src="/scripts/'),
        (r'src="\.\./\.\./\.\./\.\./scripts/', 'src="/scripts/'),
        (r'src="\.\./\.\./\.\./scripts/', 'src="/scripts/'),
        (r'src="\.\./\.\./scripts/', 'src="/scripts/'),
        (r'src="\.\./scripts/', 'src="/scripts/'),
        
        # 背景图片
        (r'url\(\.\./\.\./\.\./\.\./\.\./assets/', 'url(/assets/'),
        (r'url\(\.\./\.\./\.\./\.\./assets/', 'url(/assets/'),
        (r'url\(\.\./\.\./\.\./assets/', 'url(/assets/'),
        (r'url\(\.\./\.\./assets/', 'url(/assets/'),
        (r'url\(\.\./assets/', 'url(/assets/'),
        
        # JavaScript中的图片路径
        (r'image: "\.\./\.\./\.\./assets/', 'image: "/assets/'),
        (r'image: "\.\./\.\./\.\./\.\./\.\./assets/', 'image: "/assets/'),
        (r'image: "\.\./\.\./\.\./\.\./\.\./\.\./\.\./assets/', 'image: "/assets/'),
        (r'image: "assets/', 'image: "/assets/'),
        
        # 特殊处理：光影方舟访问易术主站资源
        (r'src="\.\./\.\./\.\./yishuos-main/assets/', 'src="/assets/'),
        (r'src="\.\./\.\./\.\./yishuos-main/styles/', 'src="/styles/'),
        (r'src="\.\./\.\./\.\./yishuos-main/scripts/', 'src="/scripts/'),
        
        # 用户头像等特殊路径
        (r'userAvatar\.src = user\.avatar \|\| \'\.\./\.\./\.\./assets/', 'userAvatar.src = user.avatar || \'/assets/'),
        (r'userAvatar\.src = user\.avatar \|\| \'assets/', 'userAvatar.src = user.avatar || \'/assets/'),
    ]
    
    total_files = 0
    total_replacements = 0
    
    for target_dir in target_dirs:
        full_dir = project_root / target_dir
        if not full_dir.exists():
            print(f"⚠️  目录不存在: {target_dir}")
            continue
            
        print(f"\n📁 处理目录: {target_dir}")
        
        # 遍历所有HTML文件
        for html_file in full_dir.rglob("*.html"):
            total_files += 1
            file_replacements = 0
            
            try:
                with open(html_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                # 应用所有替换规则
                for pattern, replacement in replacements:
                    matches = len(re.findall(pattern, content))
                    if matches > 0:
                        content = re.sub(pattern, replacement, content)
                        file_replacements += matches
                        print(f"  🔄 {html_file.name}: {pattern} → {replacement} ({matches}处)")
                
                # 如果有修改，写回文件
                if content != original_content:
                    with open(html_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                    total_replacements += file_replacements
                    print(f"  ✅ {html_file.name}: 已保存修改")
                    
            except Exception as e:
                print(f"  ❌ 处理文件失败 {html_file.name}: {e}")
    
    print(f"\n✅ 转换完成！")
    print(f"   处理文件数: {total_files}")
    print(f"   总替换数: {total_replacements}")
    print(f"\n💡 现在所有资源都使用绝对路径:")
    print(f"   - 图片: /assets/images/...")
    print(f"   - 样式: /styles/...")
    print(f"   - 脚本: /scripts/...")

if __name__ == "__main__":
    fix_all_paths() 