import API from "./api.js";
import { getCurrentUserId, isUserLoggedIn } from "./utils.js";

// Order storage and total amount
let orderItems = [];
let totalAmount = 0;

// Function to add an item to the order
export function addToOrder(itemName, price) {
    orderItems.push(itemName);
    totalAmount += price;
    console.log(`${itemName} added to the order.`);
}


document.getElementById('espresso-order').addEventListener('click', function() {
    addToOrder('Espresso', 2.5);
});

document.getElementById('latte-order').addEventListener('click', function() {
    addToOrder('Latte', 3);
});

document.getElementById('cappuccino-order').addEventListener('click', function() {
    addToOrder('Cappuccino', 2.5);
});

document.getElementById('americano-order').addEventListener('click', function() {
    addToOrder('Americano', 3);
});

document.getElementById('macchiato-order').addEventListener('click', function() {
    addToOrder('Macchiato', 2.5);
});

document.getElementById('mocha-order').addEventListener('click', function() {
    addToOrder('Mocha', 3);
});

document.getElementById('brownie-order').addEventListener('click', function() {
    addToOrder('Brownie', 2.75);
});

document.getElementById('cheesecake-order').addEventListener('click', function() {
    addToOrder('Cheesecake', 3.5);
});

document.getElementById('croissant-order').addEventListener('click', function() {
    addToOrder('Croissant', 2);
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
        let discount = 0;
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
            <br>You have been served by Waiter Ali.<br>
            Thank you for your order!<br>
            <button type="button" id="saveButton" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
                SAVE TO ARCHIVE
            </button>
        `;
        receiptDiv.innerHTML = receiptContent; // Update the receipt content

        // Button Click Listener for "Save to Archive"
        document.getElementById('saveButton').addEventListener('click', async (event) => {
           
            try {
                if(isUserLoggedIn()){
                // Prepare the data to be sent to the API
                const orderData = {
                    clientId: getCurrentUserId(),
                    orderItems: orderItems.join(", "), // join items as a comma-separated string
                    TotalAmount: totalAmount,
                    discout: discount * 100, 
                    discoutAmount: totalAmount * discount, 
                    employee: 'NONE ARE HIRED YET', 
                };
        
                // Assuming API.saveOrder is imported from api.js
                const response = await API.saveOrder(orderData);
                if (response) {
                    alert('Your order has been saved successfully!');
                    orderItems = [];
                    totalAmount = 0;
                    receiptDiv.innerHTML = ''; 
                } else {
                    alert('Failed to save the order. Try again later.');
                }
            }
            else{
                alert('Please Login if you want to save your order');
            }
            } catch (error) {
                console.error('Error saving order:', error);
                alert('Error saving order. Please try again.');
            }
        });
    
    } else {
        receiptDiv.innerHTML = "No orders yet."; 
    }
}



