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

router.get('/:id', async (req, res) => {  
    //console.log(req.params.id)  
    const posts = await loadPostCollection();
    res.send(await posts.find({
        "user._id": req.params.id
    }).toArray());
});


//Search posts


//Add posts
router.post('/', async (req, res) =>{
    const posts = await loadPostCollection();
    _id = new mongodb.ObjectID();

    const insertion = await posts.insertOne({
        _id: this._id,
        text: req.body.text,
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


