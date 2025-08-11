// 支持与服务页面交互功能

document.addEventListener('DOMContentLoaded', function() {
    
    // FAQ 交互功能
    initFAQ();
    
    // 表单验证和提交
    initContactForm();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 页面加载动画
    initAnimations();
    
    // 导航栏滚动效果
    initNavbarScroll();
});

// FAQ 折叠展开功能
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // 关闭其他FAQ项
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                }
            });
            
            // 切换当前FAQ项
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// 联系表单处理
function initContactForm() {
    const form = document.getElementById('supportForm');
    if (!form) return;
    
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.querySelector('span').textContent;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // 显示提交状态
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = '提交中...';
        submitBtn.style.opacity = '0.7';
        
        // 获取表单数据
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            serviceType: formData.get('service-type'),
            message: formData.get('message'),
            agreement: formData.get('agreement')
        };
        
        // 验证表单
        const validation = validateForm(data);
        if (!validation.isValid) {
            showMessage(validation.message, 'error');
            resetSubmitButton();
            return;
        }
        
        try {
            // 模拟API调用
            await simulateFormSubmission(data);
            
            // 成功处理
            showMessage('申请提交成功！我们会在24小时内与您联系。', 'success');
            form.reset();
            
        } catch (error) {
            console.error('表单提交错误:', error);
            showMessage('提交失败，请稍后重试或直接拨打400-007-8277联系我们。', 'error');
        } finally {
            resetSubmitButton();
        }
    });
    
    function resetSubmitButton() {
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = originalBtnText;
        submitBtn.style.opacity = '1';
    }
}

// 表单验证
function validateForm(data) {
    // 检查必填字段
    if (!data.name || !data.name.trim()) {
        return { isValid: false, message: '请输入您的姓名' };
    }
    
    if (!data.company || !data.company.trim()) {
        return { isValid: false, message: '请输入公司名称' };
    }
    
    if (!data.email || !data.email.trim()) {
        return { isValid: false, message: '请输入邮箱地址' };
    }
    
    if (!data.phone || !data.phone.trim()) {
        return { isValid: false, message: '请输入手机号' };
    }
    
    if (!data.message || !data.message.trim()) {
        return { isValid: false, message: '请描述您的需求' };
    }
    
    if (!data.agreement) {
        return { isValid: false, message: '请阅读并同意服务条款' };
    }
    
    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return { isValid: false, message: '请输入正确的邮箱格式' };
    }
    
    // 手机号格式验证
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
        return { isValid: false, message: '请输入正确的手机号' };
    }
    
    return { isValid: true };
}

// 模拟表单提交
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 随机成功/失败模拟
            if (Math.random() > 0.1) { // 90% 成功率
                console.log('表单数据:', data);
                resolve('提交成功');
            } else {
                reject(new Error('网络错误'));
            }
        }, 2000);
    });
}

// 显示消息提示
function showMessage(message, type = 'info') {
    // 移除现有消息
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建消息元素
    const messageElement = document.createElement('div');
    messageElement.className = `message-toast message-${type}`;
    messageElement.innerHTML = `
        <div class="message-content">
            <span class="message-icon">${getMessageIcon(type)}</span>
            <span class="message-text">${message}</span>
            <button class="message-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // 添加样式
    Object.assign(messageElement.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '10000',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        minWidth: '300px',
        maxWidth: '500px',
        animation: 'slideInRight 0.3s ease-out'
    });
    
    // 添加到页面
    document.body.appendChild(messageElement);
    
    // 自动移除
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => messageElement.remove(), 300);
        }
    }, 5000);
}

function getMessageIcon(type) {
    switch (type) {
        case 'success': return '';
        case 'error': return '';
        case 'warning': return '';
        default: return '';
    }
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 导航栏高度偏移
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 页面加载动画
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll(
        '.service-card, .channel-card, .feature-item, .faq-item, .section-header'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // 向下滚动时隐藏导航栏，向上滚动时显示
        if (scrollY > lastScrollY && scrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
}

// 电话号码格式化
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    const match = value.match(/^(\d{3})(\d{4})(\d{4})$/);
    
    if (match) {
        input.value = `${match[1]}-${match[2]}-${match[3]}`;
    } else if (value.length > 0) {
        input.value = value;
    }
}

// 为手机号输入框添加格式化
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});

// 添加CSS动画
const styles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .navbar-scrolled {
        background: rgba(255, 255, 255, 0.98) !important;
        backdrop-filter: blur(20px) !important;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
    }
    
    .navbar {
        transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    }
    
    .message-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .message-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
    }
    
    .message-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

// 注入样式
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// 工具函数：复制文本到剪贴板
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        // 兼容性方案
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            textArea.remove();
            return Promise.resolve();
        } catch (error) {
            textArea.remove();
            return Promise.reject(error);
        }
    }
}

// 为联系方式添加复制功能
document.addEventListener('DOMContentLoaded', function() {
    const contactElements = document.querySelectorAll('.channel-contact, .footer-links a[href^="tel"], .footer-links a[href^="mailto"]');
    
    contactElements.forEach(element => {
        if (element.href && (element.href.startsWith('tel:') || element.href.startsWith('mailto:'))) {
            element.addEventListener('click', function(e) {
                if (e.ctrlKey || e.metaKey) { // Ctrl/Cmd + Click 复制
                    e.preventDefault();
                    const text = this.href.replace(/^(tel:|mailto:)/, '');
                    copyToClipboard(text).then(() => {
                        showMessage(`已复制到剪贴板: ${text}`, 'success');
                    }).catch(() => {
                        showMessage('复制失败', 'error');
                    });
                }
            });
            
            // 添加提示
            element.title = 'Ctrl/Cmd + 点击复制';
        }
    });
});

    console.log('易术科技支持与服务页面已加载完成'); 