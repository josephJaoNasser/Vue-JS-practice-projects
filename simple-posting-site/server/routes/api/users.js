const { text, json } = require('body-parser');
const express = require('express');
const multer = require('multer');
const Grid = require('gridfs-stream');
const sharp = require('sharp')
const crypto = require('crypto')
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const streamifier = require('streamifier');

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

//Memory storage
const memoryStorage = new multer.memoryStorage()
const uploadToMemory = multer({storage:memoryStorage}).single('profile-image')

//LOAD USERS COLLECTION
async function loadUsersCollection(){
    var db = conn;

    //return the collection
    return db.collection('users');
}


module.exports = router;

//Image compressor
const imageCompressor = async (req, res,next) => {
    
    let compressedFiles =[];
    let errors;
    
    if (!req.file){
        return res.status(400).json({
            msg: 'Please upload a profile image',
            field: 'profileImage'
        })
    };    
       
    let newFile = {...req.file};     
    const filenameLarge = req.file.filename.replace(/(\.[\w\d_-]+)$/i, '_large$1')        
    await sharp(req.file.buffer)
        .resize(600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toBuffer({resolveWithObject:true})
        .then((output)=>{
            newFile.filename = filenameLarge
            newFile.buffer = output.data
            newFile.size = output.info.size
            compressedFiles.push(newFile)
        }).catch((err)=>{
            errors = err
        })
  
    newFile = {...req.file};      
    const filenameMedium = req.file.filename.replace(/(\.[\w\d_-]+)$/i, '_medium$1')
    
    await sharp(req.file.buffer)
        .resize(320)
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toBuffer({resolveWithObject:true})
        .then((output)=>{
            newFile.filename = filenameMedium
            newFile.buffer = output.data
            newFile.size = output.info.size
            compressedFiles.push(newFile)
        }).catch((err)=>{
            errors = err
        })
        
    newFile = {...req.file};   
    const filenameSmall = req.file.filename.replace(/(\.[\w\d_-]+)$/i, '_small$1') 
    
    await sharp(req.file.buffer)
        .resize(150)
        .toFormat("jpeg")
        .jpeg({ quality: 70 })
        .toBuffer({resolveWithObject:true})
        .then((output)=>{
            newFile.filename = filenameSmall
            newFile.buffer = output.data
            newFile.size = output.info.size
            compressedFiles.push(newFile)
        }).catch((err)=>{
            errors = err
        })
   
    newFile = {...req.file};  
    const filenameTiny = req.file.filename.replace(/(\.[\w\d_-]+)$/i, '_tiny$1') 
    
    await sharp(req.file.buffer)
        .resize(150)
        .toFormat("jpeg")
        .jpeg({ quality: 70 })
        .toBuffer({resolveWithObject:true})
        .then((output)=>{
            newFile.filename = filenameTiny
            newFile.buffer = output.data
            newFile.size = output.info.size
            compressedFiles.push(newFile)
        }).catch((err)=>{
            errors = err
        })   

    compressedFiles = compressedFiles.concat(req.file)

    next(errors, compressedFiles)
};


//REGISTER/CREATE USERS
router.post('/register',async (req,res) =>{ 
    
    const _id = new mongodb.ObjectID()
    const users = await loadUsersCollection();   

    uploadToMemory(req, res, async(err)=> {

        const newUserData = JSON.parse(req.body.newUserData)
        
        if(err){
            console.log(err)
            return res.status(400).json({
                error: err,
                msg:'An error occured while registering'
            })
        }

        //check if user typed in a proper username
        if(newUserData.username.length < 1){
            return res.status(400).json({
                msg: 'Please type in a username!',
                field: 'username'
            });    
        }
        else if(newUserData.username.length > 15){
            return res.status(400).json({
                msg: 'Username must be less than 16 characters',
                field: 'username'
            });   
        }
        else if (/\s/.test(newUserData.username)) {
            return res.status(400).json({
                msg: 'Username must not contain any spaces',
                field: 'username'
            });   
        }

        //find existing/duplicate username
        let user = await users.findOne({uname: newUserData.username});
        if(user){
            return res.status(400).json({
                msg: 'This username has already been registered!',
                field: 'username' 
            });      
        } 

        //check if user typed in a display name
        if(newUserData.displayName.length < 1){
            return res.status(400).json({
                msg: 'Please type in a display name!',
                field: 'displayName'
            });    
        }
        else if(newUserData.displayName.length >50){
            return res.status(400).json({
                msg: 'Display Name must be 50 characters or less!',
                field: 'displayName'
            });   
        }

        //check if password is at least 6 characters
        if(newUserData.password.length < 6){
            return res.status(400).json({
                msg: 'Password must be at least 6 characters!',
                field: 'password'
            });    
        }

        //check if password is at least 6 characters
        if(newUserData.password !== newUserData.confirm_password){
            return res.status(400).json({
                msg: 'Passwords do not match!',
                field: 'password'
            });      
            
        }

        //check propper email format
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;   
        if(!emailRegex.test(newUserData.email)){
            return res.status(400).json({
                msg: 'Please input a valid e-mail address!',
                field: 'email'
            });
        }
        

        //find existing/duplicate email
        user = await users.findOne({email: newUserData.email});
        if(user){
            return res.status(400).json({
                msg: 'This e-mail has already been registered!',
                field: 'email'
            });      
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUserData.password, salt)
        req.file.filename = crypto.randomBytes(16).toString('hex') + path.extname(req.file.originalname)

        //insert to database
        await users.insertOne({
            _id : _id,
            uname: newUserData.username,
            dname: newUserData.displayName,
            pwd: hashedPassword ,
            email: newUserData.email,
            profile_image: req.file.filename,
            bio: newUserData.bio, 
            joinedOn: new Date()
        });

        //compress images then upload to database
        imageCompressor(req, res, (err,files)=>{
            if(err){
                console.log(err)
            }   
            var uploaded = 0;
            
            //Upload each file using gridfs stream
            files.forEach(file => {

                var writeStream = gridfs.createWriteStream({
                    filename: file.filename,
                    content_type: file.mimetype,
                    root: 'users'
                });        

                //Streamifier is used to create streams out of buffers
                streamifier.createReadStream(file.buffer).pipe(writeStream).on('finish',()=>{
                    uploaded++;
                    if(uploaded === files.length){
                        return res.status(201).json({
                            success: true,
                            user_id: _id,
                            msg: 'User registered successfully!'
                        })
                    }
                })
                
            })            
            
        })
    })
})


//Get profile image
router.get('/:userId/profile-images/:filename', async (req,res) => {
    
    if(req.params.userId.length != 24){
        return res.status(404).json({
            msg: 'User not found'
        })
    }

    let readStream;
    const users = await loadUsersCollection();
    user = await users.findOne({_id: new mongodb.ObjectID(req.params.userId)})

    if(!user){
        return res.status(404).json({
            msg: 'User not found'
        })
    }
    
    if(user.profile_image != req.params.filename){
        return res.status(404).json({
            msg: 'File not found'
        })
    }

    switch(req.query.size){
        case 'original':
            readStream = gridfs.createReadStream(`${req.params.filename}`).on('error',(err)=>{
                if(err){
                    return res.status(404).json({
                        msg: 'File not found'
                    })
                }
            })
            break;
        case 'tiny':
            readStream = gridfs.createReadStream(`${req.params.filename.replace(/(\.[\w\d_-]+)$/i, '_tiny$1')}`).on('error',(err)=>{
                if(err){
                    return res.status(404).json({
                        msg: 'File not found'
                    })
                }
            })
            break;
        case 'small':
            readStream = gridfs.createReadStream(`${req.params.filename.replace(/(\.[\w\d_-]+)$/i, '_small$1')}`).on('error',(err)=>{
                if(err){
                    return res.status(404).json({
                        msg: 'File not found'
                    })
                }
            })
            break;
        case 'medium':
            readStream = gridfs.createReadStream(`${req.params.filename.replace(/(\.[\w\d_-]+)$/i, '_medium$1')}`).on('error',(err)=>{
                if(err){
                    return res.status(404).json({
                        msg: 'File not found'
                    })
                }
            })
            break;
        case 'large':
            readStream = gridfs.createReadStream(`${req.params.filename.replace(/(\.[\w\d_-]+)$/i, '_large$1')}`).on('error',(err)=>{
                if(err){
                    return res.status(404).json({
                        msg: 'File not found'
                    })
                }
            })
            break;
        default:
            gridfs.createReadStream(`${req.params.filename}`).on('error',(err)=>{
                if(err){
                    return res.status(404).json({
                        msg: 'File not found'
                    })
                }
            })
            break;
    }
    readStream.pipe(res)
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

