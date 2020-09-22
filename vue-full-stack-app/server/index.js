//initialize dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());


//initialize routes
const posts = require('./routes/api/posts');
const userManagement = require('./routes/api/userManagement');

app.use('/api/posts', posts);
app.use('/api/userManagement', userManagement);

//handle production
if(process.env.NODE_ENV === 'production'){

    //static folder
    app.use(express.static(__dirname+'/public/'));

    //handle spa
    app.get(/.*/, (req, res) => res.sendFile(__dirname+'/public/index.html'))
}

//create the port
const port = process.env.PORT || 6969;

app.listen(port, () => console.log(`Server started on port ${port}`));