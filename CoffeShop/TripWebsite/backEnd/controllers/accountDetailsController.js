const accService = require("../services/accountDetailsService");

async function getClientDetails(req, res) {
  try {
    const { id } = req.params; // Extract ID from request body
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const userInfo = await accService.getClientInfo(id);
    res.status(200).json({
      data: userInfo,
    });
  } catch (error) {
    console.error("Error in getClientInfoController:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving user data" });
  }
}

async function updateClientDetails(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    if (!id || !updatedData) {
      return res
        .status(400)
        .json({ error: "User ID and update data are required" });
    }
    await accService.updateClientInfo(id, updatedData);
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error in updateClientDetails:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while updating user data" });
  }
}

async function deleteClientDetails(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    await accService.deleteClientInfo(id);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error in deleteClientDetails:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while deleting user data" });
  }
}

async function getOrderHistoryByUserId(req, res) {
  try {
    const { id } = req.params;
    const orderHistory = await accService.getOrderHistory(id);
    res.status(200).json(orderHistory);
  } catch (error) {
    console.error("Error fetching order history:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching order history" });
  }
}

module.exports = {
  getClientDetails,
  updateClientDetails,
  deleteClientDetails,
  getOrderHistoryByUserId,
};
