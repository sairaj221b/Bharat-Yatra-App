// Destinations page functionality
document.addEventListener('DOMContentLoaded', function() {
    let allDestinations = [];
    let filteredDestinations = [];
    
    // Initialize page
    loadDestinations();
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        
        // Real-time search with debounce
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter destinations
            const category = this.getAttribute('data-category');
            filterDestinations(category);
        });
    });
});

// Load all destinations
async function loadDestinations() {
    const loadingElement = document.getElementById('loading');
    const container = document.getElementById('destinations-grid');
    
    try {
        loadingElement.style.display = 'block';
        
        const response = await fetch('/api/destinations');
        const destinations = await response.json();
        
        allDestinations = destinations;
        filteredDestinations = destinations;
        
        displayDestinations(destinations);
        
    } catch (error) {
        console.error('Error loading destinations:', error);
        container.innerHTML = '<p class="error-message">Failed to load destinations. Please try again later.</p>';
    } finally {
        loadingElement.style.display = 'none';
    }
}

// Display destinations
function displayDestinations(destinations) {
    const container = document.getElementById('destinations-grid');
    container.innerHTML = '';
    
    if (destinations.length === 0) {
        container.innerHTML = '<p class="no-results">No destinations found matching your criteria. Try different filters or search terms.</p>';
        return;
    }
    
    destinations.forEach((destination, index) => {
        const card = createDestinationCard(destination);
        
        // Add stagger animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
        
        container.appendChild(card);
    });
}

// Create destination card
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    
    card.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}" loading="lazy">
        <div class="card-content">
            <div class="card-meta">
                <span class="category-tag">${destination.category}</span>
                <span class="price">${destination.price}</span>
            </div>
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
            <div class="card-meta">
                <span>Duration: ${destination.duration}</span>
                <button class="btn btn-primary" onclick="bookDestination('${destination.name}', '${destination.id}')">
                    Book Now
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Filter destinations by category
function filterDestinations(category) {
    let filtered = allDestinations;
    
    if (category && category !== 'all') {
        filtered = allDestinations.filter(dest => dest.category === category);
    }
    
    // Apply search filter if active
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(dest => 
            dest.name.toLowerCase().includes(searchTerm) ||
            dest.description.toLowerCase().includes(searchTerm) ||
            dest.category.toLowerCase().includes(searchTerm)
        );
    }
    
    filteredDestinations = filtered;
    displayDestinations(filtered);
}

// Handle search
function handleSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
    
    let filtered = allDestinations;
    
    // Apply category filter
    if (activeCategory && activeCategory !== 'all') {
        filtered = filtered.filter(dest => dest.category === activeCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(dest => 
            dest.name.toLowerCase().includes(searchTerm) ||
            dest.description.toLowerCase().includes(searchTerm) ||
            dest.category.toLowerCase().includes(searchTerm)
        );
    }
    
    filteredDestinations = filtered;
    displayDestinations(filtered);
}

// Book destination
function bookDestination(name, id) {
    // Store selected destination in sessionStorage for the contact form
    sessionStorage.setItem('selectedDestination', JSON.stringify({
        name: name,
        id: id
    }));
    
    // Show booking confirmation
    const confirmation = confirm(`Would you like to book ${name}? You'll be redirected to our contact form.`);
    
    if (confirmation) {
        // Redirect to contact page
        window.location.href = `/contact?destination=${encodeURIComponent(name)}`;
    }
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some Indian cultural elements
const indianWisdom = [
    'यात्रा ही जीवन है - Journey is life',
    'भारत दर्शन - Explore India',
    'अतिथि देवो भव - Guest is God'
];

console.log(indianWisdom[Math.floor(Math.random() * indianWisdom.length)]);