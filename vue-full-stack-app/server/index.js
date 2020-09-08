
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
const randomStuff = require('./routes/api/randomStuff');

app.use('/api/posts', posts);
app.use('/api/randomStuff', randomStuff);


//create the server
const port = process.env.PORT || 6969;

app.listen(port, () => console.log(`Server started on port ${port}`));