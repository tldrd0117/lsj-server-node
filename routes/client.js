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
    
    post (path, getObj, sub) {
        this.router.post(path, async (req, res, next) => {
            const rows = await this.queryWithTr(req, res, getObj);
            if(!sub){
                res.status(200).json(rows)
            } else {
                res.locals.rows = rows;
                return Promise.resolve('next')
            }
        },sub);
    }

    put (path, getObj,sub) {
        this.router.put(path, async (req, res, next) => {
            await this.queryWithTr(req, res, getObj);
            if(!sub){
                res.status(200).json(rows)
            } else {
                res.locals.rows = rows;
                return Promise.resolve('next')
            }
        },sub);
    }

    delete (path, getObj,sub) {
        this.router.delete(path, async (req, res, next) => {
            await this.queryWithTr(req, res, getObj);
            if(!sub){
                res.status(200).json(rows)
            } else {
                res.locals.rows = rows;
                return Promise.resolve('next')
            }
        },sub);
    }

    get (path, getObj, sub) {
        this.router.get(path, async (req, res, next) =>{
            const { rows } = await this.db.query(getObj(req));
            if(!sub) {
                res.status(200).json(rows);
            } else {
                res.locals.rows = rows;
                next(rows);
            }
        },sub)
    }
}

module.exports = new Client({router, db})