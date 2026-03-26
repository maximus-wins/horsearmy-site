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
      e.stopPropagation();
      console.log('Form submitted');
      
      const nameInput = form.querySelector('input[type="text"]');
      const emailInput = form.querySelector('input[type="email"]');
      const button = form.querySelector('button[type="submit"]');
      
      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      
      console.log('Form values:', { name, email });
      
      if (!name) {
        nameInput.style.borderColor = '#c0392b';
        setTimeout(() => nameInput.style.borderColor = '', 2000);
        return;
      }
      
      if (!email) {
        emailInput.style.borderColor = '#c0392b';
        setTimeout(() => emailInput.style.borderColor = '', 2000);
        return;
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        emailInput.style.borderColor = '#c0392b';
        setTimeout(() => emailInput.style.borderColor = '', 2000);
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
        // Success - show confirmation
        button.textContent = '✓ You\'re In!';
        button.style.background = 'var(--teal)';
        button.style.borderColor = 'var(--teal)';
        nameInput.value = '';
        emailInput.value = '';
        nameInput.placeholder = 'Welcome!';
        emailInput.placeholder = 'Check your email soon';
        
        // Show toast notification - always use showToast if available
        if (typeof showToast === 'function') {
          showToast('🐴 Welcome to HORSEARMY.COM!');
        }
        
        // Reset after a few seconds
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
          button.style.borderColor = '';
          button.disabled = false;
          nameInput.placeholder = 'Your name';
          emailInput.placeholder = 'Your email address';
        }, 5000);
      } else {
        // Error
        console.error('Form submission failed:', result);
        button.textContent = originalText;
        button.disabled = false;
        
        if (typeof showToast === 'function') {
          showToast('Unable to complete signup. Please try again.');
        }
      }
      
      return false;
    });
  } else {
    console.error('Email form not found on page');
  }
});
