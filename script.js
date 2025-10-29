// DOM Elements
const searchInput = document.getElementById('searchInput');
const tensesGrid = document.getElementById('tensesGrid');
const tenseCards = document.querySelectorAll('.tense-card');

// Search functionality
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // Show all cards if search is empty
        tenseCards.forEach(card => {
            card.classList.remove('hidden');
            card.classList.add('fade-in');
        });
        return;
    }
    
    tenseCards.forEach(card => {
        const cardContent = card.textContent.toLowerCase();
        const isMatch = cardContent.includes(searchTerm);
        
        if (isMatch) {
            card.classList.remove('hidden');
            card.classList.add('fade-in');
        } else {
            card.classList.add('hidden');
            card.classList.remove('fade-in');
        }
    });
    
    // Show message if no results found
    showNoResultsMessage(searchTerm);
}

// Show no results message
function showNoResultsMessage(searchTerm) {
    const visibleCards = document.querySelectorAll('.tense-card:not(.hidden)');
    
    // Remove existing no results message
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    if (visibleCards.length === 0 && searchTerm !== '') {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message';
        noResultsMessage.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #718096;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3 style="margin-bottom: 10px; color: #2d3748;">No results found</h3>
                <p>Try searching for different keywords like "present", "past", "future", or specific tense names.</p>
            </div>
        `;
        tensesGrid.appendChild(noResultsMessage);
    }
}

// Highlight search terms in results
function highlightSearchTerms(searchTerm) {
    if (searchTerm === '') return;
    
    const visibleCards = document.querySelectorAll('.tense-card:not(.hidden)');
    
    visibleCards.forEach(card => {
        const walker = document.createTreeWalker(
            card,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        textNodes.forEach(textNode => {
            const parent = textNode.parentNode;
            if (parent.tagName !== 'SCRIPT' && parent.tagName !== 'STYLE') {
                const text = textNode.textContent;
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                const highlightedText = text.replace(regex, '<mark style="background: #fef5e7; color: #d69e2e; padding: 2px 4px; border-radius: 3px;">$1</mark>');
                
                if (highlightedText !== text) {
                    const span = document.createElement('span');
                    span.innerHTML = highlightedText;
                    parent.replaceChild(span, textNode);
                }
            }
        });
    });
}

// Clear highlights
function clearHighlights() {
    const marks = document.querySelectorAll('mark');
    marks.forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
    });
}

// Event listeners
searchInput.addEventListener('input', function() {
    clearHighlights();
    performSearch();
    
    // Add a small delay before highlighting to improve performance
    setTimeout(() => {
        if (searchInput.value.trim() !== '') {
            highlightSearchTerms(searchInput.value.toLowerCase().trim());
        }
    }, 100);
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for fade-in animations
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
    
    // Observe all tense cards
    tenseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Focus search input with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
    }
    
    // Clear search with Escape
    if (e.key === 'Escape') {
        searchInput.value = '';
        clearHighlights();
        performSearch();
        searchInput.blur();
    }
});

// Add copy functionality for examples
function addCopyFunctionality() {
    tenseCards.forEach(card => {
        const examples = card.querySelectorAll('.tense-examples li');
        examples.forEach(example => {
            example.style.cursor = 'pointer';
            example.title = 'Click to copy example';
            
            example.addEventListener('click', function() {
                const text = this.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    // Show temporary feedback
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check" style="color: #48bb78;"></i> Copied!';
                    this.style.color = '#48bb78';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.color = '';
                    }, 1500);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });
        });
    });
}

// Initialize copy functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', addCopyFunctionality);

// Theme toggle functionality moved to hamburger menu

// Add scroll to top functionality
function addScrollToTopFunctionality() {
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopButton.className = 'scroll-to-top-button';
    scrollToTopButton.title = 'Scroll to top table';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    `;
    
    function getActiveTarget() {
        const activeSection = document.querySelector('.feature-section.active');
        if (activeSection) {
            const sectionTable = activeSection.querySelector('.table-section');
            return sectionTable || activeSection;
        }
        return document.body;
    }

    scrollToTopButton.addEventListener('click', function() {
        const target = getActiveTarget();
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
    
    scrollToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    });
    
    scrollToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
    
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide button based on scroll position
    function toggleScrollButton() {
        const target = getActiveTarget();
        // Compute absolute top of target element
        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        const scrolledPast = window.scrollY > targetTop + 100; // threshold within section
        if (scrolledPast) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', toggleScrollButton);
    // Re-evaluate when switching tabs/sections
    document.addEventListener('click', function(e) {
        if (e.target.closest('.feature-tab')) {
            // Wait a tick for the class change to apply
            setTimeout(toggleScrollButton, 50);
        }
    });
    
    // Initial check
    toggleScrollButton();
}

// Initialize scroll to top functionality
document.addEventListener('DOMContentLoaded', addScrollToTopFunctionality);

// Add analytics tracking (optional)
function trackUsage() {
    // Track search usage
    let searchCount = 0;
    searchInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            searchCount++;
            if (searchCount === 1) {
                console.log('User started searching - engagement detected');
            }
        }
    });
    
    // Track card interactions
    tenseCards.forEach(card => {
        card.addEventListener('click', function() {
            const tenseName = this.querySelector('h3').textContent;
            console.log(`User interacted with: ${tenseName}`);
        });
    });
}

// Initialize analytics
document.addEventListener('DOMContentLoaded', trackUsage);

