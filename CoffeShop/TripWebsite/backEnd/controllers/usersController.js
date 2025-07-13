const userService = require("../services/userService");

async function addUser(req, res) {
  try {
    const userData = req.body;
    const user = await userService.addUserToDatabase(userData);
    req.session.user = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      address: user.address,
      phone: user.phone,
      gender: user.gender,
      email: user.email,
    };
    console.log("Signed up user: ", user);
    // Send a JSON response with a success message
    res
      .status(200)
      .json({ message: "User added successfully!", user: req.session.user });
  } catch (err) {
    console.error("Error in addUser:", err.message);
    res.status(500).json({ message: "Error adding user: " + err.message });
  }
}

async function authenticateUser(req, res) {
  try {
    const { email, password } = req.body;

    // Call the service to authenticate the user
    const user = await userService.authUser(email, password);
    // Save user info in session
    req.session.user = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      address: user.address,
      phone: user.phone,
      gender: user.gender,
      email: user.email,
    };
    console.log("Logged in user: ", user);
    res
      .status(200)
      .json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    console.error("Error during authentication:", error.message);

    if (error.message === "User not found") {
      return res.status(404).json({ message: "User not found" });
    } else if (error.message === "Invalid email or password") {
      return res.status(401).json({ message: "Invalid email or password" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

async function logout(req, res) {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error during logout:", err.message);
        return res.status(500).json({ message: "Error logging out." });
      }

      // Clear the session cookie (optional, but recommended)
      res.clearCookie("connect.sid");

      console.log("Logged out successfully");
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ message: "Error during logout: " + error.message });
  }
}

module.exports = {
  addUser,
  authenticateUser,
  logout,
};
