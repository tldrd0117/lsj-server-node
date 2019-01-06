const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();

module.exports = router;

router.get('/', (req, res) => {
    const { rows } = await db.query('SELECT title, body, id FROM public."Post"')
    res.status(200).json(rows);
})
