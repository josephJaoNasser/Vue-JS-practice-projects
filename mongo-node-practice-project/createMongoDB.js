var mongodbClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/JayDB";

mongodbClient.connect(url,function(err,db){
    if(err)
        throw console.log("An error has occurred "+ err);
    
    console.log("Database Successfully created");
    db.close();

});