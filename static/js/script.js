// Get button elements
const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");
const expandBtn = document.querySelector(".expand-btn");

// Add click events to buttons
loginBtn.addEventListener("click", () => {
  // Redirect to login page
  window.location.href = "login.html";
});

signupBtn.addEventListener("click", () => {
  // Will be implemented later with signup page
  console.log("Sign up button clicked");
  window.location.href = "signup.html";
});

// Book animation
const books = document.querySelectorAll(".book");
let angle = 0;

function animateBooks() {
  angle += 0.2;
  books.forEach((book, index) => {
    const sinValue = Math.sin(angle / 10 + index * 0.5) * 5;

    if (index === 0) {
      book.style.transform = `rotate(${20 + sinValue}deg) translateX(${
        100 + sinValue * 2
      }px)`;
    } else if (index === 1) {
      book.style.transform = `rotate(${10 + sinValue}deg) translateX(${
        50 + sinValue * 2
      }px)`;
    } else {
      book.style.transform = `rotate(${0 + sinValue}deg) translateX(${
        sinValue * 2
      }px)`;
    }
  });

  requestAnimationFrame(animateBooks);
}

// Start book animation
animateBooks();

// Expand Mind button interaction
expandBtn.addEventListener("click", () => {
  // This could open a book recommendation section or reading list
  console.log("Expand button clicked");
  // Add your functionality here
  // For example, scroll to books section or redirect to catalog
  // window.location.href = 'catalog.html';
});

// Main page animation and interaction effects
document.addEventListener("DOMContentLoaded", function () {
  // Book animation
  const books = document.querySelectorAll(".book");

  // Add subtle floating animation to books
  books.forEach((book, index) => {
    setInterval(() => {
      const yMovement = Math.sin(Date.now() / 1000 + index) * 5;
      book.style.transform = `translateY(${yMovement}px)`;
    }, 50);
  });

  // Button interactions
  const expandButton = document.querySelector(".expand-btn");
  if (expandButton) {
    expandButton.addEventListener("click", function () {
      console.log("Expand your mind button clicked");
      // Add your expand functionality here
    });
  }

  // Login button - redirects to login page
  const loginButton = document.querySelector(".login-btn");
  if (loginButton) {
    loginButton.addEventListener("click", function () {
      window.location.href = "login.html";
    });
  }

  // Signup button - redirects to signup page
  const signupButton = document.querySelector(".signup-btn");
  if (signupButton) {
    signupButton.addEventListener("click", function () {
      window.location.href = "signup.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Get references to the login and signup buttons
  const loginButton = document.querySelector(".login-btn");
  const signupButton = document.querySelector(".signup-btn");

  // Add event listener for the login button
  if (loginButton) {
    loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "login.html";
    });
  }

  // Add event listener for the signup button
  if (signupButton) {
    signupButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "signup.html";
    });
  }

  // Other existing functionality
  // Book animation, etc.

  // Check if user is already logged in
  /*const userData = localStorage.getItem('bookswapUser');
    if (userData) {
        // If user is logged in, redirect to home page
        window.location.href = 'home.html';
    }*/
});
