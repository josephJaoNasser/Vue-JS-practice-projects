const { text } = require('body-parser');
const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

//DB CONNECTION
var mongoUtil = require( '../../mongoUtil' );
const { realpathSync } = require('fs');

mongoUtil.connectToServer( function( err, client ) {
    if (err) console.log(err);
  });


//LOAD USERS COLLECTION
async function loadUsersCollection(){
    var db = mongoUtil.getDb()

    //return the collection
    return db.collection('users');
}


module.exports = router;

//REGISTER/CREATE USERS
router.post('/register',async (req,res) =>{

    const users = await loadUsersCollection();
    
    //password check
    if(req.body.password !== req.body.confirm_password){
        return res.status(400).json({
            msg: 'Passwords do not match...',
            field: 'password'
        });      
        
    }

     //find existing/duplicate username
     let user = await users.findOne({uname: req.body.username});
     if(user){
         return res.status(400).json({
             msg: 'This username has already been registered!',
             field: 'username' 
         });      
     } 

    //find existing/duplicate email
    user = await users.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({
            msg: 'This e-mail has already been registered!',
            field: 'email'
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

//LOGIN 
router.post('/login', async(req, res) =>{
    
    const users = await loadUsersCollection();
    //search for username
    let user = await users.findOne({uname: req.body.username});
    //authentication
    if(!user){
        return res.status(404).json({
            success: false,
            msg: "This username isn't registered!"
        })
    }
    else{
        bcrypt.compare(req.body.password, user.pwd, function(err, match){
            if(match){
                const payload = {
                    _id: user._id,
                    username: user.uname,
                    displayName: user.dname,
                    bio: user.bio
                }
                jwt.sign(payload, mongoUtil.secret, {expiresIn: "24h"}, (err,token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        msg: 'You are now logged in!',
                        user: payload
                    })
                }) 
            }
            else{
                return res.status(404).send({
                    msg: 'Password is incorrect, please try again',
                    success: false
                })
            }
        })
    }

})

//FIND USER BY ID
// router.get('/users/:userId',async (req, res)=>{

//     const users = await loadUsersCollection();
    
//     const user = await users.findOne({_id: req.body._id})
    
//     if(user){
//         return res.status(200).json({
//             user: user.data
//         })
//     }else{
//         return res.status(404).json({
//             msg: 'User not found'
//         })
//     }
// })
