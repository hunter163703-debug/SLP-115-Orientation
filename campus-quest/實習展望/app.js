// Main Application Logic for Taiwan Map 2 Interactive Internship Map (v4 with Video Showcase)
document.addEventListener('DOMContentLoaded', () => {
    // Exact mapping between map pin counties and city strings in HOSPITALS_DATA
    const countyCityMapping = {
        '臺北市': ['臺北市'],
        '新北市': ['新北市'],
        '桃園市': ['桃園市'],
        '新竹縣市': ['新竹市', '新竹縣'],
        '苗栗縣': ['苗栗縣'],
        '臺中市': ['臺中市'],
        '彰化縣': ['彰化縣'],
        '嘉義縣市': ['嘉義市', '嘉義縣'],
        '高雄市': ['高雄市'],
        '宜蘭縣': ['宜蘭縣']
    };

    // State Variables
    let currentCountyName = '';
    let currentCountyHospitals = [];
    let currentHospital = null;
    let currentPhotoIndex = 0;

    // DOM Elements
    const mapPins = document.querySelectorAll('.map-pin');
    
    // Step 1: County Modal Elements
    const countyModal = document.getElementById('county-modal');
    const countyModalClose = document.getElementById('county-modal-close');
    const countyModalTitle = document.getElementById('county-modal-title');
    const countyBadgeTag = document.getElementById('county-badge-tag');
    const countyHospitalList = document.getElementById('county-hospital-list');

    // Step 2: Detail Modal Elements
    const hospitalDetailModal = document.getElementById('hospital-detail-modal');
    const detailModalClose = document.getElementById('detail-modal-close');
    const backToCountyBtn = document.getElementById('back-to-county-btn');
    const detailCityTag = document.getElementById('detail-city-tag');
    const detailHospitalName = document.getElementById('detail-hospital-name');
    const detailDistrict = document.getElementById('detail-district');
    const detailPhotoCount = document.getElementById('detail-photo-count');
    
    const detailTabBtns = document.querySelectorAll('.detail-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Carousel Elements
    const carouselMainImg = document.getElementById('carousel-main-img');
    const carouselPrevBtn = document.getElementById('carousel-prev-btn');
    const carouselNextBtn = document.getElementById('carousel-next-btn');
    const carouselCounter = document.getElementById('carousel-counter');
    const thumbStrip = document.getElementById('thumb-strip');
    const infoPaperContent = document.getElementById('info-paper-content');

    // Lightbox Elements
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    // Step 3: Video Modal Elements
    const videoFabBtn = document.getElementById('video-fab-btn');
    const videoModal = document.getElementById('video-modal');
    const videoModalClose = document.getElementById('video-modal-close');
    const videoFrame = document.getElementById('video-frame');
    const videoTabBtns = document.querySelectorAll('.video-tab-btn');
    const videoCardItems = document.querySelectorAll('.video-card-item');

    // Initialize
    init();

    function init() {
        setupPinEvents();
        setupCountyModalEvents();
        setupDetailModalEvents();
        setupLightboxEvents();
        setupVideoModalEvents();
    }

    // Step 1: Pin Click Events
    function setupPinEvents() {
        mapPins.forEach(pin => {
            pin.addEventListener('click', (e) => {
                e.stopPropagation();
                const countyKey = pin.getAttribute('data-county');
                openCountyModal(countyKey);
            });
        });
    }

    function openCountyModal(countyKey) {
        currentCountyName = countyKey;
        const targetCities = countyCityMapping[countyKey] || [countyKey];
        
        // Filter hospitals for this county
        currentCountyHospitals = HOSPITALS_DATA.filter(h => targetCities.includes(h.city));

        countyBadgeTag.textContent = countyKey;
        countyModalTitle.innerHTML = `<i class="fa-solid fa-map-pin"></i> ${countyKey} 實習醫院 (${currentCountyHospitals.length} 家)`;

        // Render hospital cards inside county modal
        countyHospitalList.innerHTML = '';
        currentCountyHospitals.forEach(h => {
            const item = document.createElement('div');
            item.className = 'county-hospital-item';
            item.innerHTML = `
                <div>
                    <div class="hospital-item-title">${h.name}</div>
                    <div class="hospital-item-sub"><i class="fa-solid fa-location-dot"></i> ${h.city} ${h.district} • ${h.photos.length} 張環境照片</div>
                </div>
                <div class="hospital-item-action">
                    檢視特色與照片 <i class="fa-solid fa-chevron-right"></i>
                </div>
            `;
            item.addEventListener('click', () => {
                openHospitalDetailModal(h);
            });
            countyHospitalList.appendChild(item);
        });

        countyModal.style.display = 'flex';
    }

    function setupCountyModalEvents() {
        countyModalClose.addEventListener('click', () => {
            countyModal.style.display = 'none';
        });
        countyModal.addEventListener('click', (e) => {
            if (e.target === countyModal) {
                countyModal.style.display = 'none';
            }
        });
    }

    // Step 2: Hospital Detail Modal Events
    function openHospitalDetailModal(hospital) {
        currentHospital = hospital;
        currentPhotoIndex = 0;

        // Hide county modal, show detail modal
        countyModal.style.display = 'none';

        detailCityTag.textContent = `${hospital.city} ${hospital.region}區`;
        detailHospitalName.textContent = hospital.name;
        detailDistrict.textContent = `${hospital.city} ${hospital.district}`;
        detailPhotoCount.textContent = hospital.photos.length;

        // Activate Photos Tab by default
        detailTabBtns[0].click();

        // Setup Carousel & Info
        setupThumbnails(hospital.photos);
        updateCarousel();
        renderFormattedInfo(hospital.info_text);

        hospitalDetailModal.style.display = 'flex';
    }

    function setupDetailModalEvents() {
        detailModalClose.addEventListener('click', () => {
            hospitalDetailModal.style.display = 'none';
        });

        backToCountyBtn.addEventListener('click', () => {
            hospitalDetailModal.style.display = 'none';
            countyModal.style.display = 'flex'; // Return to county selection modal
        });

        hospitalDetailModal.addEventListener('click', (e) => {
            if (e.target === hospitalDetailModal) {
                hospitalDetailModal.style.display = 'none';
            }
        });

        // Tab Switching
        detailTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                detailTabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                btn.classList.add('active');
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(`tab-${tabId}`).classList.add('active');
            });
        });

        // Carousel Prev / Next
        carouselPrevBtn.addEventListener('click', () => {
            if (currentHospital && currentHospital.photos.length > 0) {
                currentPhotoIndex = (currentPhotoIndex - 1 + currentHospital.photos.length) % currentHospital.photos.length;
                updateCarousel();
            }
        });
        carouselNextBtn.addEventListener('click', () => {
            if (currentHospital && currentHospital.photos.length > 0) {
                currentPhotoIndex = (currentPhotoIndex + 1) % currentHospital.photos.length;
                updateCarousel();
            }
        });
    }

    function setupThumbnails(photos) {
        thumbStrip.innerHTML = '';
        photos.forEach((photoUrl, idx) => {
            const thumb = document.createElement('div');
            thumb.className = `thumb-box ${idx === 0 ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${photoUrl}" alt="縮圖 ${idx+1}">`;
            thumb.addEventListener('click', () => {
                currentPhotoIndex = idx;
                updateCarousel();
            });
            thumbStrip.appendChild(thumb);
        });
    }

    function updateCarousel() {
        if (!currentHospital || currentHospital.photos.length === 0) return;

        const photoUrl = currentHospital.photos[currentPhotoIndex];
        carouselMainImg.src = photoUrl;
        carouselCounter.textContent = `環境照片 ${currentPhotoIndex + 1} / ${currentHospital.photos.length}`;

        // Highlight active thumbnail
        const thumbs = thumbStrip.querySelectorAll('.thumb-box');
        thumbs.forEach((t, i) => {
            if (i === currentPhotoIndex) {
                t.classList.add('active');
                t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                t.classList.remove('active');
            }
        });
    }

    // Clean Info Paper Formatting (No Page Numbers displayed)
    function renderFormattedInfo(text) {
        if (!text) {
            infoPaperContent.innerHTML = '<p>無詳細特色內容</p>';
            return;
        }

        let lines = text.split('\n');
        let html = '';

        lines.forEach(line => {
            let trimmed = line.trim();
            if (!trimmed) return;

            // Remove any residual page refs
            if (trimmed.startsWith('--- 實習介紹投影片') || trimmed.startsWith('[第') || (trimmed.startsWith('第') && trimmed.endsWith('頁'))) {
                return;
            }

            if (trimmed.startsWith('【實習單位名稱】')) {
                html += `<h3><i class="fa-solid fa-hospital"></i> ${trimmed.replace('【實習單位名稱】', '')}</h3>`;
            } else if (trimmed.includes('優點') || trimmed.includes('特色')) {
                html += `<p style="color: #34D399; font-weight: 600; margin-top: 10px;"><i class="fa-regular fa-circle-check"></i> ${trimmed}</p>`;
            } else if (trimmed.includes('限制') || trimmed.includes('缺點')) {
                html += `<p style="color: #FBBF24; font-weight: 600; margin-top: 10px;"><i class="fa-solid fa-triangle-exclamation"></i> ${trimmed}</p>`;
            } else if (trimmed.includes('感想') || trimmed.includes('心得') || trimmed.includes('勉勵') || trimmed.includes('建議')) {
                html += `<p style="color: #60A5FA; font-weight: 600; margin-top: 10px;"><i class="fa-regular fa-comment-dots"></i> ${trimmed}</p>`;
            } else {
                html += `<p>${trimmed}</p>`;
            }
        });

        infoPaperContent.innerHTML = html;
    }

    // Lightbox Control
    function setupLightboxEvents() {
        carouselMainImg.addEventListener('click', () => {
            if (carouselMainImg.src) {
                lightboxImg.src = carouselMainImg.src;
                lightboxModal.style.display = 'flex';
            }
        });

        lightboxClose.addEventListener('click', () => {
            lightboxModal.style.display = 'none';
        });
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
            }
        });
    }

    // Step 3: Video Showcase Modal Events
    function setupVideoModalEvents() {
        if (!videoFabBtn || !videoModal) return;

        // Open video modal
        videoFabBtn.addEventListener('click', () => {
            videoModal.style.display = 'flex';
            setVideo('eQmVLwpuL7M'); // Default to video 1
        });

        // Close video modal
        videoModalClose.addEventListener('click', closeVideoModal);
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });

        // Video Tab switcher
        videoTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const vid = btn.getAttribute('data-vid');
                setVideo(vid);
            });
        });

        // Video Playlist Card switcher
        videoCardItems.forEach(card => {
            card.addEventListener('click', () => {
                const vid = card.getAttribute('data-vid');
                setVideo(vid);
            });
        });
    }

    function setVideo(vid) {
        if (!vid || !videoFrame) return;
        // Use youtube-nocookie embed with enablejsapi
        videoFrame.src = `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0&enablejsapi=1`;

        // Update external link
        const externalYtLink = document.getElementById('external-yt-link');
        if (externalYtLink) {
            externalYtLink.href = `https://youtu.be/${vid}`;
        }

        // Update active tab button
        videoTabBtns.forEach(b => {
            if (b.getAttribute('data-vid') === vid) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        // Update active card
        videoCardItems.forEach(c => {
            if (c.getAttribute('data-vid') === vid) {
                c.classList.add('active');
            } else {
                c.classList.remove('active');
            }
        });
    }

    function closeVideoModal() {
        if (!videoModal) return;
        videoModal.style.display = 'none';
        if (videoFrame) {
            videoFrame.src = ''; // Stop playback immediately
        }
    }
});
