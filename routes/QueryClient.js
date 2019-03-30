module.exports = class QueryClient{
    constructor(client, query){
        this.client = client;
        this.query = query;
    }
    defineSimple ({method, path, query: queryName, globalParam, transaction}) {
        transaction = transaction || false
        this.client[method](path, async (req, res, next) => {
            try{
                const result = 
                    await this.queryFromDb({
                        transaction, 
                        queryName, 
                        globalParam, 
                        req, 
                        res
                    })
                await this.client.resJson(result);
            } catch(e) {
                return Promise.reject(e);
            }
        })
    }

    defineSimples (array) {
        array.forEach((item) => {
            this.defineSimple(item)
        })
    }

    defines (array) {
        array.forEach(item => {
            this.define(item)
        })
    }

    defineAll ( array ) {
        array.forEach(item => {
            const { sequence, define: defineTarget } = item;
            if(sequence){
                this.defineSequence(defineTarget);
            } else {
                this.define(defineTarget);
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

    define({method, 
            path, 
            query: queryName, 
            globalParam,
            middleware,
            result, 
            next, 
            transaction}){
            const argsArray = [path]
            .concat(middleware || [])
            .concat( async (req, res, appNext) => {
                try{
                    await this.queryProcess({queryName, globalParam, result, next, transaction, req, res});
                } catch(e) {
                    return Promise.reject(e);
                }
            })
            console.log(this.client[method])
            this.client[method].apply(this.client, argsArray);
    }
    queryProcess({queryName, globalParam, result, next, transaction, req, res}){
        return new Promise( async (resolve, reject) => {
            try{
                console.log(queryName);
                const queryResult = 
                    await this.queryFromDb({
                        transaction, 
                        queryName, 
                        globalParam, 
                        req, 
                        res
                    })
                if(result && queryResult){
                    result(queryResult.rows, req, res, 
                        this.makeNextCallback({
                            resolve, 
                            reject, 
                            nextParam: next, 
                            req, 
                            res
                        })
                    );
                } else if (queryResult) {
                    this.client.resJson(queryResult);
                }
            } catch(e) {
                reject(e);
            }
        })
    }

    makeNextCallback({resolve, reject, nextParam, req, res}){
        return async () => {
            try{
                if(!nextParam){
                    throw new Error('next not exist');
                }
                if(!nextParam.result){
                    throw new Error('next result not exist');
                }
                const { query, 
                        globalParam, 
                        result, 
                        next, 
                        transaction } = nextParam;
                await this.queryProcess({
                        queryName: query, 
                        globalParam, 
                        result, 
                        next, 
                        transaction, 
                        req, 
                        res})
                resolve();
            } catch(e) {
                reject(e);
            }
        }
        
    }

    queryFromDb({transaction, queryName, globalParam, req, res}){
        return new Promise( async (resolve, reject) => {
            let result = null;
            try{
                if(!queryName){
                    reject('not exist queryName');
                    return;
                }
                globalParam = globalParam || {};
                if( !transaction ){
                    result = await this.client.query(this.query[queryName], globalParam)({req,res});
                } else {
                    result = await this.client.queryWithTr(this.query[queryName], globalParam)({req, res});
                }
                resolve(result);
            } catch(e) {
                console.log('err')
                reject(e);
            } 
        })
        
    }
}