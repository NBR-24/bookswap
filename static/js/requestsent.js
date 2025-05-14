document.addEventListener('DOMContentLoaded', function () {
    // Toggle dropdown on click (for mobile)
    const dropdownToggle = document.querySelector('.dropdown .nav-item');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            const dropdownContent = this.nextElementSibling;
            if (dropdownContent) {
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            }
        });
    }

    // Handle favorite button clicks
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', function () {
            const heartIcon = this.querySelector('i');
            heartIcon.classList.toggle('far');
            heartIcon.classList.toggle('fas');
        });
    });

    // ** Event Delegation for Cancel Request Button **
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('cancel-btn')) {
            const button = event.target;
            const bookCard = button.closest('.book-card');
            const bookRequest = bookCard ? bookCard.closest('.book-request') : null;

            if (!bookRequest) {
                console.error('Book request element not found.');
                return;
            }

            if (confirm('Are you sure you want to cancel this request?')) {
                // Smooth fade-out animation before removal
                bookRequest.style.transition = 'opacity 0.5s ease';
                bookRequest.style.opacity = '0';

                setTimeout(() => {
                    bookRequest.remove();

                    // Update badge count
                    const badge = document.querySelector('.badge');
                    if (badge) {
                        const currentCount = parseInt(badge.textContent) || 0;
                        const newCount = Math.max(currentCount - 1, 0);
                        badge.textContent = newCount;

                        if (newCount === 0) {
                            badge.style.display = 'none';
                        }
                    }
                }, 500);
            }
        }
    });

    // Handle navigation between request sent and request approved
    document.querySelectorAll('.dropdown-item').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            document.querySelectorAll('.dropdown-item').forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Update page title
            const pageTitle = document.querySelector('.page-title');
            if (pageTitle) {
                pageTitle.textContent = this.textContent;
            }

            // Navigate to Request Received page
            if (this.textContent === 'Request Received') {
                window.location.href = 'requestreceived.html';
            } else if (this.textContent === 'Request Approved') {
                alert('Request Approved page would load here');
            }
        });
    });
});
