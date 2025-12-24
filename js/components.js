// Senior Notu: Gerçek production ortamında bu işlem Server Side Rendering (SSR) 
// veya bir Build Tool (Vite/Webpack) ile yapılır. 
// Ancak belirttiğin yapı için vanilla JS fetch yöntemi en temizidir.

async function loadComponent(id, file) {
    try {
        const response = await fetch(`components/${file}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.text();
        document.getElementById(id).innerHTML = data;
        return Promise.resolve(); // Başarılı yükleme için promise döndür
    } catch (error) {
        console.error(`Error loading component ${file}:`, error);
        return Promise.reject(error);
    }
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener("DOMContentLoaded", () => {
    // 1. Component'leri yükle
    loadComponent("header-placeholder", "header.html");
    loadComponent("footer-placeholder", "footer.html").then(() => {
        // Footer yüklendikten sonra yılı güncelle
        const currentYear = new Date().getFullYear();
        const yearSpan = document.getElementById("copyright-year");
        if (yearSpan) {
            yearSpan.textContent = currentYear;
        }
    });

    // 2. Mobile Menu Logic
    // Mobil Menü Elemanlarını Seç
    // Not: components.js ile yüklendikleri için elementler hemen bulunamayabilir.
    // Bu yüzden "Event Delegation" kullanacağız ya da yüklenmeyi bekleyeceğiz.
    // Ancak şimdilik en basit yöntem olan setTimeout ile yüklenmeyi bekleyelim.
    
    setTimeout(() => {
        const menuTrigger = document.getElementById('mobile-menu-trigger');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileOverlay = document.getElementById('mobile-overlay');
        const closeBtn = document.getElementById('mobile-menu-close');

        if (menuTrigger && mobileMenu && mobileOverlay && closeBtn) {
            
            // Menüyü Aç
            menuTrigger.addEventListener('click', () => {
                mobileMenu.classList.add('is-open');
                mobileOverlay.classList.add('is-active');
                document.body.style.overflow = 'hidden'; // Sayfa kaymasını engelle
            });

            // Menüyü Kapat (Çarpı butonu ile)
            closeBtn.addEventListener('click', () => {
                closeMenu();
            });

            // Menüyü Kapat (Dışarıya/Overlay'e tıklayınca)
            mobileOverlay.addEventListener('click', () => {
                closeMenu();
            });

            function closeMenu() {
                mobileMenu.classList.remove('is-open');
                mobileOverlay.classList.remove('is-active');
                document.body.style.overflow = ''; // Sayfa kaymasını geri aç
            }

            // --- LOGO SHINE EFFECT (Desktop için) ---
            const logo = document.getElementById('interactive-logo');
            
            if (logo) {
                logo.addEventListener('mousemove', (e) => {
                    const rect = logo.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // CSS değişkenlerini güncelle
                    logo.style.setProperty('--x', `${x}px`);
                    logo.style.setProperty('--y', `${y}px`);
                });
            }
        }
    }, 500); // 500ms bekleyip elementleri arar (Header yüklensin diye)
});