const { text } = require('body-parser');
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//DB CONNECTION
async function loadPostCollection(){

    //Local mongoDB connection
    // const client = await mongodb.MongoClient.connect
    // ('mongodb://localhost:27017/', {
    //     useNewUrlParser:true
    // });

    
    //MongoDB atlas connection
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://jjnasser:JayNasser7!@simplepostscluster.yjzbg.mongodb.net/SimplePostsCluster?retryWrites=true&w=majority', {
        useNewUrlParser:true
    });

    return client.db('SimplePostsCluster').collection('posts');
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
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date(),
        createdBy: "..."
    });

    res.status(201).send();
});

//Update posts
router.put('/:id', async (req, res) =>{
    const posts = await loadPostCollection();
    await posts.updateOne(
        {_id: new mongodb.ObjectID(req.params.id)},
        {$set: {text: req.body.text, updatedAt: new Date()}}       
    )

    res.status(201).send();
})


//Delete posts
router.delete('/:id', async (req, res) =>{
    const posts = await loadPostCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });    

    res.status(201).send();
})


