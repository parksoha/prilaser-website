// ===== 문의 페이지 전용 JavaScript =====

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



    // 폼 처리
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(inquiryForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // 필수 필드 검증
            const requiredFields = ['name', 'email', 'phone', 'subject', 'message', 'privacy'];
            const missingFields = [];
            
            requiredFields.forEach(field => {
                if (!formObject[field] || formObject[field].trim() === '') {
                    missingFields.push(field);
                }
            });
            
            if (missingFields.length > 0) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }
            
            // 이메일 형식 검증
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formObject.email)) {
                alert('올바른 이메일 주소를 입력해주세요.');
                return;
            }
            
            // 전화번호 형식 검증
            const phoneRegex = /^[0-9-+\s()]+$/;
            if (!phoneRegex.test(formObject.phone)) {
                alert('올바른 전화번호를 입력해주세요.');
                return;
            }
            
            // 폼 제출 처리 (실제 서버로 전송하는 로직)
            submitForm(formObject);
        });
    }

    // 폼 제출 함수
    function submitForm(formData) {
        // 로딩 상태 표시
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
        submitBtn.disabled = true;
        
        // 이메일로 전송하는 로직
        const emailBody = `
문의자 정보:
- 이름: ${formData.name}
- 회사명: ${formData.company || '미입력'}
- 이메일: ${formData.email}
- 연락처: ${formData.phone}
- 관심 서비스: ${formData.service || '미선택'}

문의 내용:
- 제목: ${formData.subject}
- 내용: ${formData.message}

문의 시간: ${new Date().toLocaleString('ko-KR')}
        `;
        
        // mailto 링크로 이메일 클라이언트 열기
        const mailtoLink = `mailto:contact@prilaser.com?subject=PRILASER 문의: ${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
        
        // 새 창에서 이메일 클라이언트 열기
        window.open(mailtoLink, '_blank');
        
        // 개발용: 콘솔에 문의 내용 출력
        console.log('=== PRILASER 문의 내용 ===');
        console.log('문의자 정보:', {
            이름: formData.name,
            회사명: formData.company || '미입력',
            이메일: formData.email,
            연락처: formData.phone,
            관심서비스: formData.service || '미선택'
        });
        console.log('문의 내용:', {
            제목: formData.subject,
            내용: formData.message,
            문의시간: new Date().toLocaleString('ko-KR')
        });
        console.log('========================');
        
        // 성공 메시지
        alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.');
        
        // 폼 초기화
        inquiryForm.reset();
        
        // 버튼 상태 복원
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }

    // 폼 필드 실시간 검증
    const formFields = inquiryForm.querySelectorAll('input, select, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    // 필드 검증 함수
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        // 기존 에러 메시지 제거
        clearFieldError(field);
        
        // 필수 필드 검증
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, '이 필드는 필수입니다.');
            return false;
        }
        
        // 이메일 검증
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, '올바른 이메일 주소를 입력해주세요.');
                return false;
            }
        }
        
        // 전화번호 검증
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^[0-9-+\s()]+$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, '올바른 전화번호를 입력해주세요.');
                return false;
            }
        }
        
        return true;
    }

    // 에러 메시지 표시
    function showFieldError(field, message) {
        field.style.borderColor = '#dc3545';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    // 에러 메시지 제거
    function clearFieldError(field) {
        field.style.borderColor = '#e0e0e0';
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
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
    const animateElements = document.querySelectorAll('.contact-item, .inquiry-form');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
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
});
