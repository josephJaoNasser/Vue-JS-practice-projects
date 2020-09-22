var mongodbClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:12345/JayDB";

mongodbClient.connect(url,function(err,db){
    if(err)
        throw console.log("An error has occurred "+ err.message);
    
    console.log("Database Successfully created");
    db.close();

});