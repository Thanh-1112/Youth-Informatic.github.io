/* ================================================
   TECHLUX – JAVASCRIPT CHÍNH (ES6+)
   Phong cách: Clean code, ES6+, comment tiếng Việt
   Chức năng: Render team, menu, modal, scroll reveal, theme
   ================================================ */

/**
 * STATE - Lưu trữ dữ liệu toàn bộ ứng dụng
 * 
 * Cấu trúc:
 * - theme: dark / light (mặc định: dark)
 * - team: Mảng đối tượng nhân viên { name, role, avatar, socials }
 * 
 * Chỉnh sửa: Thêm/xóa/sửa team member tại đây
 */

const state = {
    theme: localStorage.getItem('theme') || 'dark',
    team: [
        {
            name: 'Phạm Quang Thành',
            role: 'Thành viên',
            avatar: 'avt.jpg',
            socials: {
                Facebook: 'https://facebook.com',
            }
        },
        {
            name: 'Võ Khánh Băng',
            role: 'Admin club',
           avatar: 'avt.jpg',
            socials: {
                Facebook: 'https://facebook.com',
            }
        },
        {
            name: 'Võ Đức Thắng',
            role: 'Thành viên',
            avatar:'avt.jpg',
            socials: {
                Facebook: 'https://facebook.com',
            }
        },
{
            name: 'Minh Vy',
            role: 'Thành viên',
            avatar:'avt.jpg',
            socials: {
                Facebook: 'https://facebook.com',
            }
        },
{
            name: 'Nguyễn Nam',
            role: 'Thành viên',
            avatar:'avt.jpg',
            socials: {
                Facebook: 'https://facebook.com',
            }
        },
{
            name: 'Thái Bảo',
            role: 'Thành viên',
            avatar:'avt.jpg',
            socials: {
               Facebook: 'https://facebook.com',
            }
        },
{
            name: 'Hoài',
            role: 'Thành viên',
            avatar:'avt.jpg',
            socials: {
                Facebook: 'https://facebook.com',
            }
        },
{
            name: 'Vỹ Khang',
            role: 'Thành viên',
            avatar:'avt.jpg',
            socials: {
                Facebook: 'https://facebook.com',
            }
        },
{
            name: 'Phong Nguyễn',
            role: 'Thành viên',
            avatar:'avt.jpg',
            socials: {
                Facebook: 'https://facebook.com',
            }
        },
{
            name: 'Lý Hồng Ân',
            role: 'Thành viên',
            avatar:'avt.jpg',
            socials: {
                Facebook: 'https://facebook.com',
            }
        },
{
            name: 'Nghi Diệp',
            role: 'Thành viên',
            avatar:'avt.jpg',
            socials: {
                Facebook: 'https://facebook.com',
            }
        },
{
            name: 'Coder Sống ban ngày 🐢',
            role: 'Thành viên',
            avatar:'avt.jpg',
            socials: {
                Facebook: 'https://facebook.com',
            }
        },
    ]
};
function init() {
    console.log('🚀 TechLux – Khởi động ứng dụng');
    
    initTheme();
    renderTeam();
    setupMenu();
    setupThemeToggle();
    setupModal();
    initScrollReveal();
    lazyLoadImages();
    
    console.log('✅ Ứng dụng sẵn sàng');
}

/* ========== RENDER TEAM – Tạo card nhân viên từ state ========== */
/**
 * renderTeam() – Render team card bằng JavaScript
 * 
 * Mục đích: Tạo HTML card nhân viên từ mảng state.team
 * Không viết sẵn HTML, mà tạo động qua JS
 * 
 * Quy trình:
 * 1. Lấy element có data-team-container
 * 2. Lặp qua state.team, tạo card cho mỗi member
 * 3. Mỗi card chứa: avatar, name, role, social links
 * 4. Append card vào container
 * 
 * Chỉnh dữ liệu team tại state.team (xem trên)
 * 
 * Chỉnh sửa: Thay đổi HTML template của card tại đây
 */
