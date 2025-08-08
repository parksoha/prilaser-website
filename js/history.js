// ===== 기업연혁 페이지 전용 스크립트 =====

document.addEventListener('DOMContentLoaded', function() {
    
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

    // 기업연혁 타임라인 아이템 애니메이션
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timeline = document.querySelector('.history-timeline');
    const timelineDots = document.querySelectorAll('.timeline-dot');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // 해당 아이템의 점 활성화
                const dot = entry.target.querySelector('.timeline-dot');
                if (dot) {
                    dot.classList.add('active');
                }
                
                // 진행률 업데이트
                updateTimelineProgress();
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // 타임라인 진행률 업데이트 함수
    function updateTimelineProgress() {
        const animatedItems = document.querySelectorAll('.timeline-item.animate');
        const totalItems = timelineItems.length;
        const progress = (animatedItems.length / totalItems) * 100;
        
        if (timeline) {
            timeline.style.setProperty('--progress', `${progress}%`);
            
            if (progress > 0) {
                timeline.classList.add('progress');
            }
        }
    }
    
    // 스크롤 이벤트로 더 부드러운 진행률 업데이트
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const timelineSection = document.querySelector('.history-section');
        
        if (timelineSection) {
            const sectionTop = timelineSection.offsetTop;
            const sectionHeight = timelineSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // 섹션이 화면에 들어오기 시작할 때부터 끝까지의 진행률
            const sectionStart = sectionTop - windowHeight;
            const sectionEnd = sectionTop + sectionHeight;
            
            let progress = 0;
            
            if (scrolled >= sectionStart) {
                progress = Math.min(100, ((scrolled - sectionStart) / (sectionEnd - sectionStart)) * 100);
            }
            
            if (timeline) {
                timeline.style.setProperty('--progress', `${progress}%`);
                
                if (progress > 0) {
                    timeline.classList.add('progress');
                }
            }
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

    console.log('기업연혁 페이지 스크립트 로드 완료');
});
