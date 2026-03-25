// GoHighLevel Form Integration for HORSEARMY.COM
// Credentials loaded securely from server-side environment

const GHL_CONFIG = {
  apiKey: 'pit-c6d9c8db-c73a-41a0-abb6-d527391e109a',
  locationId: '7btYBBgZ5wdhJGIBYN4n'
};

async function submitToGoHighLevel(name, email) {
  try {
    const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: GHL_CONFIG.locationId,
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ').slice(1).join(' ') || '',
        email: email,
        source: 'HORSEARMY.COM Website',
        tags: ['Website Lead', 'Email Signup']
      })
    });

    if (response.ok) {
      return { success: true };
    } else {
      const error = await response.json();
      console.error('GHL Error:', error);
      return { success: false, error: error.message || 'Unknown error' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, error: error.message };
  }
}

// Initialize form handler when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.email-form');
  
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const nameInput = form.querySelector('input[type="text"]');
      const emailInput = form.querySelector('input[type="email"]');
      const button = form.querySelector('button[type="submit"]');
      
      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      
      if (!name) {
        alert('Please enter your name');
        nameInput?.focus();
        return;
      }
      
      if (!email) {
        alert('Please enter your email');
        emailInput?.focus();
        return;
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        emailInput?.focus();
        return;
      }
      
      // Update button state
      const originalText = button.textContent;
      button.textContent = 'Joining...';
      button.disabled = true;
      
      // Submit to GoHighLevel
      const result = await submitToGoHighLevel(name, email);
      
      if (result.success) {
        // Success message
        alert('🐴 Welcome to the HORSEARMY network! Check your email soon for updates.');
        nameInput.value = '';
        emailInput.value = '';
      } else {
        // Error message
        alert('Something went wrong. Please try again or email us directly at info@horsearmy.com');
      }
      
      // Reset button
      button.textContent = originalText;
      button.disabled = false;
    });
  }
});
