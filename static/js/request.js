document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state management
    const navItems = document.querySelectorAll('.nav-menu ul li');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (!this.classList.contains('dropdown') || 
                (this.classList.contains('dropdown') && this.querySelector('.dropdown-menu').style.display !== 'block')) {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const dropdown = this.closest('.dropdown');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            } else {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.style.display = 'none';
                });
                dropdownMenu.style.display = 'block';
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });

    // Favorite toggle functionality
    const favoriteIcon = document.querySelector('.favorite-icon');
    
    if (favoriteIcon) {
        favoriteIcon.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    }

    // Request button functionality
    const requestBtn = document.querySelector('.request-btn');
    const bookDetails = document.querySelector('.book-details');
    const requestForm = document.querySelector('.request-form');
    const requestSuccess = document.querySelector('.request-success');

    if (requestBtn) {
        requestBtn.addEventListener('click', function() {
            console.log('Request button clicked'); // Debug log
            bookDetails.style.display = 'none';
            requestForm.style.display = 'block';

            // Change button appearance
            this.style.backgroundColor = 'grey';
            this.textContent = 'Request Sent';
            this.setAttribute('disabled', 'true');  // Ensures the button is disabled

            console.log('Button style and text updated'); // Debug log
        });
    }

    // Cancel button functionality
    const cancelBtn = document.querySelector('.cancel-btn');

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            requestForm.style.display = 'none';
            bookDetails.style.display = 'flex';
        });
    }

    // Form submission
    const bookRequestForm = document.getElementById('bookRequestForm');

    if (bookRequestForm) {
        bookRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const duration = document.getElementById('duration').value;
            const message = document.getElementById('message').value;
            const pickup = document.getElementById('pickup').value;
            
            console.log('Request details:', { duration, message, pickup });

            requestForm.style.display = 'none';
            requestSuccess.style.display = 'block';
        });
    }

    // Back to browsing button
    const backToBrowseBtn = document.querySelector('.back-to-browse');

    if (backToBrowseBtn) {
        backToBrowseBtn.addEventListener('click', function() {
            window.location.href = 'home.html';
        });
    }

    // Open dropdown menu for the active navigation item by default
    const activeDropdown = document.querySelector('.nav-menu ul li.dropdown.active');

    if (activeDropdown) {
        const dropdownMenu = activeDropdown.querySelector('.dropdown-menu');
        dropdownMenu.style.display = 'block';
    }
});
requestBtn.forEach(button => {
      //  button.addEventListener('click', function() {
         //   const bookTitle = this.closest('.book-info').querySelector('.book-title').textContent;
            
            // Change button text and style
          this.textContent = 'Request Sent';
          this.style.backgroundColor = '#8c7e6a';
           this.disabled = true;
            
            // You could add an AJAX request here to send the borrow request to the server
           console.log(`Request to borrow "${bookTitle}" has been sent.`);
        });
    //})