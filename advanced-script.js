// Advanced Tenses Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeAdvancedFeatures();
});

function initializeAdvancedFeatures() {
    initializeFeatureTabs();
    initializeThemeToggle();
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



// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        const isDark = body.classList.contains('dark-theme');
        const theme = isDark ? 'dark-theme' : '';
        
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (theme === 'dark-theme') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
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
