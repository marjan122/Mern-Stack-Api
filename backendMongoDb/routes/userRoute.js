const express = require("express");
const { route } = require("express");
const app = express();
const router = express.Router();
const userModel = require("../model/userModel.js")

//=====get data from mongo db========
router.get("/", (req, res) => {
    userModel.find({}, (err, data) => {
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
userModel.find({email: id}, (err, data) => {
    if (err) {
        res.send(err).status(400);
    } else {
        res.send(data).status(200);
    }
})
});


//=====post data from mongo db========
router.post("/", (req, res) => {
    const { userName, email, password } = req.body;

    let errArr = [];

    if (!userName) {
        errArr.push("Required : User Name");
    };
    if (!email) {
        errArr.push("Required : Email");
    };
    if (!password) {
        errArr.push("Required : Password");
    };

    if (errArr && errArr.length > 0) {
        res.send(errArr).status(404);
        return;
    }

    let userObj = new userModel(
        {
            userName,
            email,
            password,
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
    userModel.remove({email: id}).then((res)=>{
        res.send("user deleted sucessfully").status(200);
        
    }).catch((err)=>{
        res.send(err).status(400);
    })
});



module.exports = router;