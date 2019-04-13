module.exports = class Query{
    constructor({name, text, params}){
        this.name = name;
        this.text = text;
        this.params = params;
    }
    makeQueryFunc(){
        return (obj) => {
            const values = new Array(this.params.length).fill(0).map((_, index) => {
                return obj[this.params[index]];
            })
            return{
                text: this.text,
                values
            }
        }
    }
    checkParams(requestValue){
        const requestKeys = Object.keys(requestValue);
        let errorIndex = -1;
        return {
            success: this.params.every((item, index)=>{
                errorIndex = index;
                return requestKeys.find((keys) => {
                    return keys === item
                });
            }),
            errorIndex
        }
    }

    makeRequestQuery(){
        const makeQuery = this.makeQueryFunc();
        return {
            [this.name]: (req, res, args) => {
                let reqValue = {};
                args = args || {}
                console.log(args);
                if(req && req.query){
                    reqValue = {
                        ...req.query,
                        ...reqValue
                    }
                }
                if(req && req.body){
                    reqValue = {
                        ...req.body,
                        ...reqValue
                    }
                } 
                if(args) {
                    reqValue = {
                        ...args,
                        ...reqValue
                    }
                }
                console.log(reqValue)
                const check = this.checkParams(reqValue);
                console.log(check)
                if(check.success){
                    return makeQuery(reqValue);
                }
                res.locals.error = this.params[check.errorIndex] + ' not exist';
                return null;
            }
        }
    }
}