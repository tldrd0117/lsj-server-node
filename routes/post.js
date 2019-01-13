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

const selectAll = ()=>({
    text: 'SELECT title, body, id FROM public."Post"'
});
const insert = (title, body) => ({
    text: 'INSERT INTO public."Post"(title, body) VALUES ($1, $2) RETURNING id',
    values: [title, body]
})

router.get('/', async (req, res) =>{
    const { rows } = await db.query(selectAll())
    res.status(200).json(rows);
})

router.post('/', tr( async (client, req, res) => {
    const { rows } = await client.query(insert());
    res.status(200).json(rows);
}));

