//initialize dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const methodOverride = require('method-override')



//middleware (the dependencies you initialized in step 1)
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride('_method'))




//initialize routes for each api
const posts = require('./routes/api/posts');
const users = require('./routes/api/users');

app.use('/api/posts', posts);
app.use('/api/users', users);




//handle production
if(process.env.NODE_ENV === 'production'){

    //static folder
    app.use(express.static(__dirname+'/public'));

    //handle spa
    app.get(/.*/, (req, res) => res.sendFile(__dirname+'/public/index.html'))
}




//create the port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));