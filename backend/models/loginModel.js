const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to User model
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    // required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// Auto-expire documents after expiry date
loginSchema.index({ expiry: 1 }, { expireAfterSeconds: 0 });

const loginModel = mongoose.model("Login", loginSchema);

module.exports = loginModel;
