// Solutions Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeroCarousel();
    initCasesSlider();
    initIndustryModal();
    initSolutionCards();
    initScrollAnimations();
    initNavigation();
});

// Hero Carousel functionality
function initHeroCarousel() {
    const carousel = document.getElementById('heroCarousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('#heroCarouselIndicators .indicator');
    const prevBtn = document.getElementById('heroCarouselPrevBtn');
    const nextBtn = document.getElementById('heroCarouselNextBtn');
    
    let currentSlide = 0;
    let isTransitioning = false;
    
    // Auto play interval
    let autoPlayInterval;
    
    function showSlide(index) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        if (slides[index]) {
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
        
        // Reset transition flag after animation
        setTimeout(() => {
            isTransitioning = false;
        }, 1000);
    }
    
    function nextSlide() {
        const next = currentSlide >= slides.length - 1 ? 0 : currentSlide + 1;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = currentSlide <= 0 ? slides.length - 1 : currentSlide - 1;
        showSlide(prev);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }
    
    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetAutoPlay();
        });
    });
    
    // Auto play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // Pause auto play on hover
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Start auto play
    startAutoPlay();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoPlay();
        }
    });
}

// Cases Slider functionality
function initCasesSlider() {
    const caseItems = document.querySelectorAll('.case-item');
    const sliderDots = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevCase');
    const nextBtn = document.getElementById('nextCase');
    
    let currentCase = 0;
    
    // Create dots for slider
    caseItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToCase(index));
        sliderDots.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function showCase(index) {
        // Hide all cases
        caseItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current case
        if (caseItems[index]) {
            caseItems[index].classList.add('active');
            dots[index].classList.add('active');
        }
        
        currentCase = index;
    }
    
    function goToCase(index) {
        showCase(index);
    }
    
    function nextCase() {
        const next = currentCase >= caseItems.length - 1 ? 0 : currentCase + 1;
        showCase(next);
    }
    
    function prevCase() {
        const prev = currentCase <= 0 ? caseItems.length - 1 : currentCase - 1;
        showCase(prev);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextCase);
    if (prevBtn) prevBtn.addEventListener('click', prevCase);
    
    // Auto-play slider
    setInterval(nextCase, 5000);
}

