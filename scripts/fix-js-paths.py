#!/usr/bin/env python3
"""
批量修复JavaScript文件中的中文路径问题
将所有相对路径转换为绝对路径
"""

import re
import os
from pathlib import Path

def fix_js_paths():
    """批量修复JavaScript文件中的路径"""
    print("🔧 开始批量修复JavaScript文件中的路径...")
    
    project_root = Path(__file__).parent.parent
    
    # 需要处理的目录
    target_dirs = [
        "frontend/yishuos-main/src/scripts",
        "frontend/lumarkai-lab/src/scripts"
    ]
    
    # 转换规则
    replacements = [
        # 图片路径
        (r'assets/images/', '/assets/images/'),
        (r'\.\./\.\./\.\./\.\./\.\./assets/images/', '/assets/images/'),
        (r'\.\./\.\./\.\./\.\./assets/images/', '/assets/images/'),
        (r'\.\./\.\./\.\./assets/images/', '/assets/images/'),
        (r'\.\./\.\./assets/images/', '/assets/images/'),
        (r'\.\./assets/images/', '/assets/images/'),
        
        # 样式文件
        (r'\.\./\.\./\.\./\.\./\.\./styles/', '/styles/'),
        (r'\.\./\.\./\.\./\.\./styles/', '/styles/'),
        (r'\.\./\.\./\.\./styles/', '/styles/'),
        (r'\.\./\.\./styles/', '/styles/'),
        (r'\.\./styles/', '/styles/'),
        
        # 脚本文件
        (r'\.\./\.\./\.\./\.\./\.\./scripts/', '/scripts/'),
        (r'\.\./\.\./\.\./\.\./scripts/', '/scripts/'),
        (r'\.\./\.\./\.\./scripts/', '/scripts/'),
        (r'\.\./\.\./scripts/', '/scripts/'),
        (r'\.\./scripts/', '/scripts/'),
    ]
    
    total_files = 0
    total_replacements = 0
    
    for target_dir in target_dirs:
        full_dir = project_root / target_dir
        if not full_dir.exists():
            print(f"⚠️  目录不存在: {target_dir}")
            continue
            
        print(f"\n📁 处理目录: {target_dir}")
        
        # 遍历所有JavaScript文件
        for js_file in full_dir.rglob("*.js"):
            total_files += 1
            file_replacements = 0
            
            try:
                with open(js_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                # 应用所有替换规则
                for pattern, replacement in replacements:
                    matches = len(re.findall(pattern, content))
                    if matches > 0:
                        content = re.sub(pattern, replacement, content)
                        file_replacements += matches
                        print(f"  🔄 {js_file.name}: {pattern} → {replacement} ({matches}处)")
                
                # 如果有修改，写回文件
                if content != original_content:
                    with open(js_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                    total_replacements += file_replacements
                    print(f"  ✅ {js_file.name}: 已保存修改")
                    
            except Exception as e:
                print(f"  ❌ 处理文件失败 {js_file.name}: {e}")
    
    print(f"\n✅ 转换完成！")
    print(f"   处理文件数: {total_files}")
    print(f"   总替换数: {total_replacements}")
    print(f"\n💡 现在所有JavaScript中的资源都使用绝对路径")

if __name__ == "__main__":
    fix_js_paths() 