const query = require('./query')
const client = require('../client');

module.exports = client.router;

client.post('/checkId', req => query.selectId({
    userid: req.body.userid, 
}), async (req, res) => {
    res.status(200).json({
        duplication: res.locals.rows.length > 0
    })
})

//userid, password, name, email, authority
client.post('/signUp', req => query.insert({
    userid: req.body.userid,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    authority: 'normal'
}));
