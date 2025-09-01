@echo off
chcp 65001 >nul
echo 🚀 易术科技项目启动器
echo ========================

REM 检查是否在项目根目录
if not exist "scripts\start-refactored-fixed.py" (
    echo ❌ 错误：请在项目根目录执行此脚本
    echo 当前目录: %cd%
    echo 请执行: cd yishuosweb
    pause
    exit /b 1
)

echo ✅ 项目目录检查通过

REM 检查Python环境
python --version >nul 2>&1
if errorlevel 1 (
    python3 --version >nul 2>&1
    if errorlevel 1 (
        echo ❌ 错误：Python 未安装
        echo 请先安装Python：
        echo   Windows: 下载安装包 https://www.python.org/downloads/
        pause
        exit /b 1
    ) else (
        set PYTHON_CMD=python3
    )
) else (
    set PYTHON_CMD=python
)

echo ✅ Python环境检查通过

REM 检查关键文件
echo 🔍 检查项目文件...
if not exist "frontend\yishuos-main\src\assets\images" (
    echo ❌ 错误：资源目录不存在
    pause
    exit /b 1
)

if not exist "frontend\lumarkai-lab\src\pages\home" (
    echo ❌ 错误：页面目录不存在
    pause
    exit /b 1
)

echo ✅ 项目文件检查通过

REM 检查端口占用
set PORT=8000
echo 🌐 检查端口 %PORT%...

REM 尝试启动服务器
echo 🚀 启动项目服务器...
echo 端口: %PORT%
echo 项目根目录: %cd%
echo.
echo 💡 提示：
echo   - 按 Ctrl+C 停止服务器
echo   - 易术主站: http://localhost:%PORT%/yishuos-main/home/
echo   - 光影方舟: http://localhost:%PORT%/lumarkai-lab/home/
echo.

REM 启动服务器
%PYTHON_CMD% scripts\start-refactored-fixed.py

pause
