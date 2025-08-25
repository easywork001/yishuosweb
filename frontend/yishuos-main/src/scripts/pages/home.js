// 易术科技主页JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面功能
    initPageFunctions();
    
    // 初始化动画效果
    initAnimations();
    
    // 初始化交互功能
    initInteractions();
});

// 页面功能初始化
function initPageFunctions() {
    // 导航栏滚动效果
    initNavbarScroll();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 解决方案切换功能
    initSolutionsToggle();
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 平滑滚动功能
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 解决方案切换功能
function initSolutionsToggle() {
    // 解决方案数据
    const solutionsData = {
        manufacturing: {
            title: '智能制造',
            description: '易术科技智能制造解决方案，助力企业实现业务在云上敏捷开发，边缘可信运行，持续释放潜在业务价值',
            leftImage: '/assets/images/解决方案/首图配图/智能制造配图.png',
            rightImage: '/assets/images/解决方案/首图配图/智慧仓储与物流配图.png'
        },
        logistics: {
            title: '智慧仓储与物流',
            description: '基于AI技术的智慧仓储与物流解决方案，实现仓储自动化、配送智能化、供应链可视化，大幅提升物流效率，降低运营成本',
            leftImage: '/assets/images/解决方案/首图配图/智慧仓储与物流配图.png',
            rightImage: '/assets/images/解决方案/首图配图/智慧金融配图.png'
        },
        finance: {
            title: '普惠金融',
            description: '易术科技普惠金融解决方案，运用AI技术为金融机构提供智能风控、精准营销、客户服务等全方位支持，让金融服务更加普惠、高效',
            leftImage: '/assets/images/解决方案/首图配图/智慧金融配图.png',
            rightImage: '/assets/images/解决方案/首图配图/智慧医疗配图.png'
        },
        healthcare: {
            title: '智慧医疗',
            description: '通过AI技术赋能医疗行业，提供智能诊断、医疗影像分析、药物研发等解决方案，提升医疗服务质量，改善患者就医体验',
            leftImage: '/assets/images/解决方案/首图配图/智慧医疗配图.png',
            rightImage: '/assets/images/解决方案/首图配图/智能教育配图.png'
        },
        education: {
            title: '智能教育',
            description: '易术科技智能教育解决方案，运用AI技术个性化学习路径、智能评估系统、虚拟实验室等，让教育更加智能化、个性化',
            leftImage: '/assets/images/解决方案/首图配图/智慧教育配图.png',
            rightImage: '/assets/images/解决方案/首图配图/智慧园区配图.png'
        },
        park: {
            title: '智慧园区',
            description: '打造智能化园区管理平台，集成安防监控、能源管理、环境监测等功能，实现园区运营的数字化、智能化管理',
            leftImage: '/assets/images/解决方案/首图配图/智慧园区配图.png',
            rightImage: '/assets/images/解决方案/首图配图/智慧政府配图.png'
        },
        government: {
            title: '智慧政府',
            description: '为政府部门提供智能化政务服务解决方案，包括智能审批、数据分析、决策支持等，提升政府服务效率和治理能力',
            leftImage: '/assets/images/解决方案/首图配图/智慧政府配图.png',
            rightImage: '/assets/images/解决方案/首图配图/智能制造配图.png'
        }
    };

    let currentCategory = 'healthcare';

    function updateSolutionsDisplay(category) {
        console.log('更新解决方案显示:', category);
        const data = solutionsData[category];
        if (!data) {
            console.log('未找到数据:', category);
            return;
        }

        // 添加图片切换动画效果
        const featuredContent = document.querySelector('.solutions-featured-content');
        
        // 中间图片轮播动画
        if (featuredContent) {
            console.log('更新背景图片:', data.leftImage);
            featuredContent.style.transform = 'scale(0.8)';
            featuredContent.style.opacity = '0.5';
            
            setTimeout(() => {
                featuredContent.style.backgroundImage = `url('${data.leftImage}')`;
                featuredContent.dataset.category = category;
                featuredContent.style.transform = 'scale(1)';
                featuredContent.style.opacity = '1';
                console.log('图片更新完成');
            }, 200);
        } else {
            console.log('未找到 featuredContent 元素');
        }

        // 更新中间内容
        const title = document.querySelector('.solutions-category-title');
        const description = document.querySelector('.solutions-category-description');
        if (title) title.textContent = data.title;
        if (description) description.textContent = data.description;

        // 更新分类标签状态
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        currentCategory = category;
    }

    // 绑定分类标签点击事件
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            console.log('点击了分类标签:', category);
            updateSolutionsDisplay(category);
        });
    });

    // 绑定左右导航按钮事件
    const prevBtn = document.querySelector('.solutions-prev-btn');
    const nextBtn = document.querySelector('.solutions-next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const categories = Object.keys(solutionsData);
            const currentIndex = categories.indexOf(currentCategory);
            const prevIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1;
            updateSolutionsDisplay(categories[prevIndex]);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const categories = Object.keys(solutionsData);
            const currentIndex = categories.indexOf(currentCategory);
            const nextIndex = currentIndex === categories.length - 1 ? 0 : currentIndex + 1;
            updateSolutionsDisplay(categories[nextIndex]);
        });
    }
}

// 动画效果初始化
function initAnimations() {
    // 观察器配置
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // 创建观察器
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.fade-in, .brand-name, .brand-subtitle, .brand-slogan');
    animatedElements.forEach(el => observer.observe(el));
}

// 交互功能初始化
function initInteractions() {
    // CTA按钮点击效果
    const ctaButtons = document.querySelectorAll('.cta-button, .company-cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 添加点击波纹效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 标签悬停效果
    const tags = document.querySelectorAll('.tag, .company-tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 页面加载完成后的额外初始化
window.addEventListener('load', function() {
    // 预加载关键图片
    preloadImages();
    
    // 初始化性能监控
    initPerformanceMonitoring();
});

// 预加载关键图片
function preloadImages() {
    const criticalImages = [
        '/assets/images/yishuos-logo.svg',
        '/assets/images/易术大楼.jpeg',
        '/assets/images/back44.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// 性能监控
function initPerformanceMonitoring() {
    // 页面加载时间监控
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`页面加载时间: ${loadTime}ms`);
    });
    
    // 资源加载监控
    const resources = performance.getEntriesByType('resource');
    resources.forEach(resource => {
        if (resource.initiatorType === 'img' && resource.duration > 1000) {
            console.warn(`图片加载缓慢: ${resource.name}`);
        }
    });
}

// 响应式导航菜单
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// 语言切换功能
function initLanguageSwitch() {
    const langSwitch = document.querySelector('.lang-switch');
    
    if (langSwitch) {
        langSwitch.addEventListener('click', function() {
            const currentLang = this.textContent;
            const newLang = currentLang === 'EN' ? '中文' : 'EN';
            this.textContent = newLang;
            
            // 这里可以添加实际的语言切换逻辑
            console.log(`切换到语言: ${newLang}`);
        });
    }
}

// 初始化移动端功能
if (window.innerWidth <= 768) {
    initMobileMenu();
}

// 初始化语言切换
initLanguageSwitch();

// 导出函数供其他模块使用
window.YishuosMain = {
    initPageFunctions,
    initAnimations,
    initInteractions,
    initMobileMenu,
    initLanguageSwitch
}; 