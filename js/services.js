document.addEventListener('DOMContentLoaded', function() {

  // 네비게이션 요소들
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navItems = document.querySelectorAll('.nav-item');

  // 모바일 메뉴 토글
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      const isExpanded = hamburger.classList.contains("active");
      hamburger.setAttribute("aria-expanded", isExpanded);
      hamburger.setAttribute("aria-label", isExpanded ? "메뉴 닫기" : "메뉴 열기");
      if (window.innerWidth <= 768) {
        if (isExpanded) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    });

    // 키보드 접근성
    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        hamburger.click();
      }
    });
  }

  // 서브메뉴 토글
  navItems.forEach(item => {
    const submenu = item.querySelector(".submenu");
    const navLink = item.querySelector(".nav-link");
    if (submenu && navLink) {
      navLink.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          
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
          const isActive = submenu.classList.contains("active");
          if (isActive) {
            submenu.classList.remove("active");
          } else {
            submenu.classList.add("active");
          }
        }
      });

      // 키보드 접근성
      navLink.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navLink.click();
        }
      });
    }
  });

  // 서브메뉴 링크 클릭 시 메뉴 닫기
  document.querySelectorAll(".submenu a").forEach(link => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        if (hamburger && navMenu) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          document.body.style.overflow = '';
        }
        navItems.forEach(item => {
          const submenu = item.querySelector(".submenu");
          if (submenu) {
            submenu.classList.remove("active");
          }
        });
      }
    });
  });

  // 스크롤 시 네비게이션 스타일 변경
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
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

  // 푸터 서브메뉴 토글 기능
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('footer-submenu-toggle')) {
      e.preventDefault();
      const submenu = e.target.nextElementSibling;
      if (submenu && submenu.classList.contains('footer-submenu')) {
        submenu.classList.toggle('active');
      }
    }
  });

  // 윈도우 리사이즈 시 메뉴 상태 초기화
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      if (hamburger && navMenu) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = '';
      }
      navItems.forEach(item => {
        const submenu = item.querySelector(".submenu");
        if (submenu) {
          submenu.classList.remove("active");
        }
      });
    }
  });

  // 외부 클릭 시 메뉴 닫기
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const isClickInsideNav = navMenu && navMenu.contains(e.target);
      const isClickOnHamburger = hamburger && hamburger.contains(e.target);
      
      if (!isClickInsideNav && !isClickOnHamburger && navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = '';
        
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
