const pool = require('../pool');
module.exports = {
    getPost( req, res ){
        pool.query('SELECT title, body, id FROM public."Post"', (error, result) => {
            if(error){
                throw error
            }
            res.status(200).json(result.rows);
        })
    }
}