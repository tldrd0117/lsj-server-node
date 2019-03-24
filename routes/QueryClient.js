module.exports = class QueryClient{
    constructor(client, query){
        this.client = client;
        this.query = query;
    }
    defineSimple ({method, path, query: queryName, globalParam}) {
        this.client[method](path, async (req, res, next) => {
            try{
                const result = await this.queryFromDb({method, queryName, globalParam, req, res})
                await this.client.resJson(result);
            } catch(e) {
                return Promise.reject(e);
            }
        })
    }
    defineSequence(array){
        const values = array.reduce(function(acc, item){
            acc.next = item;    
            return acc        
        })
        this.define(values);
    }

    define({method, path, query: queryName, globalParam, result, next}){
        this.client[method](path, async (req, res, appNext) => {
            try{
                const queryProcess = (queryName, globalParam, result, next) => {
                    return new Promise( async (resolve, reject) => {
                        try{
                            const queryResult = await this.queryFromDb({method, queryName, globalParam, req, res})
                            let ok = true;
                            if(result){
                                if(!queryResult){
                                    ok = false;
                                }
                                else{
                                    ok = result(queryResult.rows, req, res);
                                }
                            } 
                            if(next && ok){
                                if(!next.result) throw new Error('next result not exist');
                                await queryProcess(next.query, next.globalParam, next.result, next.next)
                            }
                            resolve();
                        } catch(e) {
                            reject(e)
                        }
                    })
                }
                await queryProcess(queryName, globalParam, result, next);
            } catch(e) {
                return Promise.reject(e);
            }
        })
    }
    queryFromDb({method, queryName, globalParam, req, res}){
        return new Promise( async (resolve, reject) => {
            let result = null;
            try{
                if(!queryName){
                    reject('not exist queryName');
                    return;
                }
                globalParam = globalParam || {};
                if( method ==='get' ){
                    result = await this.client.query(this.query[queryName], globalParam)({req,res});
                } else if( method === 'post') {
                    result = await this.client.queryWithTr(this.query[queryName], globalParam)({req, res});
                }
                resolve(result);
            } catch(e) {
                reject(e);
            } 
        })
        
    }
    defineSimples (array) {
        array.forEach((item) => {
            this.defineSimple(item)
        })
    }
}