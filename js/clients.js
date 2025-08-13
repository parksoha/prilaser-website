// ===== 주요 고객사 페이지 JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    
    // 배너 애니메이션 (비전 페이지와 동일)
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        const headerH1 = pageHeader.querySelector('h1');
        const headerP = pageHeader.querySelector('p');
        
        if (headerH1) {
            headerH1.style.opacity = '0';
            headerH1.style.transform = 'translateY(30px)';
            headerH1.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        }
        
        if (headerP) {
            headerP.style.opacity = '0';
            headerP.style.transform = 'translateY(30px)';
            headerP.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        }
        
        // 페이지 로드 후 애니메이션 시작
        setTimeout(() => {
            if (headerH1) {
                headerH1.style.opacity = '1';
                headerH1.style.transform = 'translateY(0)';
            }
            setTimeout(() => {
                if (headerP) {
                    headerP.style.opacity = '1';
                    headerP.style.transform = 'translateY(0)';
                }
            }, 300);
        }, 500);
    }
    
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

    // 고객사 카테고리 애니메이션
    const customerCategories = document.querySelectorAll('.customer-category');
    
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
    
    customerCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(category);
    });

    // 고객사 아이템 호버 효과
    const customerItems = document.querySelectorAll('.customer-item');
    
    customerItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // 모바일 햄버거 메뉴 토글
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            
            // ARIA 속성 업데이트
            const isExpanded = hamburger.classList.contains("active");
            hamburger.setAttribute("aria-expanded", isExpanded);
            hamburger.setAttribute("aria-label", isExpanded ? "메뉴 닫기" : "메뉴 열기");
            
            // 모바일에서 메뉴 열릴 때 스크롤 방지
            if (window.innerWidth <= 768) {
                if (isExpanded) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });

        // 키보드 접근성 개선
        hamburger.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                hamburger.classList.toggle("active");
                navMenu.classList.toggle("active");
                
                // ARIA 속성 업데이트
                const isExpanded = hamburger.classList.contains("active");
                hamburger.setAttribute("aria-expanded", isExpanded);
                hamburger.setAttribute("aria-label", isExpanded ? "메뉴 닫기" : "메뉴 열기");
                
                // 모바일에서 메뉴 열릴 때 스크롤 방지
                if (window.innerWidth <= 768) {
                    if (isExpanded) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }
            }
        });
    }

    // 모바일 서브메뉴 토글 (768px 이하에서만)
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        const submenu = item.querySelector(".submenu");
        const navLink = item.querySelector(".nav-link");
        
        if (submenu && navLink) {
            navLink.addEventListener("click", (e) => {
                // 모바일에서만 서브메뉴 토글 (768px 이하)
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation(); // 이벤트 전파 중단
                    
                    // 다른 서브메뉴들 닫기
                    navItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherSubmenu = otherItem.querySelector(".submenu");
                            if (otherSubmenu) {
                                otherSubmenu.classList.remove("active");
                            }
                        }
                    });
                    
                    // 현재 서브메뉴 토글 (즉시 표시)
                    const isActive = submenu.classList.contains("active");
                    if (isActive) {
                        submenu.classList.remove("active");
                    } else {
                        submenu.classList.add("active");
                    }
                }
                // PC에서는 기본 동작 유지 (hover로 서브메뉴 표시)
            });

            // 키보드 접근성 개선
            navLink.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (window.innerWidth <= 768) {
                        const isActive = submenu.classList.contains("active");
                        if (isActive) {
                            submenu.classList.remove("active");
                        } else {
                            submenu.classList.add("active");
                        }
                    }
                }
            });
        }
    });

    // 서브메뉴 링크 클릭 시 메뉴 닫기 (모바일에서만)
    document.querySelectorAll(".submenu a").forEach(link => {
        link.addEventListener("click", (e) => {
            if (window.innerWidth <= 768) {
                // 서브메뉴 링크 클릭 시 기본 동작 허용 (페이지 이동)
                // 메뉴는 닫지만 하고 preventDefault는 하지 않음
                
                // 햄버거 메뉴 닫기
                if (hamburger && navMenu) {
                    hamburger.classList.remove("active");
                    navMenu.classList.remove("active");
                    // 스크롤 복원
                    document.body.style.overflow = '';
                }
                
                // 모든 서브메뉴 닫기
                navItems.forEach(item => {
                    const submenu = item.querySelector(".submenu");
                    if (submenu) {
                        submenu.classList.remove("active");
                    }
                });
            }
        });
    });

    // 푸터 서브메뉴 토글 기능 (간단한 버전)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('footer-submenu-toggle')) {
            e.preventDefault();
            const submenu = e.target.nextElementSibling;
            if (submenu && submenu.classList.contains('footer-submenu')) {
                submenu.classList.toggle('active');
            }
        }
    });

    console.log('주요 고객사 페이지 JavaScript 초기화 완료');
});