// Industry Modal functionality
function initIndustryModal() {
    const modal = document.getElementById('industryModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    
    // Industry details data
    const industryDetails = {
        finance: {
            title: '金融科技解决方案',
            subtitle: '智能风控、数字化银行、保险科技',
            description: '为金融机构提供全方位的AI智能化解决方案，涵盖风险管理、客户服务、投资决策等核心业务场景。',
            features: [
                {
                    icon: '',
                    title: '智能风控',
                    description: '基于机器学习的实时风险评估和欺诈检测系统'
                },
                {
                    icon: '',
                    title: '客户画像',
                    description: '多维度数据分析构建精准客户画像和行为预测'
                },
                {
                    icon: '',
                    title: '投资分析',
                    description: 'AI驱动的投资组合优化和市场趋势预测'
                },
                {
                    icon: '',
                    title: '智能客服',
                    description: '7×24小时智能客服系统，提升客户服务效率'
                }
            ],
            benefits: [
                '风险识别准确率提升40%',
                '审批效率提升300%',
                '客户满意度提升50%',
                '运营成本降低30%'
            ],
            cases: [
                '某大型银行智能风控系统部署',
                '保险公司AI核保系统建设',
                '证券公司智能投顾平台开发'
            ]
        },
        healthcare: {
            title: '智慧医疗解决方案',
            subtitle: '智能诊断、医疗影像、健康管理',
            description: '运用人工智能技术赋能医疗健康行业，提升医疗服务质量和效率，助力构建智慧医疗生态。',
            features: [
                {
                    icon: '',
                    title: '智能诊断',
                    description: 'AI辅助医生进行疾病诊断，提高诊断准确率'
                },
                {
                    icon: '',
                    title: '影像分析',
                    description: '医疗影像智能识别和分析，快速发现病灶'
                },
                {
                    icon: '',
                    title: '健康监测',
                    description: '个人健康数据监测和预警系统'
                },
                {
                    icon: '',
                    title: '药物研发',
                    description: 'AI加速新药研发和临床试验优化'
                }
            ],
            benefits: [
                '诊断准确率达到95%以上',
                '诊断效率提升60%',
                '医疗资源利用率提升40%',
                '患者满意度显著提高'
            ],
            cases: [
                '三甲医院AI辅助诊断平台',
                '医疗影像智能分析系统',
                '智慧病房管理系统'
            ]
        },
        education: {
            title: '智慧教育解决方案',
            subtitle: '个性化学习、智能教学、教育管理',
            description: '基于AI技术打造个性化教学平台，提供智能教学辅助和学习效果分析，推动教育现代化发展。',
            features: [
                {
                    icon: '',
                    title: '个性化学习',
                    description: '基于学习数据分析提供个性化学习路径'
                },
                {
                    icon: '',
                    title: '智能教学',
                    description: 'AI助教系统，辅助教师进行教学活动'
                },
                {
                    icon: '',
                    title: '成绩分析',
                    description: '学习效果评估和成绩趋势分析'
                },
                {
                    icon: '',
                    title: '校园管理',
                    description: '智慧校园管理和资源优化配置'
                }
            ],
            benefits: [
                '学习效果提升50%',
                '教学效率提升40%',
                '学生满意度达到90%',
                '教师工作负担减轻30%'
            ],
            cases: [
                '知名大学个性化学习平台',
                '中小学智能教学系统',
                '在线教育平台AI升级'
            ]
        },
        government: {
            title: '智慧政务解决方案',
            subtitle: '政务服务、城市管理、公共安全',
            description: '利用AI技术提升政府服务效率，优化城市管理，构建智慧城市和数字政府服务体系。',
            features: [
                {
                    icon: '',
                    title: '政务服务',
                    description: '智能政务服务大厅和在线办事系统'
                },
                {
                    icon: '',
                    title: '城市管理',
                    description: '智慧城市运营管理和资源调度优化'
                },
                {
                    icon: '',
                    title: '公共安全',
                    description: '智能安防和应急响应系统'
                },
                {
                    icon: '',
                    title: '数据分析',
                    description: '政务数据分析和决策支持系统'
                }
            ],
            benefits: [
                '政务服务效率提升70%',
                '市民满意度提升60%',
                '行政成本降低40%',
                '应急响应时间缩短50%'
            ],
            cases: [
                '智慧政务服务平台建设',
                '城市运营管理中心',
                '公共安全监控系统'
            ]
        },
        manufacturing: {
            title: '智能制造解决方案',
            subtitle: '工业4.0、设备监控、质量检测',
            description: '推动制造业数字化转型，实现智能生产、预测性维护和质量管控，提升制造效率和产品质量。',
            features: [
                {
                    icon: '',
                    title: '智能生产',
                    description: '自动化生产线和智能制造执行系统'
                },
                {
                    icon: '',
                    title: '设备监控',
                    description: '工业设备实时监控和预测性维护'
                },
                {
                    icon: '',
                    title: '质量控制',
                    description: 'AI视觉检测和质量管控系统'
                },
                {
                    icon: '',
                    title: '产能优化',
                    description: '生产计划优化和资源配置管理'
                }
            ],
            benefits: [
                '生产效率提升45%',
                '设备故障率降低60%',
                '产品质量合格率达到99.5%',
                '能耗降低25%'
            ],
            cases: [
                '智能工厂数字化改造',
                '设备预测性维护系统',
                '产品质量智能检测平台'
            ]
        },
        retail: {
            title: '智慧零售解决方案',
            subtitle: '精准营销、库存管理、客户分析',
            description: '为零售企业提供全渠道数字化解决方案，实现精准营销、智能库存管理和个性化客户服务。',
            features: [
                {
                    icon: '',
                    title: '精准营销',
                    description: '基于用户行为分析的个性化营销推荐'
                },
                {
                    icon: '',
                    title: '库存优化',
                    description: '智能库存管理和供应链优化'
                },
                {
                    icon: '',
                    title: '客户分析',
                    description: '客户行为分析和生命周期管理'
                },
                {
                    icon: '',
                    title: '智能导购',
                    description: 'AI导购助手和购物体验优化'
                }
            ],
            benefits: [
                '销售额提升35%',
                '库存周转率提升50%',
                '客户转化率提升40%',
                '运营成本降低30%'
            ],
            cases: [
                '大型连锁零售智能化升级',
                '电商平台推荐系统优化',
                '新零售门店数字化改造'
            ]
        }
    };
    
    function openModal(industry) {
        const data = industryDetails[industry];
        if (!data) return;
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>${data.title}</h2>
                <p class="modal-subtitle">${data.subtitle}</p>
                <p class="modal-description">${data.description}</p>
            </div>
            
            <div class="modal-features">
                <h3>核心功能</h3>
                <div class="features-grid">
                    ${data.features.map(feature => `
                        <div class="feature-item">
                            <div class="feature-icon">${feature.icon}</div>
                            <h4>${feature.title}</h4>
                            <p>${feature.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-benefits">
                <h3>核心优势</h3>
                <ul class="benefits-list">
                    ${data.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-cases">
                <h3>典型案例</h3>
                <ul class="cases-list">
                    ${data.cases.map(case_item => `<li>${case_item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-cta">
                <button class="modal-cta-btn primary" onclick="window.location.href='yishuos-contact.html'">
                    立即咨询
                </button>
                <button class="modal-cta-btn secondary" onclick="window.location.href='yishuos-docs.html'">
                    查看更多案例
                </button>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const industry = btn.closest('.solution-card').dataset.industry;
            openModal(industry);
        });
    });
    
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Solution Cards interactions
function initSolutionCards() {
    const solutionCards = document.querySelectorAll('.solution-card');
    
    solutionCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.learn-more-btn')) {
                const industry = card.dataset.industry;
                const modal = document.getElementById('industryModal');
                if (modal) {
                    // Trigger modal opening
                    const learnMoreBtn = card.querySelector('.learn-more-btn');
                    if (learnMoreBtn) {
                        learnMoreBtn.click();
                    }
                }
            }
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Scroll animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.solution-card, .capability-item, .case-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navigation functionality
function initNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background when scrolled
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Add modal styles dynamically
const modalStyles = `
<style>
.modal-header {
    margin-bottom: 2rem;
    text-align: center;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
}

.modal-header h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.modal-subtitle {
    font-size: 1.1rem;
    color: #667eea;
    font-weight: 600;
    margin-bottom: 1rem;
}

.modal-description {
    color: #64748b;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
}

.modal-features {
    margin-bottom: 3rem;
}

.modal-features h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    text-align: center;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.feature-item {
    text-align: center;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.feature-item:hover {
    background: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.feature-item h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.feature-item p {
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.5;
}

.modal-benefits, .modal-cases {
    margin-bottom: 2rem;
}

.modal-benefits h3, .modal-cases h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 1rem;
}

.benefits-list, .cases-list {
    list-style: none;
    padding: 0;
}

.benefits-list li, .cases-list li {
    padding: 0.5rem 0;
    color: #64748b;
    position: relative;
    padding-left: 1.5rem;
}

.benefits-list li:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #00e676;
    font-weight: bold;
}

.cases-list li:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
}

.modal-cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding-top: 2rem;
    border-top: 1px solid #e2e8f0;
}

.modal-cta-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    text-decoration: none;
}

.modal-cta-btn.primary {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
}

.modal-cta-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.modal-cta-btn.secondary {
    background: transparent;
    color: #667eea;
    border-color: #667eea;
}

.modal-cta-btn.secondary:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .features-grid {
        grid-template-columns: 1fr;
    }
    
    .modal-cta {
        flex-direction: column;
        align-items: center;
    }
    
    .modal-cta-btn {
        width: 200px;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles); 