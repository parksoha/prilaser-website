document.addEventListener('DOMContentLoaded', function() {
    // 인증서 아이템 애니메이션
    const certificateItems = document.querySelectorAll('.certificate-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    certificateItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(item);
    });

    // 부드러운 스크롤
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

    // 푸터 서브메뉴 토글
    const footerSubmenuToggle = document.querySelector('.footer-submenu-toggle');
    const footerSubmenu = document.querySelector('.footer-submenu');
    
    if (footerSubmenuToggle && footerSubmenu) {
        footerSubmenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            footerSubmenu.classList.toggle('active');
            
            if (footerSubmenu.classList.contains('active')) {
                footerSubmenuToggle.textContent = '계열사 사이트 ▼ ';
            } else {
                footerSubmenuToggle.textContent = '계열사 사이트 > ';
            }
        });
    }
});
