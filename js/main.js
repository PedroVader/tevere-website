// =============================================
// FUNCIONALIDAD PRINCIPAL - VERDE & CREMA
// =============================================

/**
 * Efecto navbar al hacer scroll
 */
function initializeNavbarEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Smooth scrolling para enlaces de navegación
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * FUNCIÓN ELIMINADA - Ya no crea menús hamburguesa duplicados
 * El menú móvil ya existe en el HTML y se maneja con CSS + JS inline
 */

/**
 * Utilidades para el manejo de errores
 */
function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('Error en la aplicación:', e.error);
    });
    
    // Manejo de errores de promesas no capturadas
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Promesa rechazada no manejada:', e.reason);
        e.preventDefault();
    });
}

/**
 * Funciones de utilidad para debugging
 */
const Utils = {
    // Log mejorado para desarrollo
    log: (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        const emoji = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };
        
        console.log(`${emoji[type]} [${timestamp}] ${message}`);
    },
    
    // Debounce para optimizar eventos de scroll
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle para eventos que necesitan ejecutarse regularmente
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

/**
 * Gestión del estado de la aplicación
 */
const AppState = {
    currentCategory: 'cocteles',
    isMenuOpen: false,
    scrollPosition: 0,
    
    // Actualizar categoría actual
    setCurrentCategory: (category) => {
        AppState.currentCategory = category;
        Utils.log(`Categoría cambiada a: ${category}`, 'info');
    },
    
    // Obtener categoría actual
    getCurrentCategory: () => AppState.currentCategory,
    
    // Gestionar estado del menú móvil
    toggleMobileMenu: () => {
        AppState.isMenuOpen = !AppState.isMenuOpen;
        Utils.log(`Menú móvil: ${AppState.isMenuOpen ? 'abierto' : 'cerrado'}`, 'info');
    }
};

/**
 * Optimización de rendimiento
 */
function initializePerformanceOptimizations() {
    // Lazy loading para imágenes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Throttle para scroll events
    const throttledScrollHandler = Utils.throttle(() => {
        AppState.scrollPosition = window.pageYOffset;
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
}

/**
 * Inicialización de métricas básicas (opcional)
 */
function initializeAnalytics() {
    // Tracking básico de interacciones (sin servicios externos)
    const trackEvent = (eventName, properties = {}) => {
        Utils.log(`Evento: ${eventName}`, 'info');
        // Aquí se podría integrar con Google Analytics, etc.
    };
    
    // Track clicks en botones del menú
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            trackEvent('menu_category_click', {
                category: e.target.dataset.category
            });
        }
        
        if (e.target.classList.contains('cta-button')) {
            trackEvent('cta_click', {
                button: e.target.textContent
            });
        }
    });
}

/**
 * Inicialización principal de la aplicación
 */
function initializeApp() {
    // Verificar que el DOM está completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
        return;
    }
    
    try {        
        // Funcionalidades principales
        initializeNavbarEffects();
        initializeSmoothScrolling();
        // initializeMobileMenu(); ← ELIMINADA - Ya no crea menús duplicados
        initializePerformanceOptimizations();
        
        // Inicializar menú (desde menu.js)
        if (typeof initializeMenu === 'function') {
            initializeMenu();
        }
        
        // Inicializar animaciones (desde animations.js)
        if (typeof initializeAllAnimations === 'function') {
            initializeAllAnimations();
        }
        
        // Funcionalidades opcionales
        initializeAnalytics();
        handleErrors();        
    } catch (error) {
        Utils.log(`Error durante la inicialización: ${error.message}`, 'error');
        console.error(error);
    }
}

/**
 * Manejo de resize de ventana - SIMPLIFICADO
 */
function handleWindowResize() {
    const debouncedResize = Utils.debounce(() => {
    }, 250);
    
    window.addEventListener('resize', debouncedResize);
}

/**
 * API pública para interactuar con la aplicación
 */
window.VerdeCrema = {
    // Métodos públicos
    showCategory: (category) => {
        if (typeof showMenuItems === 'function') {
            showMenuItems(category);
            AppState.setCurrentCategory(category);
        }
    },
    
    getCurrentCategory: () => AppState.getCurrentCategory(),
    
    scrollToSection: (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = element.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Utilidades
    utils: Utils,
    
    // Estado de la aplicación
    state: AppState
};

/**
 * Event listeners globales
 */
function setupGlobalEventListeners() {
    // Manejo de teclas
    document.addEventListener('keydown', (e) => {
        // Navegación con teclado (accesibilidad)
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remover clase de navegación por teclado al usar mouse
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Manejo de focus para accesibilidad
    document.addEventListener('focusin', (e) => {
        if (e.target.matches('.category-btn, .cta-button, .nav-links a')) {
            e.target.classList.add('focused');
        }
    });
    
    document.addEventListener('focusout', (e) => {
        e.target.classList.remove('focused');
    });
}

/**
 * Configuración de Service Worker (para PWA en el futuro)
 */
function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    Utils.log('Service Worker registrado', 'success');
                })
                .catch(error => {
                    Utils.log('Error registrando Service Worker', 'warning');
                });
        });
    }
}

/**
 * Inicialización completa
 */
function bootstrap() {
    // Inicializar aplicación principal
    initializeApp();
    
    // Configurar event listeners globales
    setupGlobalEventListeners();
    
    // Manejar resize de ventana
    handleWindowResize();
    
    // Configurar Service Worker (opcional)
    // setupServiceWorker();
}

// Auto-inicialización cuando el script se carga
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
} else {
    bootstrap();
}

// Exportar para uso en otros scripts si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VerdeCrema: window.VerdeCrema, Utils, AppState };
}