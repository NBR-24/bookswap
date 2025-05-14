// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Date input formatting
    const dateInputs = document.querySelectorAll('#date, #dueDate');
    dateInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 8) {
                value = value.substring(0, 8);
            }
            
            // Format as dd/mm/yyyy
            if (value.length > 4) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4) + '/' + value.substring(4);
            } else if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            
            e.target.value = value;
        });
    });

    // Time input formatting
    const timeInput = document.getElementById('time');
    if (timeInput) {
        timeInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 4) {
                value = value.substring(0, 4);
            }
            
            // Format as hh:mm
            if (value.length > 2) {
                value = value.substring(0, 2) + ':' + value.substring(2);
            }
            
            e.target.value = value;
        });
    }

    // Upload Button Functionality
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            // Create a file input element
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.pdf,.epub,.mobi';
            fileInput.style.display = 'none';
            
            // Trigger click event on file input
            document.body.appendChild(fileInput);
            fileInput.click();
            
            // Handle file selection
            fileInput.addEventListener('change', function() {
                if (fileInput.files.length > 0) {
                    const fileName = fileInput.files[0].name;
                    uploadBtn.textContent = fileName;
                }
                
                // Clean up
                document.body.removeChild(fileInput);
            });
        });
    }

    // Form Submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            console.log('Form Data:', formDataObj);
            
            // Show submission confirmation
            alert('Request has been sent successfully!');
            
            // Reset form
            form.reset();
        });
    });

    // Send buttons outside forms
    const sendButtons = document.querySelectorAll('.btn-send:not([type="submit"])');
    sendButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Check if it's in the EBook section
            if (this.closest('.mode-card').querySelector('.mode-title').textContent.includes('EBook')) {
                const uploadBtn = document.getElementById('uploadBtn');
                
                // Check if a file has been selected
                if (uploadBtn.textContent !== 'Upload from device') {
                    alert('EBook has been sent successfully!');
                    uploadBtn.textContent = 'Upload from device';
                } else {
                    alert('Please select a file first!');
                }
            }
        });
    });
});