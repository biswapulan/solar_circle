// Advanced Solar Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initializeNavigation();
    initializeAnimations();
    initializeCounters();
    initializeScrollEffects();
    initializeTiltEffect();
    initializeCalculator();
    initializeContactForm();
    initializeParallax();
    initializeLazyLoading();
    
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0, 0)';
            }
        });
    });
    
    // Active navigation highlight
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Advanced animations and scroll effects
function initializeAnimations() {
    // Hero particles animation enhancement
    createAdvancedParticles();
    
    // Solar panel animation
    animateSolarPanels();
    
    // Energy flow animation
    animateEnergyFlow();
}

function createAdvancedParticles() {
    const energyFlow = document.querySelector('.energy-flow');
    if (!energyFlow) return;
    
    // Create additional particles
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'px';
        particle.style.top = Math.random() * 100 + 'px';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 3) + 's';
        energyFlow.appendChild(particle);
    }
}

function animateSolarPanels() {
    const panels = document.querySelectorAll('.panel');
    
    panels.forEach((panel, index) => {
        panel.style.animationDelay = (index * 0.3) + 's';
        
        // Add hover effect
        panel.addEventListener('mouseenter', () => {
            panel.style.transform = 'scale(1.1) rotateY(15deg)';
            panel.style.boxShadow = '0 10px 30px rgba(52, 152, 219, 0.7)';
        });
        
        panel.addEventListener('mouseleave', () => {
            panel.style.transform = 'scale(1) rotateY(0deg)';
            panel.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        });
    });
}

function animateEnergyFlow() {
    const particles = document.querySelectorAll('.particle');
    
    setInterval(() => {
        particles.forEach(particle => {
            const randomOpacity = Math.random();
            const randomScale = 0.5 + Math.random() * 1.5;
            particle.style.opacity = randomOpacity;
            particle.style.transform = `scale(${randomScale})`;
        });
    }, 2000);
}

// Counter animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const animateCounters = () => {
        if (animated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (target > 1000000) {
                        counter.textContent = (current / 1000000).toFixed(1) + 'M';
                    } else if (target > 1000) {
                        counter.textContent = (current / 1000).toFixed(0) + 'K';
                    } else {
                        counter.textContent = Math.ceil(current) + '%';
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target > 1000000) {
                        counter.textContent = (target / 1000000).toFixed(1) + 'M';
                    } else if (target > 1000) {
                        counter.textContent = (target / 1000).toFixed(0) + 'K';
                    } else {
                        counter.textContent = target + '%';
                    }
                }
            };
            
            updateCounter();
        });
        
        animated = true;
    };
    
    // Trigger animation when stats section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Scroll effects and fade-in animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for service cards and pricing cards
                if (entry.target.classList.contains('services-grid') || 
                    entry.target.classList.contains('pricing-grid')) {
                    const cards = entry.target.children;
                    Array.from(cards).forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in effect
    const elementsToObserve = [
        '.section-header',
        '.services-grid',
        '.about-content',
        '.pricing-grid',
        '.contact-content'
    ];
    
    elementsToObserve.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });
    
    // Initialize cards with hidden state
    const cards = document.querySelectorAll('.service-card, .pricing-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
}

