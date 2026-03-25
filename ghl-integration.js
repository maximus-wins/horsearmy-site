// GoHighLevel Form Integration for HORSEARMY.COM
// Calls serverless function to avoid CORS and keep credentials secure

async function submitToGoHighLevel(name, email) {
  try {
    console.log('Submitting to serverless function:', { name, email });
    
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    });

    const responseData = await response.json();
    console.log('API Response:', response.status, responseData);

    if (response.ok && responseData.success) {
      return { success: true, data: responseData };
    } else {
      console.error('API Error Response:', responseData);
      return { success: false, error: responseData.error || 'Unknown error' };
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
    console.log('Email form found, attaching handler');
    
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      console.log('Form submitted');
      
      const nameInput = form.querySelector('input[type="text"]');
      const emailInput = form.querySelector('input[type="email"]');
      const button = form.querySelector('button[type="submit"]');
      
      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      
      console.log('Form values:', { name, email });
      
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
      
      // Submit to GoHighLevel via serverless function
      const result = await submitToGoHighLevel(name, email);
      
      console.log('Submission result:', result);
      
      if (result.success) {
        // Success message
        alert('🐴 Welcome to HORSEARMY.COM! Check your email soon for updates.');
        nameInput.value = '';
        emailInput.value = '';
      } else {
        // Error message
        console.error('Form submission failed:', result);
        alert('Unable to complete signup at this time. Please email us directly at info@horsearmy.com to join the network.');
      }
      
      // Reset button
      button.textContent = originalText;
      button.disabled = false;
    });
  } else {
    console.error('Email form not found on page');
  }
});
