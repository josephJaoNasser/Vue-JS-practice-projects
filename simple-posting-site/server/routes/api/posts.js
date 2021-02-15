const { text, json } = require('body-parser');
const express = require('express');
const multer = require('multer');
const Grid = require('gridfs-stream');
const crypto = require('crypto')
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
const mongodb = require('mongodb');
const router = express.Router();
const sharp = require('sharp')

//DB CONNECTION (using external file)
//Create mongo connection using mongoose
const connectionString = 'mongodb+srv://jjnasser:yHyXGbJXLhR0PN0G@postapp.yjzbg.mongodb.net/PostApp?retryWrites=true&w=majority'
const conn = mongoose.createConnection(connectionString)


//Initialize gridfs
let gridfs;

conn.once('open',()=>{
    gridfs = Grid(conn.db, mongoose.mongo)
    gridfs.collection('posts')
})

//Grid fs storage
// var storage = new GridFsStorage({
//   url: connectionString,
//   file: (req,file) => {    
//     if (file.mimetype.startsWith("image")) {        
        
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//               if (err) {
//                 return reject(err);
//               }
//               const filename = buf.toString('hex') + path.extname(file.originalname);
//               const fileInfo = {
//                 filename: filename,
//                 bucketName: 'posts'
//               };
//               resolve(fileInfo);
//             });
//           });
//     } 
//     else {
//         return json({
//             msg: 'The file uploaded was not an image',
//             success: false
//         })
//     }    
//   }
// });

//Multer storage engine WITHOUT GRIDFS

//Load collection
async function loadPostCollection(){
    var db = conn

    //return the collection
    return db.collection('posts');
}

module.exports = router;

//Get posts
router.get('/', async (req, res) => {    
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

//Get all posts from one user
router.get('/:username', async (req, res) => {  
    const posts = await loadPostCollection();
    res.send(await posts.find({
        "user.username": req.params.username
    }).toArray());
});

//Get post media
router.get('/:id/media/medium/:filename',async(req, res) => {
    return res.sendFile(path.join(__dirname, `../../public/posts/${req.params.id}/media/${req.params.filename.replace(/(\.[\w\d_-]+)$/i, '_medium$1')}`))
   
})

router.get('/:id/media/original/:filename',async(req, res) => {
    return res.sendFile(path.join(__dirname, `../../public/posts/${req.params.id}/media/${req.params.filename}`))
})


//Add posts
const imageCompressor = async (files, res,next) => {

    if (!files){
        return json({
            msg: 'No images found'
        })
    };
  
    await Promise.all(
      files.map(async file => {     
        const newFilename = file.filename.replace(/(\.[\w\d_-]+)$/i, '_medium$1');

        await sharp(file.destination+'/'+file.filename)
          .resize(1000)   
          .toFormat("jpeg")
          .jpeg({ quality: 80 })
          .toFile(file.destination + `/${newFilename}`);         
      })
    );
  };

router.post('/',async(req,res) => {
    const posts = await loadPostCollection();
    const _id = new mongodb.ObjectID();
    const destination = './server/public/posts/'+_id.toString()+'/media/'

    //Declare multer storage 
    const storage = multer.diskStorage({
        destination: destination,
        filename: (req, file, cb) => {
            if (file.mimetype.startsWith("image")) {     
                const filename = crypto.randomBytes(16).toString('hex') + path.extname(file.originalname);
                cb(null, filename)
            }
            else {
                return json({
                    msg: 'The file uploaded was not an image',
                    success: false
                })
            }           
        } 
    })
    const upload = multer({ storage:storage }).array('post-media',4);
    
    //Call the upload function, then post the text and etc. to the DB
    upload(req, res, async (err)=>{
        if(err) {
            return res.end("Error uploading file.");
        }

        //create compressed versions of the image
        await imageCompressor(req.files, res, (err) => {
            if(err){
                return res.status(400).json({
                    err: err,         
                    msg: 'File compresson failed'          
                })
            }

            res.status(200).json({
                msg: 'Successfully compressed files'
            })
        })

        //Parse the stringified JSON data of the post content
        postContent = JSON.parse(req.body.postContent)

        const insertion = await posts.insertOne({
            _id: _id,
            text: postContent.text,
            media: req.files,
            createdAt: new Date(),
            user: postContent.user
        });
       
        data = await posts.findOne({_id: insertion.insertedId});       

        return res.status(200).json({
            success: true,
            msg: req.files.length + ' files Uploaded successfully!',
            files: req.files.path,
            post: data
        })
    })

    
})

//Update posts
router.put('/:id', async (req, res) =>{
    const posts = await loadPostCollection();
    const updated = await posts.updateOne(
        {_id: new mongodb.ObjectID(req.params.id)},
        {$set: {text: req.body.text, updatedAt: new Date()}}       
    )
    
    data = await posts.findOne({_id: new mongodb.ObjectID(req.params.id)});
        
    res.status(201).send(data);
    
})


//Delete posts
router.delete('/:id', async (req, res) =>{
    const posts = await loadPostCollection();       
    const post = await posts.findOne({
        _id: new mongodb.ObjectID(req.params.id)
    })

    // if(post.media){
    //     post.media.forEach(item => {
    //         gridfs.files.findOne({filename: item},(err,file) => {
    //             if(err){
    //                 return res.status(400).json({msg: err})
    //             }
    //             if(file){
    //                 gridfs.remove({
    //                     _id: file._id,
    //                     root: 'posts'
    //                 }, (err) => {
    //                     if(err){
    //                         res.status(404).json({
    //                             msg: 'The file is not found. Perhaps this file has been already deleted'
    //                         })
    //                     }
    //                 })
    //             }               
    //         })
            
    //     });  
    // }   
    
    
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    }); 

    res.status(201).send();
})
