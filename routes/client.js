
class Client {
    constructor(router){
        this.router = router;
    }
    tr(func){
        return async (req, res) => {
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
            };
        }
    }
    
    post (path, getObj) {
        this.router.post(path, tr( async (client, req, res) => {
            const { rows } = await client.query(getObj(req).query);
            res.status(200).json(rows);
        }));
    }

    put (path, getObj) {
        this.router.put(path, tr( async (client, req, res) => {
            const { rows } = await client.query(getObj(req).query);
            res.status(200).json(rows);
        }));
    }

    delete (path, getObj) {
        this.router.delete(path, tr( async (client, req, res) => {
            const { rows } = await client.query(getObj(req).query);
            res.status(200).json(rows);
        }));
    }

    get (path, getObj) {
        this.router.get(path, async (req, res) =>{
            const { rows } = await db.query(getObj(req).query);
            res.status(200).json(rows);
        })
    }
}

module.exports = Client