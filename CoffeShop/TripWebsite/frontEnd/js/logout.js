import API from "./api.js";

// Wait for navbar to load before adding logout functionality
document.addEventListener("navbarLoaded", () => {
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", async (event) => {
      event.preventDefault();
      const response = await API.logout();
      if (response) {
        localStorage.removeItem("user"); // Clear user data
        alert("You have been logged out.");
        window.location.href = "login.html";
      }
    });
  } else {
    console.log("Logout link  not found");
  }
});
