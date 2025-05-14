document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const addBookForm = document.getElementById('addBookForm');
    const coverPreview = document.getElementById('coverPreview');
    const coverImageInput = document.getElementById('coverImage');
    
    // Initialize the book list if it doesn't exist
    if (!localStorage.getItem('books')) {
        localStorage.setItem('books', JSON.stringify([]));
    }
    
    // Handle cover image upload
    coverPreview.addEventListener('click', function() {
        coverImageInput.click();
    });
    
    coverImageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                coverPreview.style.backgroundImage = `url('${e.target.result}')`;
                coverPreview.innerHTML = '';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Form submission
    addBookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const bookName = document.getElementById('bookName').value;
        const authorName = document.getElementById('authorName').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const mode = document.querySelector('input[name="mode"]:checked').value;
        const coverImage = coverPreview.style.backgroundImage ? 
            coverPreview.style.backgroundImage.slice(5, -2) : '';
        
        // Create book object
        const book = {
            id: Date.now(), // Using timestamp as a simple ID
            bookName,
            authorName,
            category,
            description,
            mode,
            coverImage,
            dateAdded: new Date().toISOString()
        };
        
        // Save to local storage
        saveBook(book);
        
        // Show success message
        showNotification('Book added successfully!');
        
        // Reset form
        addBookForm.reset();
        coverPreview.style.backgroundImage = '';
        coverPreview.innerHTML = '<p>Upload Cover Page</p>';
    });
    
    // Save book to local storage
    function saveBook(book) {
        const books = JSON.parse(localStorage.getItem('books'));
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    
    // Simple notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
    
    // Toggle heart button color
    const heartBtn = document.querySelector('.heart-btn');
    if (heartBtn) {
        heartBtn.addEventListener('click', function() {
            const heartIcon = this.querySelector('.heart-icon');
            if (heartIcon.getAttribute('fill') === 'currentColor') {
                heartIcon.setAttribute('fill', 'none');
            } else {
                heartIcon.setAttribute('fill', 'currentColor');
            }
        });
    }
});

// Navigation active state
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        this.classList.add('active');
    });
});