const express = require("express");
const bodyParser = require("body-parser");
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");
const logoutRoutes = require("./routes/logoutRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");
const accRoutes = require("./routes/accountDetailsRoutes");

const cors = require("cors");
const port = 5000;
const app = express();
const session = require("express-session");

// Configure express-session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30, // 1 hour
    },
  })
);
// Middleware for CORS

app.use(cors()); // This allows all origins, adjust as needed for security

// Middleware to parse form data and JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(bodyParser.json()); // Parse JSON

// Routes
app.use("/signup", signupRoutes); // Ensure this points to the correct route for signup
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/reviews", reviewRoutes);
app.use("/saveorder", orderRoutes);
app.use("/profileDetails", accRoutes);
// Start server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
