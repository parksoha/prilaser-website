// ===== 오시는 길 페이지 전용 JavaScript =====

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

    // OpenStreetMap 초기화
    initMap();
});

// OpenStreetMap 초기화 함수
function initMap() {
    console.log('OpenStreetMap 초기화 시작');
    
    // PRILASER 위치 좌표 (경기도 화성시 향남읍 구문천리 929-7번지)
    // 실제 좌표: 37.084446, 126.900798
    const companyLocation = [37.084446, 126.900798]; // [위도, 경도]
    
    // 지도 생성
    const map = L.map('map').setView(companyLocation, 15);
    
    // OpenStreetMap 타일 레이어 추가
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // 커스텀 마커 아이콘 생성 (물방울 모양)
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                width: 40px; 
                height: 50px; 
                position: relative;
                display: flex; 
                align-items: center; 
                justify-content: center;
            ">
                <div style="
                    width: 40px; 
                    height: 40px; 
                    background: #dc3545; 
                    border: 3px solid #fff; 
                    border-radius: 50% 50% 50% 0; 
                    transform: rotate(-45deg);
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    color: white; 
                    font-weight: bold; 
                    font-size: 16px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                    position: relative;
                ">
                    <span style="transform: rotate(45deg);">P</span>
                </div>
            </div>
        `,
        iconSize: [40, 50],
        iconAnchor: [20, 50],
        popupAnchor: [0, -50]
    });
    
    // 마커 추가
    const marker = L.marker(companyLocation, { icon: customIcon }).addTo(map);
    
    // 팝업 내용
    const popupContent = `
        <div style="padding: 10px; min-width: 250px; font-family: 'Noto Sans KR', sans-serif;">
            <h3 style="margin: 0 0 10px 0; color: #0A2A43; font-size: 16px; border-bottom: 2px solid #dc3545; padding-bottom: 5px;">
                PRILASER
            </h3>
            <p style="margin: 8px 0; font-size: 13px; color: #555;">
                <i class="fas fa-map-marker-alt" style="color: #dc3545; margin-right: 8px;"></i>
                경기도 화성시 향남읍 구문천리 929-7번지
            </p>
            <p style="margin: 8px 0; font-size: 13px; color: #555;">
                <i class="fas fa-phone" style="color: #dc3545; margin-right: 8px;"></i>
                T. 031-123-4567
            </p>
            <p style="margin: 8px 0; font-size: 13px; color: #555;">
                <i class="fas fa-fax" style="color: #dc3545; margin-right: 8px;"></i>
                F. 031-123-4568
            </p>
        </div>
    `;
    
    // 팝업 추가
    marker.bindPopup(popupContent);
    
    // 지도 로드 완료 시 애니메이션
    map.whenReady(function() {
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.style.opacity = '1';
            mapContainer.style.transform = 'translateY(0)';
        }
        console.log('OpenStreetMap 로드 완료');
    });
    
    // 지도 로드 실패 시 처리
    map.on('error', function() {
        console.error('OpenStreetMap 로드 실패');
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
                <p style="font-size: 0.9rem; color: #868e96; font-style: italic;">인터넷 연결을 확인해주세요</p>
                <div style="margin-top: 1rem; padding: 1rem; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h4 style="margin: 0 0 0.5rem 0; color: #0A2A43;">PRILASER 위치</h4>
                    <p style="margin: 0.3rem 0; font-size: 0.9rem;">경기도 화성시 향남읍 구문천리 929-7번지</p>
                    <p style="margin: 0.3rem 0; font-size: 0.9rem;">T. 031-123-4567</p>
                </div>
            </div>
        `;
    }
}

// 스크롤 애니메이션
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
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});
