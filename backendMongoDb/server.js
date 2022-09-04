const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute  = require("./routes/userRoute.js");
const eventRoute  = require("./routes/eventRoute.js");
const cors = require("cors");
const userModel = require("./model/userModel.js");


mongoose.connect(
    "mongodb+srv://Marjan:Marjan1223@cluster0.tuliuxh.mongodb.net/?retryWrites=true&w=majority",
    (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Mongo Db Connected successfully")
        }
    }
)
app.use(express.json());
app.use(cors());

//=====Mongodb Routes==========
app.use("/user",userRoute);


app.listen(7000);