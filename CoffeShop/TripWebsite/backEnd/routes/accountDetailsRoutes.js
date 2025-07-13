const express = require("express");
const router = express.Router();
const accController = require("../controllers/accountDetailsController");

router.get("/:id", (req, res) => {
  accController.getClientDetails(req, res); // Handles the response and error internally
});

router.put("/:id", (req, res) => {
  accController.updateClientDetails(req, res);
});

router.delete("/:id", (req, res) => {
  accController.deleteClientDetails(req, res);
});

router.get("/orders/:id", (req, res) => {
  accController.getOrderHistoryByUserId(req, res);
});

module.exports = router;
