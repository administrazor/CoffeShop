import API from "./api.js";
const socket = io("http://localhost:5000");
socket.on("connect", () => {
  console.log("Connected to server");
});

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const order = await API.getOrders();
        populateOrderTable(order);
        updateDashboardStats();

    socket.on("new-order", (order) => {
  console.log("New order received:", order);
  appendSingleOrder(order);
  updateDashboardStats();
});
    console.log("orders are up to date");
  } catch (error) {
    console.error("Error loading profile data:", error);
  }
});



function populateOrderTable(orders) {
  const tbody = document.querySelector(".order-history tbody");
  tbody.innerHTML = ""; // Clear existing rows

  if (!Array.isArray(orders)) {
    console.error("Expected orders to be an array:", orders);
    return;
  }

  orders.forEach(order => {
    const row = createOrderRow(order);
    tbody.appendChild(row);
  });
}


function createOrderRow(order) {
  const row = document.createElement("tr");

  // Order ID
    const orderIdCell = document.createElement("td");
    orderIdCell.textContent = `#${order.id}`;
    row.appendChild(orderIdCell);

    // Client ID
    const clientCell = document.createElement("td");
    clientCell.textContent = order.clientId || "Unknown";
    row.appendChild(clientCell);

    // Order Items
    const itemsCell = document.createElement("td");
    itemsCell.textContent = order.orderItems;
    row.appendChild(itemsCell);

    // Total Amount
    const totalCell = document.createElement("td");
    totalCell.textContent = `$${order.totalAmount}`;
    row.appendChild(totalCell);

    // Scheduled Time
    const scheduledCell = document.createElement("td");
    scheduledCell.textContent = order.scheduledTime || "--";
    row.appendChild(scheduledCell);    

    // Order Method
    const methodCell = document.createElement("td");
    methodCell.textContent = order.orderMethod || "--";
    row.appendChild(methodCell);

    // Delivery Address (only if delivery)
    const addressCell = document.createElement("td");
    addressCell.textContent = order.orderMethod === "delivery" ? order.deliveryAddress : "____";
    row.appendChild(addressCell);


    // Full Datetime
    const dateCell = document.createElement("td");
    dateCell.textContent = new Date(order.datetime).toLocaleString();
    row.appendChild(dateCell);

    // --- Status Button Cell ---
const statusCell = document.createElement("td");
const btnWrapper = document.createElement("div");
btnWrapper.classList.add("btn-wrapper");

// Preparing button
const preparingBtn = document.createElement("button");
preparingBtn.textContent = "Preparing";
preparingBtn.classList.add("preparing-btn");

// Done button
const doneBtn = document.createElement("button");
doneBtn.textContent = "Done";
doneBtn.classList.add("done-btn");

// Toggle buttons based on order.status
if (order.status === "preparing") {
  preparingBtn.style.display = "none";
  doneBtn.style.display = "inline-block";
} else {
  preparingBtn.style.display = "inline-block";
  doneBtn.style.display = "none";
}

// Add buttons to wrapper
btnWrapper.appendChild(preparingBtn);
btnWrapper.appendChild(doneBtn);
statusCell.appendChild(btnWrapper);
row.appendChild(statusCell);

  // Preparing click
    preparingBtn.onclick = async() => {
        try {
    preparingBtn.disabled = true; // optional: prevent double clicks

    await markPreparing(order.id);

    preparingBtn.style.display = "none";
    doneBtn.style.display = "inline-block";

    // Done click
    doneBtn.onclick = () => {
      markDone(order.id);
      doneBtn.disabled = true;
      window.location.reload();
    };


  } catch (error) {
    console.error("Failed to update order:", error);
    alert("Failed to update order. Please try again.");
    
    preparingBtn.disabled = false;
    }
  };


  return row;
}



function appendSingleOrder(order) {
  const tbody = document.querySelector(".order-history tbody");
  const row = createOrderRow(order);
  tbody.appendChild(row);
}






async function markPreparing(orderId) {
  const updatedData = {status: 'preparing'};
  try {
    await API.updateOrders(orderId, updatedData);
    alert(`Order #${orderId} is now being prepared.`);
  } catch (err) {
    console.error("Update failed:", err);
    alert("Could not update order.");
  }
}

async function markDone(orderId) {
  const updatedData = {status: 'done'};
  try {
    await API.updateOrders(orderId, updatedData);
    alert(`Order #${orderId} is completed.`);
  } catch (err) {
    console.error("Update failed:", err);
    alert("Could not update order.");
  }
}


async function updateDashboardStats() {
    try {
      const data = await API.getOrderStatistic();

      // Inject the numbers into the UI
      
      document.getElementById("todays-sales").textContent = `$${Number(data.todaysSales || 0).toFixed(2)}`;
      document.getElementById('popular-item').textContent = data.popularItem || 'No item';
      document.getElementById("ordering-users").textContent =
  `${data.OrderingUsers || 0} / ${data.totalUsers || 0}`;
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
    }
  }