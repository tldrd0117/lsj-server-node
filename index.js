const express = require('express');
const app = express();
const post = require('./db/query/post');

const bodyParser = require('body-parser');

app.get('/', function(req, res){
    // res.send('Hello World');
    res.json({ info: 'main' })
});
app.get('/post', post.getPost)

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})