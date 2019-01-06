const express = require('express');
const app = express();
const post = require('./db/query/post');

const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.get('/', function(req, res){
    // res.send('Hello World');
    res.json({ info: 'main' })
});
app.get('/post', post.getPost)

app.listen(port, function() {
    console.log('Example app listening on port 3000!');
})