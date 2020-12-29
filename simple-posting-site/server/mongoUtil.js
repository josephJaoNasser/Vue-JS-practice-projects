const MongoClient = require( 'mongodb' ).MongoClient;
const localConnection = 'mongodb://localhost:27017/'
const atlasConnection = 'mongodb+srv://jjnasser:yHyXGbJXLhR0PN0G@cluster0.yjzbg.mongodb.net/Cluster0?retryWrites=true&w=majority'

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( atlasConnection,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('Cluster0');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};