// 3D Tilt effect for service cards
function initializeTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            element.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Calculator functionality
function initializeCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    const modal = document.getElementById('calculatorModal');
    const closeModal = document.querySelector('.modal-close');
    const calculateSavings = document.getElementById('calculateSavings');
    
    // Open modal
    calculateBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Calculate savings
    calculateSavings.addEventListener('click', () => {
        const monthlyBill = parseFloat(document.getElementById('monthlyBill').value) || 150;
        const homeSize = parseFloat(document.getElementById('homeSize').value) || 2000;
        const roofCondition = document.getElementById('roofCondition').value;
        
        // Advanced calculation logic
        const baseSavingsRate = 0.85; // 85% savings
        const conditionMultiplier = {
            'excellent': 1.0,
            'good': 0.9,
            'fair': 0.75
        };
        
        const sizeMultiplier = Math.min(homeSize / 2000, 2); // Cap at 2x
        const annualBill = monthlyBill * 12;
        const savingsMultiplier = baseSavingsRate * conditionMultiplier[roofCondition] * sizeMultiplier;
        
        const annualSavings = Math.round(annualBill * savingsMultiplier);
        const totalSavings = Math.round(annualSavings * 25);
        const systemSize = Math.round((homeSize / 200) * (monthlyBill / 100));
        
        // Display results with animation
        const resultsDiv = document.getElementById('calcResults');
        resultsDiv.style.display = 'block';
        
        // Animate numbers counting up
        animateValue('annualSavings', 0, annualSavings, 1000, '');
        animateValue('totalSavings', 0, totalSavings, 1500, '');
        animateValue('systemSize', 0, systemSize, 800, 'kW');
        
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    
    // Animate value counting
    function animateValue(id, start, end, duration, prefix = '') {
        const element = document.getElementById(id);
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            if (prefix === '') {
                element.textContent = ' + Math.floor(current).toLocaleString()';
            } else if (prefix === 'kW') {
                element.textContent = Math.floor(current) + ' kW';
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
}

// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !phone || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Reset form labels
            const labels = form.querySelectorAll('label');
            labels.forEach(label => {
                label.style.top = '1rem';
                label.style.fontSize = '1rem';
                label.style.background = 'transparent';
            });
        }, 2000);
    });
    
    // Enhanced form label animation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const label = input.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.top = '-10px';
                label.style.fontSize = '0.8rem';
                label.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                label.style.padding = '0 0.5rem';
                label.style.borderRadius = '4px';
            }
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                const label = input.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.style.top = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.background = 'transparent';
                    label.style.padding = '0';
                }
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax scrolling effect
function initializeParallax() {
    const parallaxElements = [
        { element: '.sun', speed: 0.5 },
        { element: '.solar-panels', speed: 0.3 },
        { element: '.energy-flow', speed: 0.7 }
    ];
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(({ element, speed }) => {
            const el = document.querySelector(element);
            if (el) {
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// Lazy loading for images and content
function initializeLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.dataset.src) {
                    element.src = element.dataset.src;
                    element.removeAttribute('data-src');
                }
                
                if (element.dataset.bg) {
                    element.style.backgroundImage = `url(${element.dataset.bg})`;
                    element.removeAttribute('data-bg');
                }
                
                element.classList.add('loaded');
                lazyObserver.unobserve(element);
            }
        });
    }, { rootMargin: '50px' });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

// Advanced scroll-triggered animations
function initializeAdvancedAnimations() {
    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Morphing background shapes
    createMorphingShapes();
    
    // Advanced cursor effect
    createCustomCursor();
}

function createMorphingShapes() {
    const shapes = document.createElement('div');
    shapes.className = 'morphing-shapes';
    shapes.innerHTML = `
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
    `;
    
    shapes.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(shapes);
    
    // Animate shapes
    const shapeElements = shapes.querySelectorAll('.shape');
    shapeElements.forEach((shape, index) => {
        shape.style.cssText = `
            position: absolute;
            width: ${100 + index * 50}px;
            height: ${100 + index * 50}px;
            background: linear-gradient(45deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1));
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: morphFloat ${8 + index * 2}s ease-in-out infinite alternate;
        `;
    });
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes morphFloat {
            0% { transform: translateY(0px) rotate(0deg); border-radius: 50%; }
            25% { transform: translateY(-20px) rotate(90deg); border-radius: 30% 70% 70% 30%; }
            50% { transform: translateY(0px) rotate(180deg); border-radius: 70% 30% 30% 70%; }
            75% { transform: translateY(-10px) rotate(270deg); border-radius: 40% 60% 60% 40%; }
            100% { transform: translateY(0px) rotate(360deg); border-radius: 50%; }
        }
    `;
    document.head.appendChild(style);
}

function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(79, 172, 254, 0.8);
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: difference;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor]');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'rgba(255, 107, 53, 0.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'rgba(79, 172, 254, 0.8)';
        });
    });
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimer;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        
        scrollTimer = setTimeout(function() {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // ~60fps
    };
    
    // Preload critical images
    const criticalImages = [
        // Add your critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Optimize animations for mobile
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile
        const complexAnimations = document.querySelectorAll('.complex-animation');
        complexAnimations.forEach(element => {
            element.style.animation = 'none';
        });
    }
}

// Initialize advanced features
setTimeout(() => {
    initializeAdvancedAnimations();
    optimizePerformance();
}, 1000);

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        showNotification('🌈 Solar Power Mode Activated! 🌈', 'success');
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        konamiCode = [];
    }
});

// Add loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        ">
            <div style="text-align: center; color: white;">
                <i class="fas fa-solar-panel" style="font-size: 4rem; margin-bottom: 1rem; animation: spin 2s linear infinite;"></i>
                <h2 style="margin: 0;">Loading Solar Experience...</h2>
            </div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyle);