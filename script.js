// Disable browser's automatic scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Scroll to top when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
});

// Fallback: Also scroll to top on window load, just in case
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

// JavaScript code can be added here for interactivity if needed in the future.
AOS.init({
    duration: 1000, // values from 0 to 3000, with step 50ms
    once: true, // whether animation should happen only once - while scrolling down
    mirror: true, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// Disable scroll restoration and scroll to top on load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => { // Added a small timeout to ensure everything is loaded before scrolling
        window.scrollTo(0, 0);
    }, 0);
});

// Make entire project card clickable
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project');

    projectCards.forEach(card => {
        const linkElement = card.querySelector('h3 a');

        if (linkElement && linkElement.hasAttribute('href')) {
            const hrefValue = linkElement.getAttribute('href').trim();
            // Ensure href is not empty and not just a placeholder '#'
            if (hrefValue && hrefValue !== '#') {
                card.addEventListener('click', () => {
                    window.open(hrefValue, '_blank'); // Open link in a new tab
                });
                // The cursor: pointer; is set via CSS for .project class.
                // If card is clickable, it will naturally have the pointer.
            } else {
                // If href is empty or just '#', it's a placeholder or invalid.
                // Make card not appear clickable by overriding the CSS rule for this specific card.
                card.style.cursor = 'default';
            }
        } else {
            // If there's no <a> tag inside <h3> or it has no href attribute at all.
            // Make card not appear clickable.
             card.style.cursor = 'default';
        }
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
            // Update aria-expanded attribute for accessibility
            const isExpanded = navLinks.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        // Optional: Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
}); 