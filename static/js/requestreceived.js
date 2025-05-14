document.addEventListener('DOMContentLoaded', function () {
    const requestContainer = document.querySelector('.main-content'); // Parent container

    if (requestContainer) {
        requestContainer.addEventListener('click', function (event) {
            const target = event.target;

            if (target.classList.contains('approve-button')) {
                handleCardAction(target, 'approve');
            } else if (target.classList.contains('reject-button')) {
                handleCardAction(target, 'reject');
            }
        });
    }

    // Function to handle approve/reject actions
    function handleCardAction(button, action) {
        const requestCard = button.closest('.request-card');
        if (!requestCard) return;

        // Alert message
        alert(`Request for "${requestCard.querySelector('.book-title').textContent}" has been ${action}d.`);

        // Create a placeholder to maintain layout
        const placeholder = createPlaceholder(requestCard);

        // Apply fade-out effect
        requestCard.style.opacity = '0';
        requestCard.style.transition = 'opacity 0.5s ease';

        // Replace the card with a placeholder after fade-out
        setTimeout(() => {
            requestCard.parentNode.insertBefore(placeholder, requestCard);
            requestCard.remove();

            // Remove the placeholder after a delay
            setTimeout(() => {
                placeholder.style.opacity = '0';
                setTimeout(() => placeholder.remove(), 300);
            }, 100);
        }, 500);
    }

    // Function to create a placeholder for smooth removal effect
    function createPlaceholder(card) {
        const placeholder = document.createElement('div');
        placeholder.className = 'card-placeholder';
        placeholder.style.width = card.offsetWidth ;
        placeholder.style.height = card.offsetHeight ;
        placeholder.style.margin = '15px';
        placeholder.style.float = 'left';
        placeholder.style.visibility = 'hidden'; // Hidden but takes up space
        return placeholder;
    }

    // Handle favorite (heart) button clicks
    document.querySelectorAll('.heart-button').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const heartIcon = this.querySelector('i');
            heartIcon.classList.toggle('fa-regular');
            heartIcon.classList.toggle('fa-solid');
            heartIcon.style.color = heartIcon.classList.contains('fa-solid') ? '#ff6b6b' : '';
        });
    });

    // Favorite button in the sidebar
    const favoriteBtn = document.querySelector('.favorite-btn a');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    }
});
