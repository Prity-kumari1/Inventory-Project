// const User = require("../models/userModel");
// const Login = require("../models/loginModel")
// const bcrypt = require("bcrypt");
// const { generateAccessToken, generateRefreshToken } = require("../utils/token");
// const { decode } = require("jsonwebtoken");
// const signupUser = async (req, res) => {
//     try {
//         const { emailId, password } = req.body;
//         if (!password || password.length < 6) {
//             console.log("password must be 6 digit long or more");
//             return res.status(400).json({ message: "password must be 6 digit long or more" })
//         }
//         const existedUser = await User.findOne({ emailId });
//         if (existedUser) {
//             console.log("user already exists please login");

//             return res.status(400).json({ message: "user already exists please login" });
//         }
//         const hashPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             // username,
//             emailId,
//             password: hashPassword
//         })
//         await newUser.save()

//         console.log("Signup successfully");
//         res.status(201).json({

//             message: "Signup successfully",
//             user: {
//                 // username,
//                 emailId
//             }
//         });

//     }
//     catch (error) {
//         return res.status(500).json({ message: "Server error", error: error.message })

//     }

// }


// // loginUser
// const loginUser = async (req, res) => {
//     try {
//         const { emailId, password } = req.body;
//         const user = await User.findOne({ emailId })
//         if (!user) {
//             console.log("User not found please signUp");
//             return res.status(400).json({ message: "User not found please signUp" })
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             console.log("Invilid credentials");

//             return res.status(400).json({ message: "Invilid credentials" })
//         }

//         const accessToken = generateAccessToken(user)
//         const refreshToken = generateRefreshToken(user)
//         console.log("refreshToken",refreshToken);
//         console.log("accessToken",accessToken);

//         // save refresh Token into DB
//         user.refreshToken = refreshToken;
//         await user.save();

//         // send refresh tokn into httpOnly cookie
//         res.cookie("refreshToken", refreshToken, {
//             httpOnly: true,
//             secure: false,
//             sameSite: "strict"
//         })


//         console.log("login successfully");

//         res.status(200).json({
//             message: "login successfully",
//             token: accessToken,
//             user: {
//                 userId: user._id,
//                 emailId: user.emailId,
//                 password: user.password
//             }
//         })
//     }
//     catch (error) {
//         return res.status(400).json({ message: "server error", error: error.message })

//     }

// }
// const refresh = async (req, res) => {
//     try {
//         const token = req.cookies.refreshToken;
//         if (!token) {
//             res.status(400).json({ message: "No Refresh Token" })
//         }
//         const user = await User.findOne({ refreshToken:token });
//         if (!user) {
//             res.status(403).json({ message: "Invilid Refresh Token" })

//         }
//         jwt.verify(token, process.env.JWT_REFRESH_SECRET, (error, decoded) => {
//            return res.status(403).json({ message: "Refresh Token Expired" })

//         })
        

//         const newAccessToken = generateAccessToken(user);
//         res.json({ accessToken: newAccessToken });

//     }
//     catch (error) {
//         res.status(500).json({ message: "server error", error: error.message })

//     }
// }

// const logout = async (req, res) => {
//     try {
//         const token = req.cookies.refreshToken;
//         if (!token) {
//             res.sendStatus(204)
//         }

//         const user = await User.findOne({ refreshToken: token })
//         if (!user) {
//             res.sendStatus(204)
//         }
//         user.refreshToken = null;
//         await user.save();

//         res.clearCookie("refreshToken");
//         res.json({ message: "Logged out successfully" })

//     }
//     catch (error) {
//         res.status(500).json({ message: "server error", error: error.message })

//     }
// }




// module.exports = { signupUser, loginUser, refresh, logout }






const User = require("../models/userModel");
const Login = require("../models/loginModel"); // Import loginModel
const bcrypt = require("bcrypt");
const { 
  generateAccessToken, 
  generateRefreshToken, 
  saveRefreshToken,
  invalidateRefreshToken,
  validateRefreshToken
} = require("../utils/token");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be 6 digits long or more" });
    }
    
    const existedUser = await User.findOne({ emailId });
    if (existedUser) {
      return res.status(400).json({ message: "User already exists please login" });
    }
    
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      emailId,
      password: hashPassword
    });
    
    await newUser.save();
    
    console.log("Signup successful");
    res.status(201).json({
      message: "Signup successful",
      user: {
        emailId
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    
    if (!user) {
      return res.status(400).json({ message: "User not found please signUp" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    console.log("accessToken",accessToken);
    console.log("refreshToken",refreshToken);
    
    // Save refresh token to loginModel (RefreshToken collection)
    await saveRefreshToken(user._id, refreshToken);
    
    // Also save to user document if needed (optional)
    user.refreshToken = refreshToken;
    await user.save();

    // Send refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    console.log("Login successful");
    res.status(200).json({
      message: "Login successful",
      accessToken: accessToken,
      user: {
        userId: user._id,
        emailId: user.emailId
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "No Refresh Token" });
    }
    
    // Check if token is valid in our database
    const isValidToken = await validateRefreshToken(token);
    if (!isValidToken) {
      return res.status(403).json({ message: "Invalid or expired Refresh Token" });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    
    // Get user details
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Generate new access token
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Refresh Token Expired" });
    }
    
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid Refresh Token" });
    }
    
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.sendStatus(204);
    }
    
    // Invalidate the refresh token in loginModel
    await invalidateRefreshToken(token);
    
    // Also remove from user document if stored there
    await User.updateOne(
      { refreshToken: token },
      { $set: { refreshToken: null } }
    );
    
    // Clear cookie
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Optional: Get login history for a user
const getLoginHistory = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user info in req.user
    
    const loginHistory = await Login.find({ userId: userId })
      .sort({ createdAt: -1 })
      .limit(10); // Get last 10 login records
    
    res.json({ loginHistory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { signupUser, loginUser, refresh, logout, getLoginHistory };