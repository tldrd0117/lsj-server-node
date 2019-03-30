const query = require('./query')
const client = require('../client');
const QueryClient = require('../QueryClient');

module.exports = client.router;

const queryClient = new QueryClient(client, query);

queryClient.defineAll([{
    sequence: true,
    define: [{
        method: 'post',
        path: '/signUp',
        query: 'selectId',
        transaction: false,
        result(user, req, res, next){
            if( user.length === 0){
                next();
            }
        }
    },{
        query: 'insert',
        transaction: true,
        globalParam: {
            authority: 'normal'
        },
        result(user, req, res){
            res.status(200).json(user)
        }
    }]
}])

