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

//Purpose:
//--------
//Defines API endpoints.
//Connects URLs to the appropriate controller functions.
//Example: GET /api/account/123 → goes to getClientDetails().


// req means parameter of url

// from:   review.js ->  API(frontend) -> Routes -> Controllers -> Service -> Query -> DB

//Controller: full req body
//Service: Extracting params