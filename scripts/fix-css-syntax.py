#!/usr/bin/env python3
"""
修复HTML文件中的CSS语法错误
主要修复url()中的单引号问题
"""

import re
from pathlib import Path

def fix_css_syntax():
    """修复CSS语法错误"""
    print("🔧 开始修复CSS语法错误...")
    
    project_root = Path(__file__).parent.parent
    
    # 需要处理的文件
    target_file = project_root / "frontend/lumarkai-lab/src/pages/home/index.html"
    
    if not target_file.exists():
        print(f"❌ 文件不存在: {target_file}")
        return
    
    try:
        with open(target_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # 修复CSS语法错误
        fixes = [
            # 修复url()中的单引号问题
            (r'url\(/assets/images/lumarkai-gallery-bg\.png\'\)', 'url(/assets/images/lumarkai-gallery-bg.png)'),
            (r'url\(/assets/images/lumarkai-gallery-bg\.png\'\)', 'url(/assets/images/lumarkai-gallery-bg.png)'),
            (r'url\(/assets/images/lumarkai-gallery-bg\.png\'\)', 'url(/assets/images/lumarkai-gallery-bg.png)'),
        ]
        
        total_fixes = 0
        for pattern, replacement in fixes:
            matches = len(re.findall(pattern, content))
            if matches > 0:
                content = re.sub(pattern, replacement, content)
                total_fixes += matches
                print(f"  🔄 修复CSS语法: {pattern} → {replacement} ({matches}处)")
        
        # 如果有修改，写回文件
        if content != original_content:
            with open(target_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✅ 已保存修复")
        else:
            print("  ℹ️  没有发现需要修复的CSS语法错误")
            
    except Exception as e:
        print(f"  ❌ 处理文件失败: {e}")
    
    print(f"\n✅ CSS语法修复完成！")

if __name__ == "__main__":
    fix_css_syntax() 