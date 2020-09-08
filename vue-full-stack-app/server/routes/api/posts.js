const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//DB CONNECTION
async function loadPostCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://jjnasser:JayNasser7!@cluster0.yjzbg.mongodb.net/Cluster0?retryWrites=true&w=majority', {
        useNewUrlParser:true
    });

    return client.db('Cluster0').collection('posts');
}

module.exports = router;



//Get posts
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});


//Add posts
router.post('/', async (req, res) =>{
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date(),
        createdBy: "Ya boi jay!!"
    });

    res.status(201).send();
});


//Delete posts
router.delete('/:id', async (req, res) =>{
    const posts = await loadPostCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });    

    res.status(201).send();
})