function renderTeam() {
    const container = document.querySelector('[data-team-container]');
    
    if (!container) {
        console.warn('⚠️ Team container không tìm thấy');
        return;
    }
    
    // Xóa nội dung cũ
    container.innerHTML = '';
    
    // Lặp qua từng member trong state.team
    state.team.forEach((member, index) => {
        // Tạo card element
        const card = document.createElement('div');
        card.className = 'team-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Xây dựng HTML cho social links
        const socialsHTML = Object.entries(member.socials)
            .map(([platform, link]) => {
                const icons = {
                   Facebook:"FB"
                };
                return `<a href="${link}" class="team-social-link" aria-label="${platform}" target="_blank" rel="noopener noreferrer">${icons[platform] || platform}</a>`;
            })
            .join('');
        
        // Gán HTML vào card
        card.innerHTML = `
            <img src="${member.avatar}" alt="${member.name}" class="team-avatar" loading="lazy" data-src="${member.avatar}">
            <div class="team-info">
                <h3 class="team-name">${member.name}</h3>
                <p class="team-role">${member.role}</p>
            </div>
            <div class="team-socials">
                ${socialsHTML}
            </div>
        `;
        
        // Thêm card vào container
        container.appendChild(card);
    });
    
    console.log(`✅ Render ${state.team.length} team member`);
}

/* ========== SETUP MENU – Hamburger menu mobile ========== */
/**
 * setupMenu() – Thiết lập hamburger menu di động
 * 
 * Mục đích: Bật/tắt menu mobile khi click hamburger
 * 
 * Quy trình:
 * 1. Lấy button hamburger có data-menu-toggle
 * 2. Lấy nav mobile có data-mobile-menu
 * 3. Toggle class + aria-expanded khi click
 * 4. Đóng menu khi click link
 * 
 * Chỉnh sửa: Thay đổi selector nếu HTML thay đổi
 */
function setupMenu() {
    const hamburger = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const navLinks = mobileMenu?.querySelectorAll('.nav-mobile-link');
    
    if (!hamburger || !mobileMenu) {
        console.warn('⚠️ Menu element không tìm thấy');
        return;
    }
    
    // Toggle menu khi click hamburger
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isOpen);
        
        if (!isOpen) {
            mobileMenu.setAttribute('aria-hidden', 'false');
        } else {
            mobileMenu.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Đóng menu khi click link
    navLinks?.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        });
    });
    
    console.log('✅ Menu setup hoàn tất');
}

/* ========== SETUP THEME – Toggle dark/light mode ========== */
/**
 * setupThemeToggle() – Thiết lập nút toggle theme
 * 
 * Mục đích: Bật/tắt light/dark mode khi click nút
 * 
 * Quy trình:
 * 1. Lấy button có data-theme-toggle
 * 2. Click button: gọi toggleTheme()
 * 3. Update icon (🌙 ↔️ ☀️) với animation smooth
 * 4. Flip animation tinh tế
 * 
 * Chỉnh sửa: Thay đổi icon nếu cần
 */
function setupThemeToggle() {
    const themeBtn = document.querySelector('[data-theme-toggle]');
    const themeIcon = themeBtn?.querySelector('.theme-icon');
    
    if (!themeBtn) {
        console.warn('⚠️ Theme button không tìm thấy');
        return;
    }
    
    // Cập nhật icon theo theme hiện tại
    updateThemeIcon(themeIcon);
    
    // Click button: toggle theme với animation tinh tế
    themeBtn.addEventListener('click', () => {
        // Animation: flip 360° với easing bounce
        themeIcon.style.animation = 'none';
        setTimeout(() => {
            themeIcon.style.animation = 'themeFlip 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }, 10);
        
        // Delay một chút rồi update icon (midway)
        setTimeout(() => {
            toggleTheme();
            updateThemeIcon(themeIcon);
        }, 300);
    });
    
    console.log('✅ Theme toggle setup hoàn tất');
}

/**
 * updateThemeIcon(themeIcon) – Cập nhật icon theme
 * 
 * Param: themeIcon - Element icon
 * 
 * Quy trình:
 * 1. Nếu dark mode: hiển thị ☀️
 * 2. Nếu light mode: hiển thị 🌙
 */
function updateThemeIcon(themeIcon) {
    if (!themeIcon) return;
    
    if (state.theme === 'dark') {
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}

/* ========== SETUP MODAL – CTA modal dialog ========== */
/**
 * setupModal() – Thiết lập modal dialog
 * 
 * Mục đích: Bật/tắt modal khi click CTA, overlay, hoặc ESC
 * 
 * Quy trình:
 * 1. Lấy tất cả button có data-modal-trigger
 * 2. Lấy modal element có data-modal
 * 3. Khi click trigger: bật modal + focus trap
 * 4. Khi click backdrop: tắt modal
 * 5. Khi bấm ESC: tắt modal
 * 
 * Focus trap: Giữ focus trong modal
 * 
 * Chỉnh sửa: Thay đổi selector modal nếu cần
 */
function setupModal() {
    const triggers = document.querySelectorAll('[data-modal-trigger]');
    const modals = document.querySelectorAll('[data-modal]');
    
    if (triggers.length === 0) {
        console.warn('⚠️ Modal trigger không tìm thấy');
        return;
    }
    
    // Mở modal khi click trigger
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-trigger');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    // Lặp qua từng modal
    modals.forEach(modal => {
        const backdrop = modal.querySelector('[data-modal-backdrop]');
        const closeBtn = modal.querySelector('[data-modal-close]');
        
        // Đóng khi click backdrop
        if (backdrop) {
            backdrop.addEventListener('click', () => closeModal(modal));
        }
        
        // Đóng khi click nút close
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
        
        // Đóng khi bấm ESC
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.hasAttribute('data-modal-open')) {
                closeModal(modal);
            }
        });
    });
    
    console.log('✅ Modal setup hoàn tất');
}

