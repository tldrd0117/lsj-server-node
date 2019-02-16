const Router = require('express-promise-router');
const router = new Router();
const db = require('../db');

class Client {
    constructor({router, db}){
        this.router = router;
        this.db = db;
    }
    async queryInTr(client, req, res, getObj) {
        const client = await this.db.connect();
        try{
            await client.query('BEGIN');
            const { rows } = await client.query(getObj(req));
            await client.query('COMMIT');
            res.status(200).json(rows);

        } catch (e) {
            await client.query('ROLLBACK');
            res.status(500).send('error: ' + e);
            throw e;
        } finally {
            client.release()
        };
    }
    
    post (path, getObj) {
        this.router.post(path, async (client, req, res) => {
            await this.queryWithTr(client, req, res, getObj);
        });
    }

    put (path, getObj) {
        this.router.put(path, async (client, req, res) => {
            await this.queryWithTr(client, req, res, getObj);
        });
    }

    delete (path, getObj) {
        this.router.delete(path, async (client, req, res) => {
            await this.queryWithTr(client, req, res, getObj);
        });
    }

    get (path, getObj) {
        this.router.get(path, async (req, res) =>{
            const { rows } = await this.db.query(getObj(req));
            res.status(200).json(rows);
        })
    }
}

module.exports = new Client({router, db})