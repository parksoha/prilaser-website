// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  // 모바일 햄버거 메뉴 토글
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // 네비게이션 링크 클릭 시 메뉴 닫기
  document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    if (hamburger && navMenu) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }));

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

  // 폼 제출 처리 (폼이 존재할 경우에만)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
      this.reset();
    });
  }

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
    // 페이지 로드 즉시 비디오 재생 시도
    setTimeout(function() {
      bannerVideo.play().catch(function(error) {
        console.log('비디오 자동 재생 실패:', error);
      });
    }, 100);
    
    // DOMContentLoaded 이벤트에서도 재생 시도
    bannerVideo.addEventListener('loadeddata', function() {
      bannerVideo.play().catch(function(error) {
        console.log('비디오 로드 후 재생 실패:', error);
      });
    });
    
    // 사용자 상호작용 후 비디오 재생
    document.addEventListener('click', function() {
      bannerVideo.play().catch(function(error) {
        console.log('비디오 재생 실패:', error);
      });
    }, { once: true });
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