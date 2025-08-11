// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
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
          
          // 현재 서브메뉴 토글
          submenu.classList.toggle("active");
        }
        // PC에서는 기본 동작 유지 (hover로 서브메뉴 표시)
      });

      // 키보드 접근성 개선
      navLink.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (window.innerWidth <= 768) {
            submenu.classList.toggle("active");
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

    // 키보드 접근성 개선
    link.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (window.innerWidth <= 768) {
          // Enter 키로도 페이지 이동 허용
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
      }
    });
  });

  // 네비게이션 링크 클릭 시 메뉴 닫기 (서브메뉴가 없는 링크만)
  document.querySelectorAll(".nav-link").forEach(navLink => {
    navLink.addEventListener("click", (e) => {
      // 서브메뉴가 있는 메뉴는 처리하지 않음
      const parentItem = navLink.closest('.nav-item');
      const hasSubmenu = parentItem && parentItem.querySelector('.submenu');
      
      if (!hasSubmenu && hamburger && navMenu) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        // 스크롤 복원
        if (window.innerWidth <= 768) {
          document.body.style.overflow = '';
        }
      }
    });

    // 키보드 접근성 개선
    navLink.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const parentItem = navLink.closest('.nav-item');
        const hasSubmenu = parentItem && parentItem.querySelector('.submenu');
        
        if (!hasSubmenu && hamburger && navMenu) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          // 스크롤 복원
          if (window.innerWidth <= 768) {
            document.body.style.overflow = '';
          }
        }
      }
    });
  });

  // 부드러운 스크롤 기능
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      // href가 "#"이거나 빈 경우 처리하지 않음
      if (targetId === '#' || targetId === '') {
        return;
      }
      
      const target = document.querySelector(targetId);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });



  // 인트로 애니메이션 처리
  const introTop = document.querySelector('.intro-top');
  const introBottom = document.querySelector('.intro-bottom');
  const introCenterLine = document.querySelector('.intro-center-line');
  const introAnimation = document.querySelector('.intro-animation');

  if (introTop && introBottom && introCenterLine && introAnimation) {
    // 페이지 로드 후 2초 뒤에 위아래 갈라짐 (선 애니메이션 1초 완료 후)
    setTimeout(function() {
      introTop.classList.add('height0');
      introBottom.classList.add('height0');
      introCenterLine.style.opacity = '0'; // 선도 함께 사라지도록
    }, 2000);

    // 페이지 로드 후 3초 뒤에 오버레이를 어둡게 (갈라짐 완료 후)
    setTimeout(function() {
      const bannerOverlay = document.querySelector('.banner-overlay');
      if (bannerOverlay) {
        bannerOverlay.classList.add('dark');
      }
    }, 3000);

    // 애니메이션 완료 후 전체 제거 및 배너 콘텐츠 표시 (2초 + 1초 애니메이션 = 3초 후)
    setTimeout(function() {
      introAnimation.style.opacity = '0';
      introAnimation.style.transition = 'opacity 0.3s ease-out';
      setTimeout(function() {
        introAnimation.remove();
        // 배너 콘텐츠 표시
        const bannerContent = document.querySelector('.banner-content');
        if (bannerContent) {
          bannerContent.classList.add('show');
        }
      }, 300);
    }, 3500);
  }

  // 배너 비디오 자동 재생 보장
  const bannerVideo = document.querySelector('.banner-video');
  if (bannerVideo) {
    // 비디오 로드 후 재생 시도
    bannerVideo.addEventListener('loadeddata', function() {
      bannerVideo.play().catch(function(error) {
        // 자동 재생 실패 시 사용자 상호작용 후 재생
        document.addEventListener('click', function() {
          bannerVideo.play();
        }, { once: true });
      });
    });
  }

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
});