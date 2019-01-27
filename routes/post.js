const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();

module.exports = router;

const tr = (func) => async (req, res) => {
    const client = await db.connect();
    try{
        await client.query('BEGIN');
        await func(client, req, res);
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }
    
}

const selectAll = (type)=>({
    text: 'SELECT title, body, id, create_time, author, tags FROM Post where type=$1 ORDER BY id DESC',
    values: [type]
});
const insert = (obj) => ({
    text: 'INSERT INTO Post(type, title, body, author, tags) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    values: [obj.type, obj.title, obj.body, obj.author, obj.tags]
})

const BLOG = {
    path: '/blog',
    type: 1
};
const BOARD = {
    path: '/board',
    type: 2
}

const selectDef = (obj) => {
    router.get(obj.path, async (req, res) =>{
        const { rows } = await db.query(selectAll(obj.type))
        res.status(200).json(rows);
    })
} 
const insertDef = (obj) => {
    router.post(obj.path, tr( async (client, req, res) => {
        const { rows } = await client.query(
            insert({
                type: obj.type, 
                title: req.body.title, 
                body: req.body.body,
                author: req.body.author,
                tags: req.body.tags
            })
        );
        res.status(200).json(rows);
    }));
}

selectDef(BLOG);
selectDef(BOARD);
insertDef(BLOG);
insertDef(BOARD);


