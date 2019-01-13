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
    text: 'SELECT title, body, id FROM Post where type=$1 ORDER BY id DESC',
    values: [type]
});
const insert = (type, title, body) => ({
    text: 'INSERT INTO Post(type, title, body) VALUES ($1, $2, $3) RETURNING id',
    values: [type, title, body]
})

router.get('/', async (req, res) =>{
    console.log(req);
    const { rows } = await db.query(selectAll(req.body.type))
    res.status(200).json(rows);
})

router.post('/', tr( async (client, req, res) => {
    const { rows } = await client.query(insert(req.body.type, req.body.title, req.body.body));
    res.status(200).json(rows);
}));

