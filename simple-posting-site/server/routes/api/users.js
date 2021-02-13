const { text, json } = require('body-parser');
const express = require('express');
const multer = require('multer');
const Grid = require('gridfs-stream');
const crypto = require('crypto')
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const router = express.Router();


//DB CONNECTION
//Create mongo connection using mongoose
const connectionString = 'mongodb+srv://jjnasser:yHyXGbJXLhR0PN0G@postapp.yjzbg.mongodb.net/PostApp?retryWrites=true&w=majority'
const conn = mongoose.createConnection(connectionString)

//Initialize gridfs
let gridfs;

conn.once('open',()=>{
    gridfs = Grid(conn.db, mongoose.mongo)
    gridfs.collection('users')
})

//Grid fs storage
var storage = new GridFsStorage({
  url: connectionString,
  file: (req,file) => {    
    if (file.mimetype === 'image/jpeg' ||         
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' || 
        file.mimetype === 'img/png' ) {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
              if (err) {
                return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              const fileInfo = {
                filename: filename,
                bucketName: 'users'
              };
              resolve(fileInfo);
            });
          });
    } 
    else {
        return json({
            msg: 'The file uploaded was not an image',
            success: false
        })
    }    
  }
});
const upload = multer({ storage });

//LOAD USERS COLLECTION
async function loadUsersCollection(){
    var db = conn;

    //return the collection
    return db.collection('users');
}


module.exports = router;

//REGISTER/CREATE USERS
router.post('/register',async (req,res) =>{
    
    const users = await loadUsersCollection();
    //check if user typed in a proper username
    if(req.body.username.length < 1){
        return res.status(400).json({
            msg: 'Please type in a username!',
            field: 'username'
        });    
    }
    else if(req.body.username.length > 15){
        return res.status(400).json({
            msg: 'Username must be less than 16 characters',
            field: 'username'
        });   
    }
    else if (/\s/.test(req.body.username)) {
        return res.status(400).json({
            msg: 'Username must not contain any spaces',
            field: 'username'
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

    //check if user typed in a display name
    if(req.body.displayName.length < 1){
        return res.status(400).json({
            msg: 'Please type in a display name!',
            field: 'displayName'
        });    
    }
    else if(req.body.displayName.length >50){
        return res.status(400).json({
            msg: 'Display Name must be 50 characters or less!',
            field: 'displayName'
        });   
    }

    //check if password is at least 6 characters
    if(req.body.password.length < 6){
        return res.status(400).json({
            msg: 'Password must be at least 6 characters!',
            field: 'password'
        });    
    }

    //check if password is at least 6 characters
    if(req.body.password !== req.body.confirm_password){
        return res.status(400).json({
            msg: 'Passwords do not match!',
            field: 'password'
        });      
        
    }

     //check propper email format
     const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;   
     if(!emailRegex.test(req.body.email)){
         return res.status(400).json({
             msg: 'Please input a valid e-mail address!',
             field: 'email'
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
    const newID = new mongodb.ObjectID()
    //insert to database
    await users.insertOne({
        _id : newID,
        uname: req.body.username,
        dname: req.body.displayName,
        pwd: hashedPassword ,
        email: req.body.email,
        profile_image: req.body.profileImage,
        bio: req.body.bio, 
        joinedOn: new Date()
    });

    return res.status(201).json({
        success: true,
        msg: 'Registered!'
    })
})

//UPLOAD AVATAR
router.post('/upload/profile-image',upload.single('profile-image'), (req,res) =>{
    return res.status(201).json({
        success: true,
        msg: 'Profile image uploaded',
        filename: req.file.filename
    })
})

//GET ONE AVATAR
router.get('/profile-images/:id/:filename', async (req,res) => {
    const users = await loadUsersCollection();
    let user;    
    try{
        user = await users.findOne(
            {
                _id: new mongodb.ObjectID(req.params.id) , 
                profile_image: req.params.filename
            }
        )
    }
    catch(err){
        return res.status(400).json({
            msg: err
        })
    }   
    
    if(user){
        gridfs.files.findOne({filename: req.params.filename}, (err, file)=>{
            //check if files
            if(!file || file.length === 0){
                return res.status(404).json({
                    msg: 'File does not exist'
                })
            }
            if (file.contentType === 'image/jpeg' ||         
                file.contentType === 'image/jpg' ||
                file.contentType === 'image/png' || 
                file.contentType === 'img/png' ) {
    
                const readstream = gridfs.createReadStream(file.filename)
                readstream.pipe(res)
            }else{
                return res.status(404).json({
                    msg: 'The file is not an image'
                })
            }
        })
    }
    else{
        return res.status(404).json({
            msg: 'File not found'
        })
    }
    
});






//LOGIN 
router.post('/login', async(req, res) =>{
    
    const users = await loadUsersCollection();
    //search for username
    let user = await users.findOne({uname: req.body.username});
    //authentication
    if(!user){
        return res.status(404).json({
            success: false,
            msg: "This user does not exist!"
        })
    }
    else{
        bcrypt.compare(req.body.password, user.pwd, function(err, match){
            if(match){
                const payload = {
                    _id: user._id,
                    username: user.uname,
                    displayName: user.dname,
                    profile_image:user.profile_image,
                    bio: user.bio
                }
                jwt.sign(payload, 'thesecretwasinsideusallalong', {expiresIn: "24h"}, (err,token) => {
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
