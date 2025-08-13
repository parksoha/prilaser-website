document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 요소들
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item');

    // 햄버거 메뉴 토글
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // ARIA 속성 업데이트
            const isExpanded = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
            
            // body 스크롤 방지
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // 모바일 서브메뉴 토글 (768px 이하에서만)
    navItems.forEach(item => {
        const submenu = item.querySelector('.submenu');
        const navLink = item.querySelector('.nav-link');
        
        if (submenu && navLink) {
            navLink.addEventListener('click', (e) => {
                // 모바일에서만 서브메뉴 토글 (768px 이하)
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation(); // 이벤트 전파 중단
                    
                    // 다른 서브메뉴들 닫기
                    navItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherSubmenu = otherItem.querySelector('.submenu');
                            if (otherSubmenu) {
                                otherSubmenu.classList.remove('active');
                            }
                        }
                    });
                    
                    // 현재 서브메뉴 토글 (즉시 표시)
                    const isActive = submenu.classList.contains('active');
                    if (isActive) {
                        submenu.classList.remove('active');
                    } else {
                        submenu.classList.add('active');
                    }
                }
                // PC에서는 기본 동작 유지 (hover로 서브메뉴 표시)
            });

            // 키보드 접근성 개선
            navLink.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (window.innerWidth <= 768) {
                        const isActive = submenu.classList.contains('active');
                        if (isActive) {
                            submenu.classList.remove('active');
                        } else {
                            submenu.classList.add('active');
                        }
                    }
                }
            });
        }
    });

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

    // 윈도우 리사이즈 처리
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // 데스크톱에서 모바일 메뉴 닫기
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // 서브메뉴 초기화
            navItems.forEach(item => {
                const submenu = item.querySelector('.submenu');
                if (submenu) {
                    submenu.classList.remove('active');
                }
            });
        }
    });

    // 푸터 서브메뉴 토글
    const footerSubmenuToggles = document.querySelectorAll('.footer-submenu-toggle');
    
    footerSubmenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('footer-submenu')) {
                submenu.classList.toggle('active');
                console.log('푸터 서브메뉴 토글:', submenu.classList.contains('active'));
            }
        });
    });
});
