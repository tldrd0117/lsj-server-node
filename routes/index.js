const posts = require('./post');
const alive = require('./alive');

module.exports = (app) => {
    app.use('/', alive )
    app.use('/post', posts);
}