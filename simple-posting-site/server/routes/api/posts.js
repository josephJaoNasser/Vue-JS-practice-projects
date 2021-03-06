const { text, json } = require('body-parser');
const express = require('express');
const multer = require('multer');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const mongoose = require('mongoose');
const imageCompressor = require('./image-compressor')
const path = require('path');
const mongodb = require('mongodb');
const router = express.Router();
const streamifier = require('streamifier');

//Create mongo connection using mongoose
//  Atlas connecton 
const connectionString = 'mongodb+srv://jjnasser:yHyXGbJXLhR0PN0G@postapp.yjzbg.mongodb.net/PostApp?retryWrites=true&w=majority'


const conn = mongoose.createConnection(connectionString)


//Initialize gridfs
let gridfs;

conn.once('open',()=>{
    gridfs = Grid(conn.db, mongoose.mongo)
    gridfs.collection('posts')
})

//Memory storage
const memoryStorage = new multer.memoryStorage()
const uploadToMemory = multer({storage:memoryStorage}).array('post-media', 4)

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

    if(req.params.postId.length != 24){
        return res.status(404).json({
            msg: 'Post not found'
        })
    }
    
    let readStream;
    const posts = await loadPostCollection();
    post = await posts.findOne({_id: new mongodb.ObjectID(req.params.postId)})
    
    if(!post){
        return res.status(404).json({
            msg: 'Post not found'
        })
    }
    
    if(!post.media.includes(req.params.filename)){
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
    
})

router.post('/',async(req,res) => {
    const posts = await loadPostCollection();
    const users = await conn.collection('users');
    const _id = new mongodb.ObjectID();

    //if a form data isn't passed send the post immediately
    if(req.body.text){

        const insertion = await posts.insertOne({
            _id: _id,
            text: req.body.text,
            media: req.files ? req.files.map(file => {
                return file.filename
            }): [],
            createdAt: new Date(),
            user: req.body.user
        });        

        data = await posts.findOne({_id: _id});

        return res.status(200).json({
            success: true,
            msg: 'Post sent!',
            post: data
        })
    }


    /* *****
        Upload images to memory. The buffer will be used for the image upload 
        since I don't want to create another folder externally. The webhost won't like it...
    * *****/
    uploadToMemory(req,res, async(err)=> {  
        
        if(err){
            return res.status(404).json({
                error: err
            })
        } 

        //Parse the stringified JSON data of the post content
        if(!req.body.postContent){
            return res.status(400).json({
                msg: 'Post body is empty',
            })
        }

        let postContent;

        try{
            postContent = JSON.parse(req.body.postContent)
        }
        catch(err){
            return res.status(400).json({
                msg: 'Something went wrong while parsing the post body'
            })
        }
        
        try{
            const user = await users.findOne({ _id : new mongodb.ObjectID(postContent.user._id)})
            if(!user){
                return res.status(400).json({
                    success:false,
                    msg: 'Invalid user'
                })
            }
        }
        catch(err){
            return res.status(400).json({
                success:false,
                msg: 'Invalid user'
            })
        }
        
        if(!postContent.text.length && !req.files.length){
            return res.status(400).json({
                success:false,
                msg: 'Please attatch an image or say something!'
            })
        }       
        
        if(req.files){
            req.files.forEach(file => {
                file.filename = crypto.randomBytes(16).toString('hex') + path.extname(file.originalname)            
            });    
        }        
        
        const insertion = await posts.insertOne({
            _id: _id,
            text: postContent.text,
            media: req.files ? req.files.map(file => {
                return file.filename
            }): null,
            createdAt: new Date(),
            user: postContent.user
        });        

        data = await posts.findOne({_id: insertion.insertedId});

        //compress images then upload to database
        if(req.files.length){
            imageCompressor.compressMultiple(req, res, (err,files)=>{
                if(err){
                    return res.status(404).json({
                        msg: 'An error has occurred while uploading a picture',
                        error: err
                    })
                }   
                var uploaded = 0;
                
                //Upload each file using gridfs stream
                files.forEach(file => {
                    
                    var writeStream = gridfs.createWriteStream({
                        filename: file.filename,
                        content_type: file.mimetype,
                        root: 'posts'
                    });        
    
                    //Streamifier is used to create streams out of buffers
                    streamifier.createReadStream(file.buffer).pipe(writeStream).on('finish',()=>{
                        uploaded++;
                        if(uploaded === files.length){
                            return res.status(200).json({
                                success: true,
                                msg: 'Post sent with ' + req.files.length + ' file/s Uploaded!',
                                post: data
                            })
                        }
                    })
                    
                })            
                
            })
        }
        else{
            return res.status(200).json({
                success: true,
                msg: 'Post sent!',
                post: data
            })
        }      
        
    })    
})

//Update posts
router.put('/:id', async (req, res) =>{
    const posts = await loadPostCollection();
    await posts.updateOne(
        {_id: new mongodb.ObjectID(req.params.id)},
        {$set: {text: req.body.text, updatedAt: new Date()}}       
    ).catch((err)=>{
        if(err) {
            return res.status(404).json({
                success: false,
                msg: 'An error has occured while updating',
                error: err
            })
        }
    })
    
    data = await posts.findOne({_id: new mongodb.ObjectID(req.params.id)});
        
    return res.status(201).json({
        success: true,
        updatedData: data
    })
    
})


//Delete posts
router.delete('/:postId', async (req, res) =>{
    const posts = await loadPostCollection();       
    const post = await posts.findOne({
        _id: new mongodb.ObjectID(req.params.postId)
    })

    post.media.forEach(item => {
        gridfs.remove({
            filename: item,
            root: 'posts'
        },(err)=>{
            if (err) {
                res.status(404).json({
                    success: false,
                    msg: 'An error has occurred while deleting the post.',
                    error: err
                });
            };
        })

        gridfs.remove({
            filename: item.replace(/(\.[\w\d_-]+)$/i, '_small$1'),
            root: 'posts'
        },(err)=>{
            if (err) {
                res.status(404).json({
                    success: false,
                    msg: 'An error has occurred while deleting the post.',
                    error: err
                });
            };
        })

        gridfs.remove({
            filename: item.replace(/(\.[\w\d_-]+)$/i, '_medium$1'),
            root: 'posts'
        },(err)=>{
            if (err) {
                res.status(404).json({
                    success: false,
                    msg: 'An error has occurred while deleting the post.',
                    error: err
                });
            };
        })    

        gridfs.remove({
            filename: item.replace(/(\.[\w\d_-]+)$/i, '_large$1'),
            root: 'posts'
        },(err)=>{
            if (err) {
                res.status(404).json({
                    success: false,
                    msg: 'An error has occurred while deleting the post.',
                    error: err
                });
            };
        })
    })
    

    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.postId)
    }).then(()=>{
        return res.status(201).json({
            success: true,
            msg: 'Post deleted.'
        });
    }).catch((err)=>{
        return res.status(404).json({
            success: false,
            msg: 'An error has occurred while deleting the post.',
            error: err
        });
    }); 

})
