const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//DB CONNECTION
async function loadRandomStuffCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://jjnasser:JayNasser7!@cluster0.yjzbg.mongodb.net/Cluster0?retryWrites=true&w=majority', {
        useNewUrlParser:true
    });

    return client.db('Cluster0').collection('randomStuff');
}

module.exports = router;



//Get posts
router.get('/', async (req, res) => {
    const stuff = await loadRandomStuffCollection();
    res.send(await stuff.find({}).toArray());
});


//Add posts
router.post('/', async (req, res) =>{
    const stuff = await loadRandomStuffCollection();
    await stuff.insertOne({
        stuffName: req.body.stuffName,
        createdAt: new Date()
    });

    res.status(201).send();
});


//Delete posts
router.delete('/:id', async (req, res) =>{
    const stuff = await loadRandomStuffCollection();
    await stuff.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });    

    res.status(201).send();
})


