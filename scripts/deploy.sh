#!/bin/bash

# 🚀 易术科技项目部署脚本
# 使用方法: ./scripts/deploy.sh [环境]

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 配置变量
PROJECT_NAME="yishuosweb"
PROJECT_PATH="/var/www/$PROJECT_NAME"
BACKUP_PATH="/var/www/backups"
NGINX_SERVICE="nginx"

# 检查参数
ENVIRONMENT=${1:-"production"}
log_info "部署环境: $ENVIRONMENT"

# 检查是否以root权限运行
if [[ $EUID -eq 0 ]]; then
   log_error "请不要以root权限运行此脚本"
   exit 1
fi

# 检查项目目录是否存在
if [ ! -d "$PROJECT_PATH" ]; then
    log_error "项目目录不存在: $PROJECT_PATH"
    exit 1
fi

# 创建备份目录
if [ ! -d "$BACKUP_PATH" ]; then
    log_info "创建备份目录: $BACKUP_PATH"
    sudo mkdir -p "$BACKUP_PATH"
fi

# 进入项目目录
cd "$PROJECT_PATH"

# 检查Git仓库状态
if [ ! -d ".git" ]; then
    log_error "当前目录不是Git仓库"
    exit 1
fi

# 获取当前版本信息
CURRENT_COMMIT=$(git rev-parse --short HEAD)
CURRENT_BRANCH=$(git branch --show-current)
log_info "当前版本: $CURRENT_COMMIT (分支: $CURRENT_BRANCH)"

# 备份当前版本
BACKUP_NAME="${PROJECT_NAME}_backup_$(date +%Y%m%d_%H%M%S)"
log_info "创建备份: $BACKUP_NAME"
sudo cp -r "$PROJECT_PATH" "$BACKUP_PATH/$BACKUP_NAME"
log_success "备份完成: $BACKUP_PATH/$BACKUP_NAME"

# 拉取最新代码
log_info "拉取最新代码..."
git fetch origin

# 检查是否有更新
LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse origin/$CURRENT_BRANCH)

if [ "$LOCAL_COMMIT" = "$REMOTE_COMMIT" ]; then
    log_warning "代码已是最新版本，无需更新"
else
    log_info "发现新版本，开始更新..."
    git reset --hard origin/$CURRENT_BRANCH
    
    # 显示更新信息
    NEW_COMMIT=$(git rev-parse --short HEAD)
    log_success "代码更新完成: $CURRENT_COMMIT → $NEW_COMMIT"
fi

# 设置文件权限
log_info "设置文件权限..."
sudo chown -R www-data:www-data "$PROJECT_PATH"
sudo chmod -R 755 "$PROJECT_PATH"

# 检查Nginx配置
log_info "检查Nginx配置..."
if sudo nginx -t; then
    log_success "Nginx配置检查通过"
else
    log_error "Nginx配置检查失败"
    exit 1
fi

# 重启Nginx服务
log_info "重启Nginx服务..."
if sudo systemctl reload nginx; then
    log_success "Nginx服务重启成功"
else
    log_error "Nginx服务重启失败"
    exit 1
fi

# 检查服务状态
log_info "检查服务状态..."
if sudo systemctl is-active --quiet nginx; then
    log_success "Nginx服务运行正常"
else
    log_error "Nginx服务运行异常"
    exit 1
fi

# 清理旧备份（保留最近5个）
log_info "清理旧备份..."
cd "$BACKUP_PATH"
BACKUP_COUNT=$(ls -1 | grep "${PROJECT_NAME}_backup_" | wc -l)
if [ $BACKUP_COUNT -gt 5 ]; then
    OLD_BACKUPS=$(ls -1t | grep "${PROJECT_NAME}_backup_" | tail -n +6)
    for backup in $OLD_BACKUPS; do
        log_info "删除旧备份: $backup"
        sudo rm -rf "$backup"
    done
fi

# 部署完成
log_success "🎉 部署完成！"
log_info "项目路径: $PROJECT_PATH"
log_info "当前版本: $(git rev-parse --short HEAD)"
log_info "部署时间: $(date)"
log_info "备份位置: $BACKUP_PATH/$BACKUP_NAME"

# 显示服务状态
echo ""
log_info "服务状态:"
sudo systemctl status nginx --no-pager -l | head -20

echo ""
log_success "部署脚本执行完成！" 