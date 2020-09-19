const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//DB CONNECTION
async function loadPostCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://jjnasser:JayNasser7!@simplepostscluster.yjzbg.mongodb.net/SimplePostsCluster?retryWrites=true&w=majority', {
        useNewUrlParser:true
    });

    return client.db('SimplePostsCluster').collection('users');
}

module.exports = router;

//GET USERS


//REGISTER/CREATE USERS


//DELETE USERS



