// =============================================
// ANIMACIONES Y EFECTOS VISUALES
// =============================================

/**
 * Configuración del Intersection Observer para animaciones de scroll
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todos los elementos con clase fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Efecto parallax sutil para elementos específicos
 */
function initializeParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/**
 * Efectos de hover mejorados para elementos interactivos
 */
function initializeHoverEffects() {
    const interactiveElements = document.querySelectorAll('.menu-item, .schedule-card, .cta-button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (!this.style.transform.includes('translateY')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.style.transform.includes('translateY(-2px)')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

/**
 * Preloader simple para mejorar la experiencia de carga
 */
function initializePreloader() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
}

/**
 * Manejo de imágenes con loading states
 */
function initializeImageHandling() {
    const handleImageLoad = (img) => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            img.style.display = 'none';
            console.warn('Error cargando imagen:', img.src);
        });
    };

    // Inicialización de todas las imágenes
    document.querySelectorAll('img').forEach(handleImageLoad);
}

/**
 * Animaciones específicas para los elementos del menú
 */
function initializeMenuAnimations() {
    // Observar cambios en el contenedor del menú para animar nuevos elementos
    const menuContainer = document.getElementById('menu-items');
    if (menuContainer) {
        const menuObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node.classList.contains('menu-item')) {
                            // Aplicar animación de entrada a nuevos elementos del menú
                            node.style.opacity = '0';
                            node.style.transform = 'translateY(20px)';
                            
                            // Trigger de la animación
                            setTimeout(() => {
                                node.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                                node.style.opacity = '1';
                                node.style.transform = 'translateY(0)';
                            }, 50);
                        }
                    });
                }
            });
        });

        menuObserver.observe(menuContainer, {
            childList: true,
            subtree: false
        });
    }
}

/**
 * Efectos de transición para botones de categoría
 */
function initializeCategoryButtonEffects() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Efecto de ripple al hacer click
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(26, 60, 35, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Crear keyframes para el efecto ripple dinámicamente
 */
function createRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Inicializa todas las animaciones
 */
function initializeAllAnimations() {
    // Crear animaciones CSS dinámicas
    createRippleAnimation();
    
    // Inicializar todas las animaciones y efectos
    initializeScrollAnimations();
    initializeParallaxEffects();
    initializeHoverEffects();
    initializePreloader();
    initializeImageHandling();
    initializeMenuAnimations();
    initializeCategoryButtonEffects();
    
    console.log('✨ Todas las animaciones inicializadas correctamente');
}