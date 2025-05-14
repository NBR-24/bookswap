document.addEventListener('DOMContentLoaded', function () {
    // --- Dropdown menu functionality ---
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const menu = this.nextElementSibling;

            document.querySelectorAll('.dropdown-menu.active').forEach(openMenu => {
                if (openMenu !== menu) {
                    openMenu.classList.remove('active');
                }
            });

            menu.classList.toggle('active');
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });

    // --- Edit modal functionality ---
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editModal = document.getElementById('edit-modal');
    const closeModal = document.querySelector('.close-modal');
    const editForm = document.getElementById('edit-profile-form');
    const profileImage = document.getElementById('profile-image');
    const profileImageInput = document.getElementById('profile-image-input');

    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const userYear = document.getElementById('user-year');
    const userDepartment = document.getElementById('user-department');
    const userFavBook = document.getElementById('user-fav-book');

    const editName = document.getElementById('edit-name');
    const editEmail = document.getElementById('edit-email');
    const editYear = document.getElementById('edit-year');
    const editDepartment = document.getElementById('edit-department');
    const editFavBook = document.getElementById('edit-fav-book');

    editProfileBtn.addEventListener('click', function () {
        editName.value = userName.textContent;
        editEmail.value = userEmail.textContent;
        editYear.value = userYear.textContent;
        editDepartment.value = userDepartment.textContent;
        editFavBook.value = userFavBook.textContent;

        editModal.style.display = 'block';
    });

    closeModal.addEventListener('click', function () {
        editModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    profileImageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
                localStorage.setItem('bookswap_profile_image', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    editForm.addEventListener('submit', function (event) {
        event.preventDefault();

        userName.textContent = editName.value;
        userEmail.textContent = editEmail.value;
        userYear.textContent = editYear.value;
        userDepartment.textContent = editDepartment.value;
        userFavBook.textContent = editFavBook.value;

        document.title = `BookSwap - ${editName.value}'s Profile`;
        profileImage.alt = `${editName.value}'s Profile Picture`;

        saveProfileData();
        editModal.style.display = 'none';
        showNotification('Profile updated successfully!');
    });

    function loadProfileData() {
        const savedData = localStorage.getItem('bookswap_profile');
        const savedImage = localStorage.getItem('bookswap_profile_image');

        if (savedData) {
            const profileData = JSON.parse(savedData);
            userName.textContent = profileData.name;
            userEmail.textContent = profileData.email;
            userYear.textContent = profileData.year;
            userDepartment.textContent = profileData.department;
            userFavBook.textContent = profileData.favBook;
            document.title = `BookSwap - ${profileData.name}'s Profile`;
            profileImage.alt = `${profileData.name}'s Profile Picture`;
        }

        if (savedImage) {
            profileImage.src = savedImage;
        }
    }

    function saveProfileData() {
        const profileData = {
            name: userName.textContent,
            email: userEmail.textContent,
            year: userYear.textContent,
            department: userDepartment.textContent,
            favBook: userFavBook.textContent
        };
        localStorage.setItem('bookswap_profile', JSON.stringify(profileData));
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '15px 20px',
            backgroundColor: '#f2994a',
            color: 'white',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            opacity: '0',
            transition: 'opacity 0.3s ease-in-out'
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }, 100);
    }

    loadProfileData();
});
