const { text, json } = require('body-parser');
const express = require('express');
const multer = require('multer');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const mongodb = require('mongodb');
const router = express.Router();
const sharp = require('sharp');

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
router.get('/:postId/media/:filename',async(req, res) => {
    
    let readStream;

    switch(req.query.size){
        case 'original':
            readStream = fs.createReadStream(path.join(__dirname, `../../public/posts/${req.params.postId}/media/${req.params.filename}`))
            break;
        case 'medium':
            readStream = fs.createReadStream(path.join(__dirname, `../../public/posts/${req.params.postId}/media/${req.params.filename.replace(/(\.[\w\d_-]+)$/i, '_medium$1')}`))
            break;
        case 'large':
            readStream = fs.createReadStream(path.join(__dirname, `../../public/posts/${req.params.postId}/media/${req.params.filename.replace(/(\.[\w\d_-]+)$/i, '_large$1')}`))
            break;
        default:
            readStream = fs.createReadStream(path.join(__dirname, `../../public/posts/${req.params.postId}/media/${req.params.filename.replace(/(\.[\w\d_-]+)$/i, '_medium$1')}`))
            break;
    }

    readStream.pipe(res)
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
          .resize(600)   
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(file.destination + `/${newFilename}`);         
      })
    );

    await Promise.all(
        files.map(async file => {     
          const newFilename = file.filename.replace(/(\.[\w\d_-]+)$/i, '_large$1');
  
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

        if(!req.files.length){
           removeDir(path.join(__dirname, `../../public/posts/${_id}/`))
        }

        if(req.files.length){
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

        }
        
        //Parse the stringified JSON data of the post content
        postContent = JSON.parse(req.body.postContent)

        if(!postContent.text.length && !req.files.length){
            return res.status(400).json({
                success:false,
                msg: 'Please attatch an image or say something!'
            })
        }

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
            msg: 'Post sent with ' + req.files.length + ' file/s Uploaded!',
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
const removeDir = function(path) {
    if (fs.existsSync(path)) {
      const files = fs.readdirSync(path)
  
      if (files.length > 0) {
        files.forEach(function(filename) {
          if (fs.statSync(path + "/" + filename).isDirectory()) {
            removeDir(path + "/" + filename)
          } else {
            fs.unlinkSync(path + "/" + filename)
          }
        })
        fs.rmdirSync(path)
      } else {
        fs.rmdirSync(path)
      }
    } else {
      console.log("Directory path not found.")
    }
  }

router.delete('/:postId', async (req, res) =>{
    const posts = await loadPostCollection();       
    const post = await posts.findOne({
        _id: new mongodb.ObjectID(req.params.postId)
    })

    if(post.media.length){
        removeDir(path.join(__dirname, `../../public/posts/${req.params.postId}/`))
    }
    
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.postId)
    }); 

    res.status(201).json({
        msg: 'Post deleted.'
    });
})
