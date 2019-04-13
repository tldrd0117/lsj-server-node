const query = require('../post/query')
const client = require('../client');
const QueryClient = require('../QueryClient');
const { blockNotLogin, json } = require('../middlewares');

module.exports = client.router;

const queryClient = new QueryClient(client, query);

queryClient.defineAll([{
    define: {
        method: 'post',
        path: '/isAlive',
        query: 'insert',
        transaction: false,
        middleware: blockNotLogin(),
        result: json()
    }
}])

