// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                this.style.color = 'var(--primary-color)';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                this.style.color = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                e.target !== menuToggle && 
                !menuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.style.color = '';
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a, .footer-links a, .hero a.btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Get the header height for offset
                    const headerHeight = document.querySelector('header').offsetHeight;
                    
                    // Calculate the position to scroll to
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    // Smooth scroll to the target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active class
                    document.querySelectorAll('header nav a').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.85)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.6)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the email value
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to a server
            // For now, we'll just show an alert
            alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
            
            // Reset the form
            newsletterForm.reset();
        });
    }
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.section');
    
    function checkScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for animation
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check scroll position on load
    checkScroll();
    
    // Check scroll position on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Types of Lingas Carousel
    const typesCarousel = document.querySelector('.types-carousel');
    const navDots = document.querySelectorAll('.nav-dot');
    
    if (typesCarousel && navDots.length > 0) {
        // Set up carousel navigation
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Calculate the scroll position
                const cardWidth = typesCarousel.querySelector('.type-card').offsetWidth;
                const gap = 30; // Gap between cards
                const scrollPosition = index * (cardWidth + gap);
                
                // Scroll to the position
                typesCarousel.style.transform = `translateX(-${scrollPosition}px)`;
                
                // Update active dot
                navDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });
        
        // Auto-rotate carousel every 5 seconds
        let currentSlide = 0;
        const totalSlides = navDots.length;
        
        function rotateCarousel() {
            currentSlide = (currentSlide + 1) % totalSlides;
            navDots[currentSlide].click();
        }
        
        // Set interval for auto-rotation
        const carouselInterval = setInterval(rotateCarousel, 5000);
        
        // Pause auto-rotation when hovering over carousel
        typesCarousel.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        // Resume auto-rotation when mouse leaves
        typesCarousel.addEventListener('mouseleave', () => {
            clearInterval(carouselInterval);
            carouselInterval = setInterval(rotateCarousel, 5000);
        });
    }
    
    // Sacred Geography Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Show corresponding tab pane
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Map Markers Interaction
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    if (mapMarkers.length > 0) {
        mapMarkers.forEach(marker => {
            marker.addEventListener('click', () => {
                const location = marker.getAttribute('data-location');
                
                // Find the Jyotirlingas tab and activate it
                const jyotirlinga = document.querySelector('[data-tab="jyotirlingas"]');
                if (jyotirlinga) {
                    jyotirlinga.click();
                    
                    // Scroll to the tab content
                    const tabContent = document.querySelector('.tab-content');
                    if (tabContent) {
                        tabContent.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
    
    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filter = button.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Gallery Modal
    const galleryModal = document.querySelector('.gallery-modal');
    const modalImage = document.querySelector('.modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    if (galleryModal && modalImage && modalCaption && modalClose && modalPrev && modalNext) {
        let currentIndex = 0;
        const visibleItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');
        
        // Open modal when clicking on gallery item
        galleryItems.forEach(item => {
            item.querySelector('.gallery-overlay').addEventListener('click', () => {
                const img = item.querySelector('.gallery-image');
                const caption = item.querySelector('.gallery-caption h3').textContent;
                const description = item.querySelector('.gallery-caption p').textContent;
                
                // Set modal content
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalCaption.innerHTML = `<h3>${caption}</h3><p>${description}</p>`;
                
                // Show modal
                galleryModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Set current index
                currentIndex = visibleItems().indexOf(item);
            });
        });
        
        // Close modal
        modalClose.addEventListener('click', () => {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside the content
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Navigate to previous image
        modalPrev.addEventListener('click', () => {
            const items = visibleItems();
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateModalContent(items[currentIndex]);
        });
        
        // Navigate to next image
        modalNext.addEventListener('click', () => {
            const items = visibleItems();
            currentIndex = (currentIndex + 1) % items.length;
            updateModalContent(items[currentIndex]);
        });
        
        // Update modal content
        function updateModalContent(item) {
            const img = item.querySelector('.gallery-image');
            const caption = item.querySelector('.gallery-caption h3').textContent;
            const description = item.querySelector('.gallery-caption p').textContent;
            
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalCaption.innerHTML = `<h3>${caption}</h3><p>${description}</p>`;
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (galleryModal.style.display === 'block') {
                if (e.key === 'Escape') {
                    galleryModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft') {
                    modalPrev.click();
                } else if (e.key === 'ArrowRight') {
                    modalNext.click();
                }
            }
        });
    }
});