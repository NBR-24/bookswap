document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation active state
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        } else if (currentPage === 'updates.html' && item.textContent.includes('Updates')) {
            item.classList.add('active');
        }
        
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                navItems.forEach(nav => {
                    nav.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Handle heart button toggle
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
    
    // If on the Add Book page
    const addBookForm = document.getElementById('addBookForm');
    const coverPreview = document.getElementById('coverPreview');
    const coverImageInput = document.getElementById('coverImage');
    
    if (addBookForm) {
        // Initialize the book list if it doesn't exist
        if (!localStorage.getItem('books')) {
            localStorage.setItem('books', JSON.stringify([]));
        }
        
        // Handle cover image upload
        if (coverPreview) {
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
        }
        
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
    }
    
    // Get updates from local storage if on updates page
    const updatesContainer = document.querySelector('.updates-container');
    if (updatesContainer && currentPage === 'updates.html') {
        loadUpdates();
    }
    
    // Save book to local storage
    function saveBook(book) {
        const books = JSON.parse(localStorage.getItem('books'));
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        
        // Create an update notification about the new book
        const update = {
            id: Date.now(),
            message: `Your book "${book.bookName}" by ${book.authorName} has been added to your collection.`,
            date: new Date().toISOString(),
            type: 'new-book'
        };
        
        saveUpdate(update);
    }
    
    // Save update to local storage
    function saveUpdate(update) {
        let updates = localStorage.getItem('updates');
        if (!updates) {
            updates = JSON.stringify([]);
        }
        
        updates = JSON.parse(updates);
        updates.push(update);
        localStorage.setItem('updates', JSON.stringify(updates));
    }
    
    // Load updates from local storage
    function loadUpdates() {
        if (!localStorage.getItem('updates')) {
            // If no updates exist, create some sample updates
            const sampleUpdates = [
                {
                    id: Date.now() - 3000,
                    message: 'Your request for [Book Name] by [Author] has been sent to the owner. You will be notified once they respond.',
                    date: new Date(Date.now() - 3000).toISOString(),
                    type: 'request-sent'
                },
                {
                    id: Date.now() - 2000,
                    message: 'Great news! Your request for [Book Name] has been approved by [Owner Name]. Please coordinate for pickup.',
                    date: new Date(Date.now() - 2000).toISOString(),
                    type: 'request-approved'
                },
                {
                    id: Date.now() - 1000,
                    message: 'Reminder: Your borrowed book [Book Name] is due for return tomorrow. Please return it on time.',
                    date: new Date(Date.now() - 1000).toISOString(),
                    type: 'return-reminder'
                }
            ];
            
            localStorage.setItem('updates', JSON.stringify(sampleUpdates));
        }
        
        const updates = JSON.parse(localStorage.getItem('updates'));
        
        // Clear existing updates
        updatesContainer.innerHTML = '';
        
        // Add updates to the container
        updates.forEach(update => {
            const updateItem = document.createElement('div');
            updateItem.classList.add('update-item');
            
            const updateMessage = document.createElement('div');
            updateMessage.classList.add('update-message');
            updateMessage.textContent = `"${update.message}"`;
            
            updateItem.appendChild(updateMessage);
            updatesContainer.appendChild(updateItem);
        });
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
});