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
  const navLinks = document.querySelectorAll('.nav-link');
  const submenuToggles = document.querySelectorAll('.nav-item');

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

  // 서브메뉴 토글 (데스크톱)
  submenuToggles.forEach(item => {
    const link = item.querySelector('.nav-link');
    const submenu = item.querySelector('.submenu');
    
    if (link && submenu) {
      link.addEventListener('click', function(e) {
        // 모바일에서는 햄버거 메뉴가 열려있을 때만 서브메뉴 토글
        if (window.innerWidth <= 768) {
          if (navMenu.classList.contains('active')) {
            e.preventDefault();
            submenu.classList.toggle('active');
          }
        }
      });
    }
  });

  // 모바일에서 메뉴 링크 클릭 시 메뉴 닫기
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // 윈도우 리사이즈 시 메뉴 상태 초기화
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      
      // 서브메뉴도 모두 닫기
      document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.classList.remove('active');
      });
    }
  });

  // 탭 기능
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  // 탭 전환 함수
  function switchTab(tabName) {
    // 모든 탭 버튼에서 active 클래스 제거
    tabBtns.forEach(btn => {
      btn.classList.remove('active');
    });

    // 모든 탭 패널에서 active 클래스 제거
    tabPanels.forEach(panel => {
      panel.classList.remove('active');
    });

    // 선택된 탭 버튼에 active 클래스 추가
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }

    // 선택된 탭 패널에 active 클래스 추가
    const activePanel = document.getElementById(`${tabName}-panel`);
    if (activePanel) {
      activePanel.classList.add('active');
    }
  }

  // 탭 버튼 클릭 이벤트
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

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

  // 스크롤 시 네비게이션 배경 변경
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // 키보드 접근성
  document.addEventListener('keydown', function(e) {
    // ESC 키로 모바일 메뉴 닫기
    if (e.key === 'Escape') {
      if (navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  });

  // 탭 키보드 네비게이션
  tabBtns.forEach((btn, index) => {
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const targetTab = this.getAttribute('data-tab');
        switchTab(targetTab);
      }
      
      // 화살표 키로 탭 이동
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextBtn = tabBtns[(index + 1) % tabBtns.length];
        nextBtn.focus();
      }
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevBtn = tabBtns[(index - 1 + tabBtns.length) % tabBtns.length];
        prevBtn.focus();
      }
    });
  });

  // 페이지 로드 시 첫 번째 탭 활성화
  if (tabBtns.length > 0) {
    const firstTab = tabBtns[0].getAttribute('data-tab');
    switchTab(firstTab);
  }

  // 스크롤 애니메이션 (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // 애니메이션 대상 요소들 관찰
  document.querySelectorAll('.feature-item, .material-item, .service-item').forEach(item => {
    observer.observe(item);
  });

  // Gallery Carousel Functionality
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (carouselTrack && prevBtn && nextBtn) {
    let currentIndex = 0;
    const originalItems = 4; // 원본 아이템 개수
    let isTransitioning = false;
    let autoSlideInterval;
    
    function getItemsPerView() {
      return window.innerWidth <= 768 ? 1 : 3;
    }
    
    function getItemWidth() {
      return window.innerWidth <= 768 ? 100 : 33.333;
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
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        stopAutoSlide();
        moveCarousel(-1);
        startAutoSlide();
      } else if (e.key === 'ArrowRight') {
        stopAutoSlide();
        moveCarousel(1);
        startAutoSlide();
      }
    });
  }

});
