const query = require('./query')
const client = require('../client');
const QueryClient = require('../QueryClient');
const { blockNotLogin, json } = require('../middlewares');
module.exports = client.router;

//to_char(create_time, 'YYYY-MM-DD HH24:MI:SS') as create_time
//BLOG 1 BOARD 2

const BLOG_TYPE = 1;
const BOARD_TYPE = 2;

const queryClient = new QueryClient(client, query);

queryClient.defineAll([{
    define: {
        method: 'get',
        path: '/blog',
        query: 'selectAll',
        globalParam: {
            type: BLOG_TYPE
        },
        // middleware: [blockNotLogin()],
        result: json()
    }
},{
   define: {
        method: 'get',
        path: '/board',
        query: 'selectAll',
        globalParam: {
            type: BOARD_TYPE
        },
        result: json()
   } 
},{
    define: {
        method: 'post',
        transaction: true,
        path: '/blog',
        query: 'insert',
        globalParam: {
            type: BLOG_TYPE
        },
        middleware: blockNotLogin(),
        result: json()
    }
},{
    define: {
        method: 'post',
        transaction: true,
        path: '/board',
        query: 'insert',
        globalParam: {
            type: BOARD_TYPE
        },
        middleware: blockNotLogin(),
        result: json()
    }
},{
    define: {
        method: 'post',
        transaction: true,
        path: '/update',
        query: 'update',
        middleware: blockNotLogin(),
        result: json()
    }
},{
    define: {
        method: 'post',
        transaction: true,
        path: '/delete',
        query: 'deleteQry',
        middleware: blockNotLogin(),
        result: json()

    }
},{
    define: {
        method: 'post',
        transaction: true,
        path: '/view',
        query: 'view',
        result: json()
    }
},{
    define: {
        method: 'post',
        transaction: true,
        path: '/likenum',
        query: 'likenum',
        result: json()
    }
}])
