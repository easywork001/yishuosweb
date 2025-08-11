// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initSearch();
    initQuickNav();
    initNewsTabs();
    initFilters();
    initScrollEffects();
    initAnimations();
    initBackToTop();
    initDocsNavigation();
});

// 导航栏功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // 监听滚动，高亮当前导航项
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 90;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 搜索功能
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = createSearchResults();
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        if (query.length < 2) {
            hideSearchResults();
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    searchInput.addEventListener('focus', function() {
        if (this.value.trim().length >= 2) {
            showSearchResults();
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            hideSearchResults();
        }
    });
    
    function createSearchResults() {
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        resultsContainer.innerHTML = `
            <div class="search-results-header">
                <span>搜索结果</span>
            </div>
            <div class="search-results-content"></div>
        `;
        
        // 添加样式
        const styles = `
            .search-results {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                z-index: 1001;
                max-height: 400px;
                overflow-y: auto;
                display: none;
            }
            .search-results-header {
                padding: 12px 16px;
                border-bottom: 1px solid var(--border-color);
                font-size: 14px;
                font-weight: 500;
                color: var(--text-secondary);
            }
            .search-result-item {
                padding: 12px 16px;
                border-bottom: 1px solid var(--border-color);
                cursor: pointer;
                transition: background 0.2s ease;
            }
            .search-result-item:hover {
                background: var(--bg-tertiary);
            }
            .search-result-item:last-child {
                border-bottom: none;
            }
            .search-result-title {
                font-weight: 500;
                color: var(--text-primary);
                margin-bottom: 4px;
            }
            .search-result-desc {
                font-size: 13px;
                color: var(--text-secondary);
            }
            .search-result-type {
                display: inline-block;
                padding: 2px 6px;
                background: var(--bg-tertiary);
                color: var(--text-tertiary);
                border-radius: var(--radius-sm);
                font-size: 11px;
                margin-top: 4px;
            }
        `;
        
        if (!document.querySelector('#search-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'search-styles';
            styleEl.textContent = styles;
            document.head.appendChild(styleEl);
        }
        
        document.querySelector('.search-container').appendChild(resultsContainer);
        return resultsContainer;
    }
    
    function performSearch(query) {
        // 模拟搜索数据
        const searchData = [
            { title: '大模型应用落地白皮书', desc: '企业AI转型行动指南', type: '文档', section: 'docs' },
            { title: 'AI模型部署指南', desc: '从模型训练到生产部署的完整流程', type: '文档', section: 'docs' },
            { title: '易术科技完成新一轮融资', desc: '加速AI产业化布局', type: '新闻', section: 'news' },
            { title: '2024年中国AI产业发展报告', desc: '全面分析中国AI产业发展现状', type: '报告', section: 'reports' },
            { title: '深入理解Transformer架构', desc: '从注意力机制到GPT', type: '博客', section: 'blog' }
        ];
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.desc.toLowerCase().includes(query.toLowerCase())
        );
        
        displaySearchResults(results);
    }
    
    function displaySearchResults(results) {
        const content = document.querySelector('.search-results-content');
        
        if (results.length === 0) {
            content.innerHTML = '<div class="search-result-item">未找到相关内容</div>';
        } else {
            content.innerHTML = results.map(result => `
                <div class="search-result-item" onclick="navigateToSection('${result.section}')">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-desc">${result.desc}</div>
                    <span class="search-result-type">${result.type}</span>
                </div>
            `).join('');
        }
        
        showSearchResults();
    }
    
    function showSearchResults() {
        searchResults.style.display = 'block';
    }
    
    function hideSearchResults() {
        searchResults.style.display = 'none';
    }
}

