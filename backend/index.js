const express = require("express");
const app = express();
const cors = require("cors")
const dotenv = require("dotenv")
const connectToDb = require("./config/db")
const authRoute = require("./routes/authRoute")

dotenv.config();
const PORT = process.env.PORT || 8080


// middleware
app.use(cors())  // allow request from frontend
app.use(express.json()); //for parse json body
app.use("/auth", authRoute)

app.get("/", (req,res)=>{
    res.send("Hello Inventory App");
})



connectToDb()
app.listen(PORT, ()=>{
    console.log(`App is listining on port ${PORT}`);
    
})
