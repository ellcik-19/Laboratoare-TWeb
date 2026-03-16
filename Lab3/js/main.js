// js/main.js
// ========================================
// FUNCȚII PENTRU TOATE PAGINILE
// ========================================

(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initScrollTop();
        initGallery();
        initImageCarousel();
        initAgeCalculator();
        initWhaleFilter();
        initQuickQuiz();
        highlightActiveNav();
    }

// ========================================
// 2. BUTON SUS (pentru TOATE paginile)
// ========================================
function initScrollTop() {
    // Previne dubla inițializare
    if (document.querySelector('.scroll-top')) return;
    
    // Creează butonul
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Derulează sus');
    scrollBtn.setAttribute('title', 'Derulează sus');
    
    // Adaugă în body
    document.body.appendChild(scrollBtn);
    
    // Ascunde/afișează la scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Click eveniment - duce sus cu animație
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Afișează butonul dacă pagina e deja derulată la încărcare
    if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
    }
}

    // ========================================
    // 3. CARUSEL IMAGINI
    // ========================================
    function initImageCarousel() {
        if (!document.querySelector('.gallery-section')) return;
        
        // Array cu imagini pentru carusel
        const carouselImages = [
            { src: '../Lab2/img/img20.webp', caption: 'Balena albă cu cocoașă' },
            { src: '../Lab2/img/img22.jpg', caption: 'Balena albastră' },
            { src: '../Lab2/img/img21.jpg', caption: 'Balena în larg' },
            { src: '../Lab2/img/img1.jpg', caption: 'Orca - lupul mărilor' },
            { src: '../Lab2/img/img2.jpg', caption: 'Balena cu cocoașă sărind' },
            { src: '../Lab2/img/img3.jpg', caption: 'Balena albastră înotând' },
            { src: '../Lab2/img/img4.jpg', caption: 'Balena în apă' },
            { src: '../Lab2/img/img5.jpg', caption: 'Beluga - balena albă' },
            { src: '../Lab2/img/img6.avif', caption: 'Orca sărind' },
            { src: '../Lab2/img/img7.jpg', caption: 'Cașalotul' },
            { src: '../Lab2/img/img8.webp', caption: 'Narvalul - unicornul mării' },
            { src: '../Lab2/img/img9.jpg', caption: 'Beluga' },
            { src: '../Lab2/img/img10.webp', caption: 'Balena comună' },
            { src: '../Lab2/img/img11.jpg', caption: 'Balena minke' },
            { src: '../Lab2/img/img16.jpg', caption: 'Balena albastră' },
            { src: '../Lab2/img/img17.jpg', caption: 'Balena cu cocoașă' },
            { src: '../Lab2/img/img18.jpg', caption: 'Balena minke' },
            { src: '../Lab2/img/img19.jpg', caption: 'Cașalotul' },
            { src: '../Lab3/img/img23.jpg', caption: 'Balena albastră' },
            { src: '../Lab3/img/img24.jpg', caption: 'Balena cu cocoașă' },
            { src: '../Lab3/img/img25.jpg', caption: 'Balena albastră' },
            { src: '../Lab3/img/img26.jpg', caption: 'Balena cu cocoașă' },
            { src: '../Lab3/img/img27.webp', caption: 'Balena albastră și puiul ei' },
            { src: '../Lab3/img/img28.webp', caption: 'Orca' },
            { src: '../Lab3/img/img29.jpg', caption: 'Balena albă cu cocoașă și puiul ei' },
            { src: '../Lab3/img/img30.webp', caption: 'Balena cu cocoașă' },
            { src: '../Lab3/img/img31.jpg', caption: 'Balena albastră' },
            { src: '../Lab3/img/img32.jpg', caption: 'Balena minke' },
            { src: '../Lab3/img/img33.jpg', caption: 'Narvali' },
            { src: '../Lab3/img/img34.jpg', caption: 'Narvali' }
        ];
        
        // Creează structura caruselului
        const gallerySection = document.querySelector('.gallery-section');
        const oldGallery = document.querySelector('.gallery-grid');
        
        if (oldGallery) {
            oldGallery.remove();
        }
        
        const carouselHTML = `
            <div class="carousel-container">
                <div class="carousel-header">
                    <h2 class="section-title"><i class="fas fa-camera"></i> Galerie foto</h2>
                </div>
                
                <div class="carousel-main">
                    <button class="carousel-nav carousel-prev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    
                    <div class="carousel-wrapper">
                        <div class="carousel-track">
                            ${carouselImages.map((img, index) => `
                                <div class="carousel-slide" data-index="${index}">
                                    <img src="${img.src}" alt="${img.caption}" loading="lazy">
                                    <div class="carousel-caption">${img.caption}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <button class="carousel-nav carousel-next">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                
                <div class="carousel-thumbnails">
                    ${carouselImages.slice(0, 8).map((img, index) => `
                        <div class="thumbnail" data-index="${index}">
                            <img src="${img.src}" alt="${img.caption}" loading="lazy">
                        </div>
                    `).join('')}
                    <button class="show-more-btn">
                        <i class="fas fa-ellipsis-h"></i> Vezi toate
                    </button>
                </div>
            </div>
        `;
        
        gallerySection.innerHTML = carouselHTML;
        
        // Variabile carusel
        const track = document.querySelector('.carousel-track');
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const showMoreBtn = document.querySelector('.show-more-btn');
        
        let currentIndex = 0;
        let slidesPerView = 3;
        
        // Determină câte slide-uri sunt vizibile în funcție de ecran
        function getSlidesPerView() {
            if (window.innerWidth < 768) return 1;
            if (window.innerWidth < 1024) return 2;
            return 3;
        }
        
        // Actualizează poziția caruselului
        function updateCarousel() {
            slidesPerView = getSlidesPerView();
            const slideWidth = 100 / slidesPerView;
            
            slides.forEach(slide => {
                slide.style.flex = `0 0 ${slideWidth}%`;
            });
            
            track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
            
            // Activează thumbnail-ul curent
            thumbnails.forEach(thumb => {
                thumb.classList.remove('active');
            });
            document.querySelector(`.thumbnail[data-index="${currentIndex}"]`)?.classList.add('active');
        }
        
        // Evenimente butoane
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = slides.length - slidesPerView;
            }
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - slidesPerView) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        });
        
        // Click pe thumbnail
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                if (index <= slides.length - slidesPerView) {
                    currentIndex = index;
                } else {
                    currentIndex = slides.length - slidesPerView;
                }
                updateCarousel();
            });
        });
        
        // Click pe imagine - deschide modal
        slides.forEach(slide => {
            slide.addEventListener('click', function() {
                const img = this.querySelector('img');
                const caption = this.querySelector('.carousel-caption').textContent;
                
                const modal = document.createElement('div');
                modal.className = 'gallery-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="modal-close">&times;</span>
                        <img src="${img.src}" alt="${img.alt}">
                        <p class="modal-caption">${caption}</p>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) modal.remove();
                });
            });
        });
        
        // Buton "Vezi toate" - arată toate thumbnail-urile
        let showingAll = false;
        showMoreBtn.addEventListener('click', function() {
            const thumbnailsContainer = document.querySelector('.carousel-thumbnails');
            
            if (!showingAll) {
                // Arată toate thumbnail-urile
                const allThumbnailsHTML = carouselImages.map((img, index) => `
                    <div class="thumbnail" data-index="${index}">
                        <img src="${img.src}" alt="${img.caption}" loading="lazy">
                    </div>
                `).join('');
                
                thumbnailsContainer.innerHTML = allThumbnailsHTML + '<button class="show-less-btn"><i class="fas fa-chevron-up"></i> Arată mai puțin</button>';
                
                // Reactivează click pe thumbnail-uri
                document.querySelectorAll('.thumbnail').forEach(thumb => {
                    thumb.addEventListener('click', function() {
                        const index = parseInt(this.dataset.index);
                        if (index <= slides.length - slidesPerView) {
                            currentIndex = index;
                        } else {
                            currentIndex = slides.length - slidesPerView;
                        }
                        updateCarousel();
                    });
                });
                
                document.querySelector('.show-less-btn').addEventListener('click', function() {
                    // Revenire la primele 8 thumbnail-uri
                    const limitedThumbnailsHTML = carouselImages.slice(0, 8).map((img, index) => `
                        <div class="thumbnail" data-index="${index}">
                            <img src="${img.src}" alt="${img.caption}" loading="lazy">
                        </div>
                    `).join('');
                    
                    thumbnailsContainer.innerHTML = limitedThumbnailsHTML + '<button class="show-more-btn"><i class="fas fa-ellipsis-h"></i> Vezi toate</button>';
                    
                    // Reactivează evenimentele
                    document.querySelectorAll('.thumbnail').forEach(thumb => {
                        thumb.addEventListener('click', function() {
                            const index = parseInt(this.dataset.index);
                            if (index <= slides.length - slidesPerView) {
                                currentIndex = index;
                            } else {
                                currentIndex = slides.length - slidesPerView;
                            }
                            updateCarousel();
                        });
                    });
                    
                    document.querySelector('.show-more-btn').addEventListener('click', initImageCarousel);
                });
                
                showingAll = true;
            }
        });
        
        // Actualizează la redimensionare
        window.addEventListener('resize', updateCarousel);
        updateCarousel();
        
        // Auto-play opțional
        let autoPlay = setInterval(() => {
            if (currentIndex < slides.length - slidesPerView) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000);
        
        // Oprește auto-play la hover
        document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
            clearInterval(autoPlay);
        });
        
        document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
            autoPlay = setInterval(() => {
                if (currentIndex < slides.length - slidesPerView) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateCarousel();
            }, 5000);
        });
    }
    function initGallery() {
    }

    // ========================================
    // 4. CALCULATOR VÂRSTĂ
    // ========================================
    function initAgeCalculator() {
        if (!document.querySelector('.gallery-section')) return;
        if (document.querySelector('.age-calculator')) return;
        
        // Creează calculatorul
        const calculator = document.createElement('div');
        calculator.className = 'age-calculator';
        calculator.innerHTML = `
            <h3 class="calculator-title">
                <i class="fas fa-calculator"></i> Calculator vârstă balenă
            </h3>
            <div class="calculator-form">
                <label for="userAge">Introdu vârsta ta (ani):</label>
                <input type="number" id="userAge" class="calculator-input" 
                       placeholder="ex: 25" min="1" max="120" step="1">
                <button id="calculateBtn" class="calculator-btn">
                    <i class="fas fa-calculator"></i> Calculează
                </button>
                <div class="calculator-result"></div>
            </div>
        `;
        
        // Inserează calculatorul DUPĂ galerie
        const gallerySection = document.querySelector('.gallery-section');
        gallerySection.parentNode.insertBefore(calculator, gallerySection.nextSibling);
        
        // Adaugă funcționalitate
        const calculateBtn = document.getElementById('calculateBtn');
        const userAgeInput = document.getElementById('userAge');
        const resultDiv = document.querySelector('.calculator-result');
        
        function calculateAge() {
            const age = parseInt(userAgeInput.value);
            
            if (!age || isNaN(age)) {
                resultDiv.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i> 
                    Te rog introdu o vârstă validă
                `;
                resultDiv.style.color = '#e74c3c';
                resultDiv.classList.add('show');
                return;
            }
            
            if (age < 1 || age > 120) {
                resultDiv.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i> 
                    Vârsta trebuie să fie între 1 și 120 de ani
                `;
                resultDiv.style.color = '#e74c3c';
                resultDiv.classList.add('show');
                return;
            }
            
            // Calculează vârsta în ani de balenă
            let whaleAge;
            if (age <= 20) {
                whaleAge = Math.round(age * 2.5); // Copii cresc mai repede
            } else if (age <= 50) {
                whaleAge = Math.round(20 * 2.5 + (age - 20) * 1.2);
            } else {
                whaleAge = Math.round(20 * 2.5 + 30 * 1.2 + (age - 50) * 0.8);
            }
            
            // Asigură că nu depășește 150 (vârsta maximă a balenelor)
            whaleAge = Math.min(whaleAge, 150);
            
            // Mesaj personalizat
            let message = '';
            if (whaleAge < 10) {
                message = '🐋 Ești un pui de balenă!';
            } else if (whaleAge < 30) {
                message = '🐋 Ești o balenă tânără!';
            } else if (whaleAge < 60) {
                message = '🐋 Ești o balenă adultă!';
            } else if (whaleAge < 100) {
                message = '🐋 Ești o balenă bătrână și înțeleaptă!';
            } else {
                message = '🐋 Ești o balenă străveche!';
            }
            
            resultDiv.innerHTML = `
                <i class="fas fa-check-circle"></i> 
                <strong>${whaleAge} ani balenă</strong><br>
                <span style="font-size: 0.9rem; margin-top: 5px; display: block;">${message}</span>
            `;
            resultDiv.style.color = '#27ae60';
            resultDiv.classList.add('show');
        }
        
        calculateBtn.addEventListener('click', calculateAge);
        
        userAgeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateAge();
            }
        });
        
        // Validare input - doar numere
        userAgeInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }


    // ========================================
    // 6. FILTRU TIPURI BALENE
    // ========================================
    function initWhaleFilter() {
        if (!window.location.href.includes('tipuridebalene')) return;
        if (document.querySelector('.filter-buttons')) return;
        
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-buttons';
        filterContainer.innerHTML = `
            <button class="filter-btn active" data-filter="all">Toate balenele</button>
            <button class="filter-btn" data-filter="baleen">Balene cu fanoane</button>
            <button class="filter-btn" data-filter="toothed">Balene cu dinți</button>
        `;
        
        const baleenSection = document.querySelector('.baleen-section');
        const toothedSection = document.querySelector('.toothed-section');
        
        if (baleenSection && toothedSection) {
            document.querySelector('.whale-section').parentNode.insertBefore(
                filterContainer, 
                document.querySelector('.whale-section')
            );
            
            filterContainer.addEventListener('click', function(e) {
                if (!e.target.classList.contains('filter-btn')) return;
                
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                const filter = e.target.dataset.filter;
                
                if (filter === 'all') {
                    baleenSection.style.display = 'block';
                    toothedSection.style.display = 'block';
                } else if (filter === 'baleen') {
                    baleenSection.style.display = 'block';
                    toothedSection.style.display = 'none';
                } else if (filter === 'toothed') {
                    baleenSection.style.display = 'none';
                    toothedSection.style.display = 'block';
                }
            });
        }
    }

    /// ========================================
// 7. QUIZ INTERACTIV (cu întrebări random)
// ========================================
function initQuickQuiz() {
    if (!window.location.href.includes('protejareabal')) return;
    if (document.querySelector('.interactive-quiz')) return;
    
    // Baza de date cu 20 de întrebări
    const questionBank = [
        {
            question: "Cât poate cântări o balenă albastră?",
            options: ["10 tone", "150 tone", "50 tone", "500 tone"],
            correct: 1
        },
        {
            question: "Care dintre acestea este o amenințare principală pentru balene?",
            options: ["Prea multă hrană", "Coliziunile cu navele", "Apa prea caldă", "Prea mulți pești"],
            correct: 1
        },
        {
            question: "În ce an s-a interzis vânătoarea comercială de balene?",
            options: ["1946", "1986", "2000", "1975"],
            correct: 1
        },
        {
            question: "Câți kilometri pot migra balenele într-un an?",
            options: ["5.000 km", "10.000 km", "25.000 km", "50.000 km"],
            correct: 2
        },
        {
            question: "Ce putem face fiecare pentru a proteja balenele?",
            options: ["Să aruncăm plastic în mare", "Să susținem organizații de protecție", "Să vânăm balene", "Să facem zgomot în ocean"],
            correct: 1
        },
        {
            question: "Cât de adânc se poate scufunda un cașalot?",
            options: ["100 metri", "500 metri", "peste 1000 metri", "100 metri"],
            correct: 2
        },
        {
            question: "Ce sunt fanoanele?",
            options: ["Dinții balenelor", "Plăci pentru filtrarea hranei", "Aripioarele", "Ochii balenelor"],
            correct: 1
        },
        {
            question: "Care balenă este cunoscută pentru 'cântecele' ei?",
            options: ["Balena albastră", "Balena cu cocoașă", "Orca", "Narvalul"],
            correct: 1
        },
        {
            question: "Cât timp poate sta un cașalot sub apă fără să respire?",
            options: ["10 minute", "30 minute", "peste 90 minute", "2 minute"],
            correct: 2
        },
        {
            question: "Ce mănâncă balena albastră?",
            options: ["Pești mari", "Krill", "Foci", "Pinguini"],
            correct: 1
        },
        {
            question: "Unde trăiește narvalul?",
            options: ["Oceanul Atlantic", "Oceanul Arctic", "Oceanul Pacific", "Marea Mediterană"],
            correct: 1
        },
        {
            question: "Câți dinți are narvalul?",
            options: ["0", "2", "30", "100"],
            correct: 0
        },
        {
            question: "Care este cea mai mare balenă cu dinți?",
            options: ["Orca", "Cașalotul", "Beluga", "Narvalul"],
            correct: 1
        },
        {
            question: "Cât de repede poate înota o balenă comună (Fin whale)?",
            options: ["10 km/h", "25 km/h", "40 km/h", "60 km/h"],
            correct: 2
        },
        {
            question: "Ce culoare are beluga?",
            options: ["Neagră", "Gri", "Albă", "Albastră"],
            correct: 2
        },
        {
            question: "Câți litri de lapte bea zilnic un pui de balenă albastră?",
            options: ["50 litri", "200 litri", "400 litri", "1000 litri"],
            correct: 2
        },
        {
            question: "Ce este Comisia Internațională pentru Vânătoarea Balenelor (IWC)?",
            options: ["Organizație care vânează balene", "Organizație care protejează balenele", "Club de înot", "Fabrică de conserve"],
            correct: 1
        },
        {
            question: "Câte specii de balene există aproximativ?",
            options: ["20", "90", "200", "500"],
            correct: 1
        },
        {
            question: "Ce este un 'pod' de balene?",
            options: ["Un grup de balene", "Un tip de balenă", "Un instrument", "Un dans"],
            correct: 0
        },
        {
            question: "Cum se numește colțul lung al narvalului?",
            options: ["Fanon", "Defensă", "Mamut", "Corn"],
            correct: 1
        }
    ];
    
    // Selectează 5 întrebări random din bancă
    function getRandomQuestions(count) {
        const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    let quizQuestions = getRandomQuestions(5);
    let currentQuestion = 0;
    let score = 0;
    
    const quizContainer = document.createElement('div');
    quizContainer.className = 'interactive-quiz';
    
    // Găsește secțiunea "Despre protecția balenelor"
    const factsSection = document.querySelector('.facts-section');
    const ctaContainer = document.querySelector('.cta-container');
    
    if (factsSection) {
        if (ctaContainer) {
            factsSection.parentNode.insertBefore(quizContainer, ctaContainer);
        } else {
            factsSection.parentNode.insertBefore(quizContainer, factsSection.nextSibling);
        }
    } else {
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.parentNode.insertBefore(quizContainer, footer);
        }
    }
    
    // Funcție pentru a reîncărca quiz-ul cu întrebări noi
    function reloadQuiz() {
        quizQuestions = getRandomQuestions(5);
        currentQuestion = 0;
        score = 0;
        showQuestion(0);
    }
    
    function showQuestion(index) {
        const q = quizQuestions[index];
        
        quizContainer.innerHTML = `
            <h3 class="quiz-main-title">
                <i class="fas fa-question-circle"></i> Testează-ți cunoștințele despre balene
            </h3>
            
            <div class="quiz-progress">
                <div class="progress-bar" style="width: ${((index + 1) / quizQuestions.length) * 100}%"></div>
            </div>
            
            <div class="quiz-counter">
                Întrebarea ${index + 1} din ${quizQuestions.length}
            </div>
            
            <div class="quiz-card">
                <p class="quiz-question">${q.question}</p>
                
                <div class="quiz-options-grid">
                    ${q.options.map((opt, i) => `
                        <button class="quiz-option" data-option="${i}">
                            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                
                <div class="quiz-feedback"></div>
            </div>
            
            <div class="quiz-score">
                Scor: <span class="score-value">${score}</span> / ${quizQuestions.length}
            </div>
        `;
        
        quizContainer.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', function() {
                const selectedOption = parseInt(this.dataset.option);
                const isCorrect = (selectedOption === q.correct);
                const feedback = quizContainer.querySelector('.quiz-feedback');
                
                quizContainer.querySelectorAll('.quiz-option').forEach(b => {
                    b.disabled = true;
                });
                
                quizContainer.querySelectorAll('.quiz-option').forEach((b, i) => {
                    if (i === q.correct) {
                        b.classList.add('correct');
                    } else if (i === selectedOption && !isCorrect) {
                        b.classList.add('incorrect');
                    }
                });
                
                if (isCorrect) {
                    score++;
                    feedback.innerHTML = `
                        <i class="fas fa-check-circle"></i> 
                        Corect! ${q.options[q.correct]} este răspunsul corect.
                    `;
                    feedback.className = 'quiz-feedback correct-feedback';
                } else {
                    feedback.innerHTML = `
                        <i class="fas fa-times-circle"></i> 
                        Greșit! Răspunsul corect este: ${q.options[q.correct]}
                    `;
                    feedback.className = 'quiz-feedback incorrect-feedback';
                }
                
                quizContainer.querySelector('.score-value').textContent = score;
                
                setTimeout(() => {
                    if (index < quizQuestions.length - 1) {
                        const nextBtn = document.createElement('button');
                        nextBtn.className = 'next-question-btn';
                        nextBtn.innerHTML = 'Următoarea întrebare <i class="fas fa-arrow-right"></i>';
                        
                        feedback.parentNode.appendChild(nextBtn);
                        
                        nextBtn.addEventListener('click', () => {
                            currentQuestion++;
                            showQuestion(currentQuestion);
                        });
                    } else {
                        const percentage = Math.round((score / quizQuestions.length) * 100);
                        let message = '';
                        let icon = '';
                        
                        if (percentage === 100) {
                            message = 'Excelent! Știi totul despre balene! 🐋';
                            icon = 'fa-star';
                        } else if (percentage >= 80) {
                            message = 'Foarte bine! Mai ai puțin și devii expert! 🌊';
                            icon = 'fa-smile';
                        } else if (percentage >= 60) {
                            message = 'Bine! Mai ai de învățat, dar ești pe drumul cel bun! 📚';
                            icon = 'fa-book';
                        } else {
                            message = 'Poți învăța mai multe despre balene din acest site! 🐳';
                            icon = 'fa-heart';
                        }
                        
                        const resultDiv = document.createElement('div');
                        resultDiv.className = 'quiz-result';
                        resultDiv.innerHTML = `
                            <i class="fas ${icon} result-icon"></i>
                            <h4>Quiz complet!</h4>
                            <p>Scorul tău: ${score} / ${quizQuestions.length} (${percentage}%)</p>
                            <p class="result-message">${message}</p>
                            <div class="quiz-result-buttons">
                                <button class="restart-quiz-btn">
                                    <i class="fas fa-redo"></i> Începe din nou
                                </button>
                                <button class="new-quiz-btn">
                                    <i class="fas fa-random"></i> Întrebări noi
                                </button>
                            </div>
                        `;
                        
                        feedback.parentNode.appendChild(resultDiv);
                        
                        resultDiv.querySelector('.restart-quiz-btn').addEventListener('click', () => {
                            currentQuestion = 0;
                            score = 0;
                            showQuestion(0);
                        });
                        
                        resultDiv.querySelector('.new-quiz-btn').addEventListener('click', () => {
                            reloadQuiz();
                        });
                    }
                }, 1000);
            });
        });
    }
    
    showQuestion(0);
}
})();