// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    initNavbarScroll();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 表单处理
    initContactForm();
    
    // 按钮点击事件
    initButtonEvents();
    
    // 滚动动画
    initScrollAnimations();
    
    // 统计数字动画
    initCounterAnimation();
});

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// 平滑滚动到指定区域
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // 考虑固定导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 联系表单处理
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const data = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                message: this.querySelector('textarea').value
            };
            
            // 验证表单
            if (!validateForm(data)) {
                return;
            }
            
            // 显示提交状态
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '提交中...';
            submitBtn.disabled = true;
            
            // 模拟表单提交
            setTimeout(() => {
                showMessage('感谢您的留言！我们会尽快回复您。', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// 表单验证
function validateForm(data) {
    const errors = [];
    
    if (!data.name.trim()) {
        errors.push('请输入姓名');
    }
    
    if (!data.email.trim()) {
        errors.push('请输入邮箱');
    } else if (!isValidEmail(data.email)) {
        errors.push('请输入有效的邮箱地址');
    }
    
    if (!data.message.trim()) {
        errors.push('请输入留言内容');
    }
    
    if (errors.length > 0) {
        showMessage(errors.join('，'), 'error');
        return false;
    }
    
    return true;
}

// 邮箱格式验证
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 显示消息提示
function showMessage(message, type = 'info') {
    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.innerHTML = `
        <div class="message-content">
            <span class="message-text">${message}</span>
            <button class="message-close">&times;</button>
        </div>
    `;
    
    // 添加样式
    messageEl.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // 添加到页面
    document.body.appendChild(messageEl);
    
    // 显示动画
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // 关闭按钮事件
    const closeBtn = messageEl.querySelector('.message-close');
    closeBtn.addEventListener('click', () => {
        hideMessage(messageEl);
    });
    
    // 自动关闭
    setTimeout(() => {
        hideMessage(messageEl);
    }, 5000);
}

// 隐藏消息
function hideMessage(messageEl) {
    messageEl.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
        }
    }, 300);
}

// 按钮点击事件
function initButtonEvents() {
    // 加入社群按钮
    const joinButtons = document.querySelectorAll('.btn-primary, .btn-join');
    joinButtons.forEach(btn => {
        if (btn.textContent.includes('加入') || btn.textContent.includes('申请')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showJoinModal();
            });
        }
    });
    
    // 了解更多按钮
    const learnMoreBtns = document.querySelectorAll('.btn-secondary');
    learnMoreBtns.forEach(btn => {
        if (btn.textContent.includes('了解更多')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector('#about').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    });
}

// 显示加入社群模态框
function showJoinModal() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'join-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>加入半径十五米社群</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>感谢您对半径十五米的关注！</p>
                    <div class="join-options">
                        <div class="join-option">
                            <h4>微信群</h4>
                            <p>扫描二维码加入官方微信群</p>
                            <div class="qr-placeholder">
                                <span>微信群二维码</span>
                            </div>
                        </div>
                        <div class="join-option">
                            <h4>邮箱申请</h4>
                            <p>发送邮件到 banjing15@yishuos.com</p>
                            <p>请包含：姓名、职业、兴趣方向</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 添加样式
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // 添加到页面
    document.body.appendChild(modal);
    
    // 显示动画
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 100);
    
    // 关闭事件
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => hideModal(modal));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            hideModal(modal);
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function handleEscape(e) {
        if (e.key === 'Escape') {
            hideModal(modal);
            document.removeEventListener('keydown', handleEscape);
        }
    });
}

// 隐藏模态框
function hideModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 需要动画的元素
    const animatedElements = document.querySelectorAll('.topic-card, .activity-item, .value-item, .step');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 统计数字动画
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// 数字动画函数
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    const duration = 2000; // 2秒
    const start = Date.now();
    
    const update = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeProgress);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };
    
    update();
}

// 添加模态框样式
const modalStyles = `
.join-modal .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.join-modal .modal-content {
    background: white;
    border-radius: 16px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.join-modal .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 32px;
    border-bottom: 1px solid #e1e8ed;
}

.join-modal .modal-header h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #2c3e50;
}

.join-modal .modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #7f8c8d;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.3s ease;
}

.join-modal .modal-close:hover {
    background: #f8f9fa;
}

.join-modal .modal-body {
    padding: 32px;
}

.join-modal .modal-body p {
    margin-bottom: 24px;
    color: #7f8c8d;
    font-size: 16px;
}

.join-modal .join-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
}

.join-modal .join-option {
    text-align: center;
    padding: 24px;
    border: 2px solid #e1e8ed;
    border-radius: 12px;
    transition: border-color 0.3s ease;
}

.join-modal .join-option:hover {
    border-color: #ee1d22;
}

.join-modal .join-option h4 {
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
}

.join-modal .join-option p {
    margin-bottom: 16px;
    font-size: 14px;
    color: #7f8c8d;
}

.join-modal .qr-placeholder {
    width: 120px;
    height: 120px;
    margin: 0 auto;
    background: #f8f9fa;
    border: 2px dashed #bdc3c7;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #7f8c8d;
}

@media (max-width: 768px) {
    .join-modal .join-options {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .join-modal .modal-header,
    .join-modal .modal-body {
        padding: 20px;
    }
}
`;

// 添加样式到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet); 