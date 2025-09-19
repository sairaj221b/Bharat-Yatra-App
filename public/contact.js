// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form
    initializeContactForm();
    
    // Check for destination parameter
    checkDestinationParameter();
    
    // Check for selected destination from destinations page
    checkSelectedDestination();
});

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', validateField);
            field.addEventListener('input', clearFieldError);
        });
    }
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const formObject = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    
    // Validate form
    if (!validateForm(formObject)) {
        return;
    }
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showSuccessMessage();
        this.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Clear any destination selection
        sessionStorage.removeItem('selectedDestination');
        
    }, 2000);
}

// Validate form
function validateForm(formData) {
    let isValid = true;
    
    // Required field validation
    const requiredFields = ['firstName', 'lastName', 'email', 'travelType', 'message'];
    requiredFields.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Email validation
    if (formData.email && !isValidEmail(formData.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation (if provided)
    if (formData.phone && !isValidPhone(formData.phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Clear previous error
    clearFieldError(e);
    
    // Required field check
    if (field.hasAttribute('required') && !value) {
        showFieldError(field.name, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field.name, 'Please enter a valid email address');
        return false;
    }
    
    // Phone validation
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field.name, 'Please enter a valid phone number');
        return false;
    }
    
    return true;
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
    
    // Add error styling to field
    field.classList.add('error');
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.classList.remove('error');
}

// Show success message
function showSuccessMessage() {
    // Create success message overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
        <div class="success-modal">
            <div class="success-icon">🙏</div>
            <h3>धन्यवाद! Message Sent Successfully!</h3>
            <p>Thank you for your interest in Bharat Yatra. Our team will contact you within 24 hours to discuss your Indian travel plans. We're excited to help you discover incredible India!</p>
            <button class="btn btn-primary" onclick="closeSuccessModal()">Close</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Auto-close after 6 seconds
    setTimeout(() => {
        closeSuccessModal();
    }, 6000);
}

// Close success modal
function closeSuccessModal() {
    const overlay = document.querySelector('.success-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Check for destination parameter in URL
function checkDestinationParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');
    
    if (destination) {
        const messageField = document.getElementById('message');
        if (messageField && !messageField.value) {
            messageField.value = `नमस्ते! I'm interested in learning more about the ${destination} package. Please provide me with more details about the itinerary, accommodation options, and pricing for this incredible Indian destination.`;
        }
        
        // Set travel type if it matches
        const travelTypeSelect = document.getElementById('travel-type');
        if (travelTypeSelect) {
            const destinationLower = destination.toLowerCase();
            if (destinationLower.includes('beach') || destinationLower.includes('goa') || destinationLower.includes('andaman')) {
                travelTypeSelect.value = 'beach';
            } else if (destinationLower.includes('heritage') || destinationLower.includes('rajasthan') || destinationLower.includes('tamil nadu')) {
                travelTypeSelect.value = 'heritage';
            } else if (destinationLower.includes('adventure') || destinationLower.includes('himachal') || destinationLower.includes('uttarakhand')) {
                travelTypeSelect.value = 'adventure';
            } else if (destinationLower.includes('spiritual') || destinationLower.includes('uttarakhand')) {
                travelTypeSelect.value = 'spiritual';
            } else if (destinationLower.includes('nature') || destinationLower.includes('kerala') || destinationLower.includes('karnataka')) {
                travelTypeSelect.value = 'nature';
            }
        }
    }
}

// Check for selected destination from sessionStorage
function checkSelectedDestination() {
    const selectedDestination = sessionStorage.getItem('selectedDestination');
    
    if (selectedDestination) {
        try {
            const destination = JSON.parse(selectedDestination);
            const messageField = document.getElementById('message');
            
            if (messageField && !messageField.value) {
                messageField.value = `नमस्ते! I'm interested in booking the ${destination.name} package. Please provide me with more information about availability, pricing, and what's included in this amazing Indian travel experience.`;
            }
        } catch (error) {
            console.error('Error parsing selected destination:', error);
        }
    }
}

// Validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Indian phone number validation (supports +91 format)
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && phoneRegex.test(phone);
}

// Add Indian cultural greeting
console.log('🙏 नमस्ते! Welcome to Bharat Yatra Contact Form');