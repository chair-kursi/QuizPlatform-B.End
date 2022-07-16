const express = require("express");  
const User = require("../models/User");
const router = express.Router();

router.post("/user", async (req, res)=>{
    async function checkUser(email){
        const findUser = await User.findOne({email: email});
        if(findUser)
        return true;

        return false;
    }

    const user = req.body.data;
    console.log("body" ,req.body);
    const isUserAlreadyPresent = await checkUser(user.email);
    // console.log({isUserAlreadyPresent});
    if(isUserAlreadyPresent)
    {
        res.json({
            message: "User Already Exists"
        });
        return;
    }
    const newUser = new User(user);
    const savedUser = await newUser.save();
    res.json(savedUser); 
}); 

module.exports = router;;