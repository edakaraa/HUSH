// Senior Notu: Gerçek production ortamında bu işlem Server Side Rendering (SSR) 
// veya bir Build Tool (Vite/Webpack) ile yapılır. 
// Ancak belirttiğin yapı için vanilla JS fetch yöntemi en temizidir.

async function loadComponent(id, file) {
    try {
        const response = await fetch(`components/${file}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.text();
        document.getElementById(id).innerHTML = data;
    } catch (error) {
        console.error(`Error loading component ${file}:`, error);
    }
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header-placeholder", "header.html");
    loadComponent("footer-placeholder", "footer.html");
});

// Mobile Menu Logic
document.addEventListener('DOMContentLoaded', () => {
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
        }
    }, 500); // 500ms bekleyip elementleri arar (Header yüklensin diye)
});