/**
 * openModal(modal) – Mở modal
 * 
 * Param: modal - Element modal cần mở
 * 
 * Quy trình:
 * 1. Thêm attribute data-modal-open
 * 2. Thêm class modal opened
 * 3. Disable body scroll
 * 4. Focus vào form input (focus trap)
 */
function openModal(modal) {
    modal.setAttribute('data-modal-open', '');
    modal.classList.add('modal-opened');
    document.body.style.overflow = 'hidden';
    
    // Focus trap
    const firstInput = modal.querySelector('input');
    if (firstInput) {
        firstInput.focus();
    }
    
    console.log('📢 Modal mở:', modal.id);
}

/**
 * closeModal(modal) – Đóng modal
 * 
 * Param: modal - Element modal cần đóng
 * 
 * Quy trình:
 * 1. Xóa attribute data-modal-open
 * 2. Xóa class modal opened
 * 3. Enable body scroll
 */
function closeModal(modal) {
    modal.removeAttribute('data-modal-open');
    modal.classList.remove('modal-opened');
    document.body.style.overflow = '';
    
    console.log('✖️ Modal đóng:', modal.id);
}

/* ========== SCROLL REVEAL – IntersectionObserver ========== */
/**
 * initScrollReveal() – Thiết lập fade-in animation khi scroll
 * 
 * Mục đích: Thêm class .reveal-visible khi element vào viewport
 * 
 * Quy trình:
 * 1. Lấy tất cả element có class .reveal
 * 2. Tạo IntersectionObserver
 * 3. Khi element vào viewport: thêm class .reveal-visible
 * 4. Animation CSS xử lý fade-in
 * 
 * Chỉnh sửa: Thay đổi selector .reveal nếu cần
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length === 0) {
        console.log('ℹ️ Không có element reveal');
        return;
    }
    
    // Tạo Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element vào viewport
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Quan sát từng element
    revealElements.forEach(el => {
        observer.observe(el);
    });
    
    console.log(`✅ Scroll reveal setup: ${revealElements.length} element`);
}

/* ========== LAZY LOAD IMAGES – Tải ảnh khi hiển thị ========== */
/**
 * lazyLoadImages() – Lazy load ảnh bằng IntersectionObserver
 * 
 * Mục đích: Chỉ tải ảnh khi element xuất hiện, tiết kiệm bandwidth
 * 
 * Quy trình:
 * 1. Lấy tất cả ảnh có attribute data-src
 * 2. Tạo IntersectionObserver
 * 3. Khi ảnh vào viewport: set src từ data-src
 * 4. Thêm class loaded
 * 
 * HTML: <img src="placeholder.jpg" data-src="actual-image.jpg">
 * 
 * Chỉnh sửa: Thay đổi selector nếu cần
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) {
        console.log('ℹ️ Không có ảnh lazy load');
        return;
    }
    
    // Kiểm tra IntersectionObserver support
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback: Load tất cả ảnh ngay lập tức
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    console.log(`✅ Lazy load setup: ${images.length} ảnh`);
}

/* ========== THEME – Dark/Light mode ========== */
/**
 * initTheme() – Khởi tạo theme
 * 
 * Mục đích: Thiết lập theme từ localStorage
 * 
 * Quy trình:
 * 1. Lấy theme từ state
 * 2. Áp dụng theme vào document
 * 3. Lưu vào localStorage
 * 
 * Chỉnh sửa: Thêm theme mới tại đây
 */
