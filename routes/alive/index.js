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
        result: json()
    }
},{
    define: {
        method: 'get',
        path: '/visit',
        query: 'selectAll',
        globalParam: {
            type: 3
        },
        // middleware: [blockNotLogin()],
        result: json()
    }
},{
    define: {
        method: 'get',
        path: '/message',
        query: 'selectAll',
        globalParam: {
            type: 4
        },
        // middleware: [blockNotLogin()],
        result: json()
    }
}
])

