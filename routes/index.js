const posts = require('./post');
const alive = require('./alive');
const user = require('./user');

module.exports = (app) => {
    app.use('/', alive )
    app.use('/post', posts);
    app.use('/user', user);
}