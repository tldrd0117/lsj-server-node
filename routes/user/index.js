const query = require('./query')
const client = require('../client');
const QueryClient = require('../QueryClient');

module.exports = client.router;

const queryClient = new QueryClient(client, query);

queryClient.defineSequence([{
    method: 'post',
    path: '/signUp',
    query: 'selectId',
    result(user){
        console.log('user', user)
        return user.length === 0;
    }
},{
    query: 'insert',
    globalParam: {
        authority: 'normal'
    },
    result(user, req, res){
        res.status(200).json(user)
        return false;
    }
}])

