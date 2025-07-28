import API from "./api.js";

// Frontend JS (signup.js)
const signupForm = document.getElementById("signupForm");
let errorMessage = "";

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent page reload
  try {
    const genderInput = document.querySelector('input[name="gender"]:checked');
    const genderValue = genderInput ? genderInput.value : null; // Safely get gender value or null if not selected

    if (!genderValue) {
      alert("Please select your gender.");
      return; // Stop submission if gender is not selected
    }

    const userData = {
      firstname: document.getElementById("inputFirstName").value.trim(),
      lastname: document.getElementById("inputLastName").value.trim(),
      address: document.getElementById("inputAddress").value.trim(),
      phoneNumber: document.getElementById("inputPhone").value.trim(),
      gender: genderValue,
      email: document.getElementById("inputEmail").value.trim(),
      password: document.getElementById("inputPassword").value,
    };

    if (!validateForm()) {
      console.log("Validation failed");
      return; // Stop if validation fails
    }

    console.log("User data:", userData); //to inspect the data

    const result = await API.signup(userData); // Make the API call
    console.log("API response:", result); // Log the response from API

    if (result && result.user) {
      alert("Successfully signed up!"); // Show success alert
      localStorage.setItem("user", JSON.stringify(result.user));

// WE NEED TO STRINGIFY IN ORDER TO SAVE IN LOCALSTROAGE AND JSON.PARSE() PARSE FROM STRING TO JSON AGAIN

      window.location.href = "./index.html";
      console.log("Logged-in user:", result.user);
      signupForm.reset(); // Reset the form fields
    }
  } catch (error) {
    console.error("Signup error:", error.message);
    alert("An error occurred while signing up. Please try again.");
  }
});

function validateForm() {
  // Get input values
  const fname = document.getElementById("inputFirstName").value.trim();
  const lname = document.getElementById("inputLastName").value.trim();
  const address = document.getElementById("inputAddress").value.trim();
  const phone = document.getElementById("inputPhone").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const email = document.getElementById("inputEmail").value.trim();
  const password = document.getElementById("inputPassword").value;

  errorMessage = "";

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

  if (fname === "") {
    errorMessage += "First Name should not be empty.\n";
  } else if (!/^[A-Za-z]+$/.test(fname)) {
    // Check for letters only
    errorMessage += "First Name should contain only letters.\n";
  }

  if (lname === "") {
    errorMessage += "Last Name should not be empty.\n";
  } else if (!/^[A-Za-z]+$/.test(lname)) {
    // Check for letters only
    errorMessage += "Last Name should contain only letters.\n";
  }

  if (address === "") {
    errorMessage += "Address should not be empty.\n";
  }

  const phonePattern = /^[0-9]{8}$/;
  if (phone === "") {
    errorMessage += "Phone Number should not be empty.\n";
  } else if (!phonePattern.test(phone)) {
    errorMessage += "Please enter a valid 8-digit phone number.\n";
  }

  if (!gender) {
    errorMessage += "Please select your gender.\n";
  }

  if (email === "") {
    errorMessage += "Email should not be empty.\n";
  } else if (!emailPattern.test(email)) {
    errorMessage += "Please enter a valid email address.\n";
  }

  // Password validation
  const passwordPattern = /^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/; // At least 8 characters, 1 uppercase, 1 special character
  if (password === "") {
    errorMessage += "Password should not be empty.\n";
  } else if (!passwordPattern.test(password)) {
    errorMessage +=
      "Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 special character.\n";
  }

  if (errorMessage) {
    alert(errorMessage);
    return false;
  } else {
    return true;
  }
}
