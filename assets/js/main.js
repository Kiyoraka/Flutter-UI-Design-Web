document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const tabLinks = document.querySelectorAll('.sidebar .menu a');
    const contentSections = document.querySelectorAll('.main-content > div');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            tabLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show the target content section
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.remove('hidden');
            
            // Scroll to top when changing tabs
            window.scrollTo(0, 0);
        });
    });
    
    // Handle featured design button clicks
    const viewDesignBtns = document.querySelectorAll('.view-design-btn');
    viewDesignBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Remove active class from all links
            tabLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to corresponding sidebar link
            const sidebarLink = document.querySelector(`.sidebar .menu a[data-target="${targetId}"]`);
            if (sidebarLink) {
                sidebarLink.classList.add('active');
            }
            
            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show the target content section
            document.getElementById(targetId).classList.remove('hidden');
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
    
    // Thumbnail gallery functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Get the parent design section
            const designImages = this.closest('.design-images');
            const mainScreenshot = designImages.querySelector('.main-screenshot');
            
            // Swap images
            const thumbnailSrc = this.src;
            const mainSrc = mainScreenshot.src;
            
            mainScreenshot.src = thumbnailSrc;
            this.src = mainSrc;
            
            // Add animation for smooth transition
            mainScreenshot.style.opacity = '0';
            setTimeout(() => {
                mainScreenshot.style.opacity = '1';
            }, 50);
        });
    });
    
    // Add fade-in animation to design cards when they become visible
    document.addEventListener('scroll', function() {
        const designCards = document.querySelectorAll('.design-container');
        designCards.forEach(card => {
            if (isElementInViewport(card) && !card.classList.contains('animated')) {
                card.classList.add('animated');
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            }
        });
    });
    
    // Helper function to check if an element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Add keyframe animation for fadeIn
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});