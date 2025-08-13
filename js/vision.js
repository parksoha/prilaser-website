// ===== 비전 & 핵심가치 페이지 전용 스크립트 =====

document.addEventListener('DOMContentLoaded', function() {
    
    // 네비게이션 스크롤 효과
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 부드러운 스크롤
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 네비게이션 높이 고려
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 핵심가치 카드 애니메이션
    const valueItems = document.querySelectorAll('.value-item');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    valueItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // 비전 섹션 애니메이션
    const visionContent = document.querySelector('.vision-content');
    const visionText = document.querySelector('.vision-text');
    const visionImage = document.querySelector('.vision-image');
    
    if (visionContent) {
        const visionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (visionText) {
                        visionText.style.opacity = '1';
                        visionText.style.transform = 'translateX(0)';
                    }
                    if (visionImage) {
                        visionImage.style.opacity = '1';
                        visionImage.style.transform = 'translateX(0)';
                    }
                }
            });
        }, { threshold: 0.3 });
        
        visionObserver.observe(visionContent);
        
        // 초기 상태 설정
        if (visionText) {
            visionText.style.opacity = '0';
            visionText.style.transform = 'translateX(-30px)';
            visionText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        if (visionImage) {
            visionImage.style.opacity = '0';
            visionImage.style.transform = 'translateX(30px)';
            visionImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
    }

    // 모바일 메뉴 토글 (필요시)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 푸터 서브메뉴 토글
    const footerSubmenuToggles = document.querySelectorAll('.footer-submenu-toggle');
    
    footerSubmenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('active');
            }
        });
    });

    console.log('비전 & 핵심가치 페이지 스크립트 로드 완료');
});
