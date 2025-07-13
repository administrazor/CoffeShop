import API from "./api.js";
import { getCurrentUserId } from "./utils.js";
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const profileResponse = await API.getProfile();
    const profileData = profileResponse.data[0];
    console.log("data", profileData);

    const firstName = profileData.firstname || "ffff";
    const lastName = profileData.lastname || "llll";
    const addressValue = profileData.address || "location";
    const phoneNumberValue = profileData.phoneNumber || "00000000";
    const genderValue = profileData.gender || "";
    const emailValue = profileData.email || "email@gmail.com";

    // Populate the form fields
    document.getElementById("firstname").value = firstName;
    document.getElementById("lastname").value = lastName;
    document.getElementById("address").value = addressValue;
    document.getElementById("phone").value = phoneNumberValue;
    document.getElementById("gender").value = genderValue;
    document.getElementById("email").value = emailValue;

    // Fetch and populate order history
    const userId = getCurrentUserId();
    const orderHistory = await API.getOrderHistory(userId);
    console.log("data", orderHistory);
    populateOrderTable(orderHistory);
    console.log("orders are up to date");
  } catch (error) {
    console.error("Error loading profile data:", error);
  }

  // enable edit button
  document.getElementById("edit-btn").addEventListener("click", function () {
    enableEditing();
  });

  //update profile
  const profileForm = document.getElementById("profile-form");
  profileForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      console.log("validation failed");
      return;
    }
    const updatedData = {
      id: getCurrentUserId(),
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      address: document.getElementById("address").value,
      phoneNumber: document.getElementById("phone").value,
      gender: document.getElementById("gender").value,
      email: document.getElementById("email").value,
    };

    try {
      await API.updateProfile(updatedData);
      alert("Profile updated successfully!");
      disableEditing();
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile.");
    }
  });

  document
    .getElementById("delete-btn")
    .addEventListener("click", async function () {
      const confirmation = confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );
      if (confirmation) {
        try {
          const userId = getCurrentUserId();
          await API.deleteProfile(userId);
          // Remove user data from local storage
          localStorage.removeItem("user");
          alert("Account deleted successfully!");
          window.location.href = "./index.html";
        } catch (error) {
          console.error("Error deleting profile:", error);
          alert("Failed to delete account.");
        }
      }
    });

  function enableEditing() {
    document.getElementById("firstname").disabled = false;
    document.getElementById("lastname").disabled = false;
    document.getElementById("address").disabled = false;
    document.getElementById("phone").disabled = false;
    document.getElementById("gender").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("edit-btn").hidden = true;
    document.getElementById("save-btn").hidden = false;
  }

  function disableEditing() {
    document.getElementById("firstname").disabled = true;
    document.getElementById("lastname").disabled = true;
    document.getElementById("address").disabled = true;
    document.getElementById("phone").disabled = true;
    document.getElementById("gender").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("edit-btn").hidden = false;
    document.getElementById("save-btn").hidden = true;
  }
});

function validateForm() {
  // Get input values
  const fname = document.getElementById("firstname").value.trim();
  const lname = document.getElementById("lastname").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const email = document.getElementById("email").value.trim();
  let errorMessage = "";

  if (fname === "") {
    errorMessage += "First Name should not be empty.\n";
  } else if (!/^[A-Za-z]+$/.test(fname)) {
    errorMessage += "First Name should contain only letters.\n";
  }
  if (lname === "") {
    errorMessage += "Last Name should not be empty.\n";
  } else if (!/^[A-Za-z]+$/.test(lname)) {
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
  if (email === "") {
    errorMessage += "Email should not be empty.\n";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorMessage += "Please enter a valid email address.\n";
  }
  if (errorMessage) {
    alert(errorMessage);
    return false;
  } else {
    return true;
  }
}

function populateOrderTable(orderHistory) {
  const tbody = document.querySelector(".order-history tbody");
  tbody.innerHTML = ""; // Clear existing rows
  orderHistory.forEach((order) => {
    const row = document.createElement("tr");
    const orderIdCell = document.createElement("td");
    orderIdCell.textContent = `#${order.id}`;
    row.appendChild(orderIdCell);
    const dateCell = document.createElement("td");
    dateCell.textContent = new Date(order.datetime).toLocaleDateString();
    // Format date
    row.appendChild(dateCell);
    const itemsCell = document.createElement("td");
    itemsCell.textContent = order.orderItems; // Directly use orderItems
    row.appendChild(itemsCell);
    const totalCell = document.createElement("td");
    totalCell.textContent = `$${order.totalAmount.toFixed(2)}`;
    // Format total amount
    row.appendChild(totalCell);
    tbody.appendChild(row);
  });
}
