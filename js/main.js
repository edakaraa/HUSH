document.addEventListener('DOMContentLoaded', () => {
    // Header ve Footer "components.js" tarafından sonradan yüklendiği için
    // elementlerin DOM'da oluşmasını beklememiz gerekiyor.
    // Bu yüzden 500ms'lik güvenli bir bekleme süresi koyuyoruz.
    
    setTimeout(() => {
        // Elementleri Seç
        const menuTrigger = document.getElementById('mobile-menu-trigger'); // Hamburger butonu
        const mobileMenu = document.getElementById('mobile-menu');         // Yan panel
        const mobileOverlay = document.getElementById('mobile-overlay');   // Karartma perdesi
        const closeBtn = document.getElementById('mobile-menu-close');     // X butonu

        // Eğer tüm elementler başarıyla yüklendiyse kodları çalıştır
        if (menuTrigger && mobileMenu && mobileOverlay && closeBtn) {
            
            // 1. MENÜYÜ AÇ
            menuTrigger.addEventListener('click', () => {
                mobileMenu.classList.add('is-open');       // Menüyü içeri kaydır
                mobileOverlay.classList.add('is-active');  // Perdeyi aç
                document.body.style.overflow = 'hidden';   // Sayfanın arkada kaymasını engelle
            });

            // 2. MENÜYÜ KAPAT (X Butonuna Basınca)
            closeBtn.addEventListener('click', () => {
                closeMenu();
            });

            // 3. MENÜYÜ KAPAT (Dışarıya/Overlay'e Basınca)
            mobileOverlay.addEventListener('click', () => {
                closeMenu();
            });

            // Ortak Kapatma Fonksiyonu
            function closeMenu() {
                mobileMenu.classList.remove('is-open');
                mobileOverlay.classList.remove('is-active');
                document.body.style.overflow = ''; // Sayfa scroll'unu serbest bırak
            }
                        // --- LOGO SHINE EFFECT ---
            const logo = document.getElementById('interactive-logo');
            
            if (logo) {
                logo.addEventListener('mousemove', (e) => {
                    const rect = logo.getBoundingClientRect();
                    const x = e.clientX - rect.left; // Mouse'un logo içindeki X konumu
                    const y = e.clientY - rect.top;  // Mouse'un logo içindeki Y konumu
                    
                    // CSS değişkenlerini güncelle
                    logo.style.setProperty('--x', `${x}px`);
                    logo.style.setProperty('--y', `${y}px`);
                });
            }
            
            console.log("HUSH Mobile Menu Loaded Successfully. 🚀");
            
        } else {
            console.warn("HUSH Menü elementleri bulunamadı. HTML yapısını kontrol et.");
        }
    }, 500); // 500 milisaniye bekle
}
);
/* --- FOOTER YÜKLEME VE YIL AYARI --- */
document.addEventListener("DOMContentLoaded", function() {
    
    // Footer HTML dosyasını çekiyoruz
    fetch("components/footer.html")
        .then(response => {
            if (!response.ok) throw new Error("Footer yüklenemedi!");
            return response.text();
        })
        .then(data => {
            // 1. Footer'ı yerine koy
            const footerPlaceholder = document.getElementById("footer-placeholder");
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
                
                // 2. Yılı otomatik güncelle (Footer yüklendikten SONRA çalışmalı)
                const currentYear = new Date().getFullYear();
                const yearSpan = document.getElementById("copyright-year");
                if (yearSpan) {
                    yearSpan.textContent = currentYear;
                }
            }
        })
        .catch(error => console.error("Footer hatası:", error));

});