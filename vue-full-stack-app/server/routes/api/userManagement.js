const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//DB CONNECTION
async function loadUsersCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://jjnasser:JayNasser7!@simplepostscluster.yjzbg.mongodb.net/SimplePostsCluster?retryWrites=true&w=majority', {
        useNewUrlParser:true
    });

    return client.db('SimplePostsCluster').collection('users');
}

module.exports = router;

//GET USERS
router.get('/', async(req,res) => {
    const users = await loadUsersCollection();
    res.send(await users.find().toArray());
})


//REGISTER/CREATE USERS
router.post('/',async (req,res) =>{
    const users = await loadUsersCollection();
    await users.insertOne({
        uname: req.body.username,
        dname: req.body.displayName,
        pwd: req.body.password,
        email: req.body.email,
        bio: req.body.bio,
        joinedOn: new Date()
    });

    res.status(201).send();
})

//UPDATE USERS
router.put('/:id', async (req, res) => {
    const users = await loadUsersCollection();
    await users.updateOne(
        {_id: new mongodb.ObjectID(req.params.id)},
        {$set: 
            {
                email: req.body.email, 
                bio: req.body.bio, 
                pwd: req.body.password
            }
        },
        
    );

    res.status(201).send()
})