// Table cell click functionality for scrolling to explanations
function addTableScrollFunctionality() {
    const tableCells = document.querySelectorAll('.tense-cell[data-target]');
    
    console.log('Found table cells:', tableCells.length);
    
    if (tableCells.length === 0) {
        console.log('No table cells found with data-target attribute');
        return;
    }
    
    tableCells.forEach((cell, index) => {
        console.log(`Setting up click handler for cell ${index}:`, cell.getAttribute('data-target'));
        
        // Remove any existing event listeners
        cell.removeEventListener('click', handleCellClick);
        
        // Add new event listener
        cell.addEventListener('click', handleCellClick);
        
        // Add touch event for better mobile support
        cell.addEventListener('touchend', function(e) {
            e.preventDefault();
            handleCellClick(e);
        });
        
        function handleCellClick(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetTense = cell.getAttribute('data-target');
            console.log('Clicked cell with target:', targetTense);
            
            const targetCard = document.querySelector(`.tense-card[data-tense="${targetTense}"]`);
            console.log('Found target card:', targetCard);
            
            if (targetCard) {
                console.log('Scrolling to target card');
                
                // Add highlight effect
                targetCard.style.animation = 'pulse 0.6s ease-in-out';
                
                // Scroll to the target card with smooth behavior
                // Add small delay for mobile devices to ensure proper rendering
                setTimeout(() => {
                    targetCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 50);
                
                // Remove animation after it completes
                setTimeout(() => {
                    targetCard.style.animation = '';
                }, 600);
                
                // Add temporary highlight
                targetCard.classList.add('highlighted-card');
                setTimeout(() => {
                    targetCard.classList.remove('highlighted-card');
                }, 2000);
            } else {
                console.log('Target card not found for:', targetTense);
                // Let's also try to find any card with similar data-tense
                const allCards = document.querySelectorAll('.tense-card[data-tense]');
                console.log('All available tense cards:', Array.from(allCards).map(card => card.getAttribute('data-tense')));
            }
        }
        
        // Add keyboard support
        cell.setAttribute('tabindex', '0');
        cell.setAttribute('role', 'button');
        cell.setAttribute('aria-label', `Click to view ${cell.getAttribute('data-tense')} explanation`);
        
        cell.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Add CSS for highlight animation
function addHighlightAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .highlighted-card {
            background: #fef5e7 !important;
            border: 2px solid #d69e2e !important;
            box-shadow: 0 8px 25px rgba(214, 158, 46, 0.3) !important;
            transform: scale(1.02) !important;
        }
        
        .dark-theme .highlighted-card {
            background: #2d3748 !important;
            border: 2px solid #667eea !important;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3) !important;
        }
    `;
    document.head.appendChild(style);
}

// Alternative approach using event delegation
function addTableScrollFunctionalityDelegated() {
    console.log('Setting up delegated event listener for table cells');
    
    document.addEventListener('click', function(e) {
        // Check if the clicked element is a table cell with data-target
        if (e.target.closest('.tense-cell[data-target]')) {
            const cell = e.target.closest('.tense-cell[data-target]');
            const targetTense = cell.getAttribute('data-target');
            
            console.log('Delegated click on cell with target:', targetTense);
            
            const targetCard = document.querySelector(`.tense-card[data-tense="${targetTense}"]`);
            console.log('Found target card:', targetCard);
            
            if (targetCard) {
                console.log('Scrolling to target card');
                
                // Add highlight effect
                targetCard.style.animation = 'pulse 0.6s ease-in-out';
                
                // Scroll to the target card with smooth behavior
                // Add small delay for mobile devices to ensure proper rendering
                setTimeout(() => {
                    targetCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 50);
                
                // Remove animation after it completes
                setTimeout(() => {
                    targetCard.style.animation = '';
                }, 600);
                
                // Add temporary highlight
                targetCard.classList.add('highlighted-card');
                setTimeout(() => {
                    targetCard.classList.remove('highlighted-card');
                }, 2000);
            } else {
                console.log('Target card not found for:', targetTense);
            }
        }
    });
    
    // Add touch event support for mobile devices
    document.addEventListener('touchend', function(e) {
        // Check if the touched element is a table cell with data-target
        if (e.target.closest('.tense-cell[data-target]')) {
            e.preventDefault();
            const cell = e.target.closest('.tense-cell[data-target]');
            const targetTense = cell.getAttribute('data-target');
            
            console.log('Delegated touch on cell with target:', targetTense);
            
            const targetCard = document.querySelector(`.tense-card[data-tense="${targetTense}"]`);
            console.log('Found target card:', targetCard);
            
            if (targetCard) {
                console.log('Scrolling to target card');
                
                // Add highlight effect
                targetCard.style.animation = 'pulse 0.6s ease-in-out';
                
                // Scroll to the target card with smooth behavior
                // Add small delay for mobile devices to ensure proper rendering
                setTimeout(() => {
                    targetCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 50);
                
                // Remove animation after it completes
                setTimeout(() => {
                    targetCard.style.animation = '';
                }, 600);
                
                // Add temporary highlight
                targetCard.classList.add('highlighted-card');
                setTimeout(() => {
                    targetCard.classList.remove('highlighted-card');
                }, 2000);
            } else {
                console.log('Target card not found for:', targetTense);
            }
        }
    });
}

// Initialize table scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing table scroll functionality');
    
    // Add a small delay to ensure all elements are rendered
    setTimeout(() => {
        addTableScrollFunctionality();
        addTableScrollFunctionalityDelegated(); // Add the delegated approach as backup
        addHighlightAnimation();
        
        // Test if the functionality is working
        console.log('Testing table scroll functionality...');
        const testCell = document.querySelector('.tense-cell[data-target]');
        if (testCell) {
            console.log('Test cell found:', testCell.getAttribute('data-target'));
        } else {
            console.log('No test cell found');
        }
    }, 100);
});
