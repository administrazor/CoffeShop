import API from "./api.js";
import { getCurrentUserId, isUserLoggedIn } from "./utils.js";

// Order storage and total amount
let orderItems = [];
let totalAmount = 0;
let selectedItemName = "";
let selectedItemPrice = 0;
let selectedItemCategory = "";
let basePrice = 0;
let preperation_time = 0;
let timeToPreper = 0;
let hour = "";
let minute ="";
let discount = 0;
let flatpickrInstance = null;




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
            <a class="order-button" id="espresso-order" onclick="openCustomization('${product.name}', ${product.price}, ${product.timeToPreper}, '${product.category}')">Add to cart</a>
          </div>
        </div>`;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to load menu:", err);
  }
}

window.onload = loadMenu;


//selection size model
let selectedSize =""
document.querySelectorAll(".size-option").forEach(option => {
  option.addEventListener("click", () => {
    // Deselect all first
    document.querySelectorAll(".size-option").forEach(o => o.classList.remove("selected"));
    option.classList.add("selected");

    const size = option.getAttribute("data-size");
    selectedSize = size;
    document.getElementById("order-size").value = size;

    // Adjust price based on size
    if (size === "Small") {
      selectedItemPrice = basePrice;
    } else if (size === "Medium") {
      selectedItemPrice = basePrice + 0.5;
    } else if (size === "Large") {
      selectedItemPrice = basePrice + 1;
    }

    // Optionally show it in the modal
    document.getElementById("modal-title").innerText = `Customize ${selectedItemName} - $${selectedItemPrice.toFixed(2)}`;
  });
});






// Function to add an item to the order with customization
window.openCustomization = async function(itemName, price, preperation, category) {
  selectedItemName = itemName;
  basePrice = price; // Save base price (small)
  selectedItemPrice = price; // Default
  preperation_time = preperation;
  selectedItemCategory = category;


  // Reset selection
  document.getElementById("order-size").value = "";
  document.querySelectorAll(".size-option").forEach(o => o.classList.remove("selected"));
  document.getElementById("order-quantity").value = 1;
  document.querySelectorAll('#addons-list input[type="checkbox"]').forEach(cb => cb.checked = false);
  // Select the small option by default
const mediumOption = document.querySelector('.size-option[data-size="Small"]');
if (mediumOption) {
  mediumOption.classList.add("selected");
  document.getElementById("order-size").value = "Small";
}

  document.getElementById("modal-title").innerText = `Customize ${itemName}`;
  document.getElementById("custom-modal").style.display = "flex";
  

  // Toggle visibility based on item type
if (category === 'croissant') {
  document.getElementById("filling-section").style.display = "block";
  document.getElementById("addons-section").style.display = "none";
  document.getElementById("size-section").style.display = "none";
} else if (category === 'desserts') {
  document.getElementById("filling-section").style.display = "none";
  document.getElementById("addons-section").style.display = "none";
  document.getElementById("size-section").style.display = "none";
} else if (category === 'drinks'){
  document.getElementById("filling-section").style.display = "none";
  document.getElementById("addons-section").style.display = "block";
  document.getElementById("size-section").style.display = "block";
}

}

// Function to close the customization model
function closeCustomization() {
    document.getElementById("custom-modal").style.display = "none";
}

// When modal close button is clicked
document.getElementById("modal-close").addEventListener("click", closeCustomization);

// When "Add to Cart" is confirmed
document.getElementById("confirm-add-btn").addEventListener("click", () => {
    const size = document.getElementById("order-size").value;
    const quantity = parseInt(document.getElementById("order-quantity").value);
    const addons = Array.from(document.querySelectorAll("#addons-list input:checked")).map(i => i.value);
    const filling = document.getElementById("filling-select")?.value;

    let itemDescription = "";
    const itemTotal = selectedItemPrice * quantity;

    if (selectedItemName === "Croissant") {
    itemDescription = `${quantity} x Croissant (${filling})`;
  } else if (["Brownie", "Cheesecake"].includes(selectedItemName)) {
    itemDescription = `${quantity} x ${selectedItemName}`;
  } else {
    itemDescription = `${quantity} x ${size} ${selectedItemName}`;
    if (addons.length) {
      itemDescription += ` with ${addons.join(" with ")}`;
    }
  }
    const preperationtotal = quantity * preperation_time; 
    timeToPreper += preperationtotal; 
    orderItems.push(itemDescription);
    totalAmount += itemTotal;

    console.log(`Added: ${itemDescription}`);
    alert(`${itemDescription} added to your order.`);

    closeCustomization();
});



document.getElementById('printRButton').addEventListener('click', function() {
    printR();  // Calling printR
});

// Function to print the receipt
export function printR() {
    const receiptDiv = document.getElementById('receipt');
    const now = new Date();

    // Format date and time
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const dateTimeString = now.toLocaleString('en-US', options);

    if (orderItems.length > 0) {
        // Apply Discount Logic
        const hours = now.getHours();
        
        if (hours >= 7 && hours < 12) {
            discount = 0.30; // 30% discount from 7 AM to 12 PM
        } else if (hours >= 14 && hours < 17) {
            discount = 0.20; // 20% discount from 2 PM to 5 PM
        }

        const discountedAmount = totalAmount - totalAmount * discount;

        // Create the receipt content
        const receiptContent = `
            <strong>Trip Coffee Bar</strong><br>
            <br>${dateTimeString}<br>
            <hr style="border: 1px solid black; margin: 10px 0;"> <!-- Separator -->
            ${orderItems.join('<br>')}<br>
            <strong>Original Total: $${totalAmount.toFixed(2)}</strong><br>
            <strong>Discount Applied: ${discount * 100}%</strong><br>
            <strong>Discounted Total: $${discountedAmount.toFixed(2)}</strong><br>
            <strong>Preperation Time: ${timeToPreper.toFixed(2)} minutes</strong><br>
            <br>You have been served by Waiter Ali.<br>
            Thank you for your order!<br>
            <button type="button" id="saveButton" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
                check out
            </button>
        `;
        receiptDiv.innerHTML = receiptContent; // Update the receipt content
        document.getElementById('saveButton').addEventListener('click', submitOrder);

      } else {
        receiptDiv.innerHTML = "No orders yet."; 

    }
}

// Util: Format JS Date to MySQL DATETIME string
function formatDateToMySQL(datetime) {
  const pad = n => n.toString().padStart(2, '0');
  return `${datetime.getFullYear()}-${pad(datetime.getMonth() + 1)}-${pad(datetime.getDate())} ` +
         `${pad(datetime.getHours())}:${pad(datetime.getMinutes())}:${pad(datetime.getSeconds())}`;
}

// Toggle fields based on Delivery or Pickup
function setupOrderTypeToggle() {
  let selector ="";
  document.querySelectorAll('input[name="orderType"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const isDelivery = document.querySelector('input[name="orderType"]:checked').value === 'delivery';
      document.getElementById('deliveryFields').style.display = isDelivery ? 'block' : 'none';
      document.getElementById('pickupFields').style.display = isDelivery ? 'none' : 'block';
      if(isDelivery){
         setMinimumTime('deliveryTime', timeToPreper + 10);
         selector = '#deliveryTime'
      }else{ 
        setMinimumTime('pickupTime', timeToPreper);
        selector = '#pickupTime'
      }

      if (flatpickrInstance) {
  flatpickrInstance.destroy(); // remove previous instance
}
      flatpickrInstance = flatpickr(selector, {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",      // 24-hour format
    time_24hr: true,
    onChange: function(selectedDates, dateStr, instance) {
      if (selectedDates.length > 0) {
        const date = selectedDates[0];
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const Time = `${hours}:${minutes}`;
        const futureTime = `${hour}:${minute}`;

        if(Time< futureTime){
          // alert("This time is not available. Please choose another time.");
          instance.setDate(`${hour}:${minute}`,false);  // Clear invalid selection
        }
      }
    }
  });
    });
  });
}

//seting minimum time 
function setMinimumTime(inputId, orderTimeMinutes) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + orderTimeMinutes);

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const futureTime = `${hours}:${minutes}`;
  hour = hours;
  minute = minutes;

  const timeInput = document.getElementById(inputId);
  timeInput.min = futureTime;
  timeInput.value = futureTime;
}



// Confirm Order inside Modal
async function confirmOrder() {
  console.log("Submitting orderItems:", orderItems);

  document.getElementById('confirmOrderBtn').disabled = true;
  try {
    const selectedOrderType = document.querySelector('input[name="orderType"]:checked');
     if (!selectedOrderType) {
      alert("Please choose an order method.");
        document.getElementById('confirmOrderBtn').disabled = false;
      return;
    }


    const orderType = selectedOrderType.value;
    let deliveryAddress = "";
    let scheduledTime = "";


    

    // Validate input fields
    if (orderType === 'delivery') {
      const facultySelect = document.getElementById('facultySelect');
  const facultyText = facultySelect.options[facultySelect.selectedIndex].text;
  const manualAddress = document.getElementById('deliveryAddress').value.trim(); 

  deliveryAddress = `${facultyText} - ${manualAddress}`;
      scheduledTime = document.getElementById('deliveryTime').value;
      
      if (!deliveryAddress || !scheduledTime) {
        alert("Please enter both delivery address and delivery time.");
          document.getElementById('confirmOrderBtn').disabled = false;
        return;
      }
    } else {
      scheduledTime = document.getElementById('pickupTime').value;
      if (!scheduledTime) {
        alert("Please enter pickup time.");
          document.getElementById('confirmOrderBtn').disabled = false;
        return;
      }
    }

    const dateTime = formatDateToMySQL(new Date());

    // Prepare Order Data
    const orderData = {
      clientId: getCurrentUserId(),
      orderItems: orderItems.join(", "),
      TotalAmount: totalAmount,
      discout: discount * 100,
      discoutAmount: totalAmount * discount,
      datetime: dateTime,
      employee: 'NONE ARE HIRED YET',
      orderMethod: orderType,
      deliveryAddress: deliveryAddress || "null",
      scheduledTime: scheduledTime
    };

    const response = await API.saveOrder(orderData);
    if (response) {
      alert('Your order has been saved successfully!');
      const receiptDiv = document.getElementById('receipt');
      receiptDiv.innerHTML = '';
      resetOrderState();
      document.getElementById('orderOptionsModal').style.display = 'none';
      closeOrderModal();
    } else {
      alert('Failed to save the order. Try again later.');
        document.getElementById('confirmOrderBtn').disabled = false;
    }

  } catch (error) {
    console.error('Error saving order:', error);
    alert('An error occurred while saving the order.');
      document.getElementById('confirmOrderBtn').disabled = false;
  }
    document.getElementById('confirmOrderBtn').disabled = false;

}

function resetOrderState() {
  orderItems = [];
  totalAmount = 0;
  timeToPreper = 0;
  selectedItemName = "";
  selectedItemPrice = 0;
  selectedItemCategory = "";
  basePrice = 0;
  preperation_time = 0;
  selectedSize = "";
}

function closeOrderModal() {
  const modal = document.getElementById('orderOptionsModal');
  modal.style.display = 'none';

  // Clear all form fields
  document.getElementById('deliveryAddress').value = '';
  // document.getElementById('deliverytime').value = '';
  // document.getElementById('pickupTime').value = '';

  // Optionally reset the selected option
  const radios = document.querySelectorAll('input[name="orderType"]');
  radios.forEach(r => r.checked = false);

  // Hide both delivery and pickup fields
  document.getElementById('deliveryFields').style.display = 'none';
  document.getElementById('pickupFields').style.display = 'none';
}

// Main Checkout Button Handler
function submitOrder(){
  if (!isUserLoggedIn()) {
    alert('Please login if you want to save your order.');
    return;
  }

  if (orderItems.length === 0) {
    receiptDiv.innerHTML = "No orders yet.";
    return;
  }
  
  // Open the Modal Form
  document.getElementById('orderOptionsModal').style.display = 'flex';
  setupOrderTypeToggle();
}

// Confirm Order Button Inside Modal
document.getElementById('confirmOrderBtn').addEventListener('click', confirmOrder);
document.getElementById('closeOrderBtn').addEventListener('click', closeOrderModal);




// faculti image with button on it
  const facultyMaps = {
    
    science: {
      image: "../images/science-map.jpg",
      locations: [
        { name: "East Gate", x: 460, y: 80 },
        { name: "West Gate", x: 120, y: 100 },
        { name: "Annex", x: 350, y: 200 }
      ]
    },
    business: {
      image: "../images/business-map.jpg",
      locations: [
        { name: "Second Gate", x: 120, y: 70 },
        { name: "Main Gate", x: 100, y: 200 }
      ]
    },
    fine_arts: {
      image: "../images/fine-arts-map.jpg",
      locations: [
        { name: "Main Gate", x: 400, y: 300 },
        { name: "Back Gate", x: 140, y: 140 }
      ]
    }
  };

  window.loadFacultyMap = 
  function loadFacultyMap() {
    console.log("Selected faculty" );
    const selectedFaculty = document.getElementById("facultySelect").value;
    const container = document.getElementById("facultyMapContainer");
    container.innerHTML = "";
   

    if (!selectedFaculty || !facultyMaps[selectedFaculty]) return;

    const { image, locations } = facultyMaps[selectedFaculty];

    const mapWrapper = document.createElement("div");
    mapWrapper.style.position = "relative";
    mapWrapper.style.display = "inline-block";

    const img = document.createElement("img");
    img.src = image;
    img.alt = selectedFaculty + " map";
    img.style.width = "500px";
    img.style.border = "2px solid #ccc";

    mapWrapper.appendChild(img);

    locations.forEach(loc => {
      const btn = document.createElement("button");
      btn.innerText = loc.name;
      btn.style.position = "absolute";
      btn.style.left = loc.x + "px";
      btn.style.top = loc.y + "px";
      btn.style.transform = "translate(-50%, -50%)";
      btn.style.padding = "5px 10px";
      btn.style.background = "#4CAF50";
      btn.style.color = "white";
      btn.style.border = "none";
      btn.style.borderRadius = "8px";
      btn.style.cursor = "pointer";
      btn.onclick = function () {
      document.getElementById("deliveryAddress").value = loc.name;
    };
      mapWrapper.appendChild(btn);
    });

    container.appendChild(mapWrapper);
  }




