const express = require("express");
const { route } = require("express");
const app = express();
const router = express.Router();
const eventModel = require("../model/eventModel.js")

//=====get data from mongo db========
router.get("/", (req, res) => {
    eventModel.find({}, (err, data) => {
        if (err) {
            res.send(err).status(400);
        } else {
            res.send(data).status(200);
        }
    })
});


//=====get data by ID from mongo db========
router.get("/:id", (req, res) => { 
    let id = req.params.id;
eventModel.find({meetingName: id}, (err, data) => {
    if (err) {
        res.send(err).status(400);
    } else {
        res.send(data).status(200);
    }
})
});


//=====post data from mongo db========
router.post("/", (req, res) => {
    const { meetingName, time, place } = req.body;

    let errArr = [];

    if (!meetingName) {
        errArr.push("Required : User Name");
    };
    if (!time) {
        errArr.push("Required : Email");
    };
    if (!place) {
        errArr.push("Required : Password");
    };

    if (errArr && errArr.length > 0) {
        res.send(errArr).status(404);
        return;
    }

    let userObj = new eventModel(
        {
            meetingName,
            time,
            place,
            createdAt: new Date(),
        }
    );

    userObj.save((err, result) => {
        if (err) {
            res.send(err).status(404);
        } else {

            res.send(result).status(200)
        }
    });

});

//=====Put data from mongo db========
router.put("/:id", (req, res) => { });


//=====Delete data from mongo db========
router.delete("/:id", (req, res) => { 
    let id = req.params.id;
    eventModel.remove({meetingName: id}).then((res)=>{
        res.send("user deleted sucessfully").status(200);
        
    }).catch((err)=>{
        res.send(err).status(400);
    })
});


module.exports = router;