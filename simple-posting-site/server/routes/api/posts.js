const { text } = require('body-parser');
const express = require('express');
const multer = require('multer');
const Grid = require('gridfs-stream');
const crypto = require('crypto')
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
const mongodb = require('mongodb');
const router = express.Router();


//DB CONNECTION (using external file)
//Create mongo connection using mongoose
const connectionString = 'mongodb+srv://jjnasser:yHyXGbJXLhR0PN0G@cluster0.yjzbg.mongodb.net/Cluster0?retryWrites=true&w=majority'
const conn = mongoose.createConnection(connectionString)

//Initialize gridfs
let gridfs;

conn.once('open',()=>{
    gridfs = Grid(conn.db, mongoose.mongo)
    gridfs.collection('posts')
})

//Grid fs storage
var storage = new GridFsStorage({
  url: connectionString,
  file: (req,file) => {    
    if (file.mimetype === 'image/jpeg' ||         
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' || 
        file.mimetype === 'img/png' ||
        file.mimetype === 'image/gif' ||
        file.mimetype === 'video/mp4' ||
        file.mimetype === 'video/quicktime' ||
        file.mimetype === 'video/webm') {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
              if (err) {
                return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              const fileInfo = {
                filename: filename,
                bucketName: 'posts'
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
})


//Add posts
router.post('/upload/post-media',upload.array('post-media',4),(req,res) => {
    return res.status(200).json({
        success: true,
        msg: req.files.length + ' Uploaded successfully!',
        files: req.files
    })
})

router.post('/', async (req, res) =>{
    const posts = await loadPostCollection();
    _id = new mongodb.ObjectID();
    const insertion = await posts.insertOne({
        _id: this._id,
        text: req.body.text,
        media: req.body.media,
        createdAt: new Date(),
        user: req.body.user
    });
   
    data = await posts.findOne({_id: insertion.insertedId});        

    res.status(201).send(data);
});

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
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });    

    res.status(201).send();
})


