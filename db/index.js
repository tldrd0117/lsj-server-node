const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://ilpbqrcqvkseil:0644b519926d6079dff0d82bed436ad34f2cb5a594da475d2f8c27da4ffff63b@ec2-174-129-18-247.compute-1.amazonaws.com:5432/dcsl4qthagptm0?ssl=true'
})

class DataBase{
    query(text){
        if(text === null) return text;
        return pool.query(text)
    }
    getClient(){
        return pool.connect()
    }
    async queryWithTr(qry) {
        if(qry === null) return qry;
        const dbClient = await this.getClient();
        try{
            await dbClient.query('BEGIN');
            const result = await dbClient.query(qry);
            await dbClient.query('COMMIT');
            return result;
        } catch (e) {
            await dbClient.query('ROLLBACK');
            console.log(e)
            return null

        } finally {
            dbClient.release()
        };
    }
}

module.exports = new DataBase();

