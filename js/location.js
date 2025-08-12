// Google Maps API 초기화 함수
function initMap() {
  console.log('Google Maps API 초기화 시작');
  
  // PRILASER 위치 좌표 (경기도 화성시 향남읍 구문천리 929-7번지)
  const companyLocation = { 
    lat: 37.1234, // 실제 위도로 변경 필요
    lng: 126.5678  // 실제 경도로 변경 필요
  };

  // 지도 생성
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: companyLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  });

  // 마커 생성
  const marker = new google.maps.Marker({
    position: companyLocation,
    map: map,
    title: 'PRILASER',
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="#dc3545" stroke="#fff" stroke-width="2"/>
          <text x="20" y="25" text-anchor="middle" fill="#fff" font-family="Arial" font-size="12" font-weight="bold">P</text>
        </svg>
      `),
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(20, 20)
    }
  });

  // 정보창 생성
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="padding: 15px; min-width: 250px; font-family: 'Noto Sans KR', sans-serif;">
        <h3 style="margin: 0 0 10px 0; color: #0A2A43; font-size: 16px;">PRILASER</h3>
        <p style="margin: 5px 0; font-size: 13px; color: #555;">
          <i class="fas fa-map-marker-alt" style="color: #dc3545; margin-right: 5px;"></i>
          경기도 화성시 향남읍 구문천리 929-7번지
        </p>
        <p style="margin: 5px 0; font-size: 13px; color: #555;">
          <i class="fas fa-phone" style="color: #dc3545; margin-right: 5px;"></i>
          T. 031-123-4567
        </p>
        <p style="margin: 5px 0; font-size: 13px; color: #555;">
          <i class="fas fa-fax" style="color: #dc3545; margin-right: 5px;"></i>
          F. 031-123-4568
        </p>
      </div>
    `
  });

  // 마커 클릭 시 정보창 표시
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });

  // 지도 로드 완료 시 애니메이션
  google.maps.event.addListenerOnce(map, 'idle', function() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.style.opacity = '1';
      mapContainer.style.transform = 'translateY(0)';
    }
    console.log('Google Maps 로드 완료');
  });

  // 지도 로드 실패 시 처리
  google.maps.event.addListener(map, 'error', function() {
    console.error('Google Maps 로드 실패');
    showMapError();
  });
}

// 지도 로드 실패 시 표시할 에러 메시지
function showMapError() {
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    mapContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); color: #6c757d; text-align: center; padding: 2rem;">
        <i class="fas fa-map" style="font-size: 4rem; margin-bottom: 1rem; color: #dc3545;"></i>
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem; font-family: 'Noto Sans KR', sans-serif;">지도 로드 실패</p>
        <p style="font-size: 0.9rem; color: #868e96; font-style: italic;">Google Maps API 키를 확인해주세요</p>
        <div style="margin-top: 1rem; padding: 1rem; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h4 style="margin: 0 0 0.5rem 0; color: #0A2A43;">PRILASER 위치</h4>
          <p style="margin: 0.3rem 0; font-size: 0.9rem;">경기도 화성시 향남읍 구문천리 929-7번지</p>
          <p style="margin: 0.3rem 0; font-size: 0.9rem;">T. 031-123-4567</p>
        </div>
      </div>
    `;
  }
}

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  console.log('오시는 길 페이지 로드됨');
  
  // Google Maps API 로드 확인
  function checkGoogleMapsAPI() {
    if (typeof google !== 'undefined' && google.maps) {
      console.log('Google Maps API 로드됨');
      // initMap은 Google Maps API에서 자동으로 호출됨
    } else {
      console.log('Google Maps API 로드 대기 중...');
      setTimeout(checkGoogleMapsAPI, 100);
    }
  }

  // 초기 체크 시작
  checkGoogleMapsAPI();

  // 페이지 로드 완료 후 최종 체크
  window.addEventListener('load', function() {
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps API를 로드할 수 없습니다.');
      showMapError();
    }
  });

  // 반응형 처리
  function handleResize() {
    if (typeof google !== 'undefined' && google.maps) {
      // 지도 크기 재조정
      google.maps.event.trigger(map, 'resize');
    }
  }

  window.addEventListener('resize', handleResize);
});

// Google Maps API 로드 실패 시 대체 함수
window.initMap = function() {
  console.log('Google Maps API initMap 함수 호출됨');
  // initMap 함수는 Google Maps API에서 자동으로 호출됨
};
