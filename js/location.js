// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  
  // 스크롤 시 네비게이션 바 스타일 변경
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

  // 카카오맵 초기화
  function initKakaoMap() {
    console.log('카카오맵 초기화 시작');
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('지도 컨테이너를 찾을 수 없습니다.');
      return;
    }

    // GitHub Pages 환경인지 확인 (더 정확한 감지)
    const isGitHubPages = window.location.hostname.includes('github.io');
    const isLocalFile = window.location.protocol === 'file:';
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    console.log('환경 확인:', {
      hostname: window.location.hostname,
      protocol: window.location.protocol,
      isGitHubPages: isGitHubPages,
      isLocalFile: isLocalFile,
      isLocalhost: isLocalhost
    });

    // GitHub Pages 또는 로컬 파일 환경에서는 정적 지도 표시
    if (isGitHubPages || isLocalFile) {
      console.log('GitHub Pages 또는 로컬 파일 환경 감지, 정적 지도 이미지 표시');
      mapContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); color: #6c757d; text-align: center; padding: 2rem;">
          <i class="fas fa-map" style="font-size: 4rem; margin-bottom: 1rem; color: #E53935;"></i>
          <p style="font-size: 1.2rem; margin-bottom: 0.5rem; font-family: 'Noto Sans KR', sans-serif;">지도가 여기에 표시됩니다</p>
          <p style="font-size: 0.9rem; color: #868e96; font-style: italic;">카카오맵 API 키 설정이 필요합니다</p>
          <p style="font-size: 0.8rem; color: #dc3545; margin-top: 1rem;">GitHub Pages 도메인을 API 키에 추가해주세요</p>
          <div style="margin-top: 1rem; padding: 1rem; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h4 style="margin: 0 0 0.5rem 0; color: #0A2A43;">PRILASER 위치</h4>
            <p style="margin: 0.3rem 0; font-size: 0.9rem;">경기도 화성시 향남읍 구문천리 929-7번지</p>
            <p style="margin: 0.3rem 0; font-size: 0.9rem;">T. 031-123-4567</p>
          </div>
        </div>
      `;
      return;
    }

    // 로컬호스트에서만 카카오맵 API 사용
    if (!isLocalhost) {
      console.log('로컬호스트가 아닌 환경, 정적 지도 표시');
      mapContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); color: #6c757d; text-align: center; padding: 2rem;">
          <i class="fas fa-map" style="font-size: 4rem; margin-bottom: 1rem; color: #E53935;"></i>
          <p style="font-size: 1.2rem; margin-bottom: 0.5rem; font-family: 'Noto Sans KR', sans-serif;">지도가 여기에 표시됩니다</p>
          <p style="font-size: 0.9rem; color: #868e96; font-style: italic;">로컬 서버에서 실행해주세요</p>
          <p style="font-size: 0.8rem; color: #dc3545; margin-top: 1rem;">http://localhost:8000/sub/location.html</p>
          <div style="margin-top: 1rem; padding: 1rem; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h4 style="margin: 0 0 0.5rem 0; color: #0A2A43;">PRILASER 위치</h4>
            <p style="margin: 0.3rem 0; font-size: 0.9rem;">경기도 화성시 향남읍 구문천리 929-7번지</p>
            <p style="margin: 0.3rem 0; font-size: 0.9rem;">T. 031-123-4567</p>
          </div>
        </div>
      `;
      return;
    }

    // PRILASER 실제 주소
    const companyAddress = "경기도 화성시 향남읍 구문천리 929-7번지";
    console.log('검색할 주소:', companyAddress);
    
    // 안전한 kakao API 사용
    if (!isKakaoAPILoaded()) {
      console.error('카카오 API가 로드되지 않았습니다.');
      return;
    }
    
    // 주소-좌표 변환 객체 생성
    const geocoder = new window.kakao.maps.services.Geocoder();
    
    // 주소로 좌표 검색
    geocoder.addressSearch(companyAddress, function(result, status) {
      console.log('주소 검색 결과:', status, result);
      
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        console.log('찾은 좌표:', coords);
        
        // 지도 옵션
        const mapOption = {
          center: coords,
          level: 3
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        console.log('지도 생성 완료');

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: coords
        });

        // 마커를 지도에 표시
        marker.setMap(map);
        console.log('마커 표시 완료');

        // 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content: '<div style="padding:5px;font-size:12px;">PRILASER</div>'
        });

        // 마커 클릭 시 인포윈도우 표시
        window.kakao.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });

        // 지도 로드 완료 시 애니메이션
        window.kakao.maps.event.addListener(map, 'tilesloaded', function() {
          mapContainer.style.opacity = '1';
          mapContainer.style.transform = 'translateY(0)';
          console.log('지도 로드 완료');
        });
        
      } else {
        // 주소 검색 실패 시 기본 좌표 사용
        console.warn('주소 검색 실패, 기본 좌표 사용');
        const defaultCoords = new window.kakao.maps.LatLng(37.1234, 126.5678);
        
        const mapOption = {
          center: defaultCoords,
          level: 3
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        const marker = new window.kakao.maps.Marker({
          position: defaultCoords
        });
        marker.setMap(map);
        console.log('기본 좌표로 지도 생성 완료');
      }
    });
  }

  // 카카오맵 API 로드 확인 후 초기화
  // 안전한 API 체크 함수
  function isKakaoAPILoaded() {
    try {
      return typeof window.kakao !== 'undefined' && window.kakao && window.kakao.maps;
    } catch (error) {
      return false;
    }
  }
  
  console.log('카카오 API 확인:', isKakaoAPILoaded());
  
  // GitHub Pages 환경인지 먼저 확인
  const isGitHubPages = window.location.hostname.includes('github.io');
  const isLocalFile = window.location.protocol === 'file:';
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isGitHubPages || isLocalFile) {
    console.log('GitHub Pages 또는 로컬 파일 환경, 즉시 정적 지도 표시');
    initKakaoMap();
  } else {
    // API 로드 대기
    function checkKakaoAPI() {
      if (isKakaoAPILoaded()) {
        console.log('카카오맵 API 로드됨, 초기화 시작');
        initKakaoMap();
      } else {
        console.log('카카오맵 API 로드 대기 중...');
        setTimeout(checkKakaoAPI, 100);
      }
    }
    
    // 초기 체크 시작
    checkKakaoAPI();
    
    // 페이지 로드 완료 후 최종 체크
    window.addEventListener('load', function() {
      if (isKakaoAPILoaded()) {
        console.log('카카오맵 API 로드됨, 초기화 시작');
        initKakaoMap();
      } else {
        console.error('카카오맵 API를 로드할 수 없습니다.');
        // API 키가 유효하지 않은 경우 플레이스홀더 표시
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
          mapContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); color: #6c757d; text-align: center; padding: 2rem;">
              <i class="fas fa-map" style="font-size: 4rem; margin-bottom: 1rem; color: #E53935;"></i>
              <p style="font-size: 1.2rem; margin-bottom: 0.5rem; font-family: 'Noto Sans KR', sans-serif;">지도가 여기에 표시됩니다</p>
              <p style="font-size: 0.9rem; color: #868e96; font-style: italic;">카카오맵 API 키를 설정해주세요</p>
              <p style="font-size: 0.8rem; color: #dc3545; margin-top: 1rem;">API 키 오류 또는 네트워크 문제일 수 있습니다.</p>
            </div>
          `;
        }
      }
    });
  }

  // 페이지 로드 시 애니메이션
  const observerOptions = {
    threshold: 0.1,
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

  // 애니메이션 대상 요소들
  const animateElements = document.querySelectorAll('.map-section');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // 키보드 접근성 개선
  document.addEventListener('keydown', function(e) {
    // ESC 키로 모바일 메뉴 닫기
    if (e.key === 'Escape') {
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');
      
      if (hamburger && navMenu && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // 페이지 로드 완료 시 로딩 애니메이션 제거
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

  // 반응형 처리
  function handleResize() {
    const isMobile = window.innerWidth <= 768;
    
    // 모바일에서 스크롤 방지 해제
    if (!isMobile) {
      document.body.style.overflow = '';
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize(); // 초기 실행
});
