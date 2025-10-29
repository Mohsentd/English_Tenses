// Advanced Tenses Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    if (window.__advancedFeaturesInitialized) return;
    console.log('DOM loaded, initializing advanced features...');
    window.__advancedFeaturesInitialized = true;
    initializeAdvancedFeatures();
});

function initializeAdvancedFeatures() {
    initializeFeatureTabs();
    initializeThemeToggle();
    initializeHamburgerMenu();
    initializeFloatingThemeToggleVisibility();
}

// Feature Tab Navigation
function initializeFeatureTabs() {
    const featureTabs = document.querySelectorAll('.feature-tab');
    const featureSections = document.querySelectorAll('.feature-section');

    featureTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetFeature = this.getAttribute('data-feature');
            
            // Remove active class from all tabs and sections
            featureTabs.forEach(t => t.classList.remove('active'));
            featureSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            this.classList.add('active');
            document.getElementById(targetFeature).classList.add('active');
        });
    });
}


function showTenseModal(details) {
    // Create modal HTML
    const modalHTML = `
        <div class="tense-modal-overlay">
            <div class="tense-modal">
                <div class="tense-modal-header">
                    <h3>${details.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="tense-modal-content">
                    <p class="tense-description">${details.description}</p>
                    <div class="tense-examples">
                        <h4>Examples:</h4>
                        <ul>
                            ${details.examples.map(example => `<li>${example}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="tense-signal-words">
                        <h4>Signal Words:</h4>
                        <div class="signal-words-list">
                            ${details.signalWords.map(word => `<span class="signal-word">${word}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add event listeners
    const modal = document.querySelector('.tense-modal-overlay');
    const closeBtn = document.querySelector('.modal-close');

    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}



// Theme Toggle - now handled in hamburger menu
function initializeThemeToggle() {
    // Theme toggle is now handled in the hamburger menu
    // Just load the saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-theme') {
        document.body.classList.add('dark-theme');
    }
}


function createTenseModal(tense) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.tense-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'tense-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${tense.title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="tense-description">
                        <h3>Description</h3>
                        <p>${tense.description}</p>
                    </div>
                    
                    <div class="tense-examples">
                        <h3>Examples</h3>
                        <ul>
                            ${tense.examples.map(example => `<li>${example}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="tense-signals">
                        <h3>Signal Words</h3>
                        <div class="signal-words">
                            ${tense.signalWords.map(word => `<span class="signal-word">${word}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });

    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            modal.remove();
        }
    });

    // Add escape key listener
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Hamburger Menu Functionality
function initializeHamburgerMenu() {
    if (window.__hamburgerInitialized) return;
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const mobileFeatureTabs = document.querySelectorAll('.mobile-feature-tab');
    const featureTabs = document.querySelectorAll('.feature-tab');
    const featureSections = document.querySelectorAll('.feature-section');

    console.log('Hamburger menu elements found:', {
        hamburgerMenu: !!hamburgerMenu,
        mobileMenuOverlay: !!mobileMenuOverlay,
        mobileMenuClose: !!mobileMenuClose,
        mobileThemeToggle: !!mobileThemeToggle
    });

    // Check if required elements exist
    if (!hamburgerMenu || !mobileMenuOverlay) {
        console.error('Hamburger menu elements not found!');
        return;
    }

    // Toggle mobile menu (class-based, with scrollbar compensation)
    hamburgerMenu.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle('active');
        const nowActive = mobileMenuOverlay.classList.toggle('active');
        if (nowActive) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = scrollbarWidth + 'px';
            }
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    });

    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });

    // Theme toggle functionality
    mobileThemeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        const icon = this.querySelector('i');
        const text = this.querySelector('span');
        
        if (isDark) {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        }
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark-theme' : '');
    });

    // Mobile feature tab navigation
    mobileFeatureTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetFeature = this.getAttribute('data-feature');
            
            // Update mobile tabs
            mobileFeatureTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update desktop tabs
            featureTabs.forEach(t => t.classList.remove('active'));
            const desktopTab = document.querySelector(`.feature-tab[data-feature="${targetFeature}"]`);
            if (desktopTab) {
                desktopTab.classList.add('active');
            }
            
            // Update sections
            featureSections.forEach(s => s.classList.remove('active'));
            const targetSection = document.getElementById(targetFeature);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Close mobile menu
            closeMobileMenu();

            // After 200ms, scroll smoothly to the relevant target within the new section
            setTimeout(() => {
                if (targetSection) {
                    const tableSectionInTarget = targetSection.querySelector('.table-section');
                    const scrollTarget = tableSectionInTarget || targetSection;
                    scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 200);
        });
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-theme') {
        document.body.classList.add('dark-theme');
        const icon = mobileThemeToggle.querySelector('i');
        const text = mobileThemeToggle.querySelector('span');
        icon.className = 'fas fa-sun';
        text.textContent = 'Light Mode';
    }

    function closeMobileMenu() {
        hamburgerMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    // Sync mobile tabs with desktop tabs when switching via desktop
    featureTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetFeature = this.getAttribute('data-feature');
            const mobileTab = document.querySelector(`.mobile-feature-tab[data-feature="${targetFeature}"]`);
            if (mobileTab) {
                mobileFeatureTabs.forEach(t => t.classList.remove('active'));
                mobileTab.classList.add('active');
            }
        });
    });
    window.__hamburgerInitialized = true;
}

// Create floating theme toggle and manage visibility with feature tabs
function initializeFloatingThemeToggleVisibility() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    // Create floating theme toggle fab
    let themeFab = document.querySelector('.theme-toggle-fab');
    if (!themeFab) {
        themeFab = document.createElement('button');
        themeFab.className = 'theme-toggle-fab';
        themeFab.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(themeFab);
    }

    // Initialize icon based on current theme
    const setThemeIcon = () => {
        const isDark = document.body.classList.contains('dark-theme');
        themeFab.innerHTML = `<i class="fas ${isDark ? 'fa-sun' : 'fa-moon'}"></i>`;
    };
    setThemeIcon();

    // Click toggles theme
    themeFab.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark-theme' : '');
        setThemeIcon();
    });

    // Observer: when feature tabs are visible, show themeFab and hide hamburger; else reverse
    const featureNav = document.querySelector('.feature-nav');
    const featureTabs = document.querySelector('.feature-tabs');
    const target = featureTabs || featureNav;

    const updateVisibility = (tabsVisible) => {
        if (tabsVisible) {
            themeFab.style.display = 'flex';
            if (hamburgerMenu) hamburgerMenu.style.display = 'none';
        } else {
            themeFab.style.display = 'none';
            if (hamburgerMenu) hamburgerMenu.style.display = 'flex';
        }
    };

    if (target) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                updateVisibility(entry.isIntersecting);
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -10% 0px' });
        observer.observe(target);

        // Initial check
        const rect = target.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        updateVisibility(inView);
    } else {
        // Fallback: if no tabs found, show hamburger by default
        themeFab.style.display = 'none';
        if (hamburgerMenu) hamburgerMenu.style.display = 'flex';
    }
}
