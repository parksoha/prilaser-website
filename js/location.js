// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  console.log('오시는 길 페이지 로드됨');
  
  // OpenStreetMap 초기화
  function initOpenStreetMap() {
    console.log('OpenStreetMap 초기화 시작');
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('지도 컨테이너를 찾을 수 없습니다.');
      return;
    }

    // GitHub Pages 환경인지 확인
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

    // 로컬 파일 환경에서만 정적 지도 표시 (GitHub Pages에서는 실제 지도 표시)
    if (isLocalFile) {
      console.log('로컬 파일 환경 감지, 정적 지도 이미지 표시');
      mapContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); color: #6c757d; text-align: center; padding: 2rem;">
          <i class="fas fa-map" style="font-size: 4rem; margin-bottom: 1rem; color: #28a745;"></i>
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

    // Leaflet.js 확인
    if (typeof L === 'undefined') {
      console.error('Leaflet.js가 로드되지 않았습니다.');
      return;
    }

    // PRILASER 실제 주소 (경기도 화성시 향남읍 구문천리 929-7번지)
    // OpenStreetMap에서는 좌표를 직접 사용
    const companyCoords = [37.1234, 126.5678]; // 여기에_실제_좌표_입력
    
    // 지도 생성
    const map = L.map(mapContainer).setView(companyCoords, 15);
    console.log('OpenStreetMap 생성 완료');

    // OpenStreetMap 타일 레이어 추가
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // 마커 생성
    const marker = L.marker(companyCoords).addTo(map);

    // 팝업 생성
    const popup = L.popup()
      .setLatLng(companyCoords)
      .setContent(`
        <div style="padding: 10px; min-width: 200px;">
          <h3 style="margin: 0 0 5px 0; color: #0A2A43;">PRILASER</h3>
          <p style="margin: 5px 0; font-size: 12px;">경기도 화성시 향남읍 구문천리 929-7번지</p>
          <p style="margin: 5px 0; font-size: 12px;">T. 031-123-4567</p>
        </div>
      `);

    // 마커 클릭 시 팝업 표시
    marker.bindPopup(popup);

    // 지도 로드 완료 시 애니메이션
    map.on('load', function() {
      mapContainer.style.opacity = '1';
      mapContainer.style.transform = 'translateY(0)';
      console.log('OpenStreetMap 로드 완료');
    });
  }

  // Leaflet.js 로드 확인
  function checkLeafletAPI() {
    if (typeof L !== 'undefined') {
      console.log('Leaflet.js 로드됨, 초기화 시작');
      initOpenStreetMap();
    } else {
      console.log('Leaflet.js 로드 대기 중...');
      setTimeout(checkLeafletAPI, 100);
    }
  }

  // 초기 체크 시작
  checkLeafletAPI();

  // 페이지 로드 완료 후 최종 체크
  window.addEventListener('load', function() {
    if (typeof L !== 'undefined') {
      console.log('Leaflet.js 로드됨, 초기화 시작');
      initOpenStreetMap();
    } else {
      console.error('Leaflet.js를 로드할 수 없습니다.');
      // API 키가 유효하지 않은 경우 플레이스홀더 표시
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        mapContainer.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); color: #6c757d; text-align: center; padding: 2rem;">
            <i class="fas fa-map" style="font-size: 4rem; margin-bottom: 1rem; color: #28a745;"></i>
            <p style="font-size: 1.2rem; margin-bottom: 0.5rem; font-family: 'Noto Sans KR', sans-serif;">지도가 여기에 표시됩니다</p>
            <p style="font-size: 0.9rem; color: #868e96; font-style: italic;">OpenStreetMap 지도</p>
            <p style="font-size: 0.8rem; color: #dc3545; margin-top: 1rem;">API 로드 오류 또는 네트워크 문제일 수 있습니다.</p>
          </div>
        `;
      }
    }
  });

  // 반응형 처리
  function handleResize() {
    const mapContainer = document.getElementById('map');
    if (mapContainer && window.L) {
      // 지도 크기 재조정
      window.L.map.invalidateSize();
    }
  }

  window.addEventListener('resize', handleResize);
});
