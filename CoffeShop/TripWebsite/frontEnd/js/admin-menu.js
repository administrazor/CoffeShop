import API from "./api.js";

async function loadMenu() {
  try {
    const products = await API.getAllProducts();
    window.currentProducts = products;  // save for later
    const container = document.getElementById("menu-all");
    container.innerHTML = "";

    products.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("menu-comm");
      div.innerHTML = `
        <img src="${product.image_path}" alt="${product.name}">
        <div class="menu-content">
          <div class="product-name">${product.name}</div>
          <div class="product-price">$${product.price.toFixed(2)}</div>
          <div class="product-description">${product.description}</div>
          <div class="menu-buttons">
            <a class="order-button" onclick="editProduct(${product.id})">Edit</a>
            <a class="order-button" onclick="deleteProduct(${product.id})">Delete</a>
          </div>
        </div>`;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to load menu:", err);
  }
}

window.onload = loadMenu;


window.editProduct = function(id) {
  const product = window.currentProducts.find(p => p.id === id);
  if (!product) return alert("Product not found");

  // Populate form
  document.getElementById("edit-name").value = product.name;
  document.getElementById("edit-price").value = product.price;
  document.getElementById("edit-description").value = product.description;
  document.getElementById("edit-image-path").value = product.image_path;
  document.getElementById("edit-category").value = product.category;
  document.getElementById("edit-time-to-preper").value = product.timeToPreper;
  document.getElementById("edit-form").dataset.productId = id;

  // Show modal
  document.getElementById("edit-modal").classList.remove("hidden");
};

document.getElementById("close-modal").onclick = () => {
  document.getElementById("edit-modal").classList.add("hidden");
};

document.getElementById("edit-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = e.target.dataset.productId;
  const updatedData = {
    name: document.getElementById("edit-name").value,
    price: parseFloat(document.getElementById("edit-price").value),
    description: document.getElementById("edit-description").value,
    image_path: document.getElementById("edit-image-path").value,
    category: document.getElementById("edit-category").value,
    timeToPreper: document.getElementById("edit-time-to-preper").value
  };

  try {
    await API.updateProduct(id, updatedData);
    alert("Product updated!");
    document.getElementById("edit-modal").classList.add("hidden");
    loadMenu(); // Refresh list
  } catch (err) {
    console.error("Update failed:", err);
    alert("Could not update product.");
  }
});

  window.deleteProduct = async function(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
    await API.deleteProduct(id); // Assuming this throws on error

    alert("Product deleted");
    loadMenu(); // refresh product list
  } catch (error) {
    console.error("Delete error:", error);
    alert("An error occurred while deleting.");
  }
};


document.getElementById("add-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById("image-upload");
  const file = fileInput.files[0];
   // Basic validation
  if (!file) {
    alert("Please select an image.");
    return;
  }
  const fileName = file.name; 
  const imageUrl = `http://127.0.0.1:5500/CoffeShop/TripWebsite/frontEnd/images/${fileName}`;
  
  
const formData = {
  name : document.getElementById("add-name").value,
  price : parseFloat(document.getElementById("add-price").value),
  description : document.getElementById("add-description").value,
  category : document.getElementById("add-category").value,
  timeToPreper : document.getElementById("add-time-to-preper").value,
  image_path : imageUrl
}

 

  try {
    await API.addProduct(formData); // You'll define this below
    alert("Product added successfully!");

    // Reset form and image preview
    document.getElementById("add-form").reset();
    document.getElementById("image-upload").value = "";
    document.getElementById("new-item-image").src = "";
    loadMenu(); // Refresh the menu
  } catch (error) {
    console.error("Add product error:", error);
    alert("Failed to add product.");
  }
});


  

  // Load on page load
  window.onload = loadMenu;

// view the image dynamicaly whene adding image
  const imageInput = document.getElementById("image-upload");
  const imagePreview = document.getElementById("new-item-image");

  imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        imagePreview.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  });
  


//for image preview in the edit form
  document.addEventListener('DOMContentLoaded', () => {
    const imagePathInput = document.getElementById('edit-image-path');
    const imagePreview = document.getElementById('image-preview');
    const editModal = document.getElementById('edit-modal');

    function updateImagePreview() {
      const path = imagePathInput.value.trim();
      if (path) {
        imagePreview.src = path;
        imagePreview.style.display = 'block';
      } else {
        imagePreview.src = '';
        imagePreview.style.display = 'none';
      }
    }

    // Update when the input is changed
    imagePathInput.addEventListener('input', updateImagePreview);

    // Update when the modal is shown
    const observer = new MutationObserver(() => {
      if (!editModal.classList.contains('hidden')) {
        updateImagePreview();
      }
    });

    observer.observe(editModal, { attributes: true, attributeFilter: ['class'] });
  });
