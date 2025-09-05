const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    // },
    emailId: {
        type: String,
        required: [true, "Email is required"],
        unique: true, // duplicate emails not allowed
        lowercase: true, // convert to lowercase automatically
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    isActive: {
        type: Boolean,
        default: true,
    }


}, { timestamps: true })

const userModel = mongoose.model("User", userSchema)
module.exports = userModel