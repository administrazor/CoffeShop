const userService = require('../services/orderService');


async function addOrder(req, res) {
    try {
        const orderData = req.body; 
        // await userService.addOrderToDatabase(orderData); 
        const insertResult = await userService.addOrderToDatabase(orderData);
        const insertedId = insertResult.lastID || insertResult.insertId || null;
        if (!insertedId) {
      throw new Error("Could not get inserted order ID");
    }
        const newOrder = {
      id: insertedId,
      clientId: orderData.clientId,
      orderItems: orderData.orderItems,
      totalAmount: orderData.TotalAmount || orderData.totalAmount,
      scheduledTime: orderData.scheduledTime,
      orderMethod: orderData.orderMethod,
      deliveryAddress: orderData.deliveryAddress,
      datetime: orderData.datetime,
      status: "pending",
    };
        const io = req.app.get("io");
        io.emit("new-order", newOrder);
        res.status(200).send('order added successfully!');
    } catch (err) {
        console.error('Error in addOrder:', err.message);
        res.status(500).send('Error adding order: ' + err.message);
    }
}

async function getOrders(req, res) {
  try {
    const orders = await userService.getOrders();
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).send('Error fetching orders: ' + err.message);
  }
}


async function updateOrders(req, res) {
  try {
    const id = req.params.id;
    const { status } = req.body;

    await userService.updateOrderStatus(id, status);

    res.status(200).json('Order updated successfully!');
  } catch (err) {
    console.error('Error updating Order:', err.message);
    res.status(500).json('Error updating Order: ' + err.message);
  }
}

async function getOrderStatistic(req, res) {
try {
    const todaysSalesResult = await userService.getTodaysSales(); // total $ amount
    const OrderingUsersResult = await userService.countOrderingUsersToday(); // e.g., 5
    const totalUsersResult = await userService.numbersOfUsers();


    // count most popular item e.g., 'Latte'
    const rows = await userService.getMostPopularItem();
const itemCounts = {};
// const allowedItems = ["Latte", "Espresso", "Cappuccino", "Cheesecake"];
const allowedItems = await userService.getProductsName();
const allowedNames = allowedItems.map(p => p.name);
rows.forEach(row => {
  const items = row.orderItems.split(',').map(i => i.trim());

  items.forEach(item => {
    const match = item.match(/^(\d+)\s*x\s*(.+)$/i);
    if (match) {
      const quantity = parseInt(match[1], 10);
      let itemName = match[2].trim();

      const matchedName = allowedNames.find(name => itemName.includes(name));

      if (matchedName) {
        itemCounts[matchedName] = (itemCounts[matchedName] || 0) + quantity;
      }
    }
  });
});

const mostPopular = Object.entries(itemCounts).sort((a, b) => b[1] - a[1])[0];
const popularItem = mostPopular ? mostPopular[0] : "No items";

    // handling whene total sales is 0
    let todaysSales = 0;
    if (Array.isArray(todaysSalesResult) && todaysSalesResult[0]?.totalSales != null) {
      todaysSales = Number(todaysSalesResult[0].totalSales).toFixed(2);
    } else {
      todaysSales = "0.00";
    }

    // Safe handling for users
    const OrderingUsers = OrderingUsersResult[0]?.OrderingUsers || 0;
    const totalUsers = totalUsersResult[0]?.totalUsers || 0;

    res.json({ todaysSales, popularItem, OrderingUsers, totalUsers });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ error: "Failed to load stats" });
  }
}

module.exports = {
    addOrder,
    getOrders,
    updateOrders,
    getOrderStatistic
  };
  