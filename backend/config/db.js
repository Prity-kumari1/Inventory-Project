const mongoose = require("mongoose");

const connectToDb = () => {
    const MONGODB_URL = process.env.MONGO_URL;
    mongoose.connect(MONGODB_URL)
        .then(() => {
            console.log("Connect to DB");
        }).catch((error) => {
            console.log("MongoDB connection Fail", error);
        })
}
module.exports = connectToDb;