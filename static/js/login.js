// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    
    // Create error element if it doesn't exist
    let emailError = document.getElementById('email-error');
    if (!emailError) {
        emailError = document.createElement('span');
        emailError.id = 'email-error';
        emailError.className = 'error-message';
        emailError.style.color = 'red';
        emailError.style.fontSize = '14px';
        emailError.style.display = 'none';
        emailInput.parentNode.insertBefore(emailError, emailInput.nextSibling);
    }
    
    // Function to show error
    function showError(message) {
        emailError.textContent = message;
        emailError.style.display = 'block';
        console.log('Showing error:', message); // Debug log
    }
    
    // Function to hide error
    function hideError() {
        emailError.style.display = 'none';
    }
    
    // Email validation function
    function isValidEmail(email) {
        return email.toLowerCase().endsWith('@gecskp.ac.in');
    }
    
    // Add input event listener
    emailInput.addEventListener('input', function() {
        console.log('Email input changed:', this.value); // Debug log
        
        // Only validate if there's something typed
        if (this.value.trim() !== '') {
            if (!isValidEmail(this.value)) {
                showError('Email must end with @gecskp.ac.in');
            } else {
                hideError();
            }
        } else {
            hideError();
        }
    });
    
    // Add form submit event
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Form submitted'); // Debug log
            
            const email = emailInput.value.trim();
            const password = document.getElementById('password').value;
            
            // Validate email
            if (!isValidEmail(email)) {
                showError('Email must end with @gecskp.ac.in');
                return false;
            }
            
            console.log('Email valid, proceeding with login'); // Debug log
            
            // Store in localStorage
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Redirect - using timeout to ensure the console logs are visible
            console.log('Redirecting to home.html...'); // Debug log
            setTimeout(function() {
                window.location.href = 'home.html';
            }, 500);
        });
    } else {
        console.error('Login form not found!'); // Debug log
    }
    
    // Setup signup link
    const signupLink = document.querySelector('.signup-link');
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'signup.html';
        });
    }
});