// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate newsletter subscription
                alert('धन्यवाद! Thank you for subscribing to our newsletter!');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // Load featured destinations on homepage
    if (document.getElementById('featured-destinations')) {
        loadFeaturedDestinations();
    }
});

// Load featured destinations
async function loadFeaturedDestinations() {
    try {
        const response = await fetch('/api/destinations');
        const destinations = await response.json();
        
        const container = document.getElementById('featured-destinations');
        container.innerHTML = '';
        
        // Show only first 3 destinations on homepage
        const featuredDestinations = destinations.slice(0, 3);
        
        featuredDestinations.forEach(destination => {
            const card = createDestinationCard(destination);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading featured destinations:', error);
    }
}

// Create destination card element
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    
    card.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}">
        <div class="card-content">
            <div class="card-meta">
                <span class="category-tag">${destination.category}</span>
                <span class="price">${destination.price}</span>
            </div>
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
            <div class="card-meta">
                <span>Duration: ${destination.duration}</span>
                <button class="btn btn-primary" onclick="contactUs('${destination.name}')">Book Now</button>
            </div>
        </div>
    `;
    
    return card;
}

// Contact us function
function contactUs(destination = '') {
    const message = destination ? `I'm interested in the ${destination} package.` : '';
    const contactUrl = `/contact${destination ? '?destination=' + encodeURIComponent(destination) : ''}`;
    window.location.href = contactUrl;
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .destination-card, .value-card, .team-member');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity to 0 and transition
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Add some Indian greetings and cultural elements
const indianGreetings = [
    'नमस्ते! Welcome to Bharat Yatra',
    'स्वागत है! Discover Incredible India',
    'आपका स्वागत है! Your Indian Adventure Awaits'
];

// Randomly show greeting in console
console.log(indianGreetings[Math.floor(Math.random() * indianGreetings.length)]);