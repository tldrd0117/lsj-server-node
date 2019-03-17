const Router = require('express-promise-router');
const router = new Router();
const db = require('../../db');

class Client {
    constructor({router, db}){
        this.router = router;
        this.db = db;
    }
    async queryWithTr(req, res, getObj) {
        const dbClient = await this.db.getClient();
        try{
            await dbClient.query('BEGIN');
            const { rows } = await dbClient.query(getObj(req));
            await dbClient.query('COMMIT');
            res.status(200).json(rows);

        } catch (e) {
            await dbClient.query('ROLLBACK');
            res.status(500).send('error: ' + e);
            throw e;
        } finally {
            dbClient.release()
        };
    }
    
    post (path, getObj) {
        this.router.post(path, async (req, res, next) => {
            await this.queryWithTr(req, res, getObj);
        });
    }

    put (path, getObj) {
        this.router.put(path, async (req, res, next) => {
            await this.queryWithTr(req, res, getObj);
        });
    }

    delete (path, getObj) {
        this.router.delete(path, async (req, res, next) => {
            await this.queryWithTr(req, res, getObj);
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