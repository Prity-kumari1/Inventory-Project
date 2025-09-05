
const jwt = require("jsonwebtoken");
const Login = require("../models/loginModel"); // Import your loginModel

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, emailId: user.emailId },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, emailId: user.emailId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "5m" }
  );
};

// Function to save refresh token to loginModel
const saveRefreshToken = async (userId, token) => {
  try {
    // Calculate expiry date (7 days from now)
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 5)
    // expiryDate.setDate(expiryDate.getDate() + 7);
    
    // Save to loginModel
    await Login.create({
      userId: userId,
      token: token,
      expiry: expiryDate
    });
    
    return true;
  } catch (error) {
    console.error("Error saving refresh token:", error);
    throw error;
  }
};

// Function to invalidate a refresh token
const invalidateRefreshToken = async (token) => {
  try {
    await Login.findOneAndUpdate(
      { token: token },
      { isValid: false }
    );
    return true;
  } catch (error) {
    console.error("Error invalidating refresh token:", error);
    throw error;
  }
};

// Function to validate a refresh token
const validateRefreshToken = async (token) => {
  try {
    const tokenRecord = await Login.findOne({ 
      token: token,
      isValid: true,
      expiry: { $gt: new Date() }
    });
    
    return !!tokenRecord;
  } catch (error) {
    console.error("Error validating refresh token:", error);
    return false;
  }
};

module.exports = { 
  generateAccessToken, 
  generateRefreshToken, 
  saveRefreshToken,
  invalidateRefreshToken,
  validateRefreshToken
};