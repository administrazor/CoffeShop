//for communication with backend

import { getCurrentUserId } from "./utils.js";

const API_URL = "http://localhost:5000"; // Backend server URL

const API = {
  signup: async function (userData) {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Check if the response was successful
    if (!response.ok) {
      console.error(
        `Response error: ${response.status} ${response.statusText}`
      );
      throw new Error(`Error: Problem occurred with status ${response.status}`);
    }

    const data = await response.json();
    console.log("API returned data:", data);
    console.log("Success:", data.message);
    return data; // return to frontend
  },

  login: async function (loginData) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      console.error(
        `Response error: ${response.status} ${response.statusText}`
      );
      const errorData = await response.json(); // Get error details
      throw new Error(
        errorData.message ||
          `Error: Problem occurred with status ${response.status}`
      );
    }
    const data = await response.json();

    return data;
  },

  logout: async function () {
    console.log("logout from api called");
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `Response error: ${response.status} ${response.statusText}`
      );
      const errorData = await response.json(); // Get error details
      throw new Error(
        errorData.message ||
          `Error: Problem occurred with status ${response.status}`
      );
    }
    const data = await response.json();

    return data;
  },

  review: async function (reviewData) {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      console.error(
        `Response error: ${response.status} ${response.statusText}`
      );
      throw new Error(`Error: Problem occurred with status ${response.status}`);
    }
    alert("Added review successfully!");
  },

  getAllReviews: async function () {
  try {
    const response = await fetch(`${API_URL}/reviews`);
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching reviews:", err);
    throw err;
  }
},


  saveOrder: async function (orderData) {
    const response = await fetch(`${API_URL}/saveorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      console.error(
        `Response error: ${response.status} ${response.statusText}`
      );
      throw new Error(`Error: Problem occurred with status ${response.status}`);
    }
    return response;
  },

  getProfile: async function () {
    try {
      const userId = getCurrentUserId();

      // Send the user ID as part of the URL to fetch the profile data
      const response = await fetch(`${API_URL}/profileDetails/${userId}`);

      if (!response.ok) {
        console.error(
          `Response error: ${response.status} ${response.statusText}`
        );
        throw new Error(
          `Error: Problem occurred with status ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
      throw error; // Propagate the error
    }
  },

  updateProfile: async function (updatedData) {
    try {
      const response = await fetch(
        `${API_URL}/profileDetails/${updatedData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating profile");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  deleteProfile: async function (userId) {
    try {
      const response = await fetch(`${API_URL}/profileDetails/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting profile");
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting profile:", error);
      throw error;
    }
  },

  getOrderHistory: async function (userId) {
    try {
      const response = await fetch(
        `${API_URL}/profileDetails/orders/${userId}`
      );
      // by default uses get method
      if (!response.ok) {
        throw new Error("Error fetching order history");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching order history:", error);
      throw error;
    }
  },

  getOrders: async function () {
    try {
      const response = await fetch(`${API_URL}/saveorder`);
      if (!response.ok) throw new Error(`Failed to fetch orders (${response.status})`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      throw error;
    }
  },

    getOrderStatistic: async function () {
    try {
      const response = await fetch(`${API_URL}/saveorder/statistic`);
      if (!response.ok) throw new Error(`Failed to fetch orders (${response.status})`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      throw error;
    }
  },

  updateOrders: async function (id, updatedData) {
    try {
      const response = await fetch(`${API_URL}/saveorder/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error(`Failed to update order (${response.status})`);
      return await response.json();
    } catch (error) {
      console.error("Error updating order:", error.message);
      throw error;
    }
  },

  getAllProducts: async function () {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error(`Failed to fetch products (${response.status})`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error.message);
      throw error;
    }
  },

  
  addProduct: async function (productData) {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error(`Failed to add product (${response.status})`);
      return await response.json();
    } catch (error) {
      console.error("Error adding product:", error.message);
      throw error;
    }
  },

  updateProduct: async function (id, updatedData) {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error(`Failed to update product (${response.status})`);
      return await response.json();
    } catch (error) {
      console.error("Error updating product:", error.message);
      throw error;
    }
  },

  deleteProduct: async function (id) {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(`Failed to delete product (${response.status})`);
      return await response.json();
    } catch (error) {
      console.error("Error deleting product:", error.message);
      throw error;
    }
  },

};

export default API;