// 快速导航功能
function initQuickNav() {
    const quickNavItems = document.querySelectorAll('.quick-nav-item');
    
    quickNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            const section = document.getElementById(targetSection);
            
            if (section) {
                const offsetTop = section.offsetTop - 90;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 新闻标签切换
function initNewsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前活动状态
            this.classList.add('active');
            
            const targetCategory = this.getAttribute('data-tab');
            
            // 过滤新闻卡片
            newsCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (targetCategory === 'all' || cardCategory === targetCategory) {
                    card.style.display = 'block';
                    // 添加淡入动画
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 筛选器功能
function initFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // 这里可以实现实际的筛选逻辑
            console.log('筛选条件变更:', this.value);
            showMessage('筛选功能开发中...', 'info');
        });
    });
}

// 滚动效果
function initScrollEffects() {
    // 导航栏背景模糊效果
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // 元素进入视口动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll(`
        .quick-nav-item,
        .doc-card,
        .news-card,
        .report-card,
        .blog-post,
        .feature-item
    `);
    
    animatedElements.forEach(el => observer.observe(el));
}

// 初始化动画
function initAnimations() {
    // 统计数字动画
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(num => numberObserver.observe(num));
}

// 数字动画函数
function animateNumber(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    const duration = 2000;
    const start = Date.now();
    
    const update = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // 缓动函数
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeProgress);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };
    
    update();
}

// 返回顶部按钮
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 消息提示功能
function showMessage(message, type = 'info') {
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.innerHTML = `
        <div class="message-content">
            <span class="message-text">${message}</span>
            <button class="message-close">&times;</button>
        </div>
    `;
    
    // 样式
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(messageEl);
    
    // 显示动画
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // 关闭按钮
    const closeBtn = messageEl.querySelector('.message-close');
    closeBtn.addEventListener('click', () => {
        hideMessage(messageEl);
    });
    
    // 自动关闭
    setTimeout(() => {
        hideMessage(messageEl);
    }, 4000);
}

function hideMessage(messageEl) {
    messageEl.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
        }
    }, 300);
}

// 导航到指定区域
function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 90;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // 隐藏搜索结果
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }
}

// 模拟功能按钮事件
document.addEventListener('click', function(e) {
    // 下载按钮
    if (e.target.classList.contains('btn-download') || 
        e.target.classList.contains('download-button')) {
        e.preventDefault();
        showMessage('下载功能开发中...', 'info');
    }
    
    // 预览按钮
    if (e.target.classList.contains('btn-preview')) {
        e.preventDefault();
        showMessage('预览功能开发中...', 'info');
    }
    
    // 加载更多按钮
    if (e.target.classList.contains('btn-load-more')) {
        e.preventDefault();
        loadMoreNews();
    }
});

// 加载更多新闻
function loadMoreNews() {
    const newsGrid = document.querySelector('.news-grid');
    const loadMoreBtn = document.querySelector('.btn-load-more');
    
    // 模拟加载动画
    loadMoreBtn.textContent = '加载中...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        // 这里可以添加更多新闻卡片
        showMessage('没有更多内容了', 'info');
        loadMoreBtn.textContent = '加载更多';
        loadMoreBtn.disabled = false;
    }, 1500);
}

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K 激活搜索
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        searchInput.focus();
        searchInput.select();
    }
    
    // ESC 关闭搜索结果
    if (e.key === 'Escape') {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }
});

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        const animatedElements = document.querySelectorAll('.fade-in-up');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // 页面显示时恢复动画
        const animatedElements = document.querySelectorAll('.fade-in-up');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 性能优化：防抖函数
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// 文档中心导航功能
function initDocsNavigation() {
    const sidebarLinks = document.querySelectorAll('.docs-sidebar a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // 添加当前活动状态
            this.classList.add('active');
            
            // 获取点击的分类
            const linkText = this.textContent.trim();
            showCategoryContent(linkText);
        });
    });
}

// 显示分类内容
function showCategoryContent(category) {
    const contentArea = document.querySelector('.docs-category-content');
    
    // 模拟不同分类的内容
    const categoryData = {
        '产品概述': generateOverviewContent(),
        '大语言模型': generateLLMContent(),
        '计算机视觉': generateCVContent(),
        '数据接入': generateDataContent(),
        '训练环境': generateTrainingContent(),
        '在线推理': generateInferenceContent(),
        '性能监控': generateMonitoringContent(),
        '数据安全': generateSecurityContent(),
        'API概览': generateAPIContent(),
        'SDK下载': generateSDKContent(),
        '金融行业': generateFinanceContent()
    };
    
    const content = categoryData[category] || generateDefaultContent(category);
    
    // 添加动画效果
    contentArea.style.opacity = '0';
    setTimeout(() => {
        contentArea.innerHTML = content;
        contentArea.style.opacity = '1';
        
        // 滚动到顶部
        const docsSection = document.getElementById('docs');
        docsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
}

// 生成概述内容
function generateOverviewContent() {
    return `
        <div class="category-section">
            <h3 class="category-title">产品概述</h3>
            <div class="docs-grid">
                <div class="doc-card featured">
                    <div class="doc-header">
                        <h4>易术AI平台介绍</h4>
                        <span class="doc-tag featured">必读</span>
                    </div>
                    <p>全面了解易术AI平台的核心功能、技术架构和应用场景</p>
                    <div class="doc-meta">
                        <span>2024.12.15</span>
                        <span>20分钟阅读</span>
                        <span>2.1K下载</span>
                    </div>
                </div>
                <div class="doc-card">
                    <h4>快速开始指南</h4>
                    <p>5分钟快速上手，开始您的AI之旅</p>
                    <div class="doc-meta">
                        <span>2024.12.12</span>
                        <span>5分钟阅读</span>
                        <span>1.5K下载</span>
                    </div>
                </div>
                <div class="doc-card">
                    <h4>平台架构说明</h4>
                    <p>深入了解平台的技术架构和设计理念</p>
                    <div class="doc-meta">
                        <span>2024.12.10</span>
                        <span>15分钟阅读</span>
                        <span>987下载</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="category-section">
            <h3 class="category-title">核心特性</h3>
            <div class="service-grid">
                <div class="service-card">
                    <div class="service-icon"></div>
                    <h4>一站式AI平台</h4>
                    <p>从数据处理到模型部署的全链路AI解决方案</p>
                    <div class="service-links">
                        <a href="#">了解更多</a>
                        <a href="#">开始使用</a>
                    </div>
                </div>
                <div class="service-card">
                    <div class="service-icon"></div>
                    <h4>高性能计算</h4>
                    <p>基于GPU集群的高性能AI计算服务</p>
                    <div class="service-links">
                        <a href="#">性能测试</a>
                        <a href="#">定价说明</a>
                    </div>
                </div>
                <div class="service-card">
                    <div class="service-icon"></div>
                    <h4>企业级安全</h4>
                    <p>多重安全保障，保护您的数据和模型安全</p>
                    <div class="service-links">
                        <a href="#">安全认证</a>
                        <a href="#">合规说明</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 生成大语言模型内容
function generateLLMContent() {
    return `
        <div class="category-section">
            <h3 class="category-title">大语言模型服务</h3>
            <div class="service-grid">
                <div class="service-card">
                    <div class="service-icon"></div>
                    <h4>GPT系列模型</h4>
                    <p>支持GPT-3.5、GPT-4等主流大语言模型API</p>
                    <div class="service-links">
                        <a href="#">API文档</a>
                        <a href="#">示例代码</a>
                        <a href="#">定价</a>
                    </div>
                </div>
                <div class="service-card">
                    <div class="service-icon"></div>
                    <h4>垂直领域模型</h4>
                    <p>金融、医疗、法律等领域的专业化语言模型</p>
                    <div class="service-links">
                        <a href="#">模型列表</a>
                        <a href="#">性能对比</a>
                    </div>
                </div>
                <div class="service-card">
                    <div class="service-icon"></div>
                    <h4>模型微调</h4>
                    <p>基于您的数据微调专属的语言模型</p>
                    <div class="service-links">
                        <a href="#">微调指南</a>
                        <a href="#">最佳实践</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="category-section">
            <h3 class="category-title">相关文档</h3>
            <div class="docs-grid">
                <div class="doc-card">
                    <h4>大语言模型API接口文档</h4>
                    <p>详细的API接口说明和参数文档</p>
                    <div class="doc-meta">
                        <span>2024.12.14</span>
                        <span>25分钟阅读</span>
                    </div>
                </div>
                <div class="doc-card">
                    <h4>Prompt工程最佳实践</h4>
                    <p>如何编写高质量的Prompt获得更好的效果</p>
                    <div class="doc-meta">
                        <span>2024.12.12</span>
                        <span>18分钟阅读</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 生成计算机视觉内容
function generateCVContent() {
    return `
        <div class="category-section">
            <h3 class="category-title">计算机视觉服务</h3>
            <div class="service-grid">
                <div class="service-card">
                    <div class="service-icon"></div>
                    <h4>图像识别</h4>
                    <p>通用图像分类、物体检测、场景识别</p>
                    <div class="service-links">
                        <a href="#">API文档</a>
                        <a href="#">在线体验</a>
                    </div>
                </div>
                <div class="service-card">
                    <div class="service-icon"></div>
                    <h4>人脸识别</h4>
                    <p>人脸检测、比对、活体检测等服务</p>
                    <div class="service-links">
                        <a href="#">功能介绍</a>
                        <a href="#">集成指南</a>
                    </div>
                </div>
                <div class="service-card">
                    <div class="service-icon"></div>
                    <h4>图像生成</h4>
                    <p>基于AI的图像生成和编辑服务</p>
                    <div class="service-links">
                        <a href="#">体验Demo</a>
                        <a href="#">使用教程</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 生成默认内容
function generateDefaultContent(category) {
    return `
        <div class="category-section">
            <h3 class="category-title">${category}</h3>
            <div class="service-grid">
                <div class="service-card">
                    <div class="service-icon"></div>
                    <h4>${category}文档</h4>
                    <p>关于${category}的详细文档和使用指南</p>
                    <div class="service-links">
                        <a href="#">查看文档</a>
                        <a href="#">快速开始</a>
                    </div>
                </div>
                <div class="service-card">
                    <div class="service-icon"></div>
                    <h4>最佳实践</h4>
                    <p>${category}的最佳实践案例和经验分享</p>
                    <div class="service-links">
                        <a href="#">案例分析</a>
                        <a href="#">实践指南</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="category-section">
            <h3 class="category-title">最新更新</h3>
            <div class="update-list">
                <div class="update-item">
                    <div class="update-date">2024.12.15</div>
                    <div class="update-content">
                        <h4>${category}功能优化</h4>
                        <p>优化了${category}相关功能的性能和稳定性</p>
                    </div>
                    <div class="update-tag">优化</div>
                </div>
                <div class="update-item">
                    <div class="update-date">2024.12.10</div>
                    <div class="update-content">
                        <h4>新增${category}文档</h4>
                        <p>添加了更详细的${category}使用说明和示例</p>
                    </div>
                    <div class="update-tag">新增</div>
                </div>
            </div>
        </div>
    `;
}

// 其他内容生成函数的简化版本
function generateDataContent() { return generateDefaultContent('数据接入'); }
function generateTrainingContent() { return generateDefaultContent('训练环境'); }
function generateInferenceContent() { return generateDefaultContent('在线推理'); }
function generateMonitoringContent() { return generateDefaultContent('性能监控'); }
function generateSecurityContent() { return generateDefaultContent('数据安全'); }
function generateAPIContent() { return generateDefaultContent('API概览'); }
function generateSDKContent() { return generateDefaultContent('SDK下载'); }
function generateFinanceContent() { return generateDefaultContent('金融行业'); } 