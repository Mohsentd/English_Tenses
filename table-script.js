// DOM Elements
const tenseCells = document.querySelectorAll('.tense-cell');
const examples = document.querySelectorAll('.example');

// Add click functionality to focus examples (no copy)
function addCopyFunctionality() {
    tenseCells.forEach(cell => {
        const ex = cell.querySelector('.example');
        if (!ex) return;
        ex.style.cursor = 'zoom-in';
        const showSpotlight = () => {
            const overlay = document.createElement('div');
            overlay.className = 'example-spotlight-overlay';
            overlay.innerHTML = `<div class="example-spotlight-content"><div class="spotlight-text">${ex.innerHTML}</div></div>`;
            document.body.appendChild(overlay);
            overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
            const esc = (e) => { if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); } };
            document.addEventListener('keydown', esc);
        };
        cell.addEventListener('click', showSpotlight);
        cell.setAttribute('tabindex', '0');
        cell.setAttribute('role', 'button');
        cell.setAttribute('aria-label', 'Click to focus example');
        cell.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showSpotlight(); }
        });
    });
}

// Add hover effects and tense information
function addHoverEffects() {
    tenseCells.forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            const tense = this.getAttribute('data-tense');
            const tenseInfo = getTenseInfo(tense);
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tense-tooltip';
            tooltip.innerHTML = `
                <div style="
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #2d3748;
                    color: white;
                    padding: 10px 15px;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    white-space: nowrap;
                    z-index: 1000;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    margin-bottom: 5px;
                ">
                    <strong>${tenseInfo.name}</strong><br>
                    <small>${tenseInfo.description}</small>
                </div>
            `;
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        cell.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tense-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Get tense information
function getTenseInfo(tense) {
    const tenseInfo = {
        'past-simple': {
            name: 'Past Simple',
            description: 'Completed actions in the past'
        },
        'past-continuous': {
            name: 'Past Continuous',
            description: 'Actions in progress at a specific past time'
        },
        'past-perfect': {
            name: 'Past Perfect',
            description: 'Actions completed before another past action'
        },
        'past-perfect-continuous': {
            name: 'Past Perfect Continuous',
            description: 'Actions ongoing before another past action'
        },
        'present-simple': {
            name: 'Present Simple',
            description: 'Habits, general truths, scheduled events'
        },
        'present-continuous': {
            name: 'Present Continuous',
            description: 'Actions happening now, temporary situations'
        },
        'present-perfect': {
            name: 'Present Perfect',
            description: 'Completed actions with present relevance'
        },
        'present-perfect-continuous': {
            name: 'Present Perfect Continuous',
            description: 'Actions started in past, continuing to present'
        },
        'future-simple': {
            name: 'Future Simple',
            description: 'Predictions, spontaneous decisions'
        },
        'future-continuous': {
            name: 'Future Continuous',
            description: 'Actions in progress at specific future time'
        },
        'future-perfect': {
            name: 'Future Perfect',
            description: 'Actions completed before specific future time'
        },
        'future-perfect-continuous': {
            name: 'Future Perfect Continuous',
            description: 'Actions ongoing up to specific future time'
        }
    };
    
    return tenseInfo[tense] || { name: 'Unknown Tense', description: 'No description available' };
}

// Add theme toggle functionality
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        color: #2d3748;
    `;
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    document.body.appendChild(themeToggle);
}

// Add print functionality
function addPrintFunctionality() {
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Table';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 25px;
        padding: 12px 20px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
    
    document.body.appendChild(printButton);
}

// Add keyboard navigation
function addKeyboardNavigation() {
    let currentCellIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        const cells = Array.from(tenseCells);
        
        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault();
                currentCellIndex = Math.min(currentCellIndex + 1, cells.length - 1);
                cells[currentCellIndex].focus();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                currentCellIndex = Math.max(currentCellIndex - 1, 0);
                cells[currentCellIndex].focus();
                break;
            case 'ArrowDown':
                e.preventDefault();
                currentCellIndex = Math.min(currentCellIndex + 3, cells.length - 1);
                cells[currentCellIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                currentCellIndex = Math.max(currentCellIndex - 3, 0);
                cells[currentCellIndex].focus();
                break;
            case 'Home':
                e.preventDefault();
                currentCellIndex = 0;
                cells[currentCellIndex].focus();
                break;
            case 'End':
                e.preventDefault();
                currentCellIndex = cells.length - 1;
                cells[currentCellIndex].focus();
                break;
        }
    });
}

// Add animation on scroll
function addScrollAnimations() {
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
    
    // Observe table cells
    tenseCells.forEach((cell, index) => {
        cell.style.opacity = '0';
        cell.style.transform = 'translateY(20px)';
        cell.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(cell);
    });
}

// Add tense highlighting
function addTenseHighlighting() {
    tenseCells.forEach(cell => {
        cell.addEventListener('click', function() {
            // Remove previous highlights
            tenseCells.forEach(c => c.classList.remove('highlighted'));
            
            // Add highlight to current cell
            this.classList.add('highlighted');
            
            // Add highlight to same tense in other time periods
            const tense = this.getAttribute('data-tense');
            const aspect = tense.split('-').slice(1).join('-');
            
            tenseCells.forEach(c => {
                if (c.getAttribute('data-tense').includes(aspect)) {
                    c.classList.add('related-highlight');
                }
            });
            
            // Remove highlights after 3 seconds
            setTimeout(() => {
                tenseCells.forEach(c => {
                    c.classList.remove('highlighted', 'related-highlight');
                });
            }, 3000);
        });
    });
}

// Add CSS for highlighting
function addHighlightStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .tense-cell.highlighted {
            background: #fef5e7 !important;
            border: 2px solid #d69e2e !important;
            transform: scale(1.05) !important;
            box-shadow: 0 8px 25px rgba(214, 158, 46, 0.3) !important;
        }
        
        .tense-cell.related-highlight {
            background: #e6fffa !important;
            border: 1px solid #38b2ac !important;
        }
        
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Add analytics tracking
function trackUsage() {
    let clickCount = 0;
    
    tenseCells.forEach(cell => {
        cell.addEventListener('click', function() {
            clickCount++;
            const tense = this.getAttribute('data-tense');
            console.log(`User clicked on: ${tense} (Total clicks: ${clickCount})`);
        });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    addCopyFunctionality();
    addHoverEffects();
    addThemeToggle();
    addPrintFunctionality();
    addKeyboardNavigation();
    addScrollAnimations();
    addTenseHighlighting();
    addHighlightStyles();
    trackUsage();
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Add unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});
