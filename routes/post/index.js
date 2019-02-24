const query = require('./query')
const client = require('../client.js');

module.exports = client.router;

//to_char(create_time, 'YYYY-MM-DD HH24:MI:SS') as create_time
//BLOG 1 BOARD 2

const BLOG_TYPE = 1;
const BOARD_TYPE = 2;

client.get('/blog', req => query.selectAll({
    type: BLOG_TYPE
}))

client.get('/board', req => query.selectAll({
    type: BOARD_TYPE
}))

client.post('/blog', req => query.insert({
    type: BLOG_TYPE, 
    title: req.body.title, 
    body: req.body.body,
    author: req.body.author,
    tags: req.body.tags
}))

client.post('/board', req => query.insert({
    type: BOARD_TYPE, 
    title: req.body.title, 
    body: req.body.body,
    author: req.body.author,
    tags: req.body.tags
}))

client.post('/blog/update', req => query.update({
    type: BLOG_TYPE, 
    title: req.body.title, 
    body: req.body.body,
    author: req.body.author,
    tags: req.body.tags,
    id: req.body.id
}))

client.post('/board/update', req => query.update({
    type: BOARD_TYPE, 
    title: req.body.title, 
    body: req.body.body,
    author: req.body.author,
    tags: req.body.tags,
    id: req.body.id
}))

client.post('/blog/delete', req => query.deleteQry({
    id: req.body.id
}))

client.post('/board/delete', req => query.deleteQry({
    id: req.body.id
}))

client.post('/board/view', req => query.view({
    id: req.body.id
}))

client.post('/board/likenum', req => query.view({
    id: req.body.id
}))