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
    initializeSignalWords();
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

// Signal Words Functionality
function initializeSignalWords() {
    // Mapping of examples for each signal word
    const signalWordExamples = {
        // Past Simple
        'yesterday': 'I went to the store <strong>yesterday</strong>.',
        'last week': 'She visited her grandmother <strong>last week</strong>.',
        'ago': 'We moved to this city three years <strong>ago</strong>.',
        'in 2020': 'The pandemic started <strong>in 2020</strong>.',
        'then': 'I lived in London <strong>then</strong>, but now I live in Paris.',
        'when': 'I finished my homework <strong>when</strong> you called.',
        'when:simple': 'I finished my homework <strong>when</strong> you called.',
        
        // Past Continuous
        'while:past continuous': 'I was reading <strong>while</strong> it was raining outside.',
        'when:past continuous': 'I was studying <strong>when</strong> you called me.',
        'when:continuous': 'I was studying <strong>when</strong> you called me.',
        'at 3 PM:past continuous': 'She was working <strong>at 3 PM</strong> yesterday.',
        'at 3 PM': 'She was working <strong>at 3 PM</strong> yesterday.',
        'all morning': 'They were playing soccer <strong>all morning</strong>.',
        'during:past continuous': 'I was sleeping <strong>during</strong> the storm.',
        'as': 'The lights went out <strong>as</strong> I was watching TV.',
        
        // Past Perfect
        'before:past perfect': 'I had finished my homework <strong>before</strong> you arrived.',
        'just:past perfect': 'I had <strong>just</strong> sat down when the phone rang.',
        'never:past perfect': 'I had <strong>never</strong> seen snow before that trip.',
        'before:perfect': 'I had finished my homework <strong>before</strong> you arrived.',
        'before': 'I had finished my homework <strong>before</strong> you arrived.',
        'after': '<strong>After</strong> I had eaten, I went for a walk.',
        'already': 'She had <strong>already</strong> left when I got there.',
        'by the time': '<strong>By the time</strong> I arrived, the movie had started.',
        'until:past perfect': 'I had waited <strong>until</strong> you called me.',
        'until': 'I had waited <strong>until</strong> you called me.',
        'when:past perfect': 'I had just finished eating <strong>when</strong> the doorbell rang.',
        'when:perfect': 'I had just finished eating <strong>when</strong> the doorbell rang.',
        
        // Past Perfect Continuous
        'for:past perfect continuous': 'I had been studying <strong>for</strong> three hours before the exam.',
        'for:perfect continuous': 'I had been studying <strong>for</strong> three hours before the exam.',
        'for': 'I had been studying <strong>for</strong> three hours before the exam.',
        'since:past perfect continuous': 'He had been working there <strong>since</strong> 2010.',
        'since:perfect continuous': 'He had been working there <strong>since</strong> 2010.',
        'since': 'He had been working there <strong>since</strong> 2010.',
        'all day:past perfect continuous': 'It had been raining <strong>all day</strong> before the sun came out.',
        'all day': 'It had been raining <strong>all day</strong> before the sun came out.',
        'how long:past perfect continuous': '<strong>How long</strong> had you been waiting when I arrived?',
        'how long': '<strong>How long</strong> had you been waiting when I arrived?',
        'before:past perfect continuous': 'I had been running <strong>before</strong> I twisted my ankle.',
        'before:perfect continuous': 'I had been running <strong>before</strong> I twisted my ankle.',
        'when:past perfect continuous': 'I had been working for hours <strong>when</strong> the power went out.',
        'when:perfect continuous': 'I had been working for hours <strong>when</strong> the power went out.',
        
        // Present Simple
        'always': 'I <strong>always</strong> brush my teeth before bed.',
        'seldom': 'She <strong>seldom</strong> eats out.',
        'usually': 'She <strong>usually</strong> takes the bus to work.',
        'often': 'We <strong>often</strong> go to the park on weekends.',
        'sometimes': 'I <strong>sometimes</strong> forget to lock the door.',
        'never': 'He <strong>never</strong> complains about his job.',
        'every day': 'I exercise <strong>every day</strong> to stay healthy.',
        
        // Present Continuous
        'now': 'I am studying <strong>now</strong> for my exam tomorrow.',
        'at the moment': 'She is working <strong>at the moment</strong>, so she can\'t talk.',
        'currently': 'They are <strong>currently</strong> renovating their house.',
        'right now': 'I am cooking dinner <strong>right now</strong>.',
        'today': 'We are working on the project <strong>today</strong>.',
        'this week': 'I am studying hard <strong>this week</strong> for my exams.',
        
        // Present Perfect
        'already': 'I have <strong>already</strong> finished my homework.',
        'just': 'I have <strong>just</strong> arrived at the airport.',
        'yet': 'Have you finished your report <strong>yet</strong>?',
        'ever': 'Have you <strong>ever</strong> been to Paris?',
        'never': 'I have <strong>never</strong> seen such a beautiful sunset.',
        'since': 'I have lived here <strong>since</strong> 2015.',
        'since:perfect': 'I have lived here <strong>since</strong> 2015.',
        'for': 'I have lived here <strong>for</strong> five years.',
        'for:perfect': 'I have lived here <strong>for</strong> five years.',
        'so far': 'We have finished three chapters <strong>so far</strong>.',
        'up to now': 'I have learned a lot <strong>up to now</strong>.',
        'recently:perfect': 'I have improved my English <strong>recently</strong>.',
        'recently': 'I have improved my English <strong>recently</strong>.',
        'for': 'I have lived here <strong>for</strong> five years.',
        'for:perfect': 'I have lived here <strong>for</strong> five years.',
        
        // Present Perfect Continuous
        'for:present perfect continuous': 'I have been studying <strong>for</strong> two hours.',
        'for:perfect continuous': 'I have been studying <strong>for</strong> two hours.',
        'since:present perfect continuous': 'She has been working here <strong>since</strong> January.',
        'since:perfect continuous': 'She has been working here <strong>since</strong> January.',
        'all day:present perfect continuous': 'It has been raining <strong>all day</strong>.',
        'the whole day:present perfect continuous': 'I have been studying <strong>the whole day</strong>.',
        'the whole day': 'I have been studying <strong>the whole day</strong>.',
        'all day': 'It has been raining <strong>all day</strong>.',
        'lately': 'I have been feeling tired <strong>lately</strong>.',
        'recently': 'He has been exercising more <strong>recently</strong>.',
        'how long:present perfect continuous': '<strong>How long</strong> have you been learning English?',
        'how long:perfect continuous': '<strong>How long</strong> have you been learning English?',
        
        // Future Simple
        'tomorrow': 'I will meet you <strong>tomorrow</strong> at the coffee shop.',
        'next week': 'We will travel to Japan <strong>next week</strong>.',
        'will': 'I <strong>will</strong> help you with your homework.',
        'shall': '<strong>Shall</strong> I open the window for you?',
        'soon': 'The new restaurant will open <strong>soon</strong>.',
        'in the future': 'I hope to visit Australia <strong>in the future</strong>.',
        
        // Future Continuous
        'at 3 PM:future continuous': 'I will be working <strong>at 3 PM</strong> tomorrow.',
        'at 3 PM:continuous': 'I will be working <strong>at 3 PM</strong> tomorrow.',
        'this time tomorrow': '<strong>This time tomorrow</strong>, I will be flying to Paris.',
        'will be + ing': 'I <strong>will be waiting</strong> for you at the station.',
        'when:future continuous': 'I will be studying <strong>when</strong> you arrive.',
        'when:continuous': 'I will be studying <strong>when</strong> you arrive.',
        'while:future continuous': 'I will be cooking dinner <strong>while</strong> you are at the store.',
        'during:future continuous': 'I will be working <strong>during</strong> the meeting.',
        
        // Future Perfect
        'by 5 PM': 'I will have finished my work <strong>by 5 PM</strong>.',
        'by then:future perfect': '<strong>By then</strong>, I will have completed the project.',
        'by then': '<strong>By then</strong>, I will have completed the project.',
        'by the time:future perfect': '<strong>By the time</strong> you arrive, I will have left.',
        'by the time': '<strong>By the time</strong> you arrive, I will have left.',
        'before:future perfect': 'I will have finished my homework <strong>before</strong> you come.',
        'before:perfect': 'I will have finished my homework <strong>before</strong> you come.',
        'until:future perfect': 'I won\'t have finished <strong>until</strong> 5 PM.',
        'until': 'I won\'t have finished <strong>until</strong> 5 PM.',
        'when:future perfect': 'I will have finished eating <strong>when</strong> you get here.',
        'when:perfect': 'I will have finished eating <strong>when</strong> you get here.',
        
        // Future Perfect Continuous
        'for 8 hours': 'I will have been working <strong>for 8 hours</strong> by 5 PM.',
        'by then:future perfect continuous': '<strong>By then</strong>, I will have been studying for three days.',
        'by then:perfect continuous': '<strong>By then</strong>, I will have been studying for three days.',
        'will have been + ing': 'I <strong>will have been waiting</strong> for an hour when you arrive.',
        'since:future perfect continuous': 'I will have been working here <strong>since</strong> 2020 when I retire.',
        'since:perfect continuous': 'I will have been working here <strong>since</strong> 2020 when I retire.',
        'for:future perfect continuous': 'I will have been living here <strong>for</strong> five years by next month.',
        'for:perfect continuous': 'I will have been living here <strong>for</strong> five years by next month.',
        'how long:future perfect continuous': '<strong>How long</strong> will you have been studying when you graduate?',
        'how long:perfect continuous': '<strong>How long</strong> will you have been studying when you graduate?'
    };

    // Get all signal words
    const signalWords = document.querySelectorAll('.signal-word');
    
    signalWords.forEach(signalWord => {
        // Make signal words clickable
        signalWord.style.cursor = 'pointer';
        signalWord.setAttribute('tabindex', '0');
        signalWord.setAttribute('role', 'button');
        
        // Add click handler
        signalWord.addEventListener('click', function() {
            handleSignalWordClick(this);
        });
        
        // Add keyboard support
        signalWord.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSignalWordClick(this);
            }
        });
    });
    
    function handleSignalWordClick(wordElement) {
        const wordText = wordElement.textContent.trim();
        
        // Find the parent signal card
        const signalCard = wordElement.closest('.signal-card');
        if (!signalCard) return;
        
        // Get the tense name from the card header
        const cardHeader = signalCard.querySelector('h3');
        let tenseKey = '';
        let fullTenseKey = '';
        if (cardHeader) {
            // Extract tense name (text content includes icon, so get last word or phrase)
            const headerText = cardHeader.textContent.trim();
            // Tense names are like "Past Simple", "Present Continuous", etc.
            // Extract the key part for matching
            if (headerText.includes('Past Simple')) {
                tenseKey = 'simple';
                fullTenseKey = 'past simple';
            } else if (headerText.includes('Past Continuous')) {
                tenseKey = 'continuous';
                fullTenseKey = 'past continuous';
            } else if (headerText.includes('Past Perfect Continuous')) {
                tenseKey = 'perfect continuous';
                fullTenseKey = 'past perfect continuous';
            } else if (headerText.includes('Past Perfect')) {
                tenseKey = 'perfect';
                fullTenseKey = 'past perfect';
            } else if (headerText.includes('Present Simple')) {
                tenseKey = 'simple';
                fullTenseKey = 'present simple';
            } else if (headerText.includes('Present Continuous')) {
                tenseKey = 'continuous';
                fullTenseKey = 'present continuous';
            } else if (headerText.includes('Present Perfect Continuous')) {
                tenseKey = 'perfect continuous';
                fullTenseKey = 'present perfect continuous';
            } else if (headerText.includes('Present Perfect')) {
                tenseKey = 'perfect';
                fullTenseKey = 'present perfect';
            } else if (headerText.includes('Future Simple')) {
                tenseKey = 'simple';
                fullTenseKey = 'future simple';
            } else if (headerText.includes('Future Continuous')) {
                tenseKey = 'continuous';
                fullTenseKey = 'future continuous';
            } else if (headerText.includes('Future Perfect Continuous')) {
                tenseKey = 'perfect continuous';
                fullTenseKey = 'future perfect continuous';
            } else if (headerText.includes('Future Perfect')) {
                tenseKey = 'perfect';
                fullTenseKey = 'future perfect';
            }
        }
        
        // Create a context-aware key: "word:tense" or just "word"
        // Try full tense key first (most specific), then simple tense key, then base word
        let example = null;
        
        if (fullTenseKey) {
            const fullTenseSpecificKey = wordText + ':' + fullTenseKey;
            if (signalWordExamples[fullTenseSpecificKey]) {
                example = signalWordExamples[fullTenseSpecificKey];
            }
        }
        if (!example && tenseKey) {
            const tenseSpecificKey = wordText + ':' + tenseKey;
            if (signalWordExamples[tenseSpecificKey]) {
                example = signalWordExamples[tenseSpecificKey];
            }
        }
        if (!example) {
            example = signalWordExamples[wordText];
        }
        
        if (example) {
            // Find the example box
            const exampleBox = signalCard.querySelector('.signal-example p');
            if (exampleBox) {
                // Update the example with bold signal word (no "Example:" or quotes)
                exampleBox.innerHTML = example;
            }
            
            // Remove active class from all signal words in this card
            const allWordsInCard = signalCard.querySelectorAll('.signal-word');
            allWordsInCard.forEach(word => {
                word.classList.remove('active');
            });
            
            // Add active class to clicked word
            wordElement.classList.add('active');
        }
    }
    
    // Automatically select the first signal word in each card on page load
    const signalCards = document.querySelectorAll('.signal-card');
    signalCards.forEach(card => {
        const firstSignalWord = card.querySelector('.signal-word');
        if (firstSignalWord) {
            handleSignalWordClick(firstSignalWord);
        }
    });
    
    // Search functionality for signal words
    const signalWordsSearchInput = document.getElementById('signalWordsSearchInput');
    if (signalWordsSearchInput) {
        signalWordsSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            filterSignalWords(searchTerm);
        });
        
        // Clear search with Escape key
        signalWordsSearchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                filterSignalWords('');
            }
        });
    }
    
    function filterSignalWords(searchTerm) {
        const allSignalCards = document.querySelectorAll('.signal-card');
        
        // First, clear all highlights
        clearSignalWordHighlights();
        
        if (searchTerm === '') {
            // Show all cards if search is empty
            allSignalCards.forEach(card => {
                card.classList.remove('hidden');
            });
            return;
        }
        
        allSignalCards.forEach(card => {
            // Get all signal words in this card (only the signal words, not example text)
            const signalWordsInCard = card.querySelectorAll('.signal-words .signal-word');
            let hasMatch = false;
            
            // Check if any signal word matches the search term and highlight it
            signalWordsInCard.forEach(word => {
                const wordText = word.textContent.trim();
                const wordTextLower = wordText.toLowerCase();
                
                if (wordTextLower.includes(searchTerm)) {
                    hasMatch = true;
                    // Highlight the matching word
                    highlightSignalWord(word, searchTerm);
                }
            });
            
            // Show or hide the card based on match
            if (hasMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
    
    function highlightSignalWord(wordElement, searchTerm) {
        // Get original text, removing any existing mark elements first
        let originalText = wordElement.dataset.originalText;
        if (!originalText) {
            // If no stored original, get text content (which ignores mark elements)
            originalText = wordElement.textContent.trim();
            // Store it for restoration
            wordElement.dataset.originalText = originalText;
        }
        
        // Find all occurrences of the search term (case-insensitive)
        const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedTerm})`, 'gi');
        
        // Replace matching text with highlighted version
        const highlightedText = originalText.replace(regex, '<mark class="signal-word-highlight">$1</mark>');
        
        // Update the element's HTML (event listeners remain on the element itself)
        wordElement.innerHTML = highlightedText;
        
        // Add highlight class to the word element itself
        wordElement.classList.add('has-highlight');
    }
    
    function clearSignalWordHighlights() {
        const allSignalWords = document.querySelectorAll('.signal-word');
        allSignalWords.forEach(word => {
            // Remove highlight class
            word.classList.remove('has-highlight');
            
            // Restore original text if it was stored
            if (word.dataset.originalText) {
                word.textContent = word.dataset.originalText;
                delete word.dataset.originalText;
            }
        });
    }
}
