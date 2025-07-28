import API from "./api.js";

const loginForm = document.getElementById("login");
let errorMessage = "";

loginForm.addEventListener("submit", async (event) => {
  //stops the form from reloading the page.
  event.preventDefault();
  try {
    const loginData = {
      email: document.getElementById("inputEmail").value.trim(),
      password: document.getElementById("inputPassword").value.trim(),
    };

    if (!validateForm()) {
      console.log("Validation failed");
      return;
    }

    const response = await API.login(loginData);
    if (response && response.user) {
      console.log("User logged in successfully!", response);
      localStorage.setItem("user", JSON.stringify(response.user));
      // saving in local storage
      console.log("Logged-in user:", response.user);
      alert("Successfully Logged in!");
      window.location.href = "./index.html";
      loginForm.reset();
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    alert(`Login failed: ${error.message}`);
  }
});

function validateForm() {
  // Get input values
  const email = document.getElementById("inputEmail").value.trim();
  const password = document.getElementById("inputPassword").value;

  errorMessage = "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Email validation
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
