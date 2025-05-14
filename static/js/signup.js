document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    
    // Email validation function
    function validateEmail(email) {
        return email.toLowerCase().endsWith('@gecskp.ac.in');
    }
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
        if (this.value && !validateEmail(this.value)) {
            emailError.textContent = 'Email must end with @gecskp.ac.in';
            emailError.style.display = 'block';
        } else {
            emailError.textContent = '';
            emailError.style.display = 'none';
        }
    });
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = emailInput.value;
        const password = document.getElementById('password').value;
        
        // Validate email
        if (!validateEmail(email)) {
            emailError.textContent = 'Email must end with @gecskp.ac.in';
            emailError.style.display = 'block';
            return;
        }
        
        // Here you would typically send a request to your backend for user registration
        console.log('Signup attempt with:', name, email, password);
        
        // For demo purposes, store user info in localStorage to simulate registration
        const userData = {
            name: name,
            email: email,
            loggedIn: true,
            signupTime: new Date().toISOString()
        };
        
        localStorage.setItem('bookswapUser', JSON.stringify(userData));
        
        // Redirect to home page - this is the critical part
        window.location.href = 'home.html';
    });
    
    // Handle login link click
    const loginLink = document.querySelector('.login-link');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }
});