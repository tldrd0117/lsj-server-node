const Router = require('express-promise-router');
const router = new Router();
const db = require('../db');

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
            return rows;
        } catch (e) {
            await dbClient.query('ROLLBACK');
            res.status(500).send('error: ' + e);
            throw e;
        } finally {
            dbClient.release()
        };
    }

    async resJson(req, res) {
        res.status(200).json(req.locals.rows)
    }
    
    post (path, getObj, result) {
        result = result || this.resJson;
        this.router.post(path, async (req, res, next) => {
            const rows = await this.queryWithTr(req, res, getObj);
            res.locals.rows = rows;
            return Promise.resolve('next')
        },result);
    }

    put (path, getObj,result) {
        result = result || this.resJson;
        this.router.put(path, async (req, res, next) => {
            await this.queryWithTr(req, res, getObj);
            res.locals.rows = rows;
            return Promise.resolve('next')
        },result);
    }

    delete (path, getObj,result) {
        result = result || this.resJson;
        this.router.delete(path, async (req, res, next) => {
            await this.queryWithTr(req, res, getObj);
            res.locals.rows = rows;
            return Promise.resolve('next')
        },result);
    }

    get (path, getObj, result) {
        result = result || this.resJson;
        this.router.get(path, async (req, res, next) =>{
            const { rows } = await this.db.query(getObj(req));
            res.locals.rows = rows;
            return Promise.resolve('next')
        },result)
    }
}

module.exports = new Client({router, db})