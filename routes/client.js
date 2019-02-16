const Router = require('express-promise-router');
const router = new Router();
const db = require('../db');

class Client {
    constructor({router, db}){
        this.router = router;
        this.db = db;
    }
    tr(func){
        return async (req, res) => {
            const client = await this.db.connect();
            try{
                await client.query('BEGIN');
                await func(client, req, res);
                await client.query('COMMIT');
            } catch (e) {
                await client.query('ROLLBACK')
                throw e
            } finally {
                client.release()
            };
        }
    }
    
    post (path, getObj) {
        this.router.post(path, this.tr( async (client, req, res) => {
            const { rows } = await client.query(getObj(req).query);
            res.status(200).json(rows);
        }));
    }

    put (path, getObj) {
        this.router.put(path, this.tr( async (client, req, res) => {
            const { rows } = await client.query(getObj(req).query);
            res.status(200).json(rows);
        }));
    }

    delete (path, getObj) {
        this.router.delete(path, this.tr( async (client, req, res) => {
            const { rows } = await client.query(getObj(req).query);
            res.status(200).json(rows);
        }));
    }

    get (path, getObj) {
        this.router.get(path, async (req, res) =>{
            const { rows } = await this.db.query(getObj(req).query);
            res.status(200).json(rows);
        })
    }
}

module.exports = new Client({router, db})