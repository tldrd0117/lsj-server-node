const Router = require('express-promise-router');
const router = new Router();
const db = require('../db');


class Client {
    constructor({router, db}){
        this.router = router;
        this.db = db;
    }

    resJson({res, rows}) {
        return new Promise((resolve, reject) => {
            res.status(200).json(rows)
            resolve()
        })
    }

    query(getObj, args) {
        args = args || {}
        return ({req, res}) =>{
            return new Promise( async (resolve, reject) => {
                try{
                    const target = getObj(req, res, args);
                    if(!target){
                        reject('check param Error')
                        return;
                    }
                    const result = await db.query(target)
                    if(result === null ) {
                        reject('result is null');
                        return;
                    }
                    res.locals.rows = result.rows;
                    resolve({ res, rows: result.rows })
                } catch(e){
                    reject(e)
                }
            })
        }
    }

    queryWithTr(getObj, args) {
        args = args || {}
        return ({req, res}) =>{
            return new Promise( async (resolve, reject) => {
                try{
                    const target = getObj(req, res, args);
                    if(!target){
                        reject('check param Error')
                        return;
                    }
                    const result = await db.queryWithTr(target)
                    if(result === null ) {
                        reject('result is null');
                        return;
                    }
                    res.locals.rows = result.rows;
                    resolve({ res, rows: result.rows })
                } catch(e) {
                    reject(e)
                }
            })
        }
    }
    
    post (path, ...func) {
        this.router.post(path, ...func);
    }

    get (path, ...func) {
        this.router.get(path, ...func)
    }
    
}

module.exports = new Client({router, db})