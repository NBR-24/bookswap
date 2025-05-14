document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state management
    const navItems = document.querySelectorAll('.sidebar-nav ul li');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.closest('.dropdown');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu && menu.style.display === 'block') {
                    menu.style.display = 'none';
                }
            });
            
            // Toggle current dropdown
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            } else {
                dropdownMenu.style.display = 'block';
            }
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling; // Assuming the dropdown menu is the next sibling
                dropdownMenu.classList.toggle('active'); // Use a class to control visibility
            });
        });
    
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                    menu.classList.remove('active');
                });
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
    
    // Favorite toggle functionality
    const favoriteButtons = document.querySelectorAll('.favorite-icon');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
    
    // Book navigation arrows
    const prevButton = document.querySelector('.nav-arrow.prev');
    const nextButton = document.querySelector('.nav-arrow.next');
    const booksContainer = document.querySelector('.books-container');
    
    // Set a standard scrolling amount (width of one book card + gap)
    const scrollAmount = 250; // 230px card width + 20px gap
    
    prevButton.addEventListener('click', function() {
        booksContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextButton.addEventListener('click', function() {
        booksContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input input');
    const searchButton = document.querySelector('.search-btn');
    
    searchButton.addEventListener('click', function() {
        performSearch();
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm) {
            // Get all book titles
            const bookCards = document.querySelectorAll('.book-card');
            
            bookCards.forEach(card => {
                const title = card.querySelector('.book-title').textContent.toLowerCase();
                const author = card.querySelector('.book-author').textContent.toLowerCase();
                
                // Simple search implementation - highlight matching books
                if (title.includes(searchTerm) || author.includes(searchTerm)) {
                    card.style.boxShadow = '0 5px 15px rgba(244, 120, 52, 0.3)';
                } else {
                    card.style.opacity = '0.5';
                }
            });
        } else {
            // Reset if search is empty
            document.querySelectorAll('.book-card').forEach(card => {
                card.style.boxShadow = '';
                card.style.opacity = '1';
            });
        }
    }
    
    // Borrow button functionality
    const borrowButtons = document.querySelectorAll('.borrow-btn');
    
   // borrowButtons.forEach(button => {
      //  button.addEventListener('click', function() {
         //   const bookTitle = this.closest('.book-info').querySelector('.book-title').textContent;
            
            // Change button text and style
          //  this.textContent = 'Request Sent';
          //  this.style.backgroundColor = '#8c7e6a';
           // this.disabled = true;
            
            // You could add an AJAX request here to send the borrow request to the server
           // console.log(`Request to borrow "${bookTitle}" has been sent.`);
     //   });
    //})
    // Category filter functionality
    const categoryFilters = document.querySelectorAll('.category-filter .dropdown-menu a');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.textContent;
            const parentDropdown = this.closest('.dropdown');
            const parentButton = parentDropdown.querySelector('.dropdown-toggle');
            
            // Update button text to show selected category
            parentButton.innerHTML = category + ' <i class="fas fa-chevron-down"></i>';
            
            // Filter books based on category (simple implementation)
            const bookCards = document.querySelectorAll('.book-card');
            
            bookCards.forEach(card => {
                const bookCategory = card.querySelector('.book-category').textContent;
                
                if (bookCategory.includes(category) || category === 'All') {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Close dropdown
            this.closest('.dropdown-menu').style.display = 'none';
        });
    });
});