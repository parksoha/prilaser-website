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

  // Gallery Carousel Functionality
  function initializeCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const carouselTrack = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    
    if (!carouselTrack || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const originalItems = 4; // 원본 아이템 개수
    let isTransitioning = false;
    let autoSlideInterval;
    
    function getItemsPerView() {
      return window.innerWidth <= 768 ? 1 : 3;
    }
    
    function getItemWidth() {
      return window.innerWidth <= 768 ? 100 : 34; // 사진 너비 + 간격의 절반 정도
    }
    
    function updateCarousel() {
      const itemWidth = getItemWidth();
      const translateX = -currentIndex * itemWidth;
      carouselTrack.style.transform = `translateX(${translateX}%)`;
    }
    
    function handleTransitionEnd() {
      isTransitioning = false;
      
      // 무한 스크롤을 위한 인덱스 조정
      if (currentIndex >= originalItems) {
        currentIndex = 0;
        carouselTrack.style.transition = 'none';
        updateCarousel();
        // 즉시 트랜지션 복원
        setTimeout(() => {
          carouselTrack.style.transition = 'transform 0.5s ease';
        }, 50);
      } else if (currentIndex < 0) {
        currentIndex = originalItems - 1;
        carouselTrack.style.transition = 'none';
        updateCarousel();
        // 즉시 트랜지션 복원
        setTimeout(() => {
          carouselTrack.style.transition = 'transform 0.5s ease';
        }, 50);
      }
    }
    
    function moveCarousel(direction) {
      if (isTransitioning) return;
      
      isTransitioning = true;
      currentIndex += direction;
      updateCarousel();
    }
    
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        moveCarousel(1);
      }, 5000); // 5초마다 자동 슬라이드
    }
    
    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
    }
    
    prevBtn.addEventListener('click', () => {
      stopAutoSlide();
      moveCarousel(-1);
      startAutoSlide(); // 클릭 후 다시 자동 슬라이드 시작
    });
    
    nextBtn.addEventListener('click', () => {
      stopAutoSlide();
      moveCarousel(1);
      startAutoSlide(); // 클릭 후 다시 자동 슬라이드 시작
    });
    
    // 마우스 호버 시 자동 슬라이드 정지
    carouselTrack.addEventListener('mouseenter', stopAutoSlide);
    carouselTrack.addEventListener('mouseleave', startAutoSlide);
    
    // 트랜지션 종료 이벤트 리스너
    carouselTrack.addEventListener('transitionend', handleTransitionEnd);
    
    // Initialize carousel
    updateCarousel();
    
    // 자동 슬라이드 시작
    startAutoSlide();
    
    // 윈도우 리사이즈 시 캐러셀 업데이트
    window.addEventListener('resize', () => {
      updateCarousel();
    });
  }
  
  // 제관용접 캐러셀 초기화
  initializeCarousel('welding-carousel');
  
  // 절곡가공 캐러셀 초기화
  initializeCarousel('bending-carousel');
  
  // 도장인쇄 캐러셀 초기화
  initializeCarousel('print-carousel');
});
