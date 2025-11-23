// script.js - CompraSmart - Funcionalidades Avançadas

class CompraSmartApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupEventListeners();
        this.setupURLs();
        this.setupIntersectionObserver();
        this.setupCounters();
    }

    // Configuração da navegação
    setupNavigation() {
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.nav-fixed');
            const scrollY = window.scrollY;
            
            // Efeito de blur e sombra na navegação
            if (scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.backdropFilter = 'blur(20px)';
                nav.style.boxShadow = '0 5px 40px rgba(0,0,0,0.15)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.backdropFilter = 'blur(10px)';
                nav.style.boxShadow = '0 2px 30px rgba(0,0,0,0.1)';
            }

            // Atualizar navegação ativa
            this.updateActiveNavigation();
        });
    }

    // Atualizar navegação ativa com efeitos
    updateActiveNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
                
                // Adicionar efeito de pulso no link ativo
                link.style.animation = 'pulseGlow 2s infinite';
            } else {
                link.style.animation = 'none';
            }
        });
    }

    // Scroll suave
    setupSmoothScrolling() {
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
    }

    // Configurar animações
    setupAnimations() {
        // Adicionar classe de animação quando elementos entram na viewport
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        document.querySelectorAll('.benefit-card, .pricing-card, .odoo-feature').forEach(el => {
            observer.observe(el);
        });
    }

    // Configurar observador de interseção para animações mais avançadas
    setupIntersectionObserver() {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animar elementos filhos com delay
                    const children = entry.target.querySelectorAll('.benefit-card, .cta-button');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.1}s`;
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    });
                }
            });
        }, { threshold: 0.2 });

        // Observar todas as seções principais
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s ease';
            sectionObserver.observe(section);
        });
    }

    // Configurar contadores animados
    setupCounters() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        // Observar seção de estatísticas (se existir)
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            counterObserver.observe(statsSection);
        }
    }

    // Animar contadores
    animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 segundos
            const step = target / (duration / 16); // 60 FPS
            
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = this.formatNumber(target);
                    clearInterval(timer);
                } else {
                    counter.textContent = this.formatNumber(Math.floor(current));
                }
            }, 16);
        });
    }

    // Formatar números (ex: 1000 -> 1.000)
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Configurar event listeners
    setupEventListeners() {
        // Efeito hover nos cards de preço
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('featured')) {
                    card.style.transform = 'translateY(0) scale(1)';
                } else {
                    card.style.transform = 'scale(1.05)';
                }
            });
        });

        // Efeito de digitação no título principal
        this.typeWriterEffect();

        // Botão de voltar ao topo
        this.setupBackToTop();

        // Modal para planos
        this.setupPlanModals();
    }

    // Efeito de máquina de escrever
    typeWriterEffect() {
        const titles = document.querySelectorAll('.section-title');
        titles.forEach((title, index) => {
            const originalText = title.textContent;
            title.textContent = '';
            
            // Atrasar o início baseado no índice
            setTimeout(() => {
                let i = 0;
                const typeWriter = () => {
                    if (i < originalText.length) {
                        title.textContent += originalText.charAt(i);
                        i++;
                        setTimeout(typeWriter, 50); // Velocidade da digitação
                    }
                };
                typeWriter();
            }, index * 1000); // Delay entre títulos
        });
    }

    // Botão voltar ao topo
    setupBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '↑';
        backToTop.className = 'back-to-top';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;

        document.body.appendChild(backToTop);

        // Mostrar/ocultar botão
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'translateY(20px)';
            }
        });

        // Scroll para o topo
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Modais para planos
    setupPlanModals() {
        // Criar modal
        const modal = document.createElement('div');
        modal.className = 'plan-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            backdrop-filter: blur(10px);
        `;

        modal.innerHTML = `
            <div class="modal-content" style="
                background: white;
                padding: 3rem;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                position: relative;
            ">
                <button class="close-modal" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--gray);
                ">×</button>
                <h3 style="margin-bottom: 1rem; color: var(--primary);">Escolha seu Plano</h3>
                <p style="margin-bottom: 2rem; color: var(--gray);">Redirecionando para nossa plataforma...</p>
                <div class="loading-spinner" style="
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid var(--primary);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                "></div>
            </div>
        `;

        document.body.appendChild(modal);

        // Adicionar estilos de animação
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes pulseGlow {
                0% { box-shadow: 0 0 5px rgba(255,255,255,0.5); }
                50% { box-shadow: 0 0 20px rgba(255,255,255,0.8); }
                100% { box-shadow: 0 0 5px rgba(255,255,255,0.5); }
            }
        `;
        document.head.appendChild(spinStyle);

        // Event listeners para modais
        document.querySelectorAll('.cta-button, [onclick*="seu-app-react.com"]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPlanModal(button.textContent.trim());
            });
        });

        // Fechar modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Fechar modal clicando fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Mostrar modal de plano
    showPlanModal(planType) {
        const modal = document.querySelector('.plan-modal');
        const modalContent = modal.querySelector('.modal-content h3');
        
        // Personalizar mensagem baseada no tipo de plano
        let message = 'Redirecionando para nossa plataforma...';
        if (planType.includes('consultor')) {
            message = 'Quase lá! Levando você para o cadastro de consultores...';
        } else if (planType.includes('loja')) {
            message = 'Excelente! Preparando o cadastro da sua loja...';
        } else if (planType.includes('atendido')) {
            message = 'Perfeito! Conectando você com nossos especialistas...';
        }

        modal.querySelector('.modal-content p').textContent = message;
        modal.style.display = 'flex';

        // Redirecionar após delay
        setTimeout(() => {
            window.location.href = this.getAppURL() + this.getPlanPath(planType);
        }, 2000);
    }

    // Obter URL da aplicação
    getAppURL() {
        // 🔥 ATUALIZE ESTA URL COM SUA URL REAL EM PRODUÇÃO
        return 'https://seu-app-react.com';
    }

    // Obter caminho baseado no tipo de plano
    getPlanPath(planType) {
        if (planType.includes('consultor')) return '/consultor/cadastro';
        if (planType.includes('loja')) return '/lojista/cadastro';
        if (planType.includes('atendido')) return '/cliente/cadastro';
        return '/';
    }

    // Configurar URLs dinamicamente
    setupURLs() {
        const appURL = this.getAppURL();
        
        // Configurar todos os botões e links
        document.querySelectorAll('[onclick*="seu-app-react.com"]').forEach(element => {
            const originalOnClick = element.getAttribute('onclick');
            if (originalOnClick) {
                element.setAttribute('onclick', originalOnClick.replace('https://seu-app-react.com', appURL));
            }
        });
    }

    // Método para tracking de analytics (exemplo)
    trackEvent(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        
        // Console log para desenvolvimento
        console.log(`Event Tracked: ${category} - ${action} - ${label}`);
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new CompraSmartApp();
    
    // Adicionar estilos CSS dinâmicos
    const dynamicStyles = `
        .back-to-top:hover {
            transform: translateY(-3px) scale(1.1);
            box-shadow: 0 8px 25px rgba(67, 97, 238, 0.4);
        }
        
        .plan-modal .modal-content {
            animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .benefit-card, .pricing-card {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = dynamicStyles;
    document.head.appendChild(styleSheet);
});

// Suporte a service worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
