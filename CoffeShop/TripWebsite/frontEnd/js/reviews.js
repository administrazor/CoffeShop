import API from "./api.js";
import {
  getCurrentUserId,
  getCurrentUserName,
  isUserLoggedIn,
} from "../js/utils.js";

const reviewForm = document.getElementById("review-form");


// Helper function to display a review on the page
function displayReview({ firstname, review, rating, clientId }) {
  // Create a new list item for the testimonial
  const li = document.createElement("li");
  li.innerHTML = `
        <div class="commun">
            <div>
                <i class="fa fa-user"></i>
            </div>
            <div>
                <span>${firstname}</span>
                <div class="sub-commun"> 
                    <p class="text-rev">${review}</p>
                    <div class="stars">${getStars(rating)}</div>
                </div>
            </div>
        </div>
    `;

  // Append the new testimonial to the list
  document.getElementById("testimonial-ul").appendChild(li);
}

// Function to load and display all reviews
async function loadReviews() {
  try {
    const reviews = await API.getAllReviews();
    const reviewsList = document.getElementById("testimonial-ul");
    reviewsList.innerHTML = ""; // Clear existing reviews before adding new ones

    reviews.forEach(review => {
      // Assuming review object has firstname, review, rating, clientId
      displayReview(review);
    });
  } catch (error) {
    console.error("Failed to load reviews:", error);
  }
}

// Call loadReviews when the page loads
window.addEventListener("DOMContentLoaded", loadReviews);


// Helper function to generate star ratings
function getStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars +=
      i <= rating
        ? '<i class="fas fa-star"></i>' // Filled star
        : '<i class="far fa-star"></i>'; // Empty star
  }
  return stars;
}


const stars = document.querySelectorAll(".star-rating .star");
const hiddenInput = document.getElementById("input3");

// Star click behavior
stars.forEach((star) => {
  star.addEventListener("click", () => {
    const rating = parseInt(star.getAttribute("data-value"));
    hiddenInput.value = rating;

    stars.forEach((s) => {
      s.classList.remove("selected");
      if (parseInt(s.getAttribute("data-value")) <= rating) {
        s.classList.add("selected");
      }
    });
  });
});

// Add event listener to the form
reviewForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const reviewData = {
    firstname: getCurrentUserName(),
    review: document.getElementById("input2").value.trim(),
    rating: parseInt(document.getElementById("input3").value.trim()),
    clientId: getCurrentUserId(),
  };
  

  try {
    if (isUserLoggedIn()) {
      await API.review(reviewData);
      console.log("Review added successfully!");
      displayReview(reviewData);
      reviewForm.reset();
      // Reset stars
      stars.forEach((s) => s.classList.remove("selected"));
      hiddenInput.value = "5"; // default back
    }
  } catch (error) {
    console.error("Error during adding review:", error.message);
  }
});
