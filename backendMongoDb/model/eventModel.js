const express = require("express");
const app = express();
const mongoose = require("mongoose");


const UserSchema  = mongoose.Schema({
    meetingName : String,
    time : {
        type : String,
        required : true,
        unique:true,
    },
    place:{
        type:String,
        required:true,
        

    },
    createdAt : Date,

});

const eventModel = mongoose.model("events",UserSchema);


module.exports = eventModel;

