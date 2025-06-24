// =============================================
// menu.js (JavaScript unificado para Index Tevere)
// =============================================

// === 1) DATOS GLOBALES DEL MENÚ DE CARTAS ===
const menuImages = {
    cocteles:        'Carta-Tevere-2025_page-0001.jpg',
    'cocteles-2':    'Carta-Tevere-2025_page-0002.jpg',
    'sin-alcohol':   'Carta-Tevere-2025_page-0003.jpg',
    ginebras:        'Carta-Tevere-2025_page-0004.jpg',
    whisky:          'Carta-Tevere-2025_page-0005.jpg',
    ron:             'Carta-Tevere-2025_page-0005.jpg', // misma página que whisky
    vodka:           'Carta-Tevere-2025_page-0006.jpg',
    licores:         'Carta-Tevere-2025_page-0006.jpg', // misma página que vodka
    chupitos:        'Carta-Tevere-2025_page-0007.jpg',
    shisha:          null
  };
  
  const allMenuPages = [
    { page: 1, category: 'cocteles',    image: 'Carta-Tevere-2025_page-0001.jpg' },
    { page: 2, category: 'cocteles',    image: 'Carta-Tevere-2025_page-0002.jpg' },
    { page: 3, category: 'sin-alcohol', image: 'Carta-Tevere-2025_page-0003.jpg' },
    { page: 4, category: 'ginebras',    image: 'Carta-Tevere-2025_page-0004.jpg' },
    { page: 5, category: 'whisky/ron',  image: 'Carta-Tevere-2025_page-0005.jpg' },
    { page: 6, category: 'vodka/licores', image: 'Carta-Tevere-2025_page-0006.jpg' },
    { page: 7, category: 'chupitos',    image: 'Carta-Tevere-2025_page-0007.jpg' }
  ];
  
  // ==================================================
  // 2) FUNCIONES PARA MOSTRAR EL MENÚ de CARTAS
  // ==================================================
  
  /**
   * Muestra TODAS las páginas (sección “Todas” si existiera).
   * (Actualmente no se usa “todas” porque solo trabajamos con categorías fijas,
   *  pero la dejo aquí en caso de que quieras reactivar “Todas” en el futuro.)
   */
  function showAllMenuPages() {
    const container = document.getElementById('menu-items');
    if (!container) return;
    container.innerHTML = '';
    allMenuPages.forEach((pageInfo, idx) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'menu-page-wrapper';
      const img = document.createElement('img');
      img.className = 'menu-page-image fade-in';
      img.src = 'images/' + pageInfo.image;
      img.alt = `Página ${pageInfo.page}`;
      img.loading = idx > 1 ? 'lazy' : 'eager';
      wrapper.appendChild(img);
      container.appendChild(wrapper);
      // Forzar la clase “show” para animación
      requestAnimationFrame(() => img.classList.add('show'));
    });
  }
  
  /**
   * Muestra solo la página correspondiente a la categoría dada.
   * Si es “cocteles”, inserta la navegación (dos botones) justo encima de la imagen.
   */
  function showMenuImage(category) {
    const container = document.getElementById('menu-items');
    if (!container) return;
    container.innerHTML = '';
  
    const imageName = menuImages[category];
    // Si no hay imagen para esa categoría → “Próximamente”
    if (!imageName) {
      container.innerHTML = `
        <div class="menu-placeholder">
          <div class="placeholder-icon">
            <i data-lucide="image-off" size="64"></i>
          </div>
          <h3>Próximamente</h3>
          <p>La carta de <strong>${category}</strong> estará disponible muy pronto</p>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }
  
    // Creamos el wrapper que contendrá tanto la navegación (si “cocteles”) como la imagen
    const wrapper = document.createElement('div');
    wrapper.className = 'menu-page-wrapper';
    // Para “cocteles”, forzamos flex-column (declarado en CSS .menu-page-wrapper { display: flex; })
    if (category === 'cocteles') {
      wrapper.style.flexDirection = 'column';
    }
  
    // Si es “cocteles”, añadimos NAVEGACIÓN encima de la imagen
    if (category === 'cocteles') {
      const nav = document.createElement('div');
      nav.className = 'menu-navigation';
      nav.innerHTML = `
        <button class="nav-btn active" data-page="1">
          <i data-lucide="file-text" size="16"></i> Cócteles 1
        </button>
        <button class="nav-btn" data-page="2">
          <i data-lucide="file-text" size="16"></i> Cócteles 2
        </button>
      `;
      nav.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const page = btn.dataset.page;
        // Cambiamos la fuente de la imagen según la página
        imgEl.src = 'images/' + menuImages[`cocteles${page === '2' ? '-2' : ''}`];
        nav.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
      wrapper.appendChild(nav);
    }
  
    // Creamos la etiqueta <img> con fade-in
    const imgEl = document.createElement('img');
    imgEl.className = 'menu-page-image fade-in';        
    imgEl.src      = 'images/' + imageName;
    imgEl.alt      = `Carta de ${category}`;
    imgEl.loading  = 'eager';
    wrapper.appendChild(imgEl);
  
    container.appendChild(wrapper);
  
    // Tras añadir al DOM, disparamos animación
    requestAnimationFrame(() => imgEl.classList.add('show'));
  
    // Re-creamos iconos Lucide
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
  
  /**
   * Asigna listeners a los botones .category-btn.
   */
  function setupCategoryButtons() {
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        showMenuImage(category);
      });
    });
  }
  
  /**
   * Inicializa el menú: marca “cocteles” y lo muestra por defecto.
   */
  function initializeMenu() {
    // 1) Remover “active” de todos, luego marcar “cocteles”
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    const coctelesBtn = document.querySelector('[data-category="cocteles"]');
    if (coctelesBtn) coctelesBtn.classList.add('active');
  
    // 2) Mostrar “cocteles” por defecto
    showMenuImage('cocteles');
  
    // 3) Asignar listeners
    setupCategoryButtons();
  }
  
  /**
   * Precarga todas las imágenes del menú para que, al cambiar de categoría,
   * la imagen esté ya en cache.
   */
  function preloadMenuImages() {
    Object.values(menuImages)
      .filter(name => name !== null)
      .forEach(name => {
        const tmp = new Image();
        tmp.src = 'images/' + name;
      });
  }
  
  // ==================================================
  // 3) INICIALIZACIÓN DEL MAPA LEAFLET
  // ==================================================
  
  function initializeMap() {
    const mapEl = document.getElementById('leaflet-map');
    if (!mapEl || typeof L === 'undefined' || mapEl._leaflet_id) {
      // Si no existe el contenedor o Leaflet no cargó o ya está inicializado, salimos.
      return;
    }
  
    const lat = 41.552042, lng = 2.094167;
    const map = L.map('leaflet-map', {
      center: [lat, lng],
      zoom: 16,
      scrollWheelZoom: true
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);
  
    const customIcon = L.divIcon({
      html: `
        <div style="
          background: #1a3c23;
          color: #f8f6f0;
          border-radius: 50% 50% 50% 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transform: rotate(-45deg);
          border: 3px solid #f8f6f0;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        ">
          <span style="transform: rotate(45deg);">🍸</span>
        </div>`,
      className: 'custom-map-marker',
      iconSize:   [40, 40],
      iconAnchor: [20, 40],
      popupAnchor:[0, -40]
    });
  
    L.marker([lat, lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:'Inter',sans-serif;min-width:200px;">
          <h3 style="color:#1a3c23;margin:0 0 10px 0;font-family:'Playfair Display',serif;">
            🍸 Tevere Sabadell
          </h3>
          <p style="margin:5px 0;color:#666;font-size:14px;">
            <strong>Parc Catalunya, Sabadell</strong>
          </p>
          <p style="margin:5px 0;color:#666;font-size:14px;">
            <strong>Teléfono:</strong> +34 601 16 62 57
          </p>
          <hr style="border:none;border-top:1px solid #eee;margin:10px 0;">
          <p style="margin:0;text-align:center;">
            <a href="#carta" style="color:#1a3c23;text-decoration:none;font-weight:500;">
              Ver nuestra carta 🍹
            </a>
          </p>
        </div>
      `).openPopup();
  
    // Después de un pequeño delay, le decimos a Leaflet que recalcule tamaños
    setTimeout(() => map.invalidateSize(), 100);
  }
  
  // ==================================================
  // 4) MENÚ MÓVIL (Hamburguesa)
  // ==================================================
  
  function setupMobileMenu() {
    const hamburger = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    if (!hamburger || !mobileMenu || !overlay) return;
  
    function toggle() {
      mobileMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
  
    hamburger.onclick = e => { e.preventDefault(); e.stopPropagation(); toggle(); };
    overlay.onclick   = e => { e.preventDefault(); toggle(); };
  
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.onclick = () => setTimeout(toggle, 300);
    });
  
    window.addEventListener('resize', () => {
      if (window.innerWidth > 767 && mobileMenu.classList.contains('active')) {
        toggle();
      }
    });
  
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggle();
      }
    });
  }
  
  // ==================================================
  // 5) POPUP SIN LOCALSTORAGE
  // ==================================================
  
  let popupShown = false;
  let popupClosed = false;
  let popupElement = null;
  
  function showPopup() {
    if (popupShown || popupClosed) return;
    popupElement = document.getElementById('tevere-popup');
    if (!popupElement) return;
    popupElement.classList.add('show');
    document.body.style.overflow = 'hidden';
    popupShown = true;
  }
  
  function closePopup() {
    if (!popupElement) return;
    popupElement.classList.remove('show');
    document.body.style.overflow = '';
    popupClosed = true;
  }
  function goToCarta() {
    closePopup();
    setTimeout(() => {
      window.open("https://signup.comeback.es/4d49ef16/21306f59-41c5-41ff-b5fb-47080fb17d7e", "_blank");
    }, 300);
  }  
  
  function setupCartaDetection() {
    if (popupClosed) return;
    let triggered = false;
  
    function checkScroll() {
      if (triggered || popupClosed) return;
      const cartaSection = document.getElementById('carta');
      if (!cartaSection) return;
      const rect = cartaSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.7) {
        triggered = true;
        setTimeout(showPopup, 1000);
        window.removeEventListener('scroll', checkScroll);
      }
    }
  
    window.addEventListener('scroll', checkScroll);
    setTimeout(checkScroll, 2000);
  }
  
  // ==================================================
  // 6) CARRUSEL EN “.history-image-container”
  // ==================================================
  
  function setupHistoryCarousel() {
    const carousel = document.querySelector('.history-image-container .carousel');
    if (!carousel) return;
  
    const slidesContainer = carousel.querySelector('.slides');
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const indicators = Array.from(carousel.querySelectorAll('.indicator'));
  
    let currentIndex = 0;
    const totalSlides = slides.length;
  
    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentIndex = index;
      slidesContainer.style.transform = `translateX(${-100 * currentIndex}%)`;
      indicators.forEach(ind => ind.classList.remove('active'));
      indicators[currentIndex].classList.add('active');
    }
  
    if (prevBtn) {
      prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    }
    indicators.forEach((ind, idx) => {
      ind.addEventListener('click', () => goToSlide(idx));
    });
  
    // Inicializar en la primera
    goToSlide(0);
  }
  
  // ==================================================
  // 7) INICIALIZACIÓN PRINCIPAL
  // ==================================================
  
  document.addEventListener('DOMContentLoaded', () => {
    // 7.1 Menú de cartas
    initializeMenu();
    setTimeout(preloadMenuImages, 1000);
  
    // 7.2 Mapa Leaflet
    initializeMap();
  
    // 7.3 Menú móvil
    setupMobileMenu();
  
    // 7.4 Popup de bienvenida
    setTimeout(setupCartaDetection, 1000);
  
    // 7.5 Iconos Lucide
    setTimeout(() => {
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 100);
  
    // 7.6 Carrusel (Historia)
    setupHistoryCarousel();
  });
  
  // ==================================================
  // 8) FUNCIONES DE UTILIDAD para consola
  // ==================================================
  
  window.testPopup = () => {
    popupClosed = false;
    showPopup();
  };
  
  window.resetPopup = () => {
    popupShown = false;
    popupClosed = false;
  };
  
  window.testAllImages = () => {
    const allImages = [
      ...Object.values(menuImages).filter(n => n !== null),
      ...allMenuPages.map(p => p.image)
    ];
    const unique = Array.from(new Set(allImages));
    unique.forEach(name => {
      const img = new Image();
      img.onload = () => console.log(`✅ ${name} existe`);
      img.onerror = () => console.error(`❌ ${name} NO ENCONTRADA`);
      img.src = 'images/' + name;
    });
  };
  