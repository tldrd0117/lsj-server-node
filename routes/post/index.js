const query = require('./query')
const client = require('../client');
const QueryClient = require('../QueryClient');
module.exports = client.router;

//to_char(create_time, 'YYYY-MM-DD HH24:MI:SS') as create_time
//BLOG 1 BOARD 2

const BLOG_TYPE = 1;
const BOARD_TYPE = 2;

const queryClient = new QueryClient(client, query);

queryClient.defineSimples([
{
    method: 'get',
    path: '/blog',
    query: 'selectAll',
    globalParam: {
        type: BLOG_TYPE
    }
},{
    method: 'get',
    path: '/board',
    query: 'selectAll',
    globalParam: {
        type: BOARD_TYPE
    }
},{
    method: 'post',
    path: '/blog',
    query: 'insert',
    globalParam: {
        type: BLOG_TYPE
    }
},{
    method: 'post',
    path: '/board',
    query: 'insert',
    globalParam: {
        type: BOARD_TYPE
    }
},{
    method: 'post',
    path: '/update',
    query: 'update'
},{
    method: 'post',
    path: '/delete',
    query: 'deleteQry'
},{
    method: 'post',
    path: '/view',
    query: 'view'
},{
    method: 'post',
    path: '/likenum',
    query: 'likenum'
}])