function initTheme() {
    const theme = state.theme;
    applyTheme(theme);
    console.log(`✅ Theme: ${theme}`);
}

/**
 * applyTheme(theme) – Áp dụng theme vào document
 * 
 * Param: theme - 'dark' hoặc 'light'
 * 
 * Quy trình:
 * 1. Set data-theme attribute
 * 2. Thay đổi CSS variables
 * 3. Lưu vào localStorage
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    localStorage.setItem('theme', theme);
    
    // Thay đổi CSS variables tùy theo theme
    if (theme === 'light') {
        document.documentElement.style.setProperty('--bg', '#ffffff');
        document.documentElement.style.setProperty('--bg-secondary', '#f9f0f3');
        document.documentElement.style.setProperty('--text', '#0a0a0a');
        document.documentElement.style.setProperty('--text-secondary', '#333333');
        document.documentElement.style.setProperty('--muted', '#999999');
        document.documentElement.style.setProperty('--surface', 'rgba(255, 105, 180, 0.12)');
        document.documentElement.style.setProperty('--surface-hover', 'rgba(255, 105, 180, 0.18)');
        document.documentElement.style.setProperty('--border', 'rgba(255, 105, 180, 0.3)');
    } else {
        // Dark mode (mặc định)
        document.documentElement.style.setProperty('--bg', '#0a0a0a');
        document.documentElement.style.setProperty('--bg-secondary', '#121212');
        document.documentElement.style.setProperty('--text', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#cccccc');
        document.documentElement.style.setProperty('--muted', '#999999');
        document.documentElement.style.setProperty('--surface', 'rgba(255, 105, 180, 0.08)');
        document.documentElement.style.setProperty('--surface-hover', 'rgba(255, 105, 180, 0.12)');
        document.documentElement.style.setProperty('--border', 'rgba(255, 105, 180, 0.2)');
    }
}

/**
 * toggleTheme() – Chuyển đổi giữa dark/light mode
 * 
 * Mục đích: Toggle theme khi user click nút
 * 
 * Quy trình:
 * 1. Lấy theme hiện tại
 * 2. Đổi sang theme khác
 * 3. Gọi applyTheme()
 * 
 * Sử dụng: Thêm button onclick="toggleTheme()"
 */
function toggleTheme() {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    console.log(`🌓 Theme đổi sang: ${newTheme}`);
}

/* ========== EVENT LISTENERS – Khi DOM loaded ========== */
/**
 * DOMContentLoaded – Chạy init() khi DOM load xong
 * 
 * Quy trình:
 * 1. Chờ DOM sẵn sàng
 * 2. Gọi init()
 * 3. Trang web hoàn toàn khởi động
 */
document.addEventListener('DOMContentLoaded', init);

/**
 * Form submit – Xử lý modal form
 * 
 * Mục đích: Xử lý khi user submit form trong modal
 * 
 * Quy trình:
 * 1. Lấy form
 * 2. Ngăn reload page
 * 3. Lấy dữ liệu từ form
 * 4. In log hoặc gửi API
 * 5. Đóng modal
 * 6. Hiển thị thông báo
 */
const form = document.querySelector('[data-form]');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Lấy dữ liệu form
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        
        console.log(`✅ Form submitted:`, { name, email });
        
        // Đóng modal
        const modal = form.closest('[data-modal]');
        if (modal) {
            closeModal(modal);
        }
        
        // Hiển thị thông báo
        alert(`Cảm ơn ${name}! Chúng tôi sẽ liên hệ với ${email}`);
        
        // Reset form
        form.reset();
    });
}

/* ========== HÀNG TIỆN ÍCH ========== */
/**
 * logState() – In state ra console (debug)
 * 
 * Sử dụng: logState() trong console
 */
function logState() {
    console.table(state);
}

/**
 * updateTeamData(newTeam) – Cập nhật dữ liệu team và render lại
 * 
 * Param: newTeam - Mảng team mới
 * 
 * Sử dụng: updateTeamData([...])
 */
function updateTeamData(newTeam) {
    state.team = newTeam;
    renderTeam();
    console.log('✅ Team data updated');
}

console.log('%c🚀 TechLux – Premium Technology Experience', 'color: #c35ff5; font-size: 14px; font-weight: bold;');

