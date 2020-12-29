const { text } = require('body-parser');
const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


//DB CONNECTION (using external file)
var mongoUtil = require( '../../mongoUtil' );

mongoUtil.connectToServer( function( err, client ) {
    if (err) console.log(err);
  } );


//Load collection
async function loadPostCollection(){
    var db = mongoUtil.getDb()

    //return the collection
    return db.collection('posts');
}

module.exports = router;

//Get posts
router.get('/', async (req, res) => {
    
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
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
        createdBy: req.body.createdBy
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


