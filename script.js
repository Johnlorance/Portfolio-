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

// Event Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-button');
    const prevBtn = document.querySelector('.prev-button');
    const nextBtn = document.querySelector('.next-button');

    let currentEventImages = [];
    let currentImageIndex = 0;

    // Placeholder data - replace with your actual event data
    const eventsData = [
        {
            id: "nileEvent",
            title: "Machine Learning Workshop at Nile University",
            thumbnail: "Nile University/042A0360.jpg",
            images: [
                "Nile University/042A0360.jpg", // Thumbnail first
                "Nile University/042A0365.jpg",
                "Nile University/042A0363.jpg",
                "Nile University/042A0361.jpg",
                "Nile University/042A0359.jpg",
                "Nile University/042A0353.jpg",
                "Nile University/042A0083.jpg" // This one last as requested
            ],
            date: "June 2025",
            description: "An engaging session discussing the advancements in AI and ML in the healthcare sector"
        },
        {
            id: "aucEvent",
            title: "Deep Learning Workshop at American University in Cairo",
            thumbnail: "The American University in Cairo/Edited2.JPG",
            images: [
                "The American University in Cairo/Edited2.JPG", // Thumbnail first
                "The American University in Cairo/edited1.JPG",
                "The American University in Cairo/WhatsApp Image 2025-05-17 at 08.37.28_65888dce.jpg",
                "The American University in Cairo/WhatsApp Image 2025-05-17 at 08.31.56_3890231a.jpg",
                "The American University in Cairo/WhatsApp Image 2025-05-17 at 08.31.47_2368dc87.jpg",
                "The American University in Cairo/WhatsApp Image 2025-05-17 at 08.31.43_e0355f3f.jpg"
            ],
            date: "May 2025",
            description: "Hands-on workshop covering DL fundamentals for AUC engineering students, and its applications in various sectors like healthcare, education, and finance."
        }
        // Add more events here as needed
    ];

    const eventCards = document.querySelectorAll('.event-card');

    eventCards.forEach(card => {
        card.addEventListener('click', () => {
            const eventId = card.getAttribute('data-event-id');
            const eventData = eventsData.find(event => event.id === eventId);

            if (eventData && eventData.images.length > 0) {
                currentEventImages = eventData.images;
                currentImageIndex = 0;
                openModal(eventData);
            }
        });
    });

    function openModal(eventData) {
        modal.style.display = "block";
        updateModalImage(eventData.title);
    }

    function closeModal() {
        modal.style.display = "none";
    }

    function updateModalImage(eventTitle) {
        if (currentEventImages.length > 0) {
            modalImg.src = currentEventImages[currentImageIndex];
            // Find the full event data to get the description for the caption if needed
            const currentEventData = eventsData.find(event => event.images === currentEventImages);
            let captionContent = `${eventTitle} - Image ${currentImageIndex + 1} of ${currentEventImages.length}`;
            if (currentEventData && currentEventData.description) {
                // Optionally, add description to caption or keep it simple
                // captionText.innerHTML = `${captionContent} <br> ${currentEventData.description}`;
            }
            captionText.innerHTML = captionContent; // Keeping caption simple for now
            prevBtn.style.display = currentEventImages.length > 1 ? 'block' : 'none';
            nextBtn.style.display = currentEventImages.length > 1 ? 'block' : 'none';
        }
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentEventImages.length;
        const eventCard = document.querySelector(`.event-card[data-event-id='${getCurrentEventId()}']`);
        const eventData = eventsData.find(event => event.id === getCurrentEventId());
        if (eventData) updateModalImage(eventData.title);
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentEventImages.length) % currentEventImages.length;
        const eventCard = document.querySelector(`.event-card[data-event-id='${getCurrentEventId()}']`);
        const eventData = eventsData.find(event => event.id === getCurrentEventId());
        if (eventData) updateModalImage(eventData.title);
    }

    // Helper function to get the current event ID (not strictly necessary but can be useful)
    function getCurrentEventId() {
        // This is a bit of a workaround to get the event context for the caption
        // Assumes the modal is opened by clicking an event card which sets currentEventImages
        for (const event of eventsData) {
            if (event.images === currentEventImages) {
                return event.id;
            }
        }
        return null;
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (prevBtn) prevBtn.addEventListener('click', showPrevImage);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);

    // Close modal when clicking outside the image
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === "block") {
            if (event.key === 'Escape') {
                closeModal();
            }
            if (event.key === 'ArrowRight' && currentEventImages.length > 1) {
                showNextImage();
            }
            if (event.key === 'ArrowLeft' && currentEventImages.length > 1) {
                showPrevImage();
            }
        }
    });
}); 