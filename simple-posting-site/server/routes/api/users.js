const { text } = require('body-parser');
const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt')
const router = express.Router();

//DB CONNECTION
var mongoUtil = require( '../../mongoUtil' );
const { realpathSync } = require('fs');

mongoUtil.connectToServer( function( err, client ) {
    if (err) console.log(err);
  } );


//LOAD USERS COLLECTION
async function loadUsersCollection(){
    var db = mongoUtil.getDb()

    //return the collection
    return db.collection('users');
}


module.exports = router;

//REGISTER/CREATE USERS
router.post('/',async (req,res) =>{
    const users = await loadUsersCollection();
    
    //password check
    if(req.body.password !== req.body.confirm_password){
        console.log('password test started');
        return res.status(400).json({
            msg: 'Passwords do not match'
        });      
        
    }

    //find existing/duplicate email
    let user = await users.findOne({email: req.body.email});
    if(user){
        console.log('email test failed');  
        return res.status(400).json({
            msg: 'Email already exists!'
        });      
    }

     //find existing/duplicate username
    user = await users.findOne({uname: req.body.username});
    if(user){
        console.log('username test failed');  
        return res.status(400).json({
            msg: 'Username already exists!'
        });      
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //insert to database
    await users.insertOne({
        _id : new mongodb.ObjectID(),
        uname: req.body.username,
        dname: req.body.displayName,
        pwd: hashedPassword ,
        email: req.body.email,
        bio: req.body.bio,
        joinedOn: new Date()
    });

    return res.status(201).json({
        success: true,
        msg: 'Registered!'
    })
})
