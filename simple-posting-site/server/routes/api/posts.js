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
router.get('/post-media/:filename',async(req, res) => {
    gridfs.files.findOne({filename: req.params.filename}, (err, file)=>{
        //check if files
        if(!file || file.length === 0){
            return res.status(404).json({
                msg: 'File does not exist'
            })
        }
        if (file.mimetype.startsWith("image")) {

            const readstream = gridfs.createReadStream(file.filename)
            readstream.pipe(res)
        }else{
            return res.status(404).json({
                msg: 'The file is not an image'
            })
        }
    })
})


//Add posts
const imageCompressor = async (req, res,next) => {
    console.log(req.files)
    if (!req.files){
        return json({
            msg: 'No images found'
        })
    };
  
    req.body.images = [];
    await Promise.all(
      req.files.map(async file => {
        
        await sharp(file.buffer)
          .resize(600)
          .toFormat("jpeg")
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`posts/uploads/medium/${file.filename}`);
  
        req.body.images.push(newFilename);
      })
    );
  };

router.post('/',async(req,res) => {
    const posts = await loadPostCollection();
    const _id = new mongodb.ObjectID();
    const destination = './server/public/posts/'+_id.toString()+'/media'

    //Upload Image
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
    
    upload(req, res, async (err)=>{
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        postContent = JSON.parse(req.body.postContent)

        let mediaPath = []

        req.files.forEach(item => {
            mediaPath.push('./'+item.path.replace(/\\/g, "/"))
        });

        console.log(mediaPath)
        const insertion = await posts.insertOne({
            _id: this._id,
            text: postContent.text,
            media: mediaPath,
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

    //imageCompressor(req)
    
})

// router.post('/', async (req, res) =>{
    
    
// });

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

    if(post.media){
        post.media.forEach(item => {
            // gridfs.files.findOne({filename: item},(err,file) => {
            //     if(err){
            //         return res.status(400).json({msg: err})
            //     }
            //     if(file){
            //         gridfs.remove({
            //             _id: file._id,
            //             root: 'posts'
            //         }, (err) => {
            //             if(err){
            //                 res.status(404).json({
            //                     msg: 'The file is not found. Perhaps this file has been already deleted'
            //                 })
            //             }
            //         })
            //     }               
            // })
            
        });  
    }   
    
    
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    }); 

    res.status(201).send();
})
