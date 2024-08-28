

//------------------------------------------------IMPORTING FILES AND LIBRARIES---------------------------------------------

const express = require('express');
const { models } = require('mongoose');
const path = require('path');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


//-----------------------------------------------------SERVING HTML ON THE ROUTES--------------------------------------------------------


router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
    console.log("atleast till the register page bro")
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));

})


//----------------------------------------------------USER AUTHENTICATION REGISTER-------------------------------------------------



router.post('/register', async (req,res) => {
    try{
        const{username , password} = req.body;
        const hashedPassword = await bcrypt.hash(password , 8);

        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).sendFile(path.join(__dirname, '../public/regis_succ.html'))
    } catch (error){
        res.status(400).send("error"+ error.message);
    }
});



//--------------------------------------------------LOGIN CODE------------------------------------------------


router.post('/login', async (req, res) => {
    try{
        const{username , password} = req.body;

        const user = await User.findOne({username});

        if(!user){
            return res.status(400).send("Sorry user not found , Register Now ->");
        }

        const isMatch = await bcrypt.compare(password , user.password);

        if(isMatch){
            res.sendFile(path.join(__dirname, '../public/index.html'));
        }
        if(!isMatch){
            res.send("Invalid Credentials")
        }
    
}catch (error) {
    res.status(500).send("Server error: " + error.message);
}}
);



//--------------------------------------------------------EXPORTING ROUTES------------------------------------------------


module.exports = router;